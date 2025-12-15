import { useState } from 'react';

export interface RSAKeyGenerationState {
  // Level 1: Prime Selection & Key Generation (3 steps)
  currentLevel: 1 | 2 | 'completion';
  currentStep: number;
  
  // Level 1 animations
  primeSelectionAnimated: boolean;
  computeNAnimated: boolean;
  computePhiAnimated: boolean;
  
  // Level 2 animations
  selectEAnimated: boolean;
  computeDAnimated: boolean;
  encryptDecryptAnimated: boolean;
  
  // RSA parameters
  primeP: number;
  primeQ: number;
  modulusN: number;
  phiN: number;
  publicExponentE: number;
  privateExponentD: number;
  
  // Interactive state
  customPrimeP: number;
  customPrimeQ: number;
  selectedMessage: number;
  encryptedMessage: number;
  decryptedMessage: number;
  
  // Quiz answers
  quizAnswers: Record<number, string>;
}

export function useRSAKeyGenerationState() {
  const [state, setState] = useState<RSAKeyGenerationState>({
    currentLevel: 1,
    currentStep: 0,
    primeSelectionAnimated: false,
    computeNAnimated: false,
    computePhiAnimated: false,
    selectEAnimated: false,
    computeDAnimated: false,
    encryptDecryptAnimated: false,
    primeP: 7,
    primeQ: 11,
    modulusN: 77,
    phiN: 60,
    publicExponentE: 7,
    privateExponentD: 43,
    customPrimeP: 7,
    customPrimeQ: 11,
    selectedMessage: 5,
    encryptedMessage: 0,
    decryptedMessage: 0,
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

  const triggerPrimeSelection = () => {
    setState(prev => ({ ...prev, primeSelectionAnimated: !prev.primeSelectionAnimated }));
  };

  const triggerComputeN = () => {
    setState(prev => ({ ...prev, computeNAnimated: !prev.computeNAnimated }));
  };

  const triggerComputePhi = () => {
    setState(prev => ({ ...prev, computePhiAnimated: !prev.computePhiAnimated }));
  };

  const triggerSelectE = () => {
    setState(prev => ({ ...prev, selectEAnimated: !prev.selectEAnimated }));
  };

  const triggerComputeD = () => {
    setState(prev => ({ ...prev, computeDAnimated: !prev.computeDAnimated }));
  };

  const triggerEncryptDecrypt = () => {
    setState(prev => ({ ...prev, encryptDecryptAnimated: !prev.encryptDecryptAnimated }));
  };

  // Helper function to check if a number is prime
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Helper function to compute GCD
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // Helper function to compute modular inverse using Extended Euclidean Algorithm
  const modInverse = (e: number, phi: number): number => {
    let [old_r, r] = [phi, e];
    let [old_s, s] = [0, 1];
    
    while (r !== 0) {
      const quotient = Math.floor(old_r / r);
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
    }
    
    return old_s < 0 ? old_s + phi : old_s;
  };

  // Helper function for modular exponentiation
  const modPow = (base: number, exp: number, mod: number): number => {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  };

  const setCustomPrimes = (p: number, q: number) => {
    if (!isPrime(p) || !isPrime(q)) {
      return; // Only accept prime numbers
    }
    
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    
    // Find suitable e (commonly 3, 5, 7, 17, 65537)
    let e = 3;
    const candidates = [3, 5, 7, 17, 65537];
    for (const candidate of candidates) {
      if (candidate < phi && gcd(candidate, phi) === 1) {
        e = candidate;
        break;
      }
    }
    
    // Compute d
    const d = modInverse(e, phi);
    
    setState(prev => ({
      ...prev,
      customPrimeP: p,
      customPrimeQ: q,
      primeP: p,
      primeQ: q,
      modulusN: n,
      phiN: phi,
      publicExponentE: e,
      privateExponentD: d,
    }));
  };

  const encryptMessage = (message: number) => {
    if (message >= state.modulusN) {
      return; // Message must be less than n
    }
    
    const encrypted = modPow(message, state.publicExponentE, state.modulusN);
    setState(prev => ({
      ...prev,
      selectedMessage: message,
      encryptedMessage: encrypted,
    }));
  };

  const decryptMessage = () => {
    const decrypted = modPow(state.encryptedMessage, state.privateExponentD, state.modulusN);
    setState(prev => ({
      ...prev,
      decryptedMessage: decrypted,
    }));
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
      primeSelectionAnimated: false,
      computeNAnimated: false,
      computePhiAnimated: false,
      selectEAnimated: false,
      computeDAnimated: false,
      encryptDecryptAnimated: false,
      primeP: 7,
      primeQ: 11,
      modulusN: 77,
      phiN: 60,
      publicExponentE: 7,
      privateExponentD: 43,
      customPrimeP: 7,
      customPrimeQ: 11,
      selectedMessage: 5,
      encryptedMessage: 0,
      decryptedMessage: 0,
      quizAnswers: {},
    });
  };

  return {
    ...state,
    nextStep,
    previousStep,
    triggerPrimeSelection,
    triggerComputeN,
    triggerComputePhi,
    triggerSelectE,
    triggerComputeD,
    triggerEncryptDecrypt,
    setCustomPrimes,
    encryptMessage,
    decryptMessage,
    setQuizAnswer,
    resetLesson,
    isPrime,
  };
}
