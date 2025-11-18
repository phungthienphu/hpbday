import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Eye from './Eye';
import Mouth from './Mouth';

interface FaceAnimalProps {
  distanceToCake: number;
  isEating: boolean;
  onPositionChange?: (x: number, y: number) => void;
}

// Helper function - khai báo bên ngoài component
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

const FaceAnimal = ({ distanceToCake, isEating, onPositionChange }: FaceAnimalProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pupilPositions, setPupilPositions] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });
  const buttonRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        // Calculate pupil positions
        if (buttonRef.current) {
          const leftPupil = calculatePupilPosition(buttonRef.current, e.clientX, e.clientY, -30, -10, 10);
          const rightPupil = calculatePupilPosition(buttonRef.current, e.clientX, e.clientY, 30, -10, 8);
          setPupilPositions({ left: leftPupil, right: rightPupil });
        }
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

  // Update position when dragged
  useEffect(() => {
    if (!buttonRef.current || !onPositionChange) return;

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2 + 50; // +50 để đến vị trí miệng
        onPositionChange(centerX, centerY);
      }
    };

    updatePosition();
    const interval = setInterval(updatePosition, 100);
    return () => clearInterval(interval);
  }, [onPositionChange]);

  // Tính mức độ há mồm dựa trên khoảng cách bánh
  const mouthOpenLevel = distanceToCake < 300 
    ? Math.min(1, (300 - distanceToCake) / 220) 
    : 0;

  return (
    <motion.div
      ref={buttonRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="fixed z-50"
      initial={{
        left: '50%',
        top: '30%',
        x: '-50%',
        y: '-50%',
      }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.05 }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative transition-all duration-300 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${isEating ? 'scale-125' : ''}`}
        style={{ 
          width: '150px', 
          height: '150px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Face Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl transition-all duration-300 ${
          isEating ? 'animate-pulse' : ''
        }`}></div>

        {/* Eyes */}
        <Eye
          size="big"
          position={{ left: '10px', top: '35px' }}
          pupilOffset={pupilPositions.left}
        />
        <Eye
          size="small"
          position={{ right: '10px', top: '40px' }}
          pupilOffset={pupilPositions.right}
        />

        {/* Mouth - há rộng dần khi bánh đến gần */}
        <Mouth 
          isOpen={isHovered || mouthOpenLevel > 0.5} 
          openLevel={Math.max(mouthOpenLevel, isHovered ? 0.5 : 0)}
        />

        {/* Eating particles effect */}
        {isEating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 4) * 40}%`,
                  top: `${50 + Math.sin(i * Math.PI / 4) * 40}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Hint */}
        {!isEating && mouthOpenLevel === 0 && !isDragging && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs whitespace-nowrap animate-fade-in pointer-events-none">
            Đóiiiiiii 🍰
          </div>
        )}

        {/* Excited hint khi bánh gần */}
        {mouthOpenLevel > 0.3 && !isEating && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce pointer-events-none">
            😋
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FaceAnimal;
