// src/hooks/useTestProgress.ts
import { useState, useEffect } from 'react';
import { saveProgressToLocalStorage, loadProgressFromLocalStorage } from '../utils/localStorageHelper';

const useTestProgress = (initialStep: number) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    saveProgressToLocalStorage('testProgress', currentStep);
  }, [currentStep]);

  useEffect(() => {
    const savedStep = loadProgressFromLocalStorage('testProgress');
    if (savedStep !== null) {
      setCurrentStep(savedStep);
    }
  }, []);

  return { currentStep, setCurrentStep };
};

export default useTestProgress;
