import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

//This is the SignUp React Component to handle user registration
export const SignUp = () => {
  //Initialise state variables: const [state, setState] = useState(initialState)
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [dateOfBirth, setDOB] = useState('');
  const [error, setError] = useState(''); //This is to store any error messages when validating the account

  //Event listener: Clicking Sign Up
  const handleSignUp = async e => {
    e.preventDefault(); //no refreshing when submitting

    //Note: Meteor by default restricts what user fields are published to the client.
    //We can actually override this with a Meteor.publish
    //However, this is not good practice apparently
    //Instead, we can just include every custom field inside profile
    //The Accounts.createUser() method expects email (singular) — not the full emails array that the schema is expecting.
    var userOptions = {
      username: username,
      password: password,
      email: email,
      profile: {
        fullName: 'Steven Kaing',
        avatarUrl: 'https://example.com/avatar.jpg',
        bio: 'idk what to put here lol',
        dateOfBirth: new Date(dateOfBirth),
        subscribedCommunities: ['iCZmdXWy5GyqoqBox', 'iCZmdXWy5GyqoqBox'],
        roles: ['user', 'moderator'],
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        proof_of_practice_uploads: [
          '65a8b11f3d93c27b3c1b9de1',
          '65a8b11f3d93c27b3c1b9de2'
        ],
        expertise_areas: ['Web Development', 'Cybersecurity', 'Devsssps'],
        membership_tier: 'pro'
      }
    };

    try {
      const validation = await Meteor.callAsync('validateNewUser', userOptions);
      console.log(validation);
      setError('');

      const creation = await Meteor.callAsync('createNewUser', userOptions);
      console.log('User has been successfully created with userID: ', creation);
      setError('');
    } catch (error) {
      setError(
        error.reason || 'An unexpected error occurred with creating new user!'
      );
    }
  };

  //

  return (
    // className used to apply CSS classes to elements
    <form onSubmit={handleSignUp} className="max-w-sm mx-auto mt-8 space-y-4">
      <h2 className="text-x1 font-bold">Create Your Account</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your Email"
        required
        className="w-full p-2 border"
      ></input>
      <input
        type="username"
        value={username}
        onChange={e => setUserName(e.target.value)}
        placeholder="Username"
        required
        className="w-full p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border"
      />
      <input
        type="password"
        value={repeatPass}
        onChange={e => setRepeatPass(e.target.value)}
        placeholder="Repeat Password"
        required
        className="w-full p-2 border"
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={e => setDOB(e.target.value)}
        placeholder="DD/MM/YYYY"
        required
        className="w-full p-2 border"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>

      <p>
        Already have an account?{"   "}
        <Link to="/login" className="text-blue-600 underline">Login</Link>
      </p>

      
     


    </form>
  );
};
