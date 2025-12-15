import { useState } from 'react';

export interface PasswordAuthWeaknessesState {
  // Level 1: Understanding Password Authentication (3 steps)
  currentLevel: 1 | 2 | 'completion';
  currentStep: number;
  
  // Level 1 animations
  naiveProtocolAnimated: boolean;
  eavesdropperAnimated: boolean;
  offlineDictionaryAnimated: boolean;
  
  // Level 2 animations
  challengeResponseAnimated: boolean;
  secureComparisonAnimated: boolean;
  interactiveDemoAnimated: boolean;
  
  // Interactive state
  selectedPassword: string;
  dictionaryAttackRunning: boolean;
  dictionaryProgress: number;
  dictionaryFound: boolean;
  crackedPassword: string;
  
  // Quiz answers
  quizAnswers: Record<number, string>;
}

export function usePasswordAuthWeaknessesState() {
  const [state, setState] = useState<PasswordAuthWeaknessesState>({
    currentLevel: 1,
    currentStep: 0,
    naiveProtocolAnimated: false,
    eavesdropperAnimated: false,
    offlineDictionaryAnimated: false,
    challengeResponseAnimated: false,
    secureComparisonAnimated: false,
    interactiveDemoAnimated: false,
    selectedPassword: 'password123',
    dictionaryAttackRunning: false,
    dictionaryProgress: 0,
    dictionaryFound: false,
    crackedPassword: '',
    quizAnswers: {},
  });

  const nextStep = () => {
    if (state.currentLevel === 1 && state.currentStep < 2) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else if (state.currentLevel === 1 && state.currentStep === 2) {
      setState(prev => ({ ...prev, currentLevel: 2, currentStep: 0 }));
    } else if (state.currentLevel === 2 && state.currentStep < 2) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else if (state.currentLevel === 2 && state.currentStep === 2) {
      setState(prev => ({ ...prev, currentLevel: 'completion' }));
    }
  };

  const previousStep = () => {
    if (state.currentStep > 0) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    } else if (state.currentLevel === 2) {
      setState(prev => ({ ...prev, currentLevel: 1, currentStep: 2 }));
    }
  };

  const triggerNaiveProtocol = () => {
    setState(prev => ({ ...prev, naiveProtocolAnimated: !prev.naiveProtocolAnimated }));
  };

  const triggerEavesdropper = () => {
    setState(prev => ({ ...prev, eavesdropperAnimated: !prev.eavesdropperAnimated }));
  };

  const triggerOfflineDictionary = () => {
    setState(prev => ({ ...prev, offlineDictionaryAnimated: !prev.offlineDictionaryAnimated }));
  };

  const triggerChallengeResponse = () => {
    setState(prev => ({ ...prev, challengeResponseAnimated: !prev.challengeResponseAnimated }));
  };

  const triggerSecureComparison = () => {
    setState(prev => ({ ...prev, secureComparisonAnimated: !prev.secureComparisonAnimated }));
  };

  const triggerInteractiveDemo = () => {
    setState(prev => ({ ...prev, interactiveDemoAnimated: !prev.interactiveDemoAnimated }));
  };

  const setSelectedPassword = (password: string) => {
    setState(prev => ({ ...prev, selectedPassword: password, dictionaryFound: false, crackedPassword: '', dictionaryProgress: 0 }));
  };

  const startDictionaryAttack = () => {
    setState(prev => ({ ...prev, dictionaryAttackRunning: true, dictionaryProgress: 0, dictionaryFound: false, crackedPassword: '' }));
    
    // Simulate dictionary attack progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setState(prev => ({ ...prev, dictionaryProgress: progress }));
      
      if (progress >= 100) {
        clearInterval(interval);
        setState(prev => ({
          ...prev,
          dictionaryAttackRunning: false,
          dictionaryFound: true,
          crackedPassword: prev.selectedPassword,
        }));
      }
    }, 200);
  };

  const setQuizAnswer = (questionId: number, answer: string) => {
    setState(prev => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: answer },
    }));
  };

  const resetLesson = () => {
    setState({
      currentLevel: 1,
      currentStep: 0,
      naiveProtocolAnimated: false,
      eavesdropperAnimated: false,
      offlineDictionaryAnimated: false,
      challengeResponseAnimated: false,
      secureComparisonAnimated: false,
      interactiveDemoAnimated: false,
      selectedPassword: 'password123',
      dictionaryAttackRunning: false,
      dictionaryProgress: 0,
      dictionaryFound: false,
      crackedPassword: '',
      quizAnswers: {},
    });
  };

  return {
    ...state,
    nextStep,
    previousStep,
    triggerNaiveProtocol,
    triggerEavesdropper,
    triggerOfflineDictionary,
    triggerChallengeResponse,
    triggerSecureComparison,
    triggerInteractiveDemo,
    setSelectedPassword,
    startDictionaryAttack,
    setQuizAnswer,
    resetLesson,
  };
}
