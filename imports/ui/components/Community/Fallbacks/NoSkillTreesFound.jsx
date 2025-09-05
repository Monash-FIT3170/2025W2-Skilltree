import React from 'react';
import { RiSearchLine } from '@react-icons/all-files/ri/RiSearchLine';

export const NoSkillTreesFound = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <RiSearchLine className="text-gray-400" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No SkillTrees Found
      </h3>
    </div>
  );
};
