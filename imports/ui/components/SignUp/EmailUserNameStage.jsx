import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const EmailUserNameStage = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({ email: '', username: '' });

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

    const newErrors = { email: '', username: '' };
    let isError = false;

    if (!usernamePattern.test(formData.username)) {
      newErrors.username =
        'No Special Characters. Username must be 3–20 characters. Use letters, numbers, - or _';
      isError = true;
    }

    setErrors(newErrors);
    if (isError) {
      return;
    }

    try {
      const result = await Meteor.callAsync(
        'validateEmailUserNameStage',
        formData
      );

      if (!result.success) {
        setErrors({
          email: result.errors.email || '',
          username: result.errors.username || ''
        });
        return;
      }
      setErrors({ email: '', username: '' });
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
              className={`w-full px-4 py-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-full placeholder:text-gray-500 text-black bg-white focus:ring-2 focus:ring-green-400 outline-none text-sm sm:text-base`}
            />

            <div className="min-h-[1.25rem] pl-2">
              {errors.email && (
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
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
              className={`w-full px-4 py-3 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-full placeholder:text-gray-500 text-black bg-white focus:ring-2 focus:ring-green-400 outline-none text-sm sm:text-base`}
            />
            <div className="min-h-[1.25rem] pl-2">
              {errors.username && (
                <p className="text-xs sm:text-sm text-red-500">
                  {errors.username}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Button */}
          <div className="flex justify-center lg:justify-end pt-2">
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
