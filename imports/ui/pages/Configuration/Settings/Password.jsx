// imports/ui/pages/Settings/Password.jsx
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { BsXCircleFill } from '@react-icons/all-files/bs/BsXCircleFill';
import { Regex } from '/imports/utils/Regex';

export const Password = () => {
  // --- Reactive current user (for privacy flag) ---
  const user = useTracker(() => Meteor.user(), []);
  const initialIsPublic = user?.profile?.isProfilePublic ?? true;

  // --- Local state (password form) ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // --- Local state (privacy toggle) ---
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [isSavingPrivacy, setIsSavingPrivacy] = useState(false);

  // Keep toggle in sync with user doc
  useEffect(() => {
    setIsPublic(user?.profile?.isProfilePublic ?? true);
  }, [user?._id, user?.profile?.isProfilePublic]);

  // --- Password requirement flags ---
  const [passMinMaxChar, setPassMinMaxChar] = useState(false);
  const [passUpperCase, setPassUpperCase] = useState(false);
  const [passLowerCase, setPassLowerCase] = useState(false);
  const [passSpecialChar, setPassSpecialChar] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordsDifferent, setPasswordsDifferent] = useState(false);

  // Validate password against rules
  const passwordChecks = password => {
    setPassMinMaxChar(password.length >= 8 && password.length <= 64);
    setPassUpperCase(Regex.uppercase.test(password));
    setPassLowerCase(Regex.lowercase.test(password));
    setPassSpecialChar(Regex.special.test(password));
    setPassNumber(Regex.number.test(password));
  };

  // Additional checks for change flow
  const additionalChecks = () => {
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== '');
    setPasswordsDifferent(
      currentPassword !== newPassword && newPassword !== ''
    );
  };

  // Run validation on newPassword changes
  useEffect(() => {
    if (newPassword) {
      passwordChecks(newPassword);
    } else {
      setPassMinMaxChar(false);
      setPassUpperCase(false);
      setPassLowerCase(false);
      setPassSpecialChar(false);
      setPassNumber(false);
    }
  }, [newPassword]);

  // Run additional checks as relevant fields change
  useEffect(() => {
    additionalChecks();
  }, [newPassword, confirmPassword, currentPassword]);

  // Aggregate validity
  const isValidPassword =
    passMinMaxChar &&
    passUpperCase &&
    passLowerCase &&
    passSpecialChar &&
    passNumber &&
    passwordsMatch &&
    passwordsDifferent;

  // --- Handlers ---
  const handlePasswordChange = () => {
    setMessage({ type: '', text: '' });

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
        // Meteor Accounts errors surface .reason nicely
        setMessage({
          type: 'error',
          text: error.reason || 'Failed to change password.'
        });
      } else {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    });
  };

  const handleSavePrivacy = nextIsPublic => {
    if (!Meteor.userId()) {
      setMessage({
        type: 'error',
        text: 'You need to be signed in to update privacy.'
      });
      return;
    }

    setIsSavingPrivacy(true);

    // Optimistic UI
    const prev = isPublic;
    setIsPublic(nextIsPublic);

    Meteor.call('users.setPrivacy', nextIsPublic, err => {
      setIsSavingPrivacy(false);
      if (err) {
        setIsPublic(prev);
        setMessage({
          type: 'error',
          text: err.reason || 'Could not update privacy settings.'
        });
      } else {
        setMessage({
          type: 'success',
          text: `Profile visibility set to ${nextIsPublic ? 'Public' : 'Private'}.`
        });
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

      {/* Alerts */}
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

      {/* Privacy */}
      <div className="space-y-3 p-4 border rounded-lg bg-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-800">Profile Privacy</h3>
            <p className="text-sm text-gray-600">
              Choose whether your profile is visible to others on the platform.
            </p>
          </div>

          {/* Toggle */}
          <button
            type="button"
            onClick={() => handleSavePrivacy(!isPublic)}
            disabled={isSavingPrivacy}
            aria-pressed={isPublic}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
              isPublic ? 'bg-[#328E6E]' : 'bg-gray-300'
            } ${isSavingPrivacy ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            title={
              isPublic
                ? 'Currently Public — click to set Private'
                : 'Currently Private — click to set Public'
            }
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isPublic ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          <span className="font-medium">Current status:</span>{' '}
          {isPublic ? 'Public' : 'Private'}
          {isSavingPrivacy && ' — saving…'}
        </div>
      </div>

      {/* Password form */}
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
            autoComplete="current-password"
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
            autoComplete="new-password"
          />

          {/* Requirements */}
          <div className="mt-3 text-xs space-y-1">
            <div className="flex items-center gap-2">
              {passMinMaxChar ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
              )}
              <span>Must be 8–64 characters long</span>
            </div>
            <div className="flex items-center gap-2">
              {passUpperCase ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
              )}
              <span>At least 1 uppercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              {passLowerCase ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
              )}
              <span>At least 1 lowercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              {passSpecialChar ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
              )}
              <span>At least 1 special character</span>
            </div>
            <div className="flex items-center gap-2">
              {passNumber ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
              )}
              <span>At least 1 number</span>
            </div>
            <div className="flex items-center gap-2">
              {passwordsDifferent ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
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
            autoComplete="new-password"
          />
          <div className="mt-2 text-xs">
            <div className="flex items-center gap-2">
              {passwordsMatch ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <BsXCircleFill className="text-red-500" />
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
          {isLoading ? 'Updating…' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};
