import { useAESLessonState } from '@/hooks/useAESLessonState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { AESLevel1 } from './AESLesson/AESLevel1';
import { AESLevel2 } from './AESLesson/AESLevel2';
import { AESCompletion } from './AESLesson/AESCompletion';

interface AESLessonProps {
  onClose?: () => void;
}

export function AESLesson({ onClose }: AESLessonProps) {
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
    triggerEncryptionAnimation,
    triggerDecryption,
    triggerSubBytesAnimation,
    triggerShiftRowsAnimation,
    triggerMixColumnsAnimation,
  } = useAESLessonState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'level1') {
      return 3;
    } else if (state.currentLevel === 'level2') {
      return 8;
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
      return 12;
    }
  };

  const getTotalLessonSteps = () => {
    return 3 + 8 + 1;
  };

  const getTitle = () => {
    if (state.currentLevel === 'level1') {
      return 'AES Lesson - Level 1: Concepts';
    } else if (state.currentLevel === 'level2') {
      return 'AES Lesson - Level 2: Mechanics';
    } else {
      return 'AES Lesson - Complete!';
    }
  };

  const renderLevelContent = () => {
    if (state.currentLevel === 'level1') {
      return (
        <AESLevel1
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onEncryptionAnimationTrigger={triggerEncryptionAnimation}
          encryptionAnimationTriggered={state.encryptionAnimationTriggered}
          onDecryptionTrigger={triggerDecryption}
          decryptionTriggered={state.decryptionTriggered}
        />
      );
    } else if (state.currentLevel === 'level2') {
      return (
        <AESLevel2
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onSubBytesAnimationTrigger={triggerSubBytesAnimation}
          subBytesAnimated={state.subBytesAnimated}
          onShiftRowsAnimationTrigger={triggerShiftRowsAnimation}
          shiftRowsAnimated={state.shiftRowsAnimated}
          onMixColumnsAnimationTrigger={triggerMixColumnsAnimation}
          mixColumnsAnimated={state.mixColumnsAnimated}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={setQuizAnswer}
        />
      );
    } else {
      return <AESCompletion onFinish={handleLessonClose} />;
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
