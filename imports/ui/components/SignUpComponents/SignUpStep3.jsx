import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

const Step3 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(draft => {
      const keys = name.split('.');
      let field = draft;
      for (let i = 0; i < keys.length - 1; i++) {
        field = field[keys[i]];
      }
      field[keys[keys.length - 1]] = value;
    });
  };

  const handleNext = async e => {
    e.preventDefault();

    try {
      const validation = await Meteor.callAsync('validateStep3', formData);
      toast.success('✅ Step 3 Complete');
      navigate('/signup/step4');
    } catch (error) {
      const reason = error.reason || 'An unexpected error occurred while submitting your personal information!';
      toast.error(reason);
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
          duration: 3500
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white"
      >
        {/* LEFT SIDE: Logo & Tagline */}
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
            Tell us a bit about you 💬
          </p>
        </div>

        {/* RIGHT SIDE: Step 3 Form */}
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
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
          </div>

          <h3 className="text-2xl font-semibold text-[#024059]">
            Basic Information
          </h3>

          <div>
            <label htmlFor="givenName" className="block text-sm font-semibold mb-1">
              Given Name
            </label>
            <input
              id="givenName"
              name="profile.givenName"
              value={formData.profile.givenName || ''}
              onChange={handleChange}
              placeholder="Given Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="familyName" className="block text-sm font-semibold mb-1">
              Family Name
            </label>
            <input
              id="familyName"
              name="profile.familyName"
              value={formData.profile.familyName || ''}
              onChange={handleChange}
              placeholder="Family Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-semibold mb-1">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              name="profile.dateOfBirth"
              value={formData.profile.dateOfBirth || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-base bg-white text-gray-600 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03A64A] transition font-semibold"
            >
              →
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Step3;
