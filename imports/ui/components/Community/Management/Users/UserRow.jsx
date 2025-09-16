import React, { useContext, useState, Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { FiEdit3 } from '@react-icons/all-files/fi/FiEdit3';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import {
  getDisplayName,
  getPrimaryEmail
} from '/imports/utils/ui/Profile/userUtils';

import { EditCommunityMember } from '/imports/ui/components/Community/Management/EditCommunityMember';
import { LoadingUserManagementTable } from '/imports/ui/components/Community/Fallbacks/LoadingUserManagementTable';

export const UserRow = ({ userId, skilltreeId, skillTreeOwner, index }) => {
  const loggedInUserId = useContext(AuthContext);
  const [expandedRoles, setExpandedRoles] = useState(false);

  //Edit community modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEditAction = userId => {
    setEditModalOpen(true);
    setSelectedUserId(userId);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserId(null);
  };

  //Get the user account record. Only specify needed fields
  const user = useFind(Meteor.users, [
    { _id: userId },
    {
      fields: {
        _id: 1,
        username: 1,
        emails: 1,
        'profile.givenName': 1,
        'profile.familyName': 1
      }
    }
  ])[0];

  //Fixes undefined user
  if (!user) {
    return null;
  }

  //Get user's subscription progress
  const userSubscription = useFind(SubscriptionsCollection, [
    { userId, skillTreeId: skilltreeId },
    {
      fields: {
        userId: 1,
        skillTreeId: 1,
        roles: 1,
        active: 1
      }
    }
  ])[0];

  //Utils
  const getInitials = () => {
    const givenName = user.profile?.givenName || '';
    const familyName = user.profile?.familyName || '';

    if (givenName && familyName) {
      return (givenName[0] + familyName[0]).toUpperCase();
    } else if (givenName) {
      return givenName[0].toUpperCase();
    } else if (user.username) {
      return user.username[0].toUpperCase();
    }
    return '?';
  };

  const getRoleColour = role => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'expert':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColour = isActive => {
    return isActive
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const canEditUser = () => {
    const userRoles = userSubscription?.roles || [];

    if (!userRoles.length || !user._id) return false;
    if (user._id === loggedInUserId) return false;

    //Only owner can modify admins
    if (userRoles.includes('admin')) {
      return loggedInUserId === skillTreeOwner;
    }
    return true;
  };

  //Apply search filter
  const displayName = getDisplayName(
    user.profile?.givenName,
    user.profile?.familyName,
    user.username
  );
  const primaryEmail = getPrimaryEmail(user.emails);
  const userRoles = userSubscription?.roles || [];
  const userStatus = userSubscription?.active;

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#04BF8A] to-[#025940] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitials()}
            </div>
            {index < 3 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800">
                {index + 1}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{displayName}</div>
            <div className="text-sm text-gray-600">{primaryEmail}</div>
          </div>
        </div>
      </td>

      {/* Roles */}
      <td className="py-2 px-2 w-32 sm:w-48 lg:w-64">
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {userRoles.length > 0 ? (
            <>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour(userRoles[0])} whitespace-nowrap`}
              >
                {userRoles[0]}
              </span>

              {userRoles.length > 1 && (
                <>
                  <div className="hidden sm:flex sm:flex-wrap sm:gap-1.5">
                    {userRoles.slice(1).map((role, roleIndex) => (
                      <span
                        key={roleIndex + 1}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour(role)} whitespace-nowrap`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpandedRoles(!expandedRoles)}
                    className="sm:hidden text-xs text-gray-500 hover:text-gray-700 px-1 cursor-pointer"
                  >
                    {expandedRoles
                      ? `Hide (${userRoles.length - 1})`
                      : `+${userRoles.length - 1}`}
                  </button>

                  {expandedRoles && (
                    <div className="sm:hidden flex flex-wrap gap-1 w-full mt-2">
                      {userRoles.slice(1).map((role, roleIndex) => (
                        <span
                          key={roleIndex + 1}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour(role)} whitespace-nowrap`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour('user')} whitespace-nowrap`}
            >
              user
            </span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColour(userStatus)}`}
        >
          {userStatus ? 'Active' : 'Inactive'}
        </span>
      </td>

      <td className="py-4 px-4">
        <div className="flex justify-end gap-1">
          {canEditUser() && (
            <button
              onClick={() => handleEditAction(user._id)}
              className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
              title="Edit User"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>

      {/*Edit Modal */}
      {editModalOpen && (
        <Suspense fallback={<LoadingUserManagementTable />}>
          <EditCommunityMember
            isOpen={editModalOpen}
            onClose={closeEditModal}
            selectedUserId={selectedUserId}
            skilltreeId={skilltreeId}
            skillTreeOwner={skillTreeOwner}
          />
        </Suspense>
      )}
    </tr>
  );
};
