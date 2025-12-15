import { useMutualAuthenticationState } from '@/hooks/useMutualAuthenticationState';
import { InteractiveLessonBox } from './InteractiveLessonBox';
import { MutualAuthenticationLevel1 } from './MutualAuthenticationDemo/MutualAuthenticationLevel1';
import { MutualAuthenticationLevel2 } from './MutualAuthenticationDemo/MutualAuthenticationLevel2';
import { MutualAuthenticationCompletion } from './MutualAuthenticationDemo/MutualAuthenticationCompletion';

interface MutualAuthenticationDemoProps {
  onClose: () => void;
}

export function MutualAuthenticationDemo({ onClose }: MutualAuthenticationDemoProps) {
  const {
    currentLevel,
    currentLevel1Step,
    currentLevel2Step,
    clientOnlyAuthDemo,
    mutualAuthDemo,
    comparisonView,
    mitmWithoutMutualAuth,
    mitmWithMutualAuth,
    interactiveDemo,
    mutualAuthEnabled,
    quizAnswers,
    goToNextLevel1Step,
    goToPreviousLevel1Step,
    goToNextLevel2Step,
    goToPreviousLevel2Step,
    triggerClientOnlyAuthDemo,
    triggerMutualAuthDemo,
    triggerComparisonView,
    triggerMitmWithoutMutualAuth,
    triggerMitmWithMutualAuth,
    triggerInteractiveDemo,
    toggleMutualAuth,
    handleQuizAnswer,
  } = useMutualAuthenticationState();

  const renderContent = () => {
    if (currentLevel === 1) {
      return (
        <MutualAuthenticationLevel1
          currentStep={currentLevel1Step}
          onNext={goToNextLevel1Step}
          onPrevious={goToPreviousLevel1Step}
          onClientOnlyAuthDemoTrigger={triggerClientOnlyAuthDemo}
          clientOnlyAuthDemoAnimated={clientOnlyAuthDemo}
          onMutualAuthDemoTrigger={triggerMutualAuthDemo}
          mutualAuthDemoAnimated={mutualAuthDemo}
          onComparisonViewTrigger={triggerComparisonView}
          comparisonViewAnimated={comparisonView}
        />
      );
    }

    if (currentLevel === 2) {
      return (
        <MutualAuthenticationLevel2
          currentStep={currentLevel2Step}
          onNext={goToNextLevel2Step}
          onPrevious={goToPreviousLevel2Step}
          onMitmWithoutMutualAuthTrigger={triggerMitmWithoutMutualAuth}
          mitmWithoutMutualAuthAnimated={mitmWithoutMutualAuth}
          onMitmWithMutualAuthTrigger={triggerMitmWithMutualAuth}
          mitmWithMutualAuthAnimated={mitmWithMutualAuth}
          onInteractiveDemoTrigger={triggerInteractiveDemo}
          interactiveDemoAnimated={interactiveDemo}
          mutualAuthEnabled={mutualAuthEnabled}
          onToggleMutualAuth={toggleMutualAuth}
          quizAnswers={quizAnswers}
          onQuizAnswer={handleQuizAnswer}
        />
      );
    }

    return <MutualAuthenticationCompletion onFinish={onClose} />;
  };

  const totalSteps = currentLevel === 1 ? 3 : currentLevel === 2 ? 3 : 0;
  const currentStep = currentLevel === 1 ? currentLevel1Step : currentLevel === 2 ? currentLevel2Step : 0;
  const handleNext = currentLevel === 1 ? goToNextLevel1Step : goToNextLevel2Step;
  const handlePrevious = currentLevel === 1 ? goToPreviousLevel1Step : goToPreviousLevel2Step;

  return (
    <InteractiveLessonBox
      title="Mutual Authentication: Two-Way Security"
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
