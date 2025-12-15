import { useHMACLessonState } from '@/hooks/useHMACLessonState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { HMACLevel1 } from './HMACLesson/HMACLevel1';
import { HMACLevel2 } from './HMACLesson/HMACLevel2';
import { HMACCompletion } from './HMACLesson/HMACCompletion';

interface HMACLessonProps {
  onClose?: () => void;
}

export function HMACLesson({ onClose }: HMACLessonProps) {
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
    triggerKeyNormalization,
    triggerIpadAnimation,
    triggerOpadAnimation,
    triggerHMACComputation,
  } = useHMACLessonState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'level1') {
      return 3;
    } else if (state.currentLevel === 'level2') {
      return 6;
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
      return 10;
    }
  };

  const getTotalLessonSteps = () => {
    return 3 + 6 + 1;
  };

  const getTitle = () => {
    if (state.currentLevel === 'level1') {
      return 'HMAC Deep Dive - Level 1: Concepts';
    } else if (state.currentLevel === 'level2') {
      return 'HMAC Deep Dive - Level 2: Internal Structure';
    } else {
      return 'HMAC Deep Dive - Complete!';
    }
  };

  const renderLevelContent = () => {
    if (state.currentLevel === 'level1') {
      return (
        <HMACLevel1
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onKeyNormalizationTrigger={triggerKeyNormalization}
          keyNormalizationTriggered={state.keyNormalizationTriggered}
        />
      );
    } else if (state.currentLevel === 'level2') {
      return (
        <HMACLevel2
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onIpadAnimationTrigger={triggerIpadAnimation}
          ipadAnimationTriggered={state.ipadAnimationTriggered}
          onOpadAnimationTrigger={triggerOpadAnimation}
          opadAnimationTriggered={state.opadAnimationTriggered}
          onHMACComputationTrigger={triggerHMACComputation}
          hmacComputationTriggered={state.hmacComputationTriggered}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={setQuizAnswer}
        />
      );
    } else {
      return <HMACCompletion onFinish={handleLessonClose} />;
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
