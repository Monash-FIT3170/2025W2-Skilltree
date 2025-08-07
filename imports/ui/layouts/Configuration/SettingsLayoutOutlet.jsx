import React from 'react';
import { Outlet } from 'react-router-dom';


export const RouteContent = () => {

    return (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <Outlet />
        </div>

    )
};
