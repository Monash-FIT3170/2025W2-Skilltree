import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';
import { Account } from '/imports/ui/pages/Configuration/Settings/Account';
import { Profile } from '/imports/ui/pages/Configuration/Settings/Profile';
import { Password } from '/imports/ui/pages/Configuration/Settings/Password';
import { Notification } from '/imports/ui/pages/Configuration/Settings/Notification';
import { Subscription } from '/imports/ui/pages/Configuration/Settings/Subscription';
import { SettingsLayout } from '/imports/ui/layouts/Configuration/SettingsLayout';

export const SettingRoutes = [
  {
    path: '/settings',
    element: <SettingsLayout />,
    children: [
      {
        index:true,
        element: <Navigate to={"/settings/account"} replace/>
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "privacy",
        element: <Password />
      },
      {
        path: "notification",
        element: <Notification />
      },
      {
        path: "subscription",
        element: <Subscription />
      },
      {
        path: '*',
        element: <Navigate to="/settings/account" replace />
      }
    ]
  }
];
