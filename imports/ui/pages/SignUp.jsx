import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useImmer } from 'use-immer';

export const SignUp = () => {
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-8">
      <Suspense
        fallback={<p className="text-center text-gray-400">Loading form...</p>}
      >
        <Outlet context={{ formData, setFormData }} />
      </Suspense>
    </div>
  );
};
