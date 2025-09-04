import React from 'react';

export const GreetingLoadingState = () => {
  return (
    <div className="animate-pulse fadeInEffect">
      <div className="flex items-center gap-3 mb-2">
        <span className="h-10 w-10 bg-gray-200 rounded" />
        <span className="h-8 bg-gray-200 rounded w-100" />
      </div>
    </div>
  );
};
