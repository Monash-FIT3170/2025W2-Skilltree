import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const BasicInfoStage = ({ formData, setFormData, prevStep }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    givenName: '',
    familyName: '',
    dateOfBirth: ''
  });

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
      const result = await Meteor.callAsync('validateBasicInfoStage', formData);

      if (!result.success) {
        setErrors({
          givenName: result.errors.givenName || '',
          familyName: result.errors.familyName || '',
          dateOfBirth: result.errors.dateOfBirth || ''
        });

        return;
      }

      //Set profile statuis as completed
      const completedFormData = {
        ...formData,
        profile: { ...formData.profile, isProfileComplete: true }
      };

      //Create new user
      await Meteor.callAsync('createNewUser', completedFormData);

      navigate('/');
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
            Basic Information
          </h3>

          <div className="space-y-1">
            <label
              htmlFor="givenName"
              className="block text-sm font-semibold text-black"
            >
              Given Name
            </label>
            <input
              id="givenName"
              name="profile.givenName"
              value={formData.profile.givenName || ''}
              onChange={handleChange}
              placeholder="Given Name"
              required
              className={`w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white text-sm sm:text-base ${errors.givenName ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div className="min-h-[1.25rem] pl-2">
              {errors.givenName && (
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.givenName}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="familyName"
              className="block text-sm font-semibold text-black"
            >
              Family Name
            </label>
            <input
              id="familyName"
              name="profile.familyName"
              value={formData.profile.familyName || ''}
              onChange={handleChange}
              placeholder="Family Name"
              required
              className={`w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white text-sm sm:text-base ${errors.familyName ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div className="min-h-[1.25rem] pl-2">
              {errors.familyName && (
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.familyName}
                </p>
              )}
            </div>
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
              className={`w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white text-sm sm:text-base ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
            />

            <div className="min-h-[1.25rem] pl-2">
              {errors.dateOfBirth && (
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.dateOfBirth}
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
              className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-[#04BF8A] text-white text-sm font-semibold hover:bg-[#03a57e] transition-all"
            >
              Create
            </button>
          </div>

          <div>
            <p className="text-xs text-center text-gray-700">
              By creating an account, you agree to the{' '}
              <Link
                to=""
                className="text-gray-600 underline hover:text-[#026873]"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to=""
                className="text-gray-600 underline hover:text-[#026873]"
              >
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
