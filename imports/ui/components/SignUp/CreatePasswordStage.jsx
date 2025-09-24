import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { FiEye } from '@react-icons/all-files/fi/FiEye';
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
import { FiLock } from '@react-icons/all-files/fi/FiLock';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { BsXCircleFill } from '@react-icons/all-files/bs/BsXCircleFill';
import { motion } from 'framer-motion';

import { Regex } from '/imports/utils/Regex';

export const CreatePasswordStage = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const [repeatPass, setRepeatPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', lengthPass: '' });

  //Password checks
  const [passMinMaxChar, setPassMinMaxChar] = useState(false);
  const [passUpperCase, setPassUpperCase] = useState(false);
  const [passLowerCase, setPassLowerCase] = useState(false);
  const [passSpecialChar, setPassSpecialChar] = useState(false);
  const [passNumber, setPassNumber] = useState(false);

  const passwordChecks = password => {
    // Check minimum 8 and max of 64 characters
    setPassMinMaxChar(password.length >= 8 && password.length <= 64);

    // Check for uppercase letter
    setPassUpperCase(Regex.uppercase.test(password));

    // Check for lowercase letter
    setPassLowerCase(Regex.lowercase.test(password));

    // Check for special character
    setPassSpecialChar(Regex.special.test(password));

    // Check for number
    setPassNumber(Regex.number.test(password));
  };

  //We utilise useEffect hook that runs the password validation whenever the component mounts or formData.password changes
  //Mounts: for example, when we navigate back to the password page, the component mounts with the existing password value and useEffect immediately runs
  useEffect(() => {
    if (formData.password) {
      passwordChecks(formData.password);
    }
  }, [formData.password]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'password') {
      passwordChecks(value);
    }

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

    setErrors(newErrors);

    if (isErrors) {
      return;
    }

    try {
      const result = await Meteor.callAsync(
        'validateCreatePasswordStage',
        formData
      );

      if (!result.success) {
        setErrors({
          password: result.errors.password || ''
        });
        return;
      }

      nextStep();
    } catch (error) {
      console.error(error.reason || 'An unexpected error occurred!');
    }
  };

  return (
    <>
      {/* RIGHT SECTION: Form */}
      <form
        onSubmit={handleNext}
        className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-6"
      >
        <div className="flex flex-col space-y-4 sm:space-y-6 w-full max-w-[400px] mx-auto lg:mx-0">
          <h3 className="text-xl sm:text-2xl font-semibold text-black text-center lg:text-left">
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
                className={`pl-10 pr-10 py-3 w-full border border-gray-300 rounded-full text-black bg-white placeholder:text-gray-500 text-sm sm:text-base ${errors.lengthPass ? 'border-red-500' : 'border-gray-300'}`}
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

            <div className="text-xs space-y-1 px-2">
              <div className="flex items-center gap-2">
                {passMinMaxChar ? (
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                ) : (
                  <BsXCircleFill className="text-red-500 flex-shrink-0" />
                )}{' '}
                <span>Must be 8-64 characters long</span>
              </div>
              <div className="flex items-center gap-2">
                {passUpperCase ? (
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                ) : (
                  <BsXCircleFill className="text-red-500 flex-shrink-0" />
                )}{' '}
                <span>At least 1 uppercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                {passLowerCase ? (
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                ) : (
                  <BsXCircleFill className="text-red-500 flex-shrink-0" />
                )}{' '}
                <span>At least 1 lowercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                {passSpecialChar ? (
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                ) : (
                  <BsXCircleFill className="text-red-500 flex-shrink-0" />
                )}{' '}
                <span>At least 1 special character</span>
              </div>
              <div className="flex items-center gap-2">
                {passNumber ? (
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                ) : (
                  <BsXCircleFill className="text-red-500 flex-shrink-0" />
                )}{' '}
                <span>At least 1 number</span>
              </div>
            </div>

            <div className="min-h-[1.25rem] pl-2">
              {errors.lengthPass && (
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.lengthPass}
                </p>
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
                className={`pl-10 pr-10 py-3 w-full rounded-full text-black bg-white placeholder:text-gray-500 text-sm sm:text-base ${errors.password ? 'border-red-500' : 'border-gray-300'} border`}
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
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => prevStep()}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all text-lg sm:text-xl"
            >
              ←
            </button>
            <button
              type="submit"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all text-lg sm:text-xl"
            >
              →
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
