import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Eye from './Eye';
import Mouth from './Mouth';

const FaceAnimal = ({ onClick }: { onClick: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);
  const clickStartPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Sử dụng requestAnimationFrame để smooth hơn
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const calculatePupilPosition = (eyeX: number, eyeY: number, maxMove: number = 8) => {
    if (!buttonRef.current) return { x: 0, y: 0 };

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Vị trí mắt so với center của button
    const absoluteEyeX = buttonCenterX + eyeX;
    const absoluteEyeY = buttonCenterY + eyeY;

    // Vector từ mắt đến chuột
    const deltaX = mousePos.x - absoluteEyeX;
    const deltaY = mousePos.y - absoluteEyeY;
    
    // Tính góc và khoảng cách
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Tính toán responsive hơn - giảm divisor để nhanh hơn
    const responsiveness = distance / 30;
    const limitedDistance = Math.min(responsiveness, maxMove);

    return {
      x: Math.cos(angle) * limitedDistance,
      y: Math.sin(angle) * limitedDistance,
    };
  };

  const handleClick = () => {
    // Chỉ trigger click nếu không kéo xa (< 5px)
    if (clickStartPos.current) {
      const deltaX = Math.abs(mousePos.x - clickStartPos.current.x);
      const deltaY = Math.abs(mousePos.y - clickStartPos.current.y);
      
      if (deltaX + deltaY > 5) {
        clickStartPos.current = null;
        return;
      }
    }

    clickStartPos.current = null;

    // Hiệu ứng pháo bông
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const colors = ['#FFA500', '#FFD700', '#FF6347', '#FF69B4', '#87CEEB'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    })();

    // Gọi onClick callback sau một chút delay để người dùng thấy hiệu ứng
    setTimeout(() => {
      onClick();
    }, 300);
  };

  const leftEyePupil = calculatePupilPosition(-30, -10, 10);
  const rightEyePupil = calculatePupilPosition(30, -10, 8);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => {
        setIsDragging(true);
        clickStartPos.current = { x: mousePos.x, y: mousePos.y };
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
      className="fixed z-50"
      style={{
        left: '50%',
        top: '30%',
        x: '-50%',
        y: '-50%',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.05 }}
    >
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative transition-colors ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          width: '150px',
          height: '150px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none',
        }}
      >
        {/* Face Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl"></div>

        {/* Eyes */}
        <Eye
          size="big"
          position={{ left: '10px', top: '35px' }}
          pupilOffset={leftEyePupil}
        />
        <Eye
          size="small"
          position={{ right: '10px', top: '40px' }}
          pupilOffset={rightEyePupil}
        />

        {/* Mouth */}
        <Mouth isOpen={isHovered} />

        {/* Hover hint */}
        {isHovered && !isDragging && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-fade-in pointer-events-none">
            Click me!
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default FaceAnimal;
