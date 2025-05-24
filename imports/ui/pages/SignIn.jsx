import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { emailRegex, passwordRegex } from '/imports/api/Regex';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { toast, Toaster } from 'react-hot-toast';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /*
  Logging in with google, does not let us have access to their dateofbirth and other sensitive data.
  The user also misses out on creating a username.
  Default username is their id, however, it is not recommended to render database information to the public eye.
  Thus, we must ask for extra information.
  */
  const handleGoogleLogin = async e => {
    e.preventDefault();

    Meteor.loginWithGoogle(
      { loginStyle: 'popup', requestPermissions: ['email', 'profile'] },
      async err => {
        if (err) {
          console.error('Google login failed', err);
        } else {
          console.log('Logged in with Google successfully!');

          try {
            const user = Meteor.user();

            const validation = await Meteor.callAsync(
              'addNewGoogleFields',
              user
            );

            navigate('/login/extraStep1');
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
      toast.error('Please enter a valid email');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('Password format is invalid.');
      toast.error('Password must include upper, lower, number, special char');
      return;
    }

    setLoggingIn(true);
    setError('');

    Meteor.loginWithPassword(email, password, error => {
      setLoggingIn(false);
      if (error) {
        setError(error.reason || 'Login failed.');
        toast.error(error.reason || 'Login failed');
      } else {
        toast.success('Welcome back!');
        navigate('/home');
      }
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 sm:py-20">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-12"
        >
          {/* LEFT SECTION: Logo + Text */}
          <div className="w-1/2 flex items-center pr-4">
            <div className="relative flex items-center">
              <img
                src="/images/logo.png"
                alt="SkillTree Logo"
                className="w-80 h-80 object-contain shrink-0"
              />
              <h2 className="text-5xl font-bold text-[#025940] absolute left-[74%]">
                SKILLTREE
              </h2>
            </div>
          </div>

          {/* RIGHT SECTION: Form */}
          <div className="w-1/2 bg-white rounded-xl p-10 flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-bold text-center">
              Welcome back to SkillTree
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email input with icon */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[#EEF2FF] text-sm outline-none border border-gray-300"
                  required
                />
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              {/* Password input with icon and eye toggle */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 rounded-full bg-[#EEF2FF] text-sm outline-none border border-gray-300"
                  required
                />
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

            <p className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition duration-200 pt-2">
              Forgot my password?
            </p>


              {/* Submit button */}
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full bg-[#04BF8A] text-white font-semibold py-2 rounded-full hover:bg-[#03a57e] transition-all"
              >
                {loggingIn ? <ClipLoader size={20} color="#fff" /> : 'Login'}
              </button>
            </form>

            <p className="text-base text-center text-gray-500 pt-1">
              Don't have an account?
            </p>
            <Link
              to="/signup"
              className="w-full bg-[#024E40] text-white text-sm font-semibold py-2 rounded-full text-center hover:bg-[#023e31] transition-all"
            >
              Create Account
            </Link>

            <div className="flex items-center my-5 w-full max-w-ws">
              <div className="flex-grow h-px bg-gray-700" />
              <span className="px-3 text-gray-700 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-700" />
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-6 py-2 border border-gray-300 bg-white rounded-full hover:scale-[1.02] transition-all"
              >
                <span className="w-6 flex justify-center">
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                </span>

              <span className="text-base ml-3">Continue with Google</span>
            </button>

          </div>

            <div className="flex justify-center items-center gap-x-4 mt-6 text-gray-500 text-base">
              <Link
                to=""
                className="hover:underline transition-all duration-300 underline-offset-4"
              >
                <p>Terms of Service</p>
              </Link>{' '}
              <span>|</span>{' '}
              <Link
                to=""
                className="hover:underline transition-all duration-300 underline-offset-4"
              >
                <p>Privacy Policy</p>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
