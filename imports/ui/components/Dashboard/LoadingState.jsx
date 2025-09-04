import React from 'react';

export const DashboardLoadingState = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mt-1">
            SkillTrees you own and communities you've joined
          </p>
        </div>
        <div className="flex items-center">
          <span className="animate-pulse fadeInEffect h-4 bg-gray-200 rounded w-48"></span>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
        <div className="space-y-4">
          {[1, 2].map(section => (
            <div key={section}>
              <div className="animate-pulse fadeInEffect grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="bg-gray-200 rounded-xl h-53"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
