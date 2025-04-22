import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => 
  <nav className="bg-gray-400 p-4">
    <Link to="/" className="text-white hover:bg-gray-600 px-3 py-2 rounded">Home</Link>
    <Link to="/Hello" className="text-white hover:bg-gray-600 px-3 py-2 rounded">Hello</Link>
    <Link to="/Hello/SkillTree" className="text-white hover:bg-gray-600 px-3 py-2 rounded">Hello SkillTree</Link>
    <Link to="/Hello/url_param" className="text-white hover:bg-gray-600 px-3 py-2 rounded">Hello url_param</Link>
    <Link to="/404" className="text-white hover:bg-gray-600 px-3 py-2 rounded">404</Link>
  </nav>
  