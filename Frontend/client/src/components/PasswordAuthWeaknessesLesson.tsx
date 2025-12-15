import { InteractiveLessonBox } from '@/components/InteractiveLessonBox';
import { PasswordAuthWeaknessesLevel1 } from './PasswordAuthWeaknessesLesson/PasswordAuthWeaknessesLevel1';
import { PasswordAuthWeaknessesLevel2 } from './PasswordAuthWeaknessesLesson/PasswordAuthWeaknessesLevel2';
import { PasswordAuthWeaknessesCompletion } from './PasswordAuthWeaknessesLesson/PasswordAuthWeaknessesCompletion';
import { usePasswordAuthWeaknessesState } from '@/hooks/usePasswordAuthWeaknessesState';

interface PasswordAuthWeaknessesLessonProps {
  onClose: () => void;
}

export function PasswordAuthWeaknessesLesson({ onClose }: PasswordAuthWeaknessesLessonProps) {
  const state = usePasswordAuthWeaknessesState();

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
      title="Password Authentication Pitfalls"
      currentStep={getCurrentStepNumber()}
      totalSteps={getTotalSteps()}
      onClose={onClose}
    >
      {state.currentLevel === 1 && (
        <PasswordAuthWeaknessesLevel1
          currentStep={state.currentStep}
          onNext={state.nextStep}
          onPrevious={state.previousStep}
          onNaiveProtocolTrigger={state.triggerNaiveProtocol}
          naiveProtocolAnimated={state.naiveProtocolAnimated}
          onEavesdropperTrigger={state.triggerEavesdropper}
          eavesdropperAnimated={state.eavesdropperAnimated}
          onOfflineDictionaryTrigger={state.triggerOfflineDictionary}
          offlineDictionaryAnimated={state.offlineDictionaryAnimated}
        />
      )}
      {state.currentLevel === 2 && (
        <PasswordAuthWeaknessesLevel2
          currentStep={state.currentStep}
          onNext={state.nextStep}
          onPrevious={state.previousStep}
          onChallengeResponseTrigger={state.triggerChallengeResponse}
          challengeResponseAnimated={state.challengeResponseAnimated}
          onSecureComparisonTrigger={state.triggerSecureComparison}
          secureComparisonAnimated={state.secureComparisonAnimated}
          onInteractiveDemoTrigger={state.triggerInteractiveDemo}
          interactiveDemoAnimated={state.interactiveDemoAnimated}
          selectedPassword={state.selectedPassword}
          onPasswordChange={state.setSelectedPassword}
          onStartDictionaryAttack={state.startDictionaryAttack}
          dictionaryAttackRunning={state.dictionaryAttackRunning}
          dictionaryProgress={state.dictionaryProgress}
          dictionaryFound={state.dictionaryFound}
          crackedPassword={state.crackedPassword}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={state.setQuizAnswer}
        />
      )}
      {state.currentLevel === 'completion' && (
        <PasswordAuthWeaknessesCompletion onFinish={onClose} />
      )}
    </InteractiveLessonBox>
  );
}
