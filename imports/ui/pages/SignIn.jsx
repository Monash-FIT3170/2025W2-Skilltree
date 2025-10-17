import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';
import { Regex } from '/imports/utils/Regex.js';
import { FiEye } from '@react-icons/all-files/fi/FiEye';
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
import { FiMail } from '@react-icons/all-files/fi/FiMail';
import { FiLock } from '@react-icons/all-files/fi/FiLock';
import { FiAlertCircle } from '@react-icons/all-files/fi/FiAlertCircle';
import { FiCheck } from '@react-icons/all-files/fi/FiCheck';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { AnimatePresence } from 'framer-motion';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setError] = useState({
    email: '',
    password: '',
    credentials: ''
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmailRealTime = value => {
    setEmail(value);
    if (value && !Regex.email.test(value)) {
      setError(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    } else {
      setError(prev => ({ ...prev, email: '' }));
    }
  };

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
            //Attempt to merge the google account with existing account
            const validation = await Meteor.callAsync('mergeGoogleAccount');
            console.log(validation);

            if (validation.status === 'noManualAccount') {
              await Meteor.callAsync('addGoogleAccount');
            } else if (validation.status === 'missingGoogleEmail') {
              console.error('Google login failed: No Google email found');
            }
          } catch (error) {
            console.error('Failed to update user fields:', error);
          }
        }
      }
    );
  };
  const waitForUser = () => {
    return new Promise(resolve => {
      const handle = Tracker.autorun(comp => {
        if (Meteor.userId()) {
          comp.stop();
          resolve(Meteor.userId());
        }
      });

      setTimeout(() => {
        handle.stop();
        resolve(null);
      }, 2000);
    });
  };

  const handleLogin = async e => {
    e.preventDefault();

    const newErrors = { email: '', password: '', credentials: '' };
    let isError = false;

    if (!Regex.email.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isError = true;
    }

    setError(newErrors);

    if (isError) {
      return;
    }

    setLoggingIn(true);
    setError({ email: '', password: '', credentials: '' });

    Meteor.loginWithPassword(email, password, async error => {
      setLoggingIn(false);
      if (error) {
        setError({
          email: '',
          password: '',
          credentials: 'Invalid email or password. Please try again.'
        });
      } else {
        //if the user checked the RememberMe
        if (rememberMe) {
          try {
            const userId = await waitForUser();

            if (userId) {
              const result = await Meteor.callAsync('extendLoginExpiration');

              /*
                Meteor automatically tries to resume a session by reading the token stored in localStorage.
                If that token is no longer in the user's services.resume.loginTokens on the server, login will fail.

                So when we change token sessions on the server, we must update it on the client storage
              */
              await Accounts.loginWithToken(result.token);

              localStorage.setItem('rememberMe', 'true');
              console.log(result.message);
            }
          } catch (err) {
            console.error('Failed to extend your session', err);
          }
        } else {
          localStorage.removeItem('rememberMe');
        }
      }
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-6 sm:py-12 md:py-20 overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row max-w-6xl w-full min-w-[320px] rounded-xl shadow-2xl overflow-hidden"
        >
          {/* LEFT SECTION: Logo + Text */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#025940]/40 to-[#04BF8A]/40 flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12 min-h-[200px] md:min-h-0">
            <div className="relative flex flex-col items-center">
              <img
                src="/images/colouredLogo.png"
                alt="SkillTree Logo"
                className="w-20 h-20 sm:w-40 sm:h-40 md:w-72 md:h-72 lg:w-100 lg:h-100 object-contain shrink-0"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#025940] mt-2">
                SKILLTREE
              </h2>
            </div>
          </div>

          {/* RIGHT SECTION: Form */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center relative min-w-0">
            <div className="max-w-md mx-auto w-full min-w-[280px]">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Welcome back
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Sign in to continue your learning journey
                </p>
              </div>

              <AnimatePresence>
                {errors.credentials && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-2 text-sm text-red-600"
                  >
                    <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="text-sm">{errors.credentials}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleLogin}
                className="space-y-5 sm:space-y-6 mt-4"
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => validateEmailRealTime(e.target.value)}
                      className={`w-full min-w-0 pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white ${
                        errors.email
                          ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                          : email && !errors.email
                            ? 'border-emerald-300 bg-emerald-50/50 focus:ring-emerald-100'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                      required
                    />
                    <FiMail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    {email && !errors.email && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                      </motion.div>
                    )}
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 top-full mt-1 flex items-start gap-1 text-sm text-red-600"
                        >
                          <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm">
                            {errors.email}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2 mt-8 sm:mt-12">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className={`w-full min-w-0 pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white
                        ${'border-gray-200 hover:border-gray-300'}`}
                      required
                    />
                    <FiLock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 sm:gap-0">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#04BF8A] bg-gray-100 border-gray-300 rounded focus:ring-[#04BF8A] focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/password-recovery"
                    className="text-sm text-[#04BF8A] hover:text-[#025940] font-semibold transition-colors sm:text-right"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loggingIn}
                  whileHover={{ scale: loggingIn ? 1 : 1.02 }}
                  whileTap={{ scale: loggingIn ? 1 : 0.98 }}
                  className={`w-full py-3 sm:py-3.5 text-sm sm:text-base rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer ${
                    loggingIn
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#04BF8A] hover:bg-[#025940] shadow-lg hover:shadow-xl active:shadow-md'
                  }`}
                >
                  {loggingIn ? (
                    <div className="flex items-center justify-center gap-2">
                      <ClipLoader size={16} color="#fff" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <motion.button
                onClick={handleGoogleLogin}
                disabled={loggingIn}
                whileHover={{ scale: loggingIn ? 1 : 1.02 }}
                whileTap={{ scale: loggingIn ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-200 rounded-xl bg-white text-gray-700 font-medium transition-all duration-200 cursor-pointer ${
                  loggingIn
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span>Continue with Google</span>
              </motion.button>

              {/* Sign Up Link */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-[#04BF8A] hover:text-[#025940] font-semibold transition-colors"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* Footer Links */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <Link
                  to="/terms"
                  className="hover:text-gray-700 transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <Link
                  to="/privacy"
                  className="hover:text-gray-700 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
