import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { emailRegex, passwordRegex } from '/imports/api/Schemas';


//This is the Login React Component to handle user registration
export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();


  //Event listener: Clicking Login
  const handleLogin = async e => {
    e.preventDefault(); //no refreshing when submitting

    //Validate the email:
    if (!emailRegex.test(email)) {
        setError('Invalid email format.');
        return;
    }

    //Validate the password:
    if (!passwordRegex.test(password)) {
        setError(`Password is invalid:
        - Minimum 8 characters
        - Maximum 64 characters
        - Must include uppercase, lowercase, number, and special character`);
        return;
    }

    setLoggingIn(true);
    setError('');

    Meteor.loginWithPassword(email, password, (error)=>{
        setLoggingIn(false);
        if (error) {
            setError(error.reason || 'Login failed.');
        } else {
            console.log('User logged in successfully');
            navigate('/home');
        }
    })
  };

  //

  return (
    // className used to apply CSS classes to elements
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-8 space-y-4">
      <h2 className="text-x1 font-bold">Login into SkillTree</h2>
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
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border"
      />
   
    
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>

      <p>
        Don't have an account?{"   "}
        <Link to="/signup" className="text-blue-600 underline">Create Account</Link>
      </p>

    </form>
  );
};
