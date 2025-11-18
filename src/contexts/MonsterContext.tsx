import { createContext, useContext, useState, useCallback, useRef, useMemo, useEffect, type ReactNode } from 'react';

interface MonsterPosition {
  x: number;
  y: number;
}

interface MonsterContextType {
  monsterPosition: MonsterPosition;
  updateMonsterPosition: (x: number, y: number) => void;
  distanceToMonster: number;
  setDistanceToMonster: (distance: number) => void;
  isMonsterEating: boolean;
  setIsMonsterEating: (isEating: boolean) => void;
  isDraggingFood: boolean;
  setIsDraggingFood: (isDragging: boolean) => void;
}

const MonsterContext = createContext<MonsterContextType | undefined>(undefined);

export const MonsterProvider = ({ children }: { children: ReactNode }) => {
  const [monsterPosition, setMonsterPosition] = useState<MonsterPosition>({ x: 0, y: 0 });
  const [distanceToMonster, setDistanceToMonster] = useState(1000);
  const [isMonsterEating, setIsMonsterEating] = useState(false);
  const [isDraggingFood, setIsDraggingFood] = useState(false);
  
  // Use ref để tránh re-render khi update position
  const positionRef = useRef<MonsterPosition>({ x: 0, y: 0 });
  const updateTimeoutRef = useRef<number | null>(null);

  const updateMonsterPosition = useCallback((x: number, y: number) => {
    // Update ref ngay lập tức (không re-render)
    positionRef.current = { x, y };
    
    // Throttle state update để giảm re-renders
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = window.setTimeout(() => {
      setMonsterPosition({ x, y });
      updateTimeoutRef.current = null;
    }, 100); // Update state mỗi 100ms thay vì mỗi 50ms
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      monsterPosition,
      updateMonsterPosition,
      distanceToMonster,
      setDistanceToMonster,
      isMonsterEating,
      setIsMonsterEating,
      isDraggingFood,
      setIsDraggingFood,
    }),
    [monsterPosition, distanceToMonster, isMonsterEating, isDraggingFood, updateMonsterPosition]
  );

  return (
    <MonsterContext.Provider value={contextValue}>
      {children}
    </MonsterContext.Provider>
  );
};

export const useMonster = () => {
  const context = useContext(MonsterContext);
  if (!context) {
    throw new Error('useMonster must be used within MonsterProvider');
  }
  return context;
};

