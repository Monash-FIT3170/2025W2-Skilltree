import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

//Step 1: username, email, Password, confirm password
//Step 2: Full Name, Date of birth, Bio
//Step 3: Avatar URL
//Step 4: Terms and Conditions

const Step1 = () => {
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
      const validation = await Meteor.callAsync('validateNewUser', formData);
      console.log(validation);
      setError('');

      navigate('/signup/step2');
    } catch (error) {
      setError(
        error.reason || 'An unexpected error occurred with creating new user!'
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* LEFT SIDE: (SKILL TREE LOGO */}
        <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
          <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome to Skilltree</h2>
          <p className="text-center text-sm">
            Please join skill tree man, its the best application ever!
          </p>
        </div>

        {/* RIGHT SIDE: ACCOUNT USER INFOR -EMAIL, USERNAME, PASSWORD, CONFIRM PASSWORD */}
        <form onSubmit={handleNext} className="w-1/2 p-10 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create Your Account
          </h2>
          {error && <p className="text-red-500">{error}</p>}

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="repeatPass"
            type="password"
            value={repeatPass}
            onChange={e => setRepeatPass(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};
export default Step1;
