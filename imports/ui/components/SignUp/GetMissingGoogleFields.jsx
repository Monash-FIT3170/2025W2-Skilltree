import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountSetup } from '/imports/ui/layouts/Auth/AccountSetup';
import { SignUpNavigationButtons } from '/imports/ui/components/SignUp/SignUpNavigationButtons';

export const GetMissingGoogleFields = () => {
  const [errors, setErrors] = useState({ username: '', dateOfBirth: '' }); //This is to store any error messages when validating the account

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
      const result = await Meteor.callAsync(
        'validateMissingGoogleFields',
        formData
      );

      if (!result.success) {
        setErrors({
          username: result.errors.username || '',
          dateOfBirth: result.errors.dateOfBirth || ''
        });
        return;
      }

      setErrors({ username: '', dateOfBirth: '' });

      //Meteor Doc Update: need to use dot notation
      const updateFields = {
        username: formData.username,
        'profile.dateOfBirth': formData.profile.dateOfBirth,
        'profile.updatedAt': formData.profile.updatedAt,
        'profile.lastLogin': formData.profile.lastLogin,
        'profile.isProfileComplete': true
      };

      await Meteor.callAsync('updateFields', updateFields);

      navigate('/');
    } catch (error) {
      console.error(error.reason || 'Something went wrong here!');
    }
  };
  return (
    <AccountSetup showStepBar={false}>
      <form
        onSubmit={handleNext}
        className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-6"
      >
        <div className="flex flex-col space-y-4 sm:space-y-6 w-full max-w-[400px] mx-auto lg:mx-0">
          <h3 className="text-lg sm:text-2xl font-semibold text-black text-center lg:text-left">
            Almost there! Let's complete your profile.
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
              className={`w-full px-4 py-3 rounded-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} outline-none text-black bg-white placeholder:text-gray-500 text-sm sm:text-base`}
            />
            <p className="text-xs sm:text-sm text-red-500 whitespace-pre-line min-h-[1.25rem] pl-2">
              {errors.username}
            </p>
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
              className={`w-full px-4 py-3 rounded-full border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} outline-none text-black bg-white text-sm sm:text-base`}
            />
            <p className="text-xs sm:text-sm text-red-500 whitespace-pre-line min-h-[1.25rem] pl-2">
              {errors.dateOfBirth}
            </p>
          </div>

          {/* Navigation Arrows */}
          <SignUpNavigationButtons currentStep={1} totalSteps={1} />
        </div>
      </form>
    </AccountSetup>
  );
};
