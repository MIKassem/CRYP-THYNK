import { useNonceAuthLessonState } from '@/hooks/useNonceAuthLessonState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { NonceAuthLevel1 } from './NonceAuthLesson/NonceAuthLevel1';
import { NonceAuthLevel2 } from './NonceAuthLesson/NonceAuthLevel2';
import { NonceAuthCompletion } from './NonceAuthLesson/NonceAuthCompletion';

interface NonceAuthLessonProps {
  onClose?: () => void;
}

export function NonceAuthLesson({ onClose }: NonceAuthLessonProps) {
  const handleLessonClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const {
    state,
    nextStep,
    previousStep,
    goToLevel,
    setQuizAnswer,
    triggerChallengeResponse,
    triggerReplayAttack,
    triggerNonceDefense,
    triggerFreshnessDemo,
  } = useNonceAuthLessonState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'level1') {
      return 3;
    } else if (state.currentLevel === 'level2') {
      return 4;
    } else {
      return 1;
    }
  };

  const getCurrentStepNumber = () => {
    if (state.currentLevel === 'level1') {
      return state.currentStep + 1;
    } else if (state.currentLevel === 'level2') {
      return state.currentStep + 1 + 3;
    } else {
      return 8;
    }
  };

  const getTotalLessonSteps = () => {
    return 3 + 4 + 1;
  };

  const getTitle = () => {
    if (state.currentLevel === 'level1') {
      return 'Nonce Authentication - Level 1: Challenge-Response';
    } else if (state.currentLevel === 'level2') {
      return 'Nonce Authentication - Level 2: Preventing Replay Attacks';
    } else {
      return 'Nonce Authentication - Complete!';
    }
  };

  const renderLevelContent = () => {
    if (state.currentLevel === 'level1') {
      return (
        <NonceAuthLevel1
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onChallengeResponseTrigger={triggerChallengeResponse}
          challengeResponseAnimated={state.challengeResponseAnimated}
        />
      );
    } else if (state.currentLevel === 'level2') {
      return (
        <NonceAuthLevel2
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onReplayAttackTrigger={triggerReplayAttack}
          replayAttackAnimated={state.replayAttackAnimated}
          onNonceDefenseTrigger={triggerNonceDefense}
          nonceDefenseAnimated={state.nonceDefenseAnimated}
          onFreshnessDemoTrigger={triggerFreshnessDemo}
          freshnessDemoAnimated={state.freshnessDemoAnimated}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={setQuizAnswer}
        />
      );
    } else {
      return <NonceAuthCompletion onFinish={handleLessonClose} />;
    }
  };

  return (
    <InteractiveLessonBox
      title={getTitle()}
      currentStep={getCurrentStepNumber() - 1}
      totalSteps={getTotalLessonSteps()}
      isCompleted={state.isCompleted}
      onNext={nextStep}
      onPrevious={previousStep}
      onClose={handleLessonClose}
    >
      {renderLevelContent()}
    </InteractiveLessonBox>
  );
}
