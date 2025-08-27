import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import {
  FiSearch,
  FiEye,
  FiEdit3,
  FiMail,
  FiTrash2,
  FiLoader
} from 'react-icons/fi';

export const UserManagement = () => {
  const { id: skilltreeID } = useParams();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  //Wait for all members of the skilltree community to load in:
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillTreeUsers();
  }, [skilltreeID]);

  const fetchSkillTreeUsers = async () => {
    try {
      console.log(skilltreeID);
      //Get all current skilltree progresses for this skilltree
      const allProgressRecords = await Meteor.callAsync(
        'getAllSkillTreeProgress',
        skilltreeID
      );
      console.log(allProgressRecords);

      //Extract all user IDs from progress records
      const userIds = allProgressRecords.map(progress => progress.userId);

      const userInstances = await Meteor.callAsync(
        'users.getMultipleByIds',
        userIds
      );

      console.log(userInstances);

      // Combine user data with their progress data
      const combinedData = userInstances.map(user => {
        const userProgress = allProgressRecords.find(
          progress => progress.userId === user._id
        );

        return {
          ...user,
          skilltreeProgress: userProgress,
          skilltreeRoles: userProgress?.roles || ['user'],
          skilltreeXP: userProgress?.xpPoints || 0,
          skilltreeActive: userProgress?.active ?? true,
          completedNodes:
            userProgress?.skillNodes?.filter(
              node => node.type === 'view-node-completed'
            )?.length || 0,
          totalNodes: userProgress?.skillNodes?.length || 0,
          joinedSkilltree: userProgress?.createdAt || 'ACTIVE TODAY',
          lastActiveSkilltree: userProgress?.lastActive || 'ACTIVE TODAY'
        };
      });

      setUsers(combinedData);
    } catch (error) {
      console.error(error.reason || 'Failed to retrieve all skilltree users');
    } finally {
      setLoading(false);
    }
  };

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

  const getRoleColor = roles => {
    if (!roles || roles.length === 0) {
      return 'bg-gray-100 text-gray-700 border-gray-200';
    }
    const primaryRole = roles[0];

    switch (primaryRole) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'expert':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pro':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = isActive => {
    return isActive
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDate = dateString => {
    if (!dateString) return 'Never';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
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

  const getRoleDisplay = user => {
    if (user.roles && user.roles.length > 0) {
      return user.roles[0]; // Display primary role
    }
    if (user.membership_tier) {
      return user.membership_tier;
    }
    return 'user';
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      searchTerm === '' ||
      getDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPrimaryEmail(user).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === 'all' ||
      (user.roles && user.roles.includes(roleFilter)) ||
      user.membership_tier === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleUserAction = (userId, action) => {
    console.log(`Action: ${action} for user: ${userId}`);
    // Implement action logic here
  };

  // LOADING STATE - Show this until data is loaded
  if (loading) {
    return (
      <div
        className="bg-white rounded-xl shadow-lg p-6 "
        style={{ minHeight: '800px' }}
      >
        {/* Loading Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Loading Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>

        {/* Loading Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="w-32 h-12 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>

        {/* Loading Table */}
        <div className="space-y-3">
          <div className="h-12 bg-gray-50 rounded"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-50 rounded animate-pulse"
            ></div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center mt-8 text-gray-500">
          <FiLoader className="animate-spin mr-2" />
          Loading users...
        </div>
      </div>
    );
  }

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
          {filteredUsers.length} of {users.length} users
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
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  selectedUsers.includes(user._id) ? 'bg-[#04BF8A]/5' : ''
                }`}
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
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.skilltreeRoles)}`}
                  >
                    {getRoleDisplay(user)}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.skilltreeActive)}`}
                  >
                    {user.skilltreeActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => handleUserAction(user._id, 'view')}
                      className="p-2 text-gray-600 hover:text-[#04BF8A] hover:bg-[#04BF8A]/10 rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUserAction(user._id, 'edit')}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit User"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUserAction(user._id, 'message')}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Send Message"
                    >
                      <FiMail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUserAction(user._id, 'delete')}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from SkillTree"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
