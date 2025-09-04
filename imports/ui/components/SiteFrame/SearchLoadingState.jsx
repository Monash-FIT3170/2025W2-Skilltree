import React from 'react';

export const SearchLoadingState = () => {
  return (
    <div className="animate-pulse fadeInEffect">
      <div className="space-y-4">
        {[1, 2, 3].map(section => (
          <div key={section}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="bg-gray-200 rounded-xl h-53"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
