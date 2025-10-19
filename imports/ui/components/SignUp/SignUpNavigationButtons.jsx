import React from 'react';

export const SignUpNavigationButtons = ({
  currentStep,
  totalSteps,
  prevStep
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-2">
      {/* Previous Button - Only show if not first step */}
      {!isFirstStep && (
        <button
          type="button"
          onClick={() => prevStep()}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          ←
        </button>
      )}

      {/* Spacer for first step to push next button to the right */}
      {isFirstStep && <div></div>}

      {/* Next/Create Button */}
      {isLastStep ? (
        <button
          type="submit"
          className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-[#04BF8A] text-white text-sm font-semibold hover:bg-[#03a57e] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Create
        </button>
      ) : (
        <button
          type="submit"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          →
        </button>
      )}
    </div>
  );
};
