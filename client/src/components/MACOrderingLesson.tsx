import { useMACOrderingLessonState } from '@/hooks/useMACOrderingLessonState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { MACOrderingLevel1 } from './MACOrderingLesson/MACOrderingLevel1';
import { MACOrderingLevel2 } from './MACOrderingLesson/MACOrderingLevel2';
import { MACOrderingCompletion } from './MACOrderingLesson/MACOrderingCompletion';

interface MACOrderingLessonProps {
  onClose?: () => void;
}

export function MACOrderingLesson({ onClose }: MACOrderingLessonProps) {
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
    triggerEncryptThenMac,
    triggerMacThenEncrypt,
    triggerEncryptAndMac,
    triggerPaddingOracleAttack,
    triggerBestPractice,
  } = useMACOrderingLessonState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'level1') {
      return 4;
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
      return state.currentStep + 1 + 4;
    } else {
      return 9;
    }
  };

  const getTotalLessonSteps = () => {
    return 4 + 4 + 1;
  };

  const getTitle = () => {
    if (state.currentLevel === 'level1') {
      return 'MAC Ordering Security - Level 1: The Three Approaches';
    } else if (state.currentLevel === 'level2') {
      return 'MAC Ordering Security - Level 2: Attacks & Best Practices';
    } else {
      return 'MAC Ordering Security - Complete!';
    }
  };

  const renderLevelContent = () => {
    if (state.currentLevel === 'level1') {
      return (
        <MACOrderingLevel1
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onEncryptThenMacTrigger={triggerEncryptThenMac}
          encryptThenMacAnimated={state.encryptThenMacAnimated}
          onMacThenEncryptTrigger={triggerMacThenEncrypt}
          macThenEncryptAnimated={state.macThenEncryptAnimated}
          onEncryptAndMacTrigger={triggerEncryptAndMac}
          encryptAndMacAnimated={state.encryptAndMacAnimated}
        />
      );
    } else if (state.currentLevel === 'level2') {
      return (
        <MACOrderingLevel2
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onPaddingOracleAttackTrigger={triggerPaddingOracleAttack}
          paddingOracleAttackAnimated={state.paddingOracleAttackAnimated}
          onBestPracticeTrigger={triggerBestPractice}
          bestPracticeAnimated={state.bestPracticeAnimated}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={setQuizAnswer}
        />
      );
    } else {
      return <MACOrderingCompletion onFinish={handleLessonClose} />;
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
