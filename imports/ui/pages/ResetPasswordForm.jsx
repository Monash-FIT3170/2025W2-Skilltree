import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { Regex } from '/imports/utils/Regex.js';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from '@react-icons/all-files/fi/FiAlertCircle';
import { FiCheck } from '@react-icons/all-files/fi/FiCheck';
import { FiEye } from '@react-icons/all-files/fi/FiEye';
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
import { FiLock } from '@react-icons/all-files/fi/FiLock';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { AnimatePresence } from 'framer-motion';
import { Accounts } from 'meteor/accounts-base';

export const ResetPasswordForm = () => {
  // Retrieve the token from the URL
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({
    newPassword: '',
    confirm: '',
    general: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const validatePasswordRealTime = value => {
    setNewPassword(value);

    let passwordError = '';
    if (!value) {
      passwordError = '';
    } else if (!Regex.password.test(value)) {
      passwordError =
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    setErrors(prev => ({
      ...prev,
      newPassword: passwordError,
      confirm:
        confirmNewPassword && value !== confirmNewPassword
          ? 'Passwords do not match'
          : ''
    }));
  };

  const validateConfirmPassword = value => {
    setConfirmNewPassword(value);

    let confirmError = '';
    if (value && newPassword && value !== newPassword) {
      confirmError = 'Passwords do not match';
    }

    setErrors(prev => ({
      ...prev,
      confirm: confirmError
    }));
  };

  const handleResetPasswordForm = async e => {
    e.preventDefault();

    // Clear previous errors
    setErrors({
      newPassword: '',
      confirm: '',
      general: ''
    });

    // Validate form
    let hasErrors = false;
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      hasErrors = true;
    } else if (!Regex.password.test(newPassword)) {
      newErrors.newPassword =
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
      hasErrors = true;
    }

    if (!confirmNewPassword) {
      newErrors.confirm = 'Please confirm your password';
      hasErrors = true;
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirm = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      //Reset old password with new
      await new Promise((resolve, reject) => {
        Accounts.resetPassword(token, newPassword, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      setResetComplete(true);

      // Redirect to signin after success
      //Accounts.resetPassword logs the user in after confirming new password
      Meteor.logout();
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors(prev => ({
        ...prev,
        general:
          error.reason ||
          'Failed to reset password. Please try again or request a new password reset link.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return resetComplete ? (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiCheck className="w-8 h-8 text-emerald-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Password Reset Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your password has been successfully updated.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-[#04BF8A] hover:bg-[#025940] text-white font-semibold rounded-xl transition-colors"
          >
            Continue to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <img
            src="/images/colouredLogo.png"
            alt="SkillTree Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto mb-6"
          />
          <div className="space-y-2 text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Reset your password
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your new password below for the account
            </p>
          </div>

          {/* General Error Message */}
          <AnimatePresence>
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700"
              >
                <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{errors.general}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Reset Form */}
          <form onSubmit={handleResetPasswordForm} className="space-y-6 mt-8">
            <div className="space-y-4">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-left text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => validatePasswordRealTime(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 text-base rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white ${
                      errors.newPassword
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : newPassword && !errors.newPassword
                          ? 'border-emerald-300 bg-emerald-50/50 focus:ring-emerald-100'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    required
                  />
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>

                  {newPassword && !errors.newPassword && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2"
                    >
                      <FiCheck className="w-5 h-5 text-emerald-500" />
                    </motion.div>
                  )}
                </div>
                <AnimatePresence>
                  {errors.newPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 flex items-start gap-1 text-sm text-red-600"
                    >
                      <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">
                        {errors.newPassword}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-left text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={e => validateConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 text-base rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white ${
                      errors.confirm
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                        : confirmNewPassword &&
                            !errors.confirm &&
                            newPassword === confirmNewPassword
                          ? 'border-emerald-300 bg-emerald-50/50 focus:ring-emerald-100'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    required
                  />
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>

                  {confirmNewPassword &&
                    !errors.confirm &&
                    newPassword === confirmNewPassword && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2"
                      >
                        <FiCheck className="w-5 h-5 text-emerald-500" />
                      </motion.div>
                    )}
                </div>
                <AnimatePresence>
                  {errors.confirm && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 flex items-start gap-1 text-sm text-red-600"
                    >
                      <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{errors.confirm}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={
                  loading ||
                  !!errors.newPassword ||
                  !!errors.confirm ||
                  !newPassword ||
                  !confirmNewPassword
                }
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`w-full py-4 rounded-xl font-semibold text-base text-white transition-all mt-8 duration-200 ${
                  loading ||
                  !!errors.newPassword ||
                  !!errors.confirm ||
                  !newPassword ||
                  !confirmNewPassword
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#04BF8A] hover:bg-[#025940] shadow-lg hover:shadow-xl active:shadow-md'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <ClipLoader size={20} color="#fff" />
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  <div>Reset Password</div>
                )}
              </motion.button>
            </div>
          </form>

          {/* Form Footer */}
          <div className="mt-8">
            <p className="text-sm sm:text-base text-gray-600">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-[#04BF8A] hover:text-[#025940] font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
