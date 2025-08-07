import React, { useState, useEffect } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { FaCheckCircle } from 'react-icons/fa';
import { GoXCircleFill } from 'react-icons/go';
import { Regex } from '/imports/utils/Regex';

export const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Password checks - matching Step2 component structure
  const [passMinMaxChar, setPassMinMaxChar] = useState(false);
  const [passUpperCase, setPassUpperCase] = useState(false);
  const [passLowerCase, setPassLowerCase] = useState(false);
  const [passSpecialChar, setPassSpecialChar] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordsDifferent, setPasswordsDifferent] = useState(false);

  // Password checks function - matching Step2 component
  const passwordChecks = password => {
    // Check minimum 8 and max of 64 characters
    setPassMinMaxChar(password.length >= 8 && password.length <= 64);

    // Check for uppercase letter
    setPassUpperCase(Regex.uppercase.test(password));

    // Check for lowercase letter
    setPassLowerCase(Regex.lowercase.test(password));

    // Check for special character
    setPassSpecialChar(Regex.special.test(password));

    // Check for number
    setPassNumber(Regex.number.test(password));
  };

  // Additional checks for password change functionality
  const additionalChecks = () => {
    // Check if passwords match
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== '');

    // Check if new password is different from current
    setPasswordsDifferent(
      currentPassword !== newPassword && newPassword !== ''
    );
  };

  // useEffect to run password validation whenever newPassword changes
  useEffect(() => {
    if (newPassword) {
      passwordChecks(newPassword);
    } else {
      // Reset all checks when password is empty
      setPassMinMaxChar(false);
      setPassUpperCase(false);
      setPassLowerCase(false);
      setPassSpecialChar(false);
      setPassNumber(false);
    }
  }, [newPassword]);

  // useEffect to run additional checks when passwords change
  useEffect(() => {
    additionalChecks();
  }, [newPassword, confirmPassword, currentPassword]);

  // Check if all validations pass
  const isValidPassword =
    passMinMaxChar &&
    passUpperCase &&
    passLowerCase &&
    passSpecialChar &&
    passNumber &&
    passwordsMatch &&
    passwordsDifferent;

  const handlePasswordChange = () => {
    // Clear previous messages
    setMessage({ type: '', text: '' });

    // Validation checks
    if (!currentPassword.trim()) {
      setMessage({
        type: 'error',
        text: 'Please enter your current password.'
      });
      return;
    }

    if (!newPassword.trim()) {
      setMessage({ type: 'error', text: 'Please enter a new password.' });
      return;
    }

    if (!confirmPassword.trim()) {
      setMessage({ type: 'error', text: 'Please confirm your new password.' });
      return;
    }

    if (!isValidPassword) {
      setMessage({
        type: 'error',
        text: 'Please ensure all password requirements are met.'
      });
      return;
    }

    setIsLoading(true);

    Accounts.changePassword(currentPassword, newPassword, error => {
      setIsLoading(false);
      if (error) {
        console.log('Error:', error.reason);
        setMessage({
          type: 'error',
          text: error.reason || 'Failed to change password.'
        });
      } else {
        console.log('Password changed successfully!');
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        // Clear form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
          Password Settings
        </h2>
        <p className="text-gray-600">
          Update your password and security settings.
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
            placeholder="Enter your current password"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
            placeholder="Enter your new password"
          />

          {/* Password Requirements*/}

          <div className="mt-3 text-xs space-y-1">
            <div className="flex items-center gap-2">
              {passMinMaxChar ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>Must be 8-64 characters long</span>
            </div>
            <div className="flex items-center gap-2">
              {passUpperCase ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>At least 1 uppercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              {passLowerCase ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>At least 1 lowercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              {passSpecialChar ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>At least 1 special character</span>
            </div>
            <div className="flex items-center gap-2">
              {passNumber ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>At least 1 number</span>
            </div>
            <div className="flex items-center gap-2">
              {passwordsDifferent ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>Must be different from current password</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
            placeholder="Confirm your new password"
          />

          {/* Password Match Validation */}
          <div className="mt-2 text-xs">
            <div className="flex items-center gap-2">
              {passwordsMatch ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <GoXCircleFill className="text-red-500" />
              )}
              <span>Passwords match</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={!isValidPassword || isLoading}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isValidPassword && !isLoading
              ? 'bg-[#328E6E] hover:bg-[#2d7a5e] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};
