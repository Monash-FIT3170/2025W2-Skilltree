import React, { Suspense, useState } from 'react';
import { useImmer } from 'use-immer';
import { motion } from 'framer-motion';

//Sign up step components
import { EmailUserNameStage } from '/imports/ui/components/SignUp/EmailUserNameStage';
import { CreatePasswordStage } from '/imports/ui/components/SignUp/CreatePasswordStage';
import { BasicInfoStage } from '/imports/ui/components/SignUp/BasicInfoStage';
import { StepBar } from '/imports/ui/components/SignUp/StepBar';

export const SignUp = () => {
  //When the user refreshes the page and component remounts, we will go back to step 1
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const userForm = {
    username: '',
    password: '',
    email: '',
    profile: {
      givenName: '',
      familyName: '',
      avatarUrl: '',
      bio: '',
      dateOfBirth: '',
      subscribedCommunities: [],
      roles: ['user'],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      proof_of_practice_uploads: [],
      expertise_areas: [],
      membership_tier: 'Community',
      isProfileComplete: false
    }
  };

  const [formData, setFormData] = useImmer(userForm);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  /*
  Which step to render in the component. We may add more steps in the future
  */
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmailUserNameStage
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <CreatePasswordStage
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <BasicInfoStage
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
          />
        );
      default:
        return (
          <EmailUserNameStage
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
    }
  };

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
          <div className="w-full max-w-md mb-8">
            <StepBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 lg:p-12">
            {/* LEFT SECTION: Logo + Text */}
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

            {/* RIGHT SECTION: Form */}
            {renderStep()}
          </div>
        </motion.div>
      </div>
    </Suspense>
  );
};
