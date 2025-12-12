import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Eye from "./ButtonAnimation/Eye";
import Mouth from "./ButtonAnimation/Mouth";
import Eyebrow from "./ButtonAnimation/Eyebrow";
import SpeechBubble from "./ButtonAnimation/SpeechBubble";
import { useMonster } from "../contexts/MonsterContext";

// Helper function
const calculatePupilPosition = (
  element: HTMLDivElement,
  mouseX: number,
  mouseY: number,
  eyeX: number,
  eyeY: number,
  maxMove: number
) => {
  const buttonRect = element.getBoundingClientRect();
  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2;

  const absoluteEyeX = buttonCenterX + eyeX;
  const absoluteEyeY = buttonCenterY + eyeY;

  const deltaX = mouseX - absoluteEyeX;
  const deltaY = mouseY - absoluteEyeY;

  const angle = Math.atan2(deltaY, deltaX);
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const responsiveness = distance / 30;
  const limitedDistance = Math.min(responsiveness, maxMove);

  return {
    x: Math.cos(angle) * limitedDistance,
    y: Math.sin(angle) * limitedDistance,
  };
};

const MonsterUnified = () => {
  const {
    updateMonsterPosition,
    distanceToMonster,
    isMonsterEating,
    isDraggingFood,
  } = useMonster();

  const [isHovered, setIsHovered] = useState(false);
  const [pupilPositions, setPupilPositions] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });
  const [showSpeech, setShowSpeech] = useState(false);
  const monsterRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const speechTimeoutRef = useRef<number | null>(null);

  // Track mouse for eye movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (monsterRef.current) {
          const leftPupil = calculatePupilPosition(
            monsterRef.current,
            e.clientX,
            e.clientY,
            -30,
            -10,
            10
          );
          const rightPupil = calculatePupilPosition(
            monsterRef.current,
            e.clientX,
            e.clientY,
            30,
            -10,
            8
          );
          setPupilPositions({ left: leftPupil, right: rightPupil });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Update monster position continuously - optimized với requestAnimationFrame
  useEffect(() => {
    let rafId: number | null = null;
    let lastUpdate = 0;
    const UPDATE_INTERVAL = 100; // Update mỗi 100ms thay vì 50ms

    const updatePosition = (timestamp: number) => {
      if (timestamp - lastUpdate >= UPDATE_INTERVAL) {
        if (monsterRef.current) {
          const rect = monsterRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2 + 50; // Vị trí miệng
          updateMonsterPosition(centerX, centerY);
          lastUpdate = timestamp;
        }
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateMonsterPosition]);

  // Auto show speech
  useEffect(() => {
    const showSpeechCycle = () => {
      setShowSpeech(true);
      speechTimeoutRef.current = setTimeout(() => {
        setShowSpeech(false);
      }, 2000);
    };

    const initialTimeout = setTimeout(showSpeechCycle, 1000);
    const interval = setInterval(showSpeechCycle, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setShowSpeech(true);
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    speechTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
    }, 2000);
  };

  const mouthOpenLevel =
    distanceToMonster < 300 ? Math.min(1, (300 - distanceToMonster) / 220) : 0;

  const getMessage = () => {
    if (isMonsterEating) return "Ngon! 😋";
    if (mouthOpenLevel > 0.5) return "Gần rồi! 🤤";
    return "Đói quá... 😢";
  };

  return (
    <motion.div
      ref={monsterRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      className="fixed z-40"
      initial={{
        left: "50%",
        top: "30%",
        x: "-50%",
        y: "-50%",
      }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.05 }}
    >
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative transition-all duration-300 cursor-grab ${
          isMonsterEating ? "scale-125" : ""
        }`}
        style={{
          width: "150px",
          height: "150px",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Face Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[#FCF4A3] to-[#FDEE87] rounded-full shadow-2xl transition-all duration-300 ${
            isMonsterEating ? "animate-pulse" : ""
          }`}
        ></div>

        {/* Eyebrows */}
        <Eyebrow
          position={{ left: "16px", top: "28px" }}
          isExcited={isDraggingFood || mouthOpenLevel > 0}
        />
        <Eyebrow
          position={{ right: "10px", top: "33px" }}
          isExcited={isDraggingFood || mouthOpenLevel > 0}
        />

        {/* Eyes */}
        <Eye
          size="big"
          position={{ left: "15px", top: "35px" }}
          pupilOffset={pupilPositions.left}
        />
        <Eye
          size="small"
          position={{ right: "15px", top: "40px" }}
          pupilOffset={pupilPositions.right}
        />
        {/* <div className="absolute block right-1/2 transform translate-x-1/2 top-0 w-12 h-3 bg-[#72c8fa] rounded-full"></div> */}
        {/* <div className="absolute block right-1/2 transform translate-x- top-0 w-12 h-3 bg-[#72c8fa] rounded-full"></div> */}

        <div className="absolute block left-2 bottom-[50px] w-4 h-4 bg-[#fa80725f] rounded-full"></div>
        <div className="absolute block right-2 bottom-[50px] w-4 h-4 bg-[#fa80725f] rounded-full"></div>
        {/* Mouth */}
        <Mouth
          isOpen={isHovered || mouthOpenLevel > 0.5}
          openLevel={Math.max(mouthOpenLevel, isHovered ? 0.5 : 0)}
        />

        {/* Eating particles */}
        {isMonsterEating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos((i * Math.PI) / 4) * 40}%`,
                  top: `${50 + Math.sin((i * Math.PI) / 4) * 40}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Speech Bubble */}
        <SpeechBubble message={getMessage()} isVisible={showSpeech} />

        {/* Excited emoji */}
        {mouthOpenLevel > 0.5 && !isMonsterEating && !showSpeech && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce pointer-events-none">
            😋
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MonsterUnified;
