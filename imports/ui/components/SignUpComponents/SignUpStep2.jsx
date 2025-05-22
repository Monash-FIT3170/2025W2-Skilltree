import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

const Step2 = () => {
  const [repeatPass, setRepeatPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (formData.password !== repeatPass) {
      toast.error('❌ Passwords must match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('❌ Weak password: Minimum 8 characters');
      return;
    }

    try {
      const validation = await Meteor.callAsync('validateStep2', formData);
      toast.success('✅ Step 2 Complete');
      navigate('/signup/step3');
    } catch (error) {
      toast.error(error.reason || 'An unexpected error occurred!');
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
          error: {
            iconTheme: {
              primary: '#DC2626',
              secondary: '#FFEBEB'
            }
          },
          success: {
            iconTheme: {
              primary: '#059669',
              secondary: '#ECFDF5'
            }
          }
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white"
      >
        {/* LEFT: Logo Section */}
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
            Secure your profile with a strong password 🔐
          </p>
        </div>

        {/* RIGHT: Form Section */}
        <form
          onSubmit={handleNext}
          className="md:w-1/2 w-full p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white"
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
          </div>

          <h3 className="text-2xl font-semibold text-[#024059]">
            Profile Details
          </h3>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="repeatPass"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="repeatPass"
                name="repeatPass"
                type={showConfirmPassword ? 'text' : 'password'}
                value={repeatPass}
                onChange={e => setRepeatPass(e.target.value)}
                placeholder="Re-enter your password"
                required
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-400 outline-none transition-all"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03A64A] transition font-semibold"
            >
              →
            </button>
          </div>

          {/* Instruction */}
          <p className="text-xs text-center text-gray-400">
            Press <strong>Enter</strong> to continue
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Step2;
