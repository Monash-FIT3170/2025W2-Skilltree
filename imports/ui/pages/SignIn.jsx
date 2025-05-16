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
  const [showPassword, setShowPassword] = useState(false);

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

    Meteor.loginWithPassword(email, password, error => {
      setLoggingIn(false);
      if (error) {
        setError(error.reason || 'Login failed.');
      } else {
        console.log('User logged in successfully');
        navigate('/home'); //should be changed to Dashboard
      }
    });
  };

  //

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#f7f9f8]">
    <div className="bg-[#efefef] p-10 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">

        <label className="block text-sm font-semibold mb-2" htmlFor="email">
        Email Address
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="jane@example.com"
          required
          className="w-full px-4 py-2 border border-green-800 rounded-full placeholder:text-gray-500"
        />

        <label className="block text-sm font-semibold mb-2" htmlFor="password">
        Password
        </label>
        {/*If showPassword=true, type=text, if showPassword=false, type=password  */}
        <div className="relative">
          <input
          id="password"
          type={showPassword ? "text" : "password"} 
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-800 rounded-full placeholder:text-gray-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
          >
            {/*Not sure how to get the popular "eye/closed eye icon. Need to import image*/}
            {showPassword ? "🔒" : "🔓"}
          </button>
        </div>
        <p className='text-xs underline'>Forgot my password</p>


        <button
          type="submit"
          className="w-full bg-[#2f8760] hover:bg-[#256b4a] text-white font-bold py-2 rounded-full"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-700">
        Don't have an account?
      </p>
      <Link
        to="/signup"
        className="block mt-2 w-full bg-[#007a75] hover:bg-[#005f5c] text-white font-bold py-2 rounded-full text-center"
      >
        Create Account
      </Link>
    </div>
  </div>
);

};
