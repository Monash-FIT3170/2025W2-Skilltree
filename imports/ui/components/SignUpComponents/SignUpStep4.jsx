import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

const Step4 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();

  const handleChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(draft => {
        draft.profile.avatarUrl = URL.createObjectURL(file); // Optional preview URL
        draft.profile.avatarFile = file; // You may handle actual upload later
      });
    }
  };

  const handleNext = async e => {
    e.preventDefault();

    try {
      const validation = await Meteor.callAsync('validateStep4', formData);
      toast.success('✅ Step 4 Complete');

      try {
        const creation = await Meteor.callAsync('createNewUser', formData);
        console.log('User created with ID:', creation);
        toast.success('🎉 Account created successfully!');
        navigate('/home');
      } catch (error) {
        toast.error(error.reason || 'Failed to create user account.');
      }
    } catch (error) {
      toast.error(error.reason || 'Error saving profile information.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3f7f6] to-[#e6faf6] px-4 py-12 sm:py-20">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: '0.875rem',
            padding: '12px 16px',
            background: '#fff',
            color: '#333',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
          },
          duration: 3500,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white"
      >
        {/* LEFT SIDE */}
        <div className="md:w-1/2 w-full bg-[#D9D9D9] flex flex-col justify-center items-center p-10 space-y-4">
          <img
            src="/images/logo.png"
            alt="SkillTree Logo"
            className="w-24 h-24 object-contain drop-shadow-sm"
          />
          <h2 className="text-4xl font-bold text-[#025940] tracking-wide">
            SKILLTREE
          </h2>
          <p className="text-center text-sm text-[#025940] max-w-xs">
            Finish setting up your profile 📸
          </p>
        </div>

        {/* RIGHT SIDE */}
        <form
          onSubmit={handleNext}
          className="md:w-1/2 w-full p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
          </div>

          <h3 className="text-2xl font-semibold text-[#024059]">
            Upload Profile Picture
          </h3>

          <label htmlFor="img" className="text-base text-gray-700 font-medium">
            Select an Image (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-full bg-white text-sm text-gray-700"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03A64A] transition font-semibold"
            >
              Create Account
            </button>
          </div>

          <p className="text-xs text-center text-gray-700">
            By creating an account, you agree to the{' '}
            <Link to="" className="text-gray-600 underline hover:text-[#026873]">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="" className="text-gray-600 underline hover:text-[#026873]">
              Privacy Policy.
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Step4;
