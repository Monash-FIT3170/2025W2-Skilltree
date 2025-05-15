import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

//Step 1: username, email, Password, confirm password
//Step 2: Full Name, Date of birth, Bio
//Step 3: Avatar URL
//Step 4: Terms and Conditions

const Step2 = () => {
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
      const validation = await Meteor.callAsync(
        'validateUserPersonal',
        formData
      );
      console.log(validation);
      setError('');

      try {
        const creation = await Meteor.callAsync('createNewUser', formData);
        console.log(
          'User has been successfully created with userID: ',
          creation
        );
        setError('');
        navigate('/home');
      } catch (error) {
        setError(
          error.reason || 'An unexpected error occurred with creating new user!'
        );
      }
    } catch (error) {
      setError(
        error.reason ||
          'An unexpected error occurred with adding your personal information!'
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* LEFT SIDE: Skilltree Branding */}
        <div className="w-1/2 bg-gray-200 flex flex-col justify-center items-center p-12 space-y-6">
          <img src="/logo.png" alt="Skilltree Logo" className="w-28" />
          <h2 className="text-2xl font-semibold text-gray-700 tracking-wide">
            SKILLTREE
          </h2>
          <p className="text-center text-sm text-gray-600 leading-relaxed max-w-xs">
            “Growth doesn’t come by chance — it comes by effort.”
            <br />– Skilltree
          </p>
        </div>

        {/* RIGHT SIDE: Personal Information Form */}
        <form onSubmit={handleNext} className="w-1/2 p-10 space-y-5 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Step 2: Personal Information
          </h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="profile.fullName"
            value={formData.profile.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />

          <input
            type="date"
            name="profile.dateOfBirth"
            value={formData.profile.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-600"
          />

          <textarea
            name="profile.bio"
            value={formData.profile.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself (optional)"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded resize-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-full px-5 py-2 hover:bg-green-700 transition"
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
