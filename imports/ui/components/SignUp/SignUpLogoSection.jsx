import React from 'react';

export const SignUpLogoSection = () => {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center lg:pr-4 mb-6 lg:mb-0">
      <div className="relative flex flex-col items-center text-center">
        <img
          src="/images/colouredLogo.png"
          alt="SkillTree Logo"
          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 object-contain shrink-0"
        />
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#025940] mt-2">
          SKILLTREE
        </h2>
      </div>
    </div>
  );
};
