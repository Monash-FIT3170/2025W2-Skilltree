import React, { useState } from 'react';
import { useImmer } from 'use-immer';

//Sign up step components
import { EmailUserNameStage } from '/imports/ui/components/SignUp/EmailUserNameStage';
import { CreatePasswordStage } from '/imports/ui/components/SignUp/CreatePasswordStage';
import { BasicInfoStage } from '/imports/ui/components/SignUp/BasicInfoStage';
import { AuthLayout } from '/imports/ui/layouts/Auth/AuthLayout';

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

  const signUpStageProps = {
    formData,
    setFormData,
    currentStep,
    totalSteps,
    nextStep,
    prevStep
  };

  const renderStep = () => {
    switch (currentStep) {
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
    <AuthLayout
      showStepBar={true}
      currentStep={currentStep}
      totalSteps={totalSteps}
      showFooter={true}
    >
      {renderStep()}
    </AuthLayout>
  );
};
