import React from 'react';
import { FiLoader } from '@react-icons/all-files/fi/FiLoader';

export const LoadingUserManagementTable = () => {
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
          <div key={i} className="h-16 bg-gray-50 rounded animate-pulse"></div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center mt-8 text-gray-500">
        <FiLoader className="animate-spin mr-2" />
        Loading users...
      </div>
    </div>
  );
};
