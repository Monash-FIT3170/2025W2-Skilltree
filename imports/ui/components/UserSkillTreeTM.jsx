import React from 'react';


export const UserSkillTree = ({ onClick, title, icon }) => {

  return (
    <div
      onClick={onClick}
      className="md:w-[30%] h-40 bg-[#328e6e] border-2 border-gray-300  hover:border-[#025940] rounded-lg flex items-center justify-center cursor-pointer transition duration-200 shadow-sm hover:shadow-md text-white"
    >
      <h1 className='text-xl font-bold'>{title}</h1>
      <span className="text-6xl font-bold">{icon}</span>
      
    </div>
  );
};
