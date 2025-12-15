import { useState, useCallback } from 'react';

export interface NonceAuthLessonState {
  currentLevel: 'level1' | 'level2' | 'completion';
  currentStep: number;
  isCompleted: boolean;
  quizAnswers: Record<number, string>;
  challengeResponseAnimated: boolean;
  replayAttackAnimated: boolean;
  nonceDefenseAnimated: boolean;
  freshnessDemoAnimated: boolean;
}

export function useNonceAuthLessonState() {
  const [state, setState] = useState<NonceAuthLessonState>({
    currentLevel: 'level1',
    currentStep: 0,
    isCompleted: false,
    quizAnswers: {},
    challengeResponseAnimated: false,
    replayAttackAnimated: false,
    nonceDefenseAnimated: false,
    freshnessDemoAnimated: false,
  });

  const nextStep = useCallback(() => {
    setState(prev => {
      const level1Steps = 3; // Intro, Challenge-Response, Why Nonces
      const level2Steps = 4; // Replay Attack, Nonce Defense, Freshness, Quiz
      
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

  const triggerChallengeResponse = useCallback(() => {
    setState(prev => ({
      ...prev,
      challengeResponseAnimated: !prev.challengeResponseAnimated,
    }));
  }, []);

  const triggerReplayAttack = useCallback(() => {
    setState(prev => ({
      ...prev,
      replayAttackAnimated: !prev.replayAttackAnimated,
    }));
  }, []);

  const triggerNonceDefense = useCallback(() => {
    setState(prev => ({
      ...prev,
      nonceDefenseAnimated: !prev.nonceDefenseAnimated,
    }));
  }, []);

  const triggerFreshnessDemo = useCallback(() => {
    setState(prev => ({
      ...prev,
      freshnessDemoAnimated: !prev.freshnessDemoAnimated,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentLevel: 'level1',
      currentStep: 0,
      isCompleted: false,
      quizAnswers: {},
      challengeResponseAnimated: false,
      replayAttackAnimated: false,
      nonceDefenseAnimated: false,
      freshnessDemoAnimated: false,
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
    triggerChallengeResponse,
    triggerReplayAttack,
    triggerNonceDefense,
    triggerFreshnessDemo,
    reset,
    completeLesson,
  };
}
