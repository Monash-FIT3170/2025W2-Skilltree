import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const Step3 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();
  const [errors, setErrors] = useState({ dateOfBirth: '' });

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
      await Meteor.callAsync('validateStep3', formData);
      navigate('/signup/step4');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: error.reason || 'An unexpected error occurred!'
      }));
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
            {/* Step Bar */}
            <div className="flex items-center justify-between w-full">
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-black">
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
                className="w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white placeholder:text-gray-500"
              />
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
                className="w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white placeholder:text-gray-500"
              />
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
                className={`w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
              />

              <div className="min-h-[1.25rem] pl-2">
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                )}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate('/signup/step2')}
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

export default Step3;
