import React from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';

export const UserFilters = ({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleFilterChange
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {/* User management table search bar */}
      <div className="flex-1">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] bg-gray-50 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* User management table filter (might make this into another component) */}
      <div className="flex gap-3">
        <select
          value={roleFilter}
          onChange={e => onRoleFilterChange(e.target.value)}
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
  );
};
