import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CakeProps {
  onPositionChange: (x: number, y: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  isBeingEaten: boolean;
}

const Cake = ({ onPositionChange, onDragStart, onDragEnd, isBeingEaten }: CakeProps) => {
  const cakeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  const handleDrag = () => {
    if (!cakeRef.current) return;
    
    // Throttle position updates với requestAnimationFrame
    const now = performance.now();
    if (now - lastUpdateRef.current < 16) { // ~60fps
      return;
    }
    lastUpdateRef.current = now;

    if (dragRafRef.current) {
      cancelAnimationFrame(dragRafRef.current);
    }

    dragRafRef.current = requestAnimationFrame(() => {
      if (!cakeRef.current) return;
      
      const rect = cakeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      onPositionChange(centerX, centerY);
    });
  };

  if (isBeingEaten) return null;

  return (
    <motion.div
      ref={cakeRef}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        setIsDragging(true);
        onDragStart();
      }}
      onDrag={handleDrag}
      onDragEnd={() => {
        // Cleanup RAF
        if (dragRafRef.current) {
          cancelAnimationFrame(dragRafRef.current);
          dragRafRef.current = null;
        }
        
        setIsDragging(false);
        onDragEnd();
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileDrag={{ scale: 1.2, rotate: 10 }}
      className="fixed cursor-grab active:cursor-grabbing"
      initial={{
        left: '20%',
        top: '70%',
        x: '-50%',
        y: '-50%',
      }}
      style={{
        zIndex: isDragging ? 60 : 40,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div className="relative">
        {/* Cake Image */}
        <img
          src="/birthday-cake.gif"
          alt="Birthday Cake"
          className="w-28 h-28 object-contain drop-shadow-2xl pointer-events-none select-none"
          draggable={false}
        />
        
        {/* Glow effect khi drag */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 via-yellow-400/30 to-pink-400/30 rounded-full blur-xl -z-10"
          animate={isDragging ? {
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          } : {}}
          transition={{
            duration: 0.8,
            repeat: isDragging ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Sparkle particles khi drag */}
        {isDragging && (
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 5) * 40,
                  y: Math.sin((i * Math.PI * 2) / 5) * 40,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cake;
