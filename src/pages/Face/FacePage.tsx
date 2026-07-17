import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiCheckCircle, FiXCircle, FiRefreshCw, FiTrash2, FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store/hooks";
import { setSuccess, setError } from "../../features/uiSlice";
import { faceApi, type FaceStatus } from "../../api/face";
import FaceCamera from "../../components/FaceCamera/FaceCamera";

export default function FacePage() {
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<FaceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState<"register" | "update">("register");
  const [processing, setProcessing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const data = await faceApi.getStatus();
      setStatus(data);
    } catch {
      dispatch(setError("Không thể tải trạng thái khuôn mặt"));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleCapture = async (descriptor: number[]) => {
    setProcessing(true);
    try {
      if (cameraMode === "register" || !status?.hasFace) {
        await faceApi.register(descriptor);
        dispatch(setSuccess("Đã đăng ký khuôn mặt thành công!"));
      } else {
        await faceApi.update(descriptor);
        dispatch(setSuccess("Đã cập nhật khuôn mặt thành công!"));
      }
      setShowCamera(false);
      fetchStatus();
    } catch {
      dispatch(setError("Có lỗi xảy ra, vui lòng thử lại"));
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await faceApi.remove();
      dispatch(setSuccess("Đã xóa khuôn mặt thành công"));
      setConfirmDelete(false);
      fetchStatus();
    } catch {
      dispatch(setError("Có lỗi xảy ra khi xóa khuôn mặt"));
    } finally {
      setDeleting(false);
    }
  };

  const openRegister = () => { setCameraMode("register"); setShowCamera(true); };
  const openUpdate = () => { setCameraMode("update"); setShowCamera(true); };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Title */}
          <div className="mb-2">
            <h2 className="text-lg font-bold text-surface-800">Xác thực khuôn mặt</h2>
            <p className="text-sm text-surface-500 mt-0.5">
              Đăng ký khuôn mặt để đăng nhập nhanh không cần mật khẩu
            </p>
          </div>

          {/* Status card */}
          <div className="card">
            {loading ? (
              <div className="flex items-center gap-3 py-2">
                <div className="w-5 h-5 border-2 border-primary-300 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-surface-500">Đang tải...</span>
              </div>
            ) : status?.hasFace ? (
              <div className="space-y-4">
                {/* Registered badge */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
                    <FiCheckCircle size={22} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-surface-800 text-sm">Đã đăng ký</p>
                    <p className="text-xs text-surface-500">Khuôn mặt đã được xác thực trong hệ thống</p>
                  </div>
                </div>

                {/* Registration time */}
                {status.faceRegisteredAt && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary-50/60 rounded-xl border border-primary-100/60">
                    <FiClock size={13} className="text-primary-400 flex-shrink-0" />
                    <span className="text-xs text-surface-600">
                      Lần đăng ký gần nhất:{" "}
                      <span className="font-medium text-surface-800">
                        {dayjs(status.faceRegisteredAt).format("HH:mm — DD/MM/YYYY")}
                      </span>
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={openUpdate}
                    className="btn-secondary flex-1 justify-center text-sm gap-1.5"
                  >
                    <FiRefreshCw size={13} />
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 border border-red-100 transition-colors"
                  >
                    <FiTrash2 size={13} />
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-50 border border-surface-100 flex items-center justify-center flex-shrink-0">
                    <FiXCircle size={22} className="text-surface-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-surface-800 text-sm">Chưa đăng ký</p>
                    <p className="text-xs text-surface-500">Đăng ký khuôn mặt để đăng nhập nhanh hơn</p>
                  </div>
                </div>

                <button onClick={openRegister} className="btn-primary w-full justify-center gap-2">
                  <FiCamera size={15} />
                  Đăng ký khuôn mặt
                </button>
              </div>
            )}
          </div>

          {/* Info card */}
          <div className="card bg-primary-50/40 border-primary-100/60">
            <h4 className="text-xs font-semibold text-surface-700 mb-2">Cách hoạt động</h4>
            <ul className="space-y-1.5">
              {[
                "Camera trích xuất điểm đặc trưng khuôn mặt (128 chiều) — không lưu ảnh thực",
                "Khi đăng nhập, quay đầu nhẹ để hệ thống tự xác thực",
                "Dữ liệu được mã hóa và lưu trữ bảo mật trên server",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-surface-500">
                  <span className="w-4 h-4 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Camera modal */}
      <AnimatePresence>
        {showCamera && (
          <FaceCamera
            mode="register"
            onCapture={handleCapture}
            onClose={() => setShowCamera(false)}
            isProcessing={processing}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {confirmDelete &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                className="bg-white rounded-2xl shadow-elevated w-full max-w-xs p-5"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
                    <FiTrash2 size={20} className="text-red-500" />
                  </div>
                  <h3 className="font-bold text-surface-800 text-sm">Xóa khuôn mặt?</h3>
                  <p className="text-xs text-surface-500 mt-1">
                    Bạn sẽ không thể đăng nhập bằng khuôn mặt cho đến khi đăng ký lại.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="btn-secondary flex-1 justify-center text-sm"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors"
                  >
                    {deleting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Xóa"
                    )}
                  </button>
                </div>
              </motion.div>
            </div>,
            document.body,
          )}
      </AnimatePresence>
    </>
  );
}
