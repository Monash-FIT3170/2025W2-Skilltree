import React from 'react';


export const UserSkillTree = ({ onClick, title, icon }) => {

  return (
    <div
      onClick={onClick}
      className="w-100 h-40 bg-[#328e6e] border-2 border-gray-300  hover:border-[#025940] rounded-lg flex flex-col items-center justify-center cursor-pointer transition duration-200 shadow-sm hover:shadow-md text-white"
    >
      <h1 className='text-xl font-bold p-4'>{title}</h1>
      <span className="text-6xl font-bold -mt-2">{icon}</span>
      
    </div>
  );
};
