import React from 'react';

export const LoadingUserManagementRow = () => {
  return (
    <tr className="border-b">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="py-2 px-2">
        <div className="flex gap-1">
          <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-end">
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
};
