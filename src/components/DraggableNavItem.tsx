import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface DraggableNavItemProps {
  itemId: string;
  to: string;
  children: React.ReactNode;
  onPositionChange: (x: number, y: number) => void;
  onDragStart: () => void;
  onDragEnd: (shouldNavigate: boolean) => void;
  onInitialPosition?: (itemId: string, x: number, y: number) => void;
  shouldReset?: boolean;
  className?: string;
}

const DraggableNavItem = ({
  itemId,
  to,
  children,
  onPositionChange,
  onDragStart,
  onDragEnd,
  onInitialPosition,
  shouldReset = false,
  className = '',
}: DraggableNavItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [initialPos, setInitialPos] = useState<{ x: number; y: number } | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Motion values for smooth reset animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Lưu vị trí ban đầu khi mount
  useEffect(() => {
    if (itemRef.current && !initialPos) {
      const rect = itemRef.current.getBoundingClientRect();
      const pos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      setInitialPos(pos);
      onInitialPosition?.(itemId, pos.x, pos.y);
    }
  }, [itemId, initialPos, onInitialPosition]);

  // Reset về vị trí ban đầu khi shouldReset = true
  useEffect(() => {
    if (shouldReset && itemRef.current) {
      // Disable drag temporarily
      setIsDragging(false);
      setHasMoved(false);
      
      // Animate về vị trí ban đầu (0, 0) với spring animation
      x.set(0);
      y.set(0);
    }
  }, [shouldReset, x, y]);

  const dragRafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  const handleDrag = () => {
    if (!itemRef.current) return;

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
      if (!itemRef.current) return;
      
      const rect = itemRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      onPositionChange(centerX, centerY);
      setHasMoved(true);
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Nếu đã drag thì không navigate
    if (hasMoved) {
      return;
    }
    
    // Không drag → navigate bình thường (fallback UX)
    navigate(to);
  };

  return (
    <motion.div
      ref={itemRef}
      drag={!shouldReset}
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20, power: 0 }}
      style={{ x, y }}
      animate={shouldReset ? { x: 0, y: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onDragStart={() => {
        setIsDragging(true);
        setHasMoved(false);
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
        onDragEnd(hasMoved);
        setTimeout(() => setHasMoved(false), 300);
      }}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      className={`relative inline-block hover:font-bold  ${isDragging ? 'cursor-grabbing' : 'cursor-grab '}`}
    >
      {/* Cake icon khi drag */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -right-8 -top-2 pointer-events-none"
        >
          <img
            src="/birthday-cake.gif"
            alt="cake"
            className="w-8 h-8 object-contain drop-shadow-lg"
          />
        </motion.div>
      )}

      {/* Nav item content */}
      <div onClick={handleClick} className={className}>
        {children}
      </div>

      {/* Glow effect khi drag */}
      {isDragging && (
        <motion.div
          className="absolute inset-0 bg-orange-400/30 rounded-full blur-lg -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
};

export default DraggableNavItem;

