import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Step2 = () => {
  const [repeatPass, setRepeatPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', lengthPass: '' });

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

    const newErrors = { password: '', lengthPass: '' };
    let isErrors = false;

    if (formData.password !== repeatPass) {
      newErrors.password = 'Passwords must match!';
      isErrors = true;
    }

    if (formData.password.length < 8) {
      newErrors.lengthPass = 'Weak password: Minimum 8 characters';
      isErrors = true;
    }

    setErrors(newErrors);

    if (isErrors) {
      return;
    }

    try {
      const result = await Meteor.callAsync('validateStep2', formData);

      if (!result.success) {
        setErrors({
          password: result.errors.password || ''
        });
        return;
      }

      navigate('/signup/step3');
    } catch (error) {
      console.error(error.reason || 'An unexpected error occurred!');
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white px-6 py-10">
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
            {/* Step Bar - 4 steps */}
            <div className="flex items-center justify-between w-full">
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Create Password
            </h3>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-black"
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
                  className={`pl-10 pr-10 py-3 w-full border border-gray-300 rounded-full text-black bg-white placeholder:text-gray-500 ${errors.lengthPass ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="min-h-[1.25rem] pl-2">
                {errors.lengthPass && (
                  <p className="text-sm text-red-500">{errors.lengthPass}</p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label
                htmlFor="repeatPass"
                className="block text-sm font-semibold text-black"
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
                  className={`pl-10 pr-10 py-3 w-full rounded-full text-black bg-white placeholder:text-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-300'} border`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="min-h-[1.25rem] pl-2">
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate('/signup/step1')}
                className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                ←
              </button>
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

export default Step2;
