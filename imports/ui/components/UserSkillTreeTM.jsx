import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const UserSkillTree = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-100 h-40 bg-[#328e6e] border-2 border-gray-300  hover:border-[#025940] rounded-lg flex items-center justify-center cursor-pointer transition duration-200 shadow-sm hover:shadow-md text-white"
    >
      <h1>SkillTree</h1>
      <span className="text-gray-400 text-sm">+</span>
    </div>
  );
};