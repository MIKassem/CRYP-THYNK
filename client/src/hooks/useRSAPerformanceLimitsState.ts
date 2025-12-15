/**
 * RSA Performance Limits Lesson State Hook
 * 
 * Manages state for the RSA Performance lesson, which teaches students
 * why RSA encryption is slow and unsuitable for bulk data.
 * 
 * Lesson Structure:
 * - Level 1: Visual timing comparison (RSA vs AES)
 * - Level 2: Explanation of why RSA is slow + hybrid encryption solution
 * - Completion: Summary and key takeaways
 */

import { useState, useCallback } from 'react';

/**
 * Lesson State Interface
 * Defines all state needed for the RSA Performance lesson
 */
export interface RSAPerformanceLimitsState {
  currentLevel: 'level1' | 'level2' | 'completion'; // Which level is active
  currentStep: number;                               // Current step within the level
  isCompleted: boolean;                              // Has lesson been completed?
  quizAnswers: Record<number, string>;               // User's quiz answers
  
  // Animation trigger states (toggle to replay animations)
  rsaTimingTriggered: boolean;      // Has user triggered RSA timing measurement?
  aesTimingTriggered: boolean;      // Has user triggered AES timing measurement?
  comparisonTriggered: boolean;     // Has user triggered speed comparison chart?
  bulkDataAnimated: boolean;        // Has user triggered bulk data animation?
}

export function useRSAPerformanceLimitsState() {
  const [state, setState] = useState<RSAPerformanceLimitsState>({
    currentLevel: 'level1',
    currentStep: 0,
    isCompleted: false,
    quizAnswers: {},
    rsaTimingTriggered: false,
    aesTimingTriggered: false,
    comparisonTriggered: false,
    bulkDataAnimated: false,
  });

  const nextStep = useCallback(() => {
    setState(prev => {
      const level1Steps = 3;
      const level2Steps = 3;
      
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
        return { ...prev, currentLevel: 'level2', currentStep: 2 };
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

  const triggerRSATiming = useCallback(() => {
    setState(prev => ({
      ...prev,
      rsaTimingTriggered: !prev.rsaTimingTriggered,
    }));
  }, []);

  const triggerAESTiming = useCallback(() => {
    setState(prev => ({
      ...prev,
      aesTimingTriggered: !prev.aesTimingTriggered,
    }));
  }, []);

  const triggerComparison = useCallback(() => {
    setState(prev => ({
      ...prev,
      comparisonTriggered: !prev.comparisonTriggered,
    }));
  }, []);

  const triggerBulkDataAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      bulkDataAnimated: !prev.bulkDataAnimated,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentLevel: 'level1',
      currentStep: 0,
      isCompleted: false,
      quizAnswers: {},
      rsaTimingTriggered: false,
      aesTimingTriggered: false,
      comparisonTriggered: false,
      bulkDataAnimated: false,
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
    triggerRSATiming,
    triggerAESTiming,
    triggerComparison,
    triggerBulkDataAnimation,
    reset,
    completeLesson,
  };
}
