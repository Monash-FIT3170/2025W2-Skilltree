// Add this at the top only if you're using Tailwind's custom animation classes
import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { emailRegex, passwordRegex } from '/imports/api/Schemas';
import { FiMail, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = async e => {
    e.preventDefault();
    Meteor.loginWithGoogle(
      { loginStyle: 'popup', requestPermissions: ['email', 'profile'] },
      async err => {
        if (err) {
          console.error('Google login failed', err);
        } else {
          try {
            const user = Meteor.user();
            const validation = await Meteor.callAsync('updateUserFields', user);
            console.log('Update result:', validation);
            navigate('/home');
          } catch (error) {
            console.error('Failed to update user fields:', error);
          }
        }
      }
    );
  };

  const handleFacebookLogin = async e => {
    e.preventDefault();
    Meteor.loginWithFacebook(
      { loginStyle: 'popup', requestPermissions: ['email', 'public_profile'] },
      async err => {
        if (err) {
          console.error('Facebook login failed', err);
        } else {
          try {
            const user = Meteor.user();
            const validation = await Meteor.callAsync('updateUserFields', user);
            console.log('Update result:', validation);
            navigate('/home');
          } catch (error) {
            console.error('Failed to update user fields:', error);
          }
        }
      }
    );
  };

  const handleLogin = async e => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(`Password is invalid: must be 8-64 characters, include uppercase, lowercase, number, and special character.`);
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
        navigate('/home');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f9f8] to-[#e0f7ed] px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* 🌿 Logo area */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.png"
            alt="SkillTree Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
          Welcome back to <span className="text-green-700">SkillTree</span>
        </h2>

        <div className="w-full flex flex-col items-center gap-4 mb-2">
          {/* Google login button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center gap-3 px-6 py-3 border border-gray-300 bg-white rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Facebook login button */}
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center gap-3 px-6 py-3 border border-gray-300 bg-white rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <img src="/images/FacebookLogo.svg" alt="Facebook" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Continue with Facebook</span>
          </button>
        </div>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {error && <p className="text-red-500 text-center mb-4 text-sm font-medium">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="pl-10 pr-4 py-2 w-full border border-green-700 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="pl-10 pr-10 py-2 w-full border border-green-700 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <p className="text-xs text-blue-600 hover:underline cursor-pointer">
              Forgot my password?
            </p>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 rounded-full transition-all"
          >
            {loggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?
        </p>
        <Link
          to="/signup"
          className="block mt-2 w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 rounded-full text-center transition-all"
        >
          Create Account
        </Link>
      </motion.div>
    </div>
  );
};
