import { useState, useEffect } from 'react';

const TUTORIAL_KEY = 'hppd_tutorial_shown';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if tutorial has been shown
    const hasShown = localStorage.getItem(TUTORIAL_KEY);
    if (!hasShown) {
      setShowTutorial(true);
    }
  }, []);

  const hideTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem(TUTORIAL_KEY, 'true');
  };

  return {
    showTutorial,
    hideTutorial,
  };
};

