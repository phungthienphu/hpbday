import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import * as faceapi from "@vladmandic/face-api";
import { motion } from "framer-motion";
import { FiX, FiCamera } from "react-icons/fi";

const MODEL_URL = "/models";
let modelsLoaded = false;

async function loadModels() {
  if (modelsLoaded) return;
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ]);
  modelsLoaded = true;
}

const YAW_THRESHOLD = 9;

function getYaw(landmarks: faceapi.FaceLandmarks68): number {
  const nose = landmarks.getNose()[3];
  const leftEye = landmarks.getLeftEye()[0];
  const rightEye = landmarks.getRightEye()[3];
  const eyeCenterX = (leftEye.x + rightEye.x) / 2;
  return nose.x - eyeCenterX;
}

function drawBrackets(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; width: number; height: number },
) {
  const { x, y, width, height } = box;
  const S = 22;
  const oy = -40;

  ctx.strokeStyle = "rgba(244,63,94,0.95)";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "rgba(244,63,94,0.5)";
  ctx.shadowBlur = 10;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(x, y + S + oy); ctx.lineTo(x, y + oy); ctx.lineTo(x + S, y + oy);
  ctx.moveTo(x + width - S, y + oy); ctx.lineTo(x + width, y + oy); ctx.lineTo(x + width, y + S + oy);
  ctx.moveTo(x + width, y + height - S + oy); ctx.lineTo(x + width, y + height + oy); ctx.lineTo(x + width - S, y + height + oy);
  ctx.moveTo(x + S, y + height + oy); ctx.lineTo(x, y + height + oy); ctx.lineTo(x, y + height - S + oy);
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export interface FaceCameraProps {
  mode: "login" | "register";
  onCapture: (descriptor: number[]) => void;
  onClose: () => void;
  isProcessing?: boolean;
  error?: string | null;
}

export default function FaceCamera({ mode, onCapture, onClose, isProcessing, error }: FaceCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);
  const captureRef = useRef<() => void>(() => {});

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [faceDetected, setFaceDetected] = useState(false);
  const [hint, setHint] = useState<string>("");

  const stopCamera = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const captureDescriptor = useCallback(async () => {
    if (!videoRef.current) return;
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!detection) {
      setHint("Không tìm thấy khuôn mặt, thử lại!");
      triggeredRef.current = false;
      return;
    }
    onCapture(Array.from(detection.descriptor));
  }, [onCapture]);

  // Keep stable ref to latest captureDescriptor to use inside the loop
  useEffect(() => {
    captureRef.current = captureDescriptor;
  }, [captureDescriptor]);

  // Khi BE trả lỗi → reset trigger để người dùng có thể thử lại
  useEffect(() => {
    if (error) {
      triggeredRef.current = false;
    }
  }, [error]);

  useEffect(() => {
    let cancelled = false;
    triggeredRef.current = false;

    const start = async () => {
      try {
        setStatus("loading");
        const [stream] = await Promise.all([
          navigator.mediaDevices.getUserMedia({
            video: { width: 400, height: 400, facingMode: "user" },
          }),
          loadModels(),
        ]);

        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }

        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          if (videoRef.current.readyState >= 2) return resolve();
          videoRef.current!.addEventListener("loadeddata", () => resolve(), { once: true });
        });

        if (cancelled) return;
        setStatus("ready");

        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const size = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, size);

        let lastDetect = 0;

        const loop = async () => {
          if (cancelled) return;
          const now = Date.now();

          if (now - lastDetect >= 200) {
            lastDetect = now;
            try {
              const results = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

              if (!cancelled) {
                setFaceDetected(results.length > 0);

                if (mode === "login" && !triggeredRef.current && results.length === 1) {
                  const yaw = getYaw(results[0].landmarks);
                  if (Math.abs(yaw) > YAW_THRESHOLD) {
                    triggeredRef.current = true;
                    setHint("Đang nhận diện...");
                    setTimeout(() => {
                      if (!cancelled) captureRef.current();
                    }, 500);
                  }
                }

                const ctx = canvas.getContext("2d");
                if (ctx) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  const resized = faceapi.resizeResults(
                    results.map((d) => d.detection),
                    size,
                  );
                  for (const det of resized) {
                    drawBrackets(ctx, det.box);
                  }
                }
              }
            } catch {
              // skip frame
            }
          }

          rafRef.current = requestAnimationFrame(loop);
        };
        loop();
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    start();
    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [mode, stopCamera]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={{ duration: 0.22 }}
        className="bg-white rounded-2xl shadow-elevated w-full max-w-sm overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary-100/60">
          <div>
            <h3 className="font-bold text-sm text-surface-800">
              {mode === "login" ? "Đăng nhập khuôn mặt" : "Đăng ký khuôn mặt"}
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              {mode === "login"
                ? "Quay đầu nhẹ để xác thực tự động"
                : "Nhìn thẳng vào camera rồi nhấn chụp"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-primary-50 flex items-center justify-center text-surface-400 hover:text-surface-700 transition-colors flex-shrink-0"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Camera viewport */}
        <div className="relative bg-gray-950 aspect-square">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover scale-x-[-1]"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full scale-x-[-1]"
          />

          {/* Loading overlay */}
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3">
              <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/80 text-xs">Đang tải model AI...</p>
            </div>
          )}

          {/* Error overlay */}
          {status === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-2 p-6 text-center">
              <FiCamera size={28} className="text-white/40" />
              <p className="text-white/70 text-sm">Không thể truy cập camera</p>
              <p className="text-white/40 text-xs">Vui lòng cấp quyền camera và thử lại</p>
            </div>
          )}

          {/* Processing overlay */}
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 gap-3">
              <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/80 text-xs">Đang xử lý...</p>
            </div>
          )}

          {/* Face detected indicator */}
          {status === "ready" && !isProcessing && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  faceDetected ? "bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]" : "bg-red-400"
                }`}
              />
              <span className="text-white/80 text-[10px]">
                {faceDetected ? "Đã thấy mặt" : "Không thấy mặt"}
              </span>
            </div>
          )}

          {/* Hint */}
          {hint && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                {hint}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 space-y-3">
          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </motion.div>
          )}

          {mode === "register" ? (
            <button
              onClick={captureDescriptor}
              disabled={status !== "ready" || !faceDetected || isProcessing}
              className="btn-primary w-full justify-center disabled:opacity-40 text-sm"
            >
              <FiCamera size={14} />
              Chụp khuôn mặt
            </button>
          ) : (
            <p className="text-xs text-surface-400 text-center">
              {error
                ? <span className="text-primary-500 font-medium">Quay đầu nhẹ để thử lại</span>
                : <>Nhìn thẳng → <span className="text-primary-500 font-medium">quay đầu nhẹ sang trái hoặc phải</span> để xác thực tự động</>
              }
            </p>
          )}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
