import React from 'react';
import { Outlet } from 'react-router-dom';

export const RouteContent = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};
