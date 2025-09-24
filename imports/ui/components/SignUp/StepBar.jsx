import React from 'react';

export const StepBar = ({ currentStep, totalSteps }) => {
  const stepIndexes = Array.from({ length: totalSteps }, (_, i) => i);

  console.log(currentStep);
  console.log(totalSteps);
  console.log(stepIndexes);

  return (
    <div className="flex items-center justify-between w-full">
      {stepIndexes.map(stepIndex => {
        const isCompleted = stepIndex + 1 < currentStep;
        const isActive = stepIndex + 1 === currentStep;
        const isLast = stepIndex + 1 === totalSteps;

        return (
          <React.Fragment key={stepIndex}>
            {/* Step Dot */}
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isCompleted
                  ? 'bg-[#04BF8A] text-white shadow-lg'
                  : isActive
                    ? 'bg-[#04BF8A] text-white shadow-lg ring-2 ring-[#04BF8A] ring-opacity-50'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
              }`}
            >
              {stepIndex + 1}
            </div>

            {/* Connecting Line (don't show after last step) */}
            {!isLast && (
              <div
                className={`h-1 flex-grow mx-2 sm:mx-4 transition-all duration-300 ${
                  stepIndex + 1 < currentStep ? 'bg-[#04BF8A]' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
