import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Regex } from '/imports/utils/Regex.js';
import { Link } from 'react-router-dom';
import { FiMail, FiAlertCircle, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { AnimatePresence } from 'framer-motion';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    general: ''
  });

  const [loading, setLoading] = useState(false);
  const [emailIsSent, setEmailIsSent] = useState(false);

  const validateEmailRealTime = value => {
    setEmail(value);

    if (value && !Regex.email.test(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handleForgotPasswordForm = async e => {
    e.preventDefault();

    const newErrors = { email: '', general: '' };
    let isError = false;

    //double check the email if it is in valid form
    if (!Regex.email.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isError = true;
    }

    setErrors(newErrors);
    if (isError) {
      return;
    }

    setLoading(true);

    //Meteor call:
    Accounts.forgotPassword({ email }, error => {
      setLoading(false);
      if (error) {
        console.log(error.reason);
      } else {
        setEmailIsSent(true);
      }
    });

    if (emailIsSent) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-6 sm:py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                We've sent a password reset link to{' '}
                <strong className="break-words">{email}</strong>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEmailIsSent(false);
                    setEmail('');
                  }}
                  className="w-full py-3 px-4 bg-[#04BF8A] text-white rounded-xl font-semibold hover:bg-[#025940] transition-colors active:scale-95"
                >
                  Try another email
                </button>
                <Link
                  to="/signin"
                  className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/*Mobile Screen Layout */}
      <div className="">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <img
              src="/images/colouredLogo.png"
              alt="SkillTree Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto "
            />
            <div className="space-y-2 text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Forgot Your Password?
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Enter your Skilltree email below and we'll send you a link to
                reset it.
              </p>
            </div>

            {/*Email Submit Form */}
            <form
              onSubmit={handleForgotPasswordForm}
              className="space-y-6 mt-12"
            >
              <div className="space-y-4">
                <label
                  htmlFor="email"
                  className="block text-left text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => validateEmailRealTime(e.target.value)}
                    className={`w-full pl-12 pr-10 py-4 text-base rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white ${
                      errors.email
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : email && !errors.email
                          ? 'border-emerald-300 bg-emerald-50/50 focus:ring-emerald-100'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    required
                  />
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  {email && !errors.email && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <FiCheck className="w-5 h-5 text-emerald-500" />
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
                        <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{errors.email}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/*Send reset password url button*/}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className={`w-full py-4 rounded-xl font-semibold text-base text-white transition-all mt-8 duration-200 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#04BF8A] hover:bg-[#025940] shadow-lg hover:shadow-xl active:shadow-md'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <ClipLoader size={20} color="#fff" />
                      <span>Send reset password link</span>
                    </div>
                  ) : (
                    <div>Send reset password link</div>
                  )}
                </motion.button>
              </div>
            </form>

            {/*form footer */}
            <div className="mt-8">
              <p className="text-sm sm:text-base text-gray-600">
                Remember your password?{' '}
                <Link
                  to="/signin"
                  className="text-[#04BF8A] hover:text-[#025940] font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*Desktop view */}
      <div></div>
    </div>
  );
};
