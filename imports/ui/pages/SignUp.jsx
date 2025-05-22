import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { motion } from 'framer-motion';

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
      membership_tier: 'Community'
    }
  };

  const [formData, setFormData] = useImmer(userForm);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f9f8] to-[#e0f7ed] px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-2xl"
      >
        {/* Optional: Logo/Header here if needed */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create your <span className="text-green-700">SkillTree</span> account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Unlock personalized learning & join your community 🌱
          </p>
        </div>

        <Suspense fallback={<p className="text-center text-gray-400">Loading form...</p>}>
          <Outlet context={{ formData, setFormData }} />
        </Suspense>
      </motion.div>
    </div>
  );
};
