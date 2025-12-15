import { useRSAPerformanceLimitsState } from '@/hooks/useRSAPerformanceLimitsState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { RSAPerformanceLimitsLevel1 } from './RSAPerformanceLimits/RSAPerformanceLimitsLevel1';
import { RSAPerformanceLimitsLevel2 } from './RSAPerformanceLimits/RSAPerformanceLimitsLevel2';
import { RSAPerformanceLimitsCompletion } from './RSAPerformanceLimits/RSAPerformanceLimitsCompletion';

interface RSAPerformanceLimitsProps {
  onClose?: () => void;
}

export function RSAPerformanceLimits({ onClose }: RSAPerformanceLimitsProps) {
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
    triggerRSATiming,
    triggerAESTiming,
    triggerComparison,
    triggerBulkDataAnimation,
  } = useRSAPerformanceLimitsState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'level1') {
      return 3;
    } else if (state.currentLevel === 'level2') {
      return 3;
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
      return 7;
    }
  };

  const getTotalLessonSteps = () => {
    return 3 + 3 + 1;
  };

  const getTitle = () => {
    if (state.currentLevel === 'level1') {
      return 'RSA Performance - Level 1: Speed Comparison';
    } else if (state.currentLevel === 'level2') {
      return 'RSA Performance - Level 2: Why So Slow?';
    } else {
      return 'RSA Performance - Complete!';
    }
  };

  const renderLevelContent = () => {
    if (state.currentLevel === 'level1') {
      return (
        <RSAPerformanceLimitsLevel1
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onRSATimingTrigger={triggerRSATiming}
          rsaTimingTriggered={state.rsaTimingTriggered}
          onAESTimingTrigger={triggerAESTiming}
          aesTimingTriggered={state.aesTimingTriggered}
          onComparisonTrigger={triggerComparison}
          comparisonTriggered={state.comparisonTriggered}
        />
      );
    } else if (state.currentLevel === 'level2') {
      return (
        <RSAPerformanceLimitsLevel2
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onBulkDataAnimationTrigger={triggerBulkDataAnimation}
          bulkDataAnimated={state.bulkDataAnimated}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={setQuizAnswer}
        />
      );
    } else {
      return <RSAPerformanceLimitsCompletion onFinish={handleLessonClose} />;
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
