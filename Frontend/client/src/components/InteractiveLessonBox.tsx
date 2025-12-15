import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveLessonBoxProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function InteractiveLessonBox({
  title,
  currentStep,
  totalSteps,
  isCompleted,
  onNext,
  onPrevious,
  onClose,
  children,
  className,
}: InteractiveLessonBoxProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (isCompleted) {
    return (
      <div
        className={cn(
          'animate-in fade-in slide-in-from-bottom-4 duration-500',
          'max-w-2xl mx-auto mb-4'
        )}
      >
        <div className={cn(
          'rounded-2xl p-8 text-center',
          'bg-gradient-to-br from-indigo-50 to-sky-100 dark:from-indigo-950 dark:to-sky-900',
          'border border-indigo-200 dark:border-indigo-800',
          'shadow-lg dark:shadow-indigo-900/30',
          className
        )}>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            🎉 Lesson Complete!
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            You've completed the {title} lesson. Great job!
          </p>
          <Button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-500',
        'max-w-2xl mx-auto mb-4'
      )}
    >
      <div className={cn(
        'rounded-2xl p-6 md:p-8',
        'bg-gradient-to-br from-indigo-50 to-sky-100 dark:from-indigo-950 dark:to-sky-900',
        'border border-indigo-200 dark:border-indigo-800',
        'shadow-lg dark:shadow-indigo-900/30',
        className
      )}>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {title}
          </h3>

          {/* Progress Bar */}
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-sky-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="mb-8 min-h-[200px]">
          {children}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={onPrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Back
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i <= currentStep
                    ? 'bg-indigo-500 dark:bg-indigo-400'
                    : 'bg-slate-300 dark:bg-slate-600'
                )}
              />
            ))}
          </div>

          <Button
            onClick={onNext}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
          >
            Next
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
