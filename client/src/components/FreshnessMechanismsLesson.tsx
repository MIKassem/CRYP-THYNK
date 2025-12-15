import { useFreshnessMechanismsState } from '@/hooks/useFreshnessMechanismsState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { FreshnessMechanismsLevel1 } from './FreshnessMechanismsLesson/FreshnessMechanismsLevel1';
import { FreshnessMechanismsLevel2 } from './FreshnessMechanismsLesson/FreshnessMechanismsLevel2';
import { FreshnessMechanismsCompletion } from './FreshnessMechanismsLesson/FreshnessMechanismsCompletion';

interface FreshnessMechanismsLessonProps {
  onClose: () => void;
}

export function FreshnessMechanismsLesson({ onClose }: FreshnessMechanismsLessonProps) {
  const {
    currentLevel,
    currentLevel1Step,
    currentLevel2Step,
    timestampDemo,
    nonceDemo,
    sequenceDemo,
    timestampReplayAttack,
    nonceReplayAttack,
    sequenceReplayAttack,
    comparisonView,
    quizAnswers,
    goToNextLevel1Step,
    goToPreviousLevel1Step,
    goToNextLevel2Step,
    goToPreviousLevel2Step,
    triggerTimestampDemo,
    triggerNonceDemo,
    triggerSequenceDemo,
    triggerTimestampReplayAttack,
    triggerNonceReplayAttack,
    triggerSequenceReplayAttack,
    triggerComparisonView,
    handleQuizAnswer,
  } = useFreshnessMechanismsState();

  const renderContent = () => {
    if (currentLevel === 1) {
      return (
        <FreshnessMechanismsLevel1
          currentStep={currentLevel1Step}
          onNext={goToNextLevel1Step}
          onPrevious={goToPreviousLevel1Step}
          onTimestampDemoTrigger={triggerTimestampDemo}
          timestampDemoAnimated={timestampDemo}
          onNonceDemoTrigger={triggerNonceDemo}
          nonceDemoAnimated={nonceDemo}
          onSequenceDemoTrigger={triggerSequenceDemo}
          sequenceDemoAnimated={sequenceDemo}
        />
      );
    }

    if (currentLevel === 2) {
      return (
        <FreshnessMechanismsLevel2
          currentStep={currentLevel2Step}
          onNext={goToNextLevel2Step}
          onPrevious={goToPreviousLevel2Step}
          onTimestampReplayAttackTrigger={triggerTimestampReplayAttack}
          timestampReplayAttackAnimated={timestampReplayAttack}
          onNonceReplayAttackTrigger={triggerNonceReplayAttack}
          nonceReplayAttackAnimated={nonceReplayAttack}
          onSequenceReplayAttackTrigger={triggerSequenceReplayAttack}
          sequenceReplayAttackAnimated={sequenceReplayAttack}
          onComparisonViewTrigger={triggerComparisonView}
          comparisonViewAnimated={comparisonView}
          quizAnswers={quizAnswers}
          onQuizAnswer={handleQuizAnswer}
        />
      );
    }

    return <FreshnessMechanismsCompletion onFinish={onClose} />;
  };

  const totalSteps = currentLevel === 1 ? 3 : currentLevel === 2 ? 4 : 0;
  const currentStep = currentLevel === 1 ? currentLevel1Step : currentLevel === 2 ? currentLevel2Step : 0;
  const handleNext = currentLevel === 1 ? goToNextLevel1Step : goToNextLevel2Step;
  const handlePrevious = currentLevel === 1 ? goToPreviousLevel1Step : goToPreviousLevel2Step;

  return (
    <InteractiveLessonBox
      title="Freshness Mechanisms: Timestamp vs Nonce vs Sequence"
      onClose={onClose}
      currentStep={currentStep}
      totalSteps={totalSteps}
      isCompleted={currentLevel === 'completion'}
      onNext={handleNext}
      onPrevious={handlePrevious}
    >
      {renderContent()}
    </InteractiveLessonBox>
  );
}
