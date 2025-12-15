import { useState, useCallback } from 'react';

export interface HMACLessonState {
  currentLevel: 'level1' | 'level2' | 'completion';
  currentStep: number;
  isCompleted: boolean;
  quizAnswers: Record<number, string>;
  keyNormalizationTriggered: boolean;
  ipadAnimationTriggered: boolean;
  opadAnimationTriggered: boolean;
  hmacComputationTriggered: boolean;
}

export function useHMACLessonState() {
  const [state, setState] = useState<HMACLessonState>({
    currentLevel: 'level1',
    currentStep: 0,
    isCompleted: false,
    quizAnswers: {},
    keyNormalizationTriggered: false,
    ipadAnimationTriggered: false,
    opadAnimationTriggered: false,
    hmacComputationTriggered: false,
  });

  const nextStep = useCallback(() => {
    setState(prev => {
      const level1Steps = 3; // Intro, Key Normalization, Why HMAC
      const level2Steps = 6; // ipad/opad, Step 1-4, Quiz
      
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
        return { ...prev, currentLevel: 'level2', currentStep: 5 };
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

  const triggerKeyNormalization = useCallback(() => {
    setState(prev => ({
      ...prev,
      keyNormalizationTriggered: !prev.keyNormalizationTriggered,
    }));
  }, []);

  const triggerIpadAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      ipadAnimationTriggered: !prev.ipadAnimationTriggered,
    }));
  }, []);

  const triggerOpadAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      opadAnimationTriggered: !prev.opadAnimationTriggered,
    }));
  }, []);

  const triggerHMACComputation = useCallback(() => {
    setState(prev => ({
      ...prev,
      hmacComputationTriggered: !prev.hmacComputationTriggered,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentLevel: 'level1',
      currentStep: 0,
      isCompleted: false,
      quizAnswers: {},
      keyNormalizationTriggered: false,
      ipadAnimationTriggered: false,
      opadAnimationTriggered: false,
      hmacComputationTriggered: false,
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
    triggerKeyNormalization,
    triggerIpadAnimation,
    triggerOpadAnimation,
    triggerHMACComputation,
    reset,
    completeLesson,
  };
}
