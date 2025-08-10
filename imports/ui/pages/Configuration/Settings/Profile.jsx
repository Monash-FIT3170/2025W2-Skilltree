import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
export const Profile = () => {
  const user = Meteor.isClient ? Meteor.user() : null;
  const [givenName, setGivenName] = useState(user?.profile?.givenName || '');
  const [familyName, setFamilyName] = useState(user?.profile?.familyName || '');
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.profile?.dateOfBirth || ''
  );
  const [bio, setBio] = useState(user?.profile?.bio || '');

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    if (Meteor.isClient) {
      const updateFields = {
        'profile.givenName': givenName,
        'profile.familyName': familyName,
        'profile.dateOfBirth': dateOfBirth,
        'profile.bio': bio
      };
      await Meteor.callAsync('updateFields', updateFields);

      setTimeout(() => {
        setIsSaving(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* General Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
              General
            </h2>
            <p className="text-gray-600">Update your profile information.</p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors cursor-pointer"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Given Name
            </label>
            <input
              type="text"
              value={givenName}
              onChange={e => {
                setGivenName(e.target.value);
              }}
              placeholder="Enter your given name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Family Name
            </label>
            <input
              type="text"
              value={familyName}
              onChange={e => {
                setFamilyName(e.target.value);
              }}
              placeholder="Enter your family name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={e => {
                setDateOfBirth(e.target.value);
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              About
            </label>
            <textarea
              type="text"
              value={bio}
              onChange={e => {
                setBio(e.target.value);
              }}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
