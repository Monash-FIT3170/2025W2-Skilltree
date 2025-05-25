import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export const GetMissingGoogleFields = () => {
  const [, setError] = useState(''); //This is to store any error messages when validating the account

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    profile: {
      dateOfBirth: '',
      lastLogin: new Date(),
      updatedAt: new Date()
    }
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevFormData => {
      const updated = { ...prevFormData };
      const keys = name.split('.');
      let field = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!field[keys[i]]) field[keys[i]] = {};
        field = field[keys[i]];
      }

      field[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleNext = async e => {
    e.preventDefault();

    try {
      await Meteor.callAsync('validateMissingGoogleFields', formData);
      setError('');

      //Meteor Doc Update: need to use dot notation
      const updateFields = {
        username: formData.username,
        'profile.dateOfBirth': formData.profile.dateOfBirth,
        'profile.updatedAt': formData.profile.updatedAt,
        'profile.lastLogin': formData.profile.lastLogin
      };

      await Meteor.callAsync('updateFields', updateFields);
      setError('');

      navigate('/home');
    } catch (error) {
      setError(
        error.reason || 'An unexpected error occurred with creating new user!'
      );
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white px-6 py-10">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '0.875rem',
            padding: '12px 16px',
            background: '#fff',
            color: '#333',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
            whiteSpace: 'pre-line'
          },
          duration: 4000
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-12"
      >
        {/* LEFT SECTION: Logo + Text */}
        <div className="w-1/2 flex items-center pr-4">
          <div className="relative flex items-center">
            <img
              src="/images/colouredLogo.png"
              alt="SkillTree Logo"
              className="w-80 h-80 object-contain shrink-0"
            />
            <h2 className="text-5xl font-bold text-[#025940] absolute left-[74%]">
              SKILLTREE
            </h2>
          </div>
        </div>

        {/* RIGHT SECTION: Form */}
        <form
          onSubmit={handleNext}
          className="w-1/2 flex flex-col justify-center pl-6"
        >
          <div className="flex flex-col space-y-6 w-full max-w-[400px]">
            {/* Step Bar */}
            <div className="flex items-center justify-between w-full">
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Almost there! Let’s complete your profile.
            </h3>

            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-black"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="dob"
                className="block text-sm font-semibold text-black"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                name="profile.dateOfBirth"
                value={formData.profile.dateOfBirth || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#04BF8A] text-white text-sm font-semibold hover:bg-[#03a57e] transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
