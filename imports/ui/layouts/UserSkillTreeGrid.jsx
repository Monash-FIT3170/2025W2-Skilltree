import React from 'react';
import { UserSkillTree } from '../components/UserSkillTreeTM';

export const UserSkillTreeGrid = () => {
  const handleCardClick = index => {
    alert(`Clicked card ${index + 1}`);
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-6">
      {Array.from({ length: 25 }).map((_, i) => (
        <UserSkillTree key={i} onClick={() => handleCardClick(i)} />
      ))}
    </div>
  );
};
