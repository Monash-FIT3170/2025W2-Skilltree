import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const Step3 = () => {
  const [error, setError] = useState(''); //This is to store any error messages when validating the account

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
    e.preventDefault(); //prevent refreshing

    try {
      const validation = await Meteor.callAsync('validateStep3', formData);
      console.log(validation);
      setError('');
      navigate('/signup/step4');
    } catch (error) {
      setError(
        error.reason ||
          'An unexpected error occurred with adding your personal information!'
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f7f6]">
      {/* SignUp Container */}
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg transition-opacity bg-[#D9D9D9]">
        {/* LEFT SIDE: Logo and Tagline */}
        <div className="w-1/2 bg-[#D9D9D9] flex flex-col justify-center items-center px-12 py-20 space-y-6">
          <h2 className="text-4xl font-bold text-[#025940] tracking-wide">
            SKILLTREE
          </h2>
        </div>

        {/* RIGHT SIDE: Step 3 BASIC INFO*/}
        <form
          onSubmit={handleNext}
          className="w-1/2 flex flex-col justify-center px-10 py-12 space-y-5 bg-[#D9D9D9]"
        >
          {/* Progression Bar: Step 3 */}
          <div className="flex items-center space-x-4 justify-center pb-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
          </div>

          <h3 className="px-4 text-2xl font-semibold text-[#024059]">
            Basic Information
          </h3>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="profile.fullName"
            value={formData.profile.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-full text-base bg-white text-black"
          />

          <input
            type="date"
            name="profile.dateOfBirth"
            value={formData.profile.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-full text-base bg-white text-gray-600"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03A64A] transition"
            >
              →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step3;
