import { InteractiveLessonBox } from '@/components/InteractiveLessonBox';
import { RSAKeyGenerationLevel1 } from './RSAKeyGeneration/RSAKeyGenerationLevel1';
import { RSAKeyGenerationLevel2 } from './RSAKeyGeneration/RSAKeyGenerationLevel2';
import { RSAKeyGenerationCompletion } from './RSAKeyGeneration/RSAKeyGenerationCompletion';
import { useRSAKeyGenerationState } from '@/hooks/useRSAKeyGenerationState';

interface RSAKeyGenerationProps {
  onClose: () => void;
}

export function RSAKeyGeneration({ onClose }: RSAKeyGenerationProps) {
  const state = useRSAKeyGenerationState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'completion') return 6;
    return state.currentLevel === 1 ? 3 : 6;
  };

  const getCurrentStepNumber = () => {
    if (state.currentLevel === 'completion') return 6;
    return state.currentLevel === 1 ? state.currentStep : 3 + state.currentStep;
  };

  return (
    <InteractiveLessonBox
      title="RSA Key Generation Walkthrough"
      currentStep={getCurrentStepNumber()}
      totalSteps={getTotalSteps()}
      onClose={onClose}
    >
      {state.currentLevel === 1 && (
        <RSAKeyGenerationLevel1
          currentStep={state.currentStep}
          onNext={state.nextStep}
          onPrevious={state.previousStep}
          onPrimeSelectionTrigger={state.triggerPrimeSelection}
          primeSelectionAnimated={state.primeSelectionAnimated}
          onComputeNTrigger={state.triggerComputeN}
          computeNAnimated={state.computeNAnimated}
          onComputePhiTrigger={state.triggerComputePhi}
          computePhiAnimated={state.computePhiAnimated}
          primeP={state.primeP}
          primeQ={state.primeQ}
          modulusN={state.modulusN}
          phiN={state.phiN}
        />
      )}
      {state.currentLevel === 2 && (
        <RSAKeyGenerationLevel2
          currentStep={state.currentStep}
          onNext={state.nextStep}
          onPrevious={state.previousStep}
          onSelectETrigger={state.triggerSelectE}
          selectEAnimated={state.selectEAnimated}
          onComputeDTrigger={state.triggerComputeD}
          computeDAnimated={state.computeDAnimated}
          onEncryptDecryptTrigger={state.triggerEncryptDecrypt}
          encryptDecryptAnimated={state.encryptDecryptAnimated}
          primeP={state.primeP}
          primeQ={state.primeQ}
          modulusN={state.modulusN}
          phiN={state.phiN}
          publicExponentE={state.publicExponentE}
          privateExponentD={state.privateExponentD}
          customPrimeP={state.customPrimeP}
          customPrimeQ={state.customPrimeQ}
          onCustomPrimesChange={state.setCustomPrimes}
          selectedMessage={state.selectedMessage}
          encryptedMessage={state.encryptedMessage}
          decryptedMessage={state.decryptedMessage}
          onEncrypt={state.encryptMessage}
          onDecrypt={state.decryptMessage}
          isPrime={state.isPrime}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={state.setQuizAnswer}
        />
      )}
      {state.currentLevel === 'completion' && (
        <RSAKeyGenerationCompletion onFinish={onClose} />
      )}
    </InteractiveLessonBox>
  );
}
