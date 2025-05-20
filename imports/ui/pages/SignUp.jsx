import React, { Suspense, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';

export const SignUp = () => {
  const userForm = {
    username: '',
    password: '',
    email: '',
    profile: {
      firstName: '',
      lastName: '',
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
      membership_tier: 'Community'
    }
  };

  const [formData, setFormData] = useImmer(userForm);

  return (
    <div>
      <Suspense>
        <Outlet context={{ formData, setFormData }} />{' '}
        {/* Renders step1, step2, or step3 */}
      </Suspense>
    </div>
  );
};
