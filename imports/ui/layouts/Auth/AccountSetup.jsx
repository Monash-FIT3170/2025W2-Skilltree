import React, { Suspense, useState } from 'react';
import { useImmer } from 'use-immer';
import { motion } from 'framer-motion';



import { StepBar } from '/imports/ui/components/SignUp/StepBar';
import { SignUpFooter } from '/imports/ui/components/SignUp/SignUpFooter';
import { SignUpLogoSection } from '/imports/ui/components/SignUp/SignUpLogoSection';

//Sign up step components
import { GetMissingGoogleFields} from '/imports/ui/components/SignUp/GetMissingGoogleFields';
import { EmailUserNameStage } from '/imports/ui/components/SignUp/EmailUserNameStage';
import { CreatePasswordStage } from '/imports/ui/components/SignUp/CreatePasswordStage';
import { BasicInfoStage } from '/imports/ui/components/SignUp/BasicInfoStage';

const initialFormData = {
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


export const AccountSetup = ({
  showStepBar = false,
  currentStep: externalCurrentStep,
  totalSteps = 3,
  showFooter = false
}) => {

  //When the user refreshes the page and component remounts, we will go back to step 1
  const [currentStep, setCurrentStep] = useState(externalCurrentStep || 1);
  const [formData, setFormData] = useImmer(initialFormData);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {

    const signUpStageProps = {
      formData,
      setFormData,
      currentStep,
      totalSteps,
      nextStep,
      prevStep
    };

    switch (currentStep) {
      case 0:
        return <GetMissingGoogleFields />
      case 1:
        return <EmailUserNameStage {...signUpStageProps} />;
      case 2:
        return <CreatePasswordStage {...signUpStageProps} />;
      case 3:
        return <BasicInfoStage {...signUpStageProps} />;
      default:
        return <EmailUserNameStage {...signUpStageProps} />;
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

          {showStepBar && (
            <div className="w-full max-w-md mb-8">
              <StepBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}

          <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 lg:p-12">
            {/* LEFT SECTION: Logo + Text */}
            <SignUpLogoSection />

            {/* RIGHT SECTION: Form */}
            {renderStep()}
          </div>

          {/*Footer*/}
          {showFooter && <SignUpFooter />}
        </motion.div>
      </div>
    </Suspense>
  );
};
