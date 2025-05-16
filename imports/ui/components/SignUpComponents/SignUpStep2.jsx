import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const Step2 = () => {
  const [repeatPass, setRepeatPass] = useState('');
  const [error, setError] = useState(''); //This is to store any error messages when validating the account

  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();

  /*
  This function is used to update fields, including nested fields in an object
  In ReactJS - do not update the formData directly, create a new copy --> update the state to use new copy
  ReactJS DOC recommends library: Immer.
  -Immer gives you a draft copy of the current state that you can safely mutate.
  -Immer creates a draft copy,we can freely mutate the draft, then return an immutable object
  */
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(draft => {
      const keys = name.split('.'); //takes the name atrribute and splits it eg: profile.fullName = ['profile', 'fullName]
      let field = draft;
      for (let i = 0; i < keys.length - 1; i++) {
        field = field[keys[i]];
      }
      field[keys[keys.length - 1]] = value; //formData gets updated with the field object via setFormData
    });
  };

  const handleNext = async e => {
    e.preventDefault();
    if (formData.password !== repeatPass) {
      setError('The Passwords do not match');
      return;
    }

    try {
      const validation = await Meteor.callAsync('validateStep2', formData);
      console.log(validation);
      setError('');

      navigate('/signup/step3');
    } catch (error) {
      setError(
        error.reason || 'An unexpected error occurred with creating new user!'
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f7f6]">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg bg-[#D9D9D9]">
        {/* LEFT SIDE: Logo and SkillTree title */}
        <div className="w-1/2 bg-[#D9D9D9] flex flex-col justify-center items-center px-12 py-20 space-y-6">
          <h2 className="text-4xl font-bold text-[#025940] tracking-wide">
            SKILLTREE
          </h2>
        </div>

        {/* RIGHT SIDE: Step 2 Form */}
        <form
          onSubmit={handleNext}
          className="w-1/2 flex flex-col justify-center px-10 py-12 space-y-5"
        >
          {/* Progression Bar: Step 2 */}
          <div className="flex items-center space-x-4 justify-center pb-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#04BF8A]"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
            <div className="w-1/4 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
          </div>

          <h3 className="text-2xl font-semibold text-[#024059] px-4">
            Profile Details
          </h3>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 px-4 py-4 border border-gray-300 rounded-full text-base bg-white text-black"
          />

          <input
            name="repeatPass"
            type="password"
            value={repeatPass}
            onChange={e => setRepeatPass(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full p-2 px-4 py-4 border border-gray-300 rounded-full text-base bg-white text-black"
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

export default Step2;
