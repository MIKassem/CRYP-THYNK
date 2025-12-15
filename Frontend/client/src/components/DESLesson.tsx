import { useLessonState } from '@/hooks/useLessonState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { Level1 } from './DESLesson/Level1';
import { Level2 } from './DESLesson/Level2';
import { Completion } from './DESLesson/Completion';

interface DESLessonProps {
  onClose?: () => void;
}

export function DESLesson({ onClose }: DESLessonProps) {
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
    triggerPermutation,
    setSelectedRound,
  } = useLessonState();

  const getTotalSteps = () => {
    if (state.currentLevel === 'level1') {
      return 3;
    } else if (state.currentLevel === 'level2') {
      return 7;
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
      return 11;
    }
  };

  const getTotalLessonSteps = () => {
    return 3 + 7 + 1;
  };

  const getTitle = () => {
    if (state.currentLevel === 'level1') {
      return 'DES Lesson - Level 1: Concepts';
    } else if (state.currentLevel === 'level2') {
      return 'DES Lesson - Level 2: Mechanics';
    } else {
      return 'DES Lesson - Complete!';
    }
  };

  const renderLevelContent = () => {
    if (state.currentLevel === 'level1') {
      return (
        <Level1
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
        <Level2
          currentStep={state.currentStep}
          onNext={nextStep}
          onPrevious={previousStep}
          onPermutationTrigger={triggerPermutation}
          permutationAnimated={state.permutationAnimated}
          selectedRound={state.selectedRound}
          onRoundChange={setSelectedRound}
          quizAnswers={state.quizAnswers}
          onQuizAnswer={setQuizAnswer}
        />
      );
    } else {
      return <Completion onFinish={handleLessonClose} />;
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
