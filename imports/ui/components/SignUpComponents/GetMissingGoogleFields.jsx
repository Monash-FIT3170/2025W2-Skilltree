import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate} from 'react-router-dom';


const GetMissingGoogleFields = () => {
  const [error, setError] = useState(''); //This is to store any error messages when validating the account

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    profile: {
      dateOfBirth: ''
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
      await Meteor.callAsync('validateMissingGoogleFields', formData);
      setError('');

      await Meteor.callAsync('updateFields', Meteor.user(), formData);
      setError('');

      navigate('/home');

    } catch (error) {
      setError(
        error.reason || 'An unexpected error occurred with creating new user!'
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f7f6]">
      {/*The SignUp Box Container */}
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg transition-opacity bg-[#D9D9D9]">
        {/* LEFT SIDE: Logo and Skilltree title */}
        <div className="w-1/2 bg-[#D9D9D9] flex flex-col justify-center items-center px-12 py-20 space-y-6">
          <h2 className="text-4xl font-bold text-[#025940] tracking-wide">
            SKILLTREE
          </h2>
        </div>

        {/* RIGHT SIDE: user name and email */}
        <form
          onSubmit={handleNext}
          className="w-1/2 flex flex-col justify-center px-10 py-12 space-y-5"
        >
          {/*Progression Bar: After google sign up*/}
          <div className="flex items-center space-x-4 justify-center pb-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/2 h-1 bg-gray-300"></div>
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
          </div>

          <h3 className="text-2xl font-semibold text-[#024059]">
            Almost there! Let’s complete your profile.
          </h3>

          {error && <p className="text-red-500 text-sm">{error}</p>}

        
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 px-4 py-4 border border-gray-300 rounded-full text-base bg-white text-black"
          />

          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Date Of Birth
          </label>
          <input
            id="dob"
            type="date"
            name="profile.dateOfBirth"
            value={formData.profile.dateOfBirth || ''}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-full text-base bg-white text-gray-600"
          />




          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03A64A] transition"
            >
              Create Account
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

        </form>
      </div>
    </div>
  );
};

export default GetMissingGoogleFields;
