import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const UserSkillTree = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-24 h-24 bg-white border-2 border-gray-300 hover:border-blue-300 rounded-lg flex items-center justify-center cursor-pointer transition duration-200 shadow-sm hover:shadow-md"
    >
      <h1>The Beginning</h1>
      <span className="text-gray-400 text-sm">+</span>
    </div>
  );
};
