import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FiSearch, FiEdit3 } from 'react-icons/fi';

import { useSkillTreeUsers } from '/imports/ui/components/Community/services/UserService';
import { userUtils } from '/imports/ui/components/Community/utils/userUtils';
import { roleUtils } from '/imports/ui/components/Community/utils/rolesUtils';
import { EditCommunityMember } from '/imports/ui/components/Community/Management/EditCommunityMember';

import { LoadingUserManagementTable } from '/imports/ui/components/Community/Fallbacks/LoadingUserManagementTable';

export const UserManagement = () => {
  const { id: skilltreeID } = useParams();

  //Services
  const { users, loading } = useSkillTreeUsers(skilltreeID);

  //Utils
  const { getInitials, getDisplayName, getPrimaryEmail } = userUtils;
  const { getRoleColour, getStatusColour } = roleUtils;

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
  // need to do useMemo for filtering: Only recompute value if its dependencies change. Otherwise, reuse the last cached value.
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        searchTerm === '' ||
        getDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getPrimaryEmail(user).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === 'all' ||
        (user.skilltreeRoles && user.skilltreeRoles.includes(roleFilter));

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleEditAction = user => {
    setEditModalOpen(true);
    setSelectedUser(user);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <LoadingUserManagementTable />;
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
                    {/* Always show first role */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour(user.skilltreeRoles[0]) || getRoleColour('user')} whitespace-nowrap`}
                    >
                      {user.skilltreeRoles[0]}
                    </span>

                    {/* Depending on your screen size, display the roles of the user in this skilltree */}
                    {user.skilltreeRoles.length > 1 && (
                      <>
                        {/* Desktop - show all the roles (this is starting from index 1, not including the first role) */}
                        <div className="hidden sm:flex sm:flex-wrap sm:gap-1.5">
                          {user.skilltreeRoles.slice(1).map((role, index) => (
                            <span
                              key={index + 1}
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
                            ? `Hide (${user.skilltreeRoles.length - 1})`
                            : `+${user.skilltreeRoles.length - 1}`}
                        </button>

                        {/* Mobile: expanded additional roles */}
                        {expandedRoles.has(user._id) && (
                          <div className="sm:hidden flex flex-wrap gap-1 w-full mt-2">
                            {user.skilltreeRoles.slice(1).map((role, index) => (
                              <span
                                key={index + 1}
                                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColour(role)} whitespace-nowrap`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColour(user.skilltreeActive)}`}
                  >
                    {user.skilltreeActive ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => handleEditAction(user)}
                      className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit User"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Edit user modal */}
      <div>
        <EditCommunityMember
          isOpen={editModalOpen}
          onClose={closeEditModal}
          user={selectedUser}
          skilltreeId={skilltreeID}
        />
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
