import React from 'react';

export const UserSkillTree = ({ onClick, title, icon, key }) => {
  return (
    <div
      onClick={onClick}
      className="w-full min-h-[20vh] bg-[#328e6e] border-2 border-gray-300 hover:border-[#025940] rounded-lg flex flex-col items-center justify-center cursor-pointer transition duration-200 shadow-sm hover:shadow-md text-white"
      key={key}
    >
      <h1 className="text-xl font-bold">{title}</h1>
      <span className="text-6xl font-bold">{icon}</span>
    </div>
  );
};
