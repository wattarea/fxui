import React from 'react';
import { cn } from '../../utils/cn';

export interface StepperStep {
  title: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}

type StepStatus = 'completed' | 'current' | 'upcoming';

function getStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

const stepIconClasses: Record<StepStatus, string> = {
  completed: 'bg-fx-black text-fx-white border-fx-black shadow-fx-sm dark:bg-fx-white dark:text-fx-black dark:border-fx-white',
  current: 'bg-fx-yellow text-fx-black border-fx-black shadow-fx dark:border-fx-white',
  upcoming: 'bg-fx-white text-gray-400 border-gray-300 dark:bg-fx-black dark:border-gray-600',
};

const stepTitleClasses: Record<StepStatus, string> = {
  completed: 'text-fx-black dark:text-fx-white font-bold',
  current: 'text-fx-black dark:text-fx-white font-bold',
  upcoming: 'text-gray-400 dark:text-gray-500 font-medium',
};

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, orientation = 'horizontal', className, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        className={cn(
          isHorizontal ? 'flex items-start' : 'flex flex-col',
          className
        )}
        role="list"
        aria-label="Progress steps"
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStatus(index, currentStep);
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div
                role="listitem"
                aria-current={status === 'current' ? 'step' : undefined}
                className={cn(
                  'flex font-sans',
                  isHorizontal ? 'flex-col items-center flex-1' : 'flex-row items-start gap-4',
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'flex items-center justify-center shrink-0',
                    'h-9 w-9 rounded-[4px] border-2 font-black text-sm',
                    'transition-all duration-200',
                    stepIconClasses[status],
                  )}
                  aria-hidden="true"
                >
                  {status === 'completed' ? '✓' : index + 1}
                </div>

                {/* Label */}
                <div className={cn(isHorizontal ? 'mt-2 text-center' : 'pb-2')}>
                  <p className={cn('text-sm', stepTitleClasses[status])}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                isHorizontal ? (
                  <div
                    aria-hidden="true"
                    className={cn(
                      'h-[2px] flex-1 mt-4 mx-1',
                      index < currentStep
                        ? 'bg-fx-black dark:bg-fx-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    )}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={cn(
                      'w-[2px] ml-4 my-1',
                      'min-h-[24px]',
                      index < currentStep
                        ? 'bg-fx-black dark:bg-fx-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    )}
                  />
                )
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

export { Stepper };
export default Stepper;
