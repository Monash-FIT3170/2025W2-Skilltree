import React from 'react';
import { SignUpLogoSection } from '/imports/ui/components/SignUp/SignUpLogoSection';

export const AccountSetupBox = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 lg:p-12">
      {/* LEFT SECTION: Logo + Text */}
      <SignUpLogoSection />

      {/* RIGHT SECTION: Form */}
      {children}
    </div>
  );
};
