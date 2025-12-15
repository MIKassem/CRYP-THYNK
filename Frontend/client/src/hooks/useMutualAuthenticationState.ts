import { useState } from 'react';

interface MutualAuthenticationState {
  // Level 1 state (3 steps)
  currentLevel1Step: number;
  clientOnlyAuthDemo: boolean;
  mutualAuthDemo: boolean;
  comparisonView: boolean;

  // Level 2 state (3 steps)
  currentLevel2Step: number;
  mitmWithoutMutualAuth: boolean;
  mitmWithMutualAuth: boolean;
  interactiveDemo: boolean;
  mutualAuthEnabled: boolean;

  // Quiz state
  quizAnswers: Record<number, string>;
}

export function useMutualAuthenticationState() {
  const [state, setState] = useState<MutualAuthenticationState>({
    currentLevel1Step: 0,
    clientOnlyAuthDemo: false,
    mutualAuthDemo: false,
    comparisonView: false,

    currentLevel2Step: 0,
    mitmWithoutMutualAuth: false,
    mitmWithMutualAuth: false,
    interactiveDemo: false,
    mutualAuthEnabled: false,

    quizAnswers: {},
  });

  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 'completion'>(1);

  // Level 1 navigation
  const goToNextLevel1Step = () => {
    if (state.currentLevel1Step < 2) {
      setState(prev => ({ ...prev, currentLevel1Step: prev.currentLevel1Step + 1 }));
    } else {
      setCurrentLevel(2);
      setState(prev => ({ ...prev, currentLevel2Step: 0 }));
    }
  };

  const goToPreviousLevel1Step = () => {
    setState(prev => ({ ...prev, currentLevel1Step: Math.max(0, prev.currentLevel1Step - 1) }));
  };

  // Level 2 navigation
  const goToNextLevel2Step = () => {
    if (state.currentLevel2Step < 2) {
      setState(prev => ({ ...prev, currentLevel2Step: prev.currentLevel2Step + 1 }));
    } else {
      setCurrentLevel('completion');
    }
  };

  const goToPreviousLevel2Step = () => {
    if (state.currentLevel2Step === 0) {
      setCurrentLevel(1);
      setState(prev => ({ ...prev, currentLevel1Step: 2 }));
    } else {
      setState(prev => ({ ...prev, currentLevel2Step: Math.max(0, prev.currentLevel2Step - 1) }));
    }
  };

  // Animation triggers
  const triggerClientOnlyAuthDemo = () => {
    setState(prev => ({ ...prev, clientOnlyAuthDemo: !prev.clientOnlyAuthDemo }));
  };

  const triggerMutualAuthDemo = () => {
    setState(prev => ({ ...prev, mutualAuthDemo: !prev.mutualAuthDemo }));
  };

  const triggerComparisonView = () => {
    setState(prev => ({ ...prev, comparisonView: !prev.comparisonView }));
  };

  const triggerMitmWithoutMutualAuth = () => {
    setState(prev => ({ ...prev, mitmWithoutMutualAuth: !prev.mitmWithoutMutualAuth }));
  };

  const triggerMitmWithMutualAuth = () => {
    setState(prev => ({ ...prev, mitmWithMutualAuth: !prev.mitmWithMutualAuth }));
  };

  const triggerInteractiveDemo = () => {
    setState(prev => ({ ...prev, interactiveDemo: !prev.interactiveDemo }));
  };

  const toggleMutualAuth = () => {
    setState(prev => ({ ...prev, mutualAuthEnabled: !prev.mutualAuthEnabled }));
  };

  // Quiz handling
  const handleQuizAnswer = (questionId: number, answer: string) => {
    setState(prev => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: answer },
    }));
  };

  return {
    currentLevel,
    ...state,
    goToNextLevel1Step,
    goToPreviousLevel1Step,
    goToNextLevel2Step,
    goToPreviousLevel2Step,
    triggerClientOnlyAuthDemo,
    triggerMutualAuthDemo,
    triggerComparisonView,
    triggerMitmWithoutMutualAuth,
    triggerMitmWithMutualAuth,
    triggerInteractiveDemo,
    toggleMutualAuth,
    handleQuizAnswer,
  };
}
