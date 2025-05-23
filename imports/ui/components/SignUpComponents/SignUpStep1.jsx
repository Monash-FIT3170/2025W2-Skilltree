import { Meteor } from 'meteor/meteor';
import React, { Suspense, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

const Step1 = () => {
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
    const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernamePattern.test(formData.username)) {
      toast.error(
        `Username is invalid:\n• Minimum 3 characters\n• Maximum 20 characters\n• Can only contain letters, digits, hyphens, underscores`
      );
      return;
    }

    try {
      await Meteor.callAsync('validateStep1', formData);
      toast.success('✅ Step 1 Complete');
      navigate('/signup/step2');
    } catch (error) {
      toast.error(error.reason || 'An unexpected error occurred!');
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white px-6 py-10">
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
              src="/images/logo.png"
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
            {/* Step Bar - 4 steps */}
            <div className="flex items-center justify-between w-full">
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Account Details
            </h3>

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-black"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder:text-gray-500 text-black bg-white focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Username */}
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
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder:text-gray-500 text-black bg-white focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Navigation Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                →
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Step1;
