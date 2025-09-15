import { Meteor } from 'meteor/meteor';
import React, { useMemo, useState, useContext, Suspense } from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';
import { AuthContext } from '/imports/utils/contexts/AuthContext';

import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiEdit3 } from '@react-icons/all-files/fi/FiEdit3';

import { EditCommunityMember } from '/imports/ui/components/Community/Management/EditCommunityMember';

import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { LoadingUserManagementTable } from '/imports/ui/components/Community/Fallbacks/LoadingUserManagementTable';

export const UserManagement = () => {
  const loggedInUserId = useContext(AuthContext);
  const { id: skilltreeID } = useParams();

  //Subscribe to all necessary collections
  useSubscribe('users');
  useSubscribe('skilltrees');
  useSubscribe('subscriptions');

  //Find the target skiltree --> get all subscriber's ids
  const skilltree = useFind(SkillTreeCollection, [
    { _id: skilltreeID },
    { fields: { owner: 1, subscribers: 1 } }
  ])[0];

  const userIds = skilltree?.subscribers || [];
  const skillTreeOwner = skilltree.owner;

  //Get all subscriptionRecords for target skilltree
  const subscriptionRecords = useFind(SubscriptionsCollection, [
    { skillTreeId: skilltreeID },
    {
      fields: {
        userId: 1,
        skillTreeId: 1,
        roles: 1,
        active: 1
      },
      sort: { userId: 1 }
    }
  ]);
  //Get all user objects of the skill tree subscribers
  const userRecords = useFind(Meteor.users, [
    { _id: { $in: userIds } },
    {
      fields: {
        _id: 1,
        username: 1,
        emails: 1,
        'profile.givenName': 1,
        'profile.familyName': 1
      },
      sort: { _id: 1 }
    }
  ]);

  //Create a hash map finding the user's skilltree progress/subscription
  //Just for easier o(1) fetching instead of using find()
  const subscriptionRecordByUserId = useMemo(() => {
    const map = new Map();
    subscriptionRecords.forEach(record => {
      map.set(record.userId, record);
    });
    return map;
  }, [subscriptionRecords]);

  //Retrive user's subscription progress
  const getUserSubscription = userId => subscriptionRecordByUserId.get(userId);

  //Utils
  const getInitials = user => {
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

  const getDisplayName = user => {
    if (user.profile?.givenName && user.profile?.familyName) {
      return `${user.profile.givenName} ${user.profile.familyName}`;
    } else if (user.profile?.givenName) {
      return user.profile.givenName;
    } else if (user.username) {
      return user.username;
    }
    return 'Unknown User';
  };

  const getPrimaryEmail = user => {
    return user.emails && user.emails.length > 0
      ? user.emails[0].address
      : 'No email';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [expandedRoles, setExpandedRoles] = useState(new Set());

  //Edit community modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //toggling between hide and show
  const toggleRoleExpansion = userId => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedRoles(newExpanded);
  };

  // Filter users based on search term and role filter
  // filteredUsers: [userRecords]
  // need to do useMemo for filtering: Only recompute value if its dependencies change. Otherwise, reuse the last cached value.
  const filteredUsers = useMemo(() => {
    return userRecords.filter(user => {
      //get the user's subscription progress
      const userSubscription = getUserSubscription(user._id);

      const matchesSearch =
        searchTerm === '' ||
        getDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getPrimaryEmail(user).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === 'all' ||
        (userSubscription?.roles &&
          userSubscription.roles.includes(roleFilter));

      return matchesSearch && matchesRole;
    });
  }, [userRecords, searchTerm, roleFilter, subscriptionRecordByUserId]);

  const handleEditAction = user => {
    setEditModalOpen(true);
    setSelectedUser(user);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const canEditUser = user => {
    //Get users subscription
    const userSubscription = getUserSubscription(user._id);
    const userRoles = userSubscription?.roles || [];

    if (!userRoles.length || !user._id) {
      return false;
    }

    //Cannot edit yourself
    if (user._id === loggedInUserId) {
      return false;
    }

    //If you are an admin accessing the admin dashboard --> if the user row in the table is either yourself or another admin, then do not
    // display the edit button
    //Only owner can modify admins
    if (userRoles.includes('admin')) {
      return loggedInUserId === skillTreeOwner;
    }
    return true;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6"
      style={{ minHeight: '800px' }}
    >
      {/* Top header section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">
            Manage and monitor your community members
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredUsers.length} of {userRecords.length} users
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search bar */}
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] bg-gray-50 focus:bg-white transition-all"
            />
          </div>
        </div>
        {/* Filtering by roles */}
        <div className="flex gap-3">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="expert">Expert</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                User
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Role
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              // user = userRecord
              // Get user's subscription data for roles and status
              const userSubscription = getUserSubscription(user._id);
              const userRoles = userSubscription?.roles || [];
              const userStatus = userSubscription?.active;

              return (
                <tr
                  key={user._id}
                  className={`border-b hover:bg-gray-50 transition-colors`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#04BF8A] to-[#025940] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(user)}
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {getDisplayName(user)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getPrimaryEmail(user)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 w-32 sm:w-48 lg:w-64">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {/* Show roles if user has any, otherwise show default 'user' role */}
                      {userRoles.length > 0 ? (
                        <>
                          {/* Always show first role */}
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour(userRoles[0]) || getRoleColour('user')} whitespace-nowrap`}
                          >
                            {userRoles[0]}
                          </span>

                          {/* Depending on your screen size, display the roles of the user in this skilltree */}
                          {userRoles.length > 1 && (
                            <>
                              {/* Desktop - show all the roles (this is starting from index 1, not including the first role) */}
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

                              {/* Mobile - show the rest of the roles */}
                              <button
                                onClick={() => toggleRoleExpansion(user._id)}
                                className="sm:hidden text-xs text-gray-500 hover:text-gray-700 px-1 cursor-pointer"
                              >
                                {expandedRoles.has(user._id)
                                  ? `Hide (${userRoles.length - 1})`
                                  : `+${userRoles.length - 1}`}
                              </button>

                              {/* Mobile: expanded additional roles */}
                              {expandedRoles.has(user._id) && (
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
                        // Default role if no subscription roles found
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour('user')} whitespace-nowrap`}
                        >
                          user
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColour(userStatus)}`}
                    >
                      {userStatus ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-1">
                      {canEditUser(user) && (
                        <button
                          onClick={() => handleEditAction(user)}
                          className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/*Edit user modal */}
      <Suspense fallback={<LoadingUserManagementTable />}>
        <EditCommunityMember
          isOpen={editModalOpen}
          onClose={closeEditModal}
          selectedUserId={selectedUser?._id}
          skilltreeId={skilltreeID}
          skillTreeOwner={skillTreeOwner}
          loggedInUserId={loggedInUserId}
        />
      </Suspense>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || roleFilter !== 'all'
            ? 'No users found matching your filters.'
            : 'No users found.'}
        </div>
      )}
    </div>
  );
};
