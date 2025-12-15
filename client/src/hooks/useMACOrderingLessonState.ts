import { useState, useCallback } from 'react';

export interface MACOrderingLessonState {
  currentLevel: 'level1' | 'level2' | 'completion';
  currentStep: number;
  isCompleted: boolean;
  quizAnswers: Record<number, string>;
  encryptThenMacAnimated: boolean;
  macThenEncryptAnimated: boolean;
  encryptAndMacAnimated: boolean;
  paddingOracleAttackAnimated: boolean;
  bestPracticeAnimated: boolean;
}

export function useMACOrderingLessonState() {
  const [state, setState] = useState<MACOrderingLessonState>({
    currentLevel: 'level1',
    currentStep: 0,
    isCompleted: false,
    quizAnswers: {},
    encryptThenMacAnimated: false,
    macThenEncryptAnimated: false,
    encryptAndMacAnimated: false,
    paddingOracleAttackAnimated: false,
    bestPracticeAnimated: false,
  });

  const nextStep = useCallback(() => {
    setState(prev => {
      const level1Steps = 4; // Intro, 3 ordering schemes
      const level2Steps = 4; // Attacks on wrong ordering, best practices
      
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
        return { ...prev, currentLevel: 'level1', currentStep: 3 };
      } else if (prev.currentLevel === 'completion') {
        return { ...prev, currentLevel: 'level2', currentStep: 3 };
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

  const triggerEncryptThenMac = useCallback(() => {
    setState(prev => ({
      ...prev,
      encryptThenMacAnimated: !prev.encryptThenMacAnimated,
    }));
  }, []);

  const triggerMacThenEncrypt = useCallback(() => {
    setState(prev => ({
      ...prev,
      macThenEncryptAnimated: !prev.macThenEncryptAnimated,
    }));
  }, []);

  const triggerEncryptAndMac = useCallback(() => {
    setState(prev => ({
      ...prev,
      encryptAndMacAnimated: !prev.encryptAndMacAnimated,
    }));
  }, []);

  const triggerPaddingOracleAttack = useCallback(() => {
    setState(prev => ({
      ...prev,
      paddingOracleAttackAnimated: !prev.paddingOracleAttackAnimated,
    }));
  }, []);

  const triggerBestPractice = useCallback(() => {
    setState(prev => ({
      ...prev,
      bestPracticeAnimated: !prev.bestPracticeAnimated,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentLevel: 'level1',
      currentStep: 0,
      isCompleted: false,
      quizAnswers: {},
      encryptThenMacAnimated: false,
      macThenEncryptAnimated: false,
      encryptAndMacAnimated: false,
      paddingOracleAttackAnimated: false,
      bestPracticeAnimated: false,
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
    triggerEncryptThenMac,
    triggerMacThenEncrypt,
    triggerEncryptAndMac,
    triggerPaddingOracleAttack,
    triggerBestPractice,
    reset,
    completeLesson,
  };
}
