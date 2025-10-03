import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { StepBar } from '/imports/ui/components/SignUp/StepBar';
import { SignUpFooter } from '/imports/ui/components/SignUp/SignUpFooter';
import { SignUpLogoSection } from '/imports/ui/components/SignUp/SignUpLogoSection';

export const AuthLayout = ({
  children,
  showStepBar = false,
  currentStep,
  totalSteps,
  showFooter = false
}) => {
  return (
    <Suspense
      fallback={<p className="text-center text-gray-400">Loading form...</p>}
    >
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          {/*Step Bar Component */}

          {showStepBar && (
            <div className="w-full max-w-md mb-8">
              <StepBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}

          <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 lg:p-12">
            {/* LEFT SECTION: Logo + Text */}
            <SignUpLogoSection />

            {/* RIGHT SECTION: Form */}
            {children}
          </div>

          {/*Footer*/}
          {showFooter && <SignUpFooter />}
        </motion.div>
      </div>
    </Suspense>
  );
};
