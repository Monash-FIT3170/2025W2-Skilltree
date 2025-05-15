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
        {/* LEFT SIDE: (SKILL TREE LOGO) */}
        <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
          <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome to Skilltree</h2>
          <p className="text-center text-sm">
            Please join skill tree man, its the best application ever!
          </p>
        </div>

        {/* RIGHT SIDE: PERSONAL INFORATION: FULL NAME, DATE OF BIRTH, BIO (OPTIONAL)*/}
        <form onSubmit={handleNext} className="w-1/2 p-10 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            2. Personal Information
          </h2>
          {error && <p className="text-red-500">{error}</p>}

          <input
            name="profile.fullName"
            value={formData.profile.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="profile.dateOfBirth"
            value={formData.profile.dateOfBirth}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            name="profile.bio"
            type="text"
            value={formData.profile.bio}
            onChange={handleChange}
            placeholder="Enter a Bio (OPTIONAL)"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Step2;
