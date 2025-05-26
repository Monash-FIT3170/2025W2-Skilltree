import React from 'react';
import { UserSkillTree } from '../components/UserSkillTreeTM';

export const UserSkillTreeGrid = () => {
  const handleCardClick = index => {
    alert(`Clicked card ${index + 1}`);
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-x-16 gap-y-10 p-1">
        {Array.from({ length: 25 }).map((_, i) => (
          <UserSkillTree key={i} onClick={() => handleCardClick(i)} />
        ))}
      </div>
    </div>
  );
};
