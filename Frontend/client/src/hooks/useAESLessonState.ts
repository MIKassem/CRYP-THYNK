import { useState, useCallback } from 'react';

export interface AESLessonState {
  currentLevel: 'level1' | 'level2' | 'completion';
  currentStep: number;
  isCompleted: boolean;
  quizAnswers: Record<number, string>;
  encryptionAnimationTriggered: boolean;
  decryptionTriggered: boolean;
  subBytesAnimated: boolean;
  shiftRowsAnimated: boolean;
  mixColumnsAnimated: boolean;
}

export function useAESLessonState() {
  const [state, setState] = useState<AESLessonState>({
    currentLevel: 'level1',
    currentStep: 0,
    isCompleted: false,
    quizAnswers: {},
    encryptionAnimationTriggered: false,
    decryptionTriggered: false,
    subBytesAnimated: false,
    shiftRowsAnimated: false,
    mixColumnsAnimated: false,
  });

  const nextStep = useCallback(() => {
    setState(prev => {
      const level1Steps = 3;
      const level2Steps = 8; // 8 steps in Level 2 (0-7)
      
      if (prev.currentLevel === 'level1') {
        if (prev.currentStep < level1Steps - 1) {
          return { ...prev, currentStep: prev.currentStep + 1 };
        } else {
          return { ...prev, currentLevel: 'level2', currentStep: 0 };
        }
      } else if (prev.currentLevel === 'level2') {
        if (prev.currentStep < level2Steps - 1) {
          return { ...prev, currentStep: prev.currentStep + 1 };
        } else {
          return { ...prev, currentLevel: 'completion', currentStep: 0 };
        }
      } else {
        // Already at completion, stay there
        return prev;
      }
    });
  }, []);

  const previousStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep > 0) {
        return { ...prev, currentStep: prev.currentStep - 1 };
      } else if (prev.currentLevel === 'level2') {
        return { ...prev, currentLevel: 'level1', currentStep: 2 };
      } else if (prev.currentLevel === 'completion') {
        return { ...prev, currentLevel: 'level2', currentStep: 7 };
      }
      return prev;
    });
  }, []);

  const goToLevel = useCallback((level: 'level1' | 'level2' | 'completion', step: number = 0) => {
    setState(prev => ({
      ...prev,
      currentLevel: level,
      currentStep: step,
    }));
  }, []);

  const setQuizAnswer = useCallback((questionId: number, answer: string) => {
    setState(prev => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: answer },
    }));
  }, []);

  const triggerEncryptionAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      encryptionAnimationTriggered: !prev.encryptionAnimationTriggered,
    }));
  }, []);

  const triggerDecryption = useCallback(() => {
    setState(prev => ({
      ...prev,
      decryptionTriggered: !prev.decryptionTriggered,
    }));
  }, []);

  const triggerSubBytesAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      subBytesAnimated: !prev.subBytesAnimated,
    }));
  }, []);

  const triggerShiftRowsAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      shiftRowsAnimated: !prev.shiftRowsAnimated,
    }));
  }, []);

  const triggerMixColumnsAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      mixColumnsAnimated: !prev.mixColumnsAnimated,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentLevel: 'level1',
      currentStep: 0,
      isCompleted: false,
      quizAnswers: {},
      encryptionAnimationTriggered: false,
      decryptionTriggered: false,
      subBytesAnimated: false,
      shiftRowsAnimated: false,
      mixColumnsAnimated: false,
    });
  }, []);

  const completeLesson = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCompleted: true,
    }));
  }, []);

  return {
    state,
    nextStep,
    previousStep,
    goToLevel,
    setQuizAnswer,
    triggerEncryptionAnimation,
    triggerDecryption,
    triggerSubBytesAnimation,
    triggerShiftRowsAnimation,
    triggerMixColumnsAnimation,
    reset,
    completeLesson,
  };
}
