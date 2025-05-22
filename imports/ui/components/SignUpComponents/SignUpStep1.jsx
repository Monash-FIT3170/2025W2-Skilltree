import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const Step1 = () => {
  const [error, setError] = useState('');
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
      const validation = await Meteor.callAsync('validateStep1', formData);
      console.log(validation);
      setError('');
      navigate('/signup/step2');
    } catch (error) {
      setError(error.reason || 'An unexpected error occurred!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3f7f6] to-[#e6faf6] px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white"
      >
        {/* LEFT: Logo and tagline */}
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
            Join a community that’s growing with you 🌿
          </p>
        </div>

        {/* RIGHT: Step 1 Form */}
        <form
          onSubmit={handleNext}
          className="md:w-1/2 w-full p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
          </div>

          <h3 className="text-2xl font-semibold text-[#024059]">
            Account Details
          </h3>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03a57e] transition-all font-medium"
            >
              →
            </button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#026873] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Step1;
