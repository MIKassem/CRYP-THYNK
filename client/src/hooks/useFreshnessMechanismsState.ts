import { useState } from 'react';

interface FreshnessMechanismsState {
  // Level 1 state (3 steps)
  currentLevel1Step: number;
  timestampDemo: boolean;
  nonceDemo: boolean;
  sequenceDemo: boolean;

  // Level 2 state (4 steps)
  currentLevel2Step: number;
  timestampReplayAttack: boolean;
  nonceReplayAttack: boolean;
  sequenceReplayAttack: boolean;
  comparisonView: boolean;

  // Quiz state
  quizAnswers: Record<number, string>;
}

export function useFreshnessMechanismsState() {
  const [state, setState] = useState<FreshnessMechanismsState>({
    currentLevel1Step: 0,
    timestampDemo: false,
    nonceDemo: false,
    sequenceDemo: false,

    currentLevel2Step: 0,
    timestampReplayAttack: false,
    nonceReplayAttack: false,
    sequenceReplayAttack: false,
    comparisonView: false,

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
    if (state.currentLevel2Step < 3) {
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
  const triggerTimestampDemo = () => {
    setState(prev => ({ ...prev, timestampDemo: !prev.timestampDemo }));
  };

  const triggerNonceDemo = () => {
    setState(prev => ({ ...prev, nonceDemo: !prev.nonceDemo }));
  };

  const triggerSequenceDemo = () => {
    setState(prev => ({ ...prev, sequenceDemo: !prev.sequenceDemo }));
  };

  const triggerTimestampReplayAttack = () => {
    setState(prev => ({ ...prev, timestampReplayAttack: !prev.timestampReplayAttack }));
  };

  const triggerNonceReplayAttack = () => {
    setState(prev => ({ ...prev, nonceReplayAttack: !prev.nonceReplayAttack }));
  };

  const triggerSequenceReplayAttack = () => {
    setState(prev => ({ ...prev, sequenceReplayAttack: !prev.sequenceReplayAttack }));
  };

  const triggerComparisonView = () => {
    setState(prev => ({ ...prev, comparisonView: !prev.comparisonView }));
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
    triggerTimestampDemo,
    triggerNonceDemo,
    triggerSequenceDemo,
    triggerTimestampReplayAttack,
    triggerNonceReplayAttack,
    triggerSequenceReplayAttack,
    triggerComparisonView,
    handleQuizAnswer,
  };
}
