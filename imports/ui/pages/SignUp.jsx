import React, { Suspense, useState } from 'react';
import { useImmer } from 'use-immer';

//Sign up step components
import { EmailUserNameStage } from '/imports/ui/components/SignUp/EmailUserNameStage';
import { CreatePasswordStage } from '/imports/ui/components/SignUp/CreatePasswordStage';
import { BasicInfoStage } from '/imports/ui/components/SignUp/BasicInfoStage';

export const SignUp = () => {
  //When the user refreshes the page and component remounts, we will go back to step 1
  const [currentStep, setCurrentStep] = useState(1);

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
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-8">
      <Suspense
        fallback={<p className="text-center text-gray-400">Loading form...</p>}
      >
        {renderStep()}
      </Suspense>
    </div>
  );
};
