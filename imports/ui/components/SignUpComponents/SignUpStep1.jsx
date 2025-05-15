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
      <div className="flex w-full max-w-4xl bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        {/* LEFT SIDE: Logo Block */}
        <div className="w-1/2 bg-gray-200 flex flex-col justify-center items-center px-12 py-20 space-y-6">
          <img src="/SKILLTREELOGO.png" alt="Skilltree Logo" className="w-28" />

          <h2 className="text-4xl font-bold text-gray-700 tracking-wide">
            SKILLTREE
          </h2>

          <p className="text-center text-sm text-gray-600 leading-relaxed max-w-xs">
            “Every skill starts as a seed. You decide if it grows.”
            <br />– William ShakeSpeare
          </p>
        </div>

        {/* RIGHT SIDE: Form Block */}
        <form
          onSubmit={handleNext}
          className="w-1/2 flex flex-col justify-center px-10 py-12 space-y-5"
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 px-4 border border-gray-300 rounded-full text-sm"
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-2 px-4 border border-gray-300 rounded-full text-sm"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 px-4 border border-gray-300 rounded-full text-sm"
          />
          <input
            name="repeatPass"
            type="password"
            value={repeatPass}
            onChange={e => setRepeatPass(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full p-2 px-4 border border-gray-300 rounded-full text-sm"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-full px-5 py-2 hover:bg-green-700 transition"
            >
              →
            </button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Step1;
