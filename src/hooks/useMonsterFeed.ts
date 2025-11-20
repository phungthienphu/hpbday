import { useCallback, useRef, useEffect } from 'react';
import { useMonster } from '../contexts/MonsterContext';

interface NavItem {
  id: string;
  position: { x: number; y: number };
  isDragging: boolean;
}

export const useMonsterFeed = () => {
  const { monsterPosition, setDistanceToMonster, setIsMonsterEating } = useMonster();
  const navItemsRef = useRef<Map<string, NavItem>>(new Map());
  const feedingCallbackRef = useRef<((itemId: string) => void) | null>(null);
  
  // Refs để tránh stale closures và optimize
  const monsterPosRef = useRef(monsterPosition);
  const distanceTimeoutRef = useRef<number | null>(null);
  
  // Sync ref với state
  useEffect(() => {
    monsterPosRef.current = monsterPosition;
  }, [monsterPosition]);

  // Update nav item position - throttled
  const updateNavItemPosition = useCallback(
    (id: string, x: number, y: number) => {
      const newMap = new Map(navItemsRef.current);
      const item = newMap.get(id);
      if (item) {
        newMap.set(id, { ...item, position: { x, y } });

        // Calculate distance if dragging - throttle để tránh quá nhiều calculations
        if (item.isDragging) {
          // Clear previous timeout
          if (distanceTimeoutRef.current) {
            clearTimeout(distanceTimeoutRef.current);
          }
          
          // Throttle distance calculation
          distanceTimeoutRef.current = window.setTimeout(() => {
            const currentMonsterPos = monsterPosRef.current;
            const distance = Math.sqrt(
              Math.pow(x - currentMonsterPos.x, 2) + Math.pow(y - currentMonsterPos.y, 2)
            );
            setDistanceToMonster(distance);
          }, 16); // ~60fps
        }
      } else {
        // Register new item
        newMap.set(id, { id, position: { x, y }, isDragging: false });
      }

      navItemsRef.current = newMap;
    },
    
    [setDistanceToMonster]
  );

  // Trigger feeding animation - define trước để dùng trong endDragging
  const triggerFeeding = useCallback(
    (itemId: string) => {
      setIsMonsterEating(true);

      // Execute callback after eating
      setTimeout(() => {
        setIsMonsterEating(false);
        if (feedingCallbackRef.current) {
          feedingCallbackRef.current(itemId);
        }
      }, 500);
    },
    [setIsMonsterEating]
  );

  // Start dragging nav item
  const startDragging = useCallback((id: string) => {
    const newMap = new Map(navItemsRef.current);
    const item = newMap.get(id);
    if (item) {
      newMap.set(id, { ...item, isDragging: true });
    } else {
      // Register if not exists
      newMap.set(id, { id, position: { x: 0, y: 0 }, isDragging: true });
    }
    navItemsRef.current = newMap;
  }, []);

  // End dragging nav item
  const endDragging = useCallback(
    (id: string, shouldCheckFeed: boolean) => {
      // Clear distance timeout
      if (distanceTimeoutRef.current) {
        clearTimeout(distanceTimeoutRef.current);
        distanceTimeoutRef.current = null;
      }

      const newMap = new Map(navItemsRef.current);
      const item = newMap.get(id);
      if (item) {
        newMap.set(id, { ...item, isDragging: false });
        
        // Check if should feed - use current ref values để tránh stale closure
        if (shouldCheckFeed) {
          const currentMonsterPos = monsterPosRef.current;
          const distance = Math.sqrt(
            Math.pow(item.position.x - currentMonsterPos.x, 2) +
              Math.pow(item.position.y - currentMonsterPos.y, 2)
          );

          if (distance < 80) {
            // Use setTimeout để tránh state update trong render
            setTimeout(() => {
              triggerFeeding(id);
            }, 0);
          }
        }
      }
      navItemsRef.current = newMap;

      // Reset distance
      setTimeout(() => setDistanceToMonster(1000), 300);
    },
    [setDistanceToMonster, triggerFeeding]
  );

  // Set callback for when monster finishes eating
  const onFeedingComplete = useCallback((callback: (itemId: string) => void) => {
    feedingCallbackRef.current = callback;
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (distanceTimeoutRef.current) {
        clearTimeout(distanceTimeoutRef.current);
      }
    };
  }, []);

  return {
    updateNavItemPosition,
    startDragging,
    endDragging,
    onFeedingComplete,
  };
};
