import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const Notification = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">
          Notifications
        </h2>
        <p className="text-gray-600">Control how you receive notifications.</p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-gray-700 font-medium mb-1">
              Email Notifications
            </h3>
            <p className="text-gray-500 text-sm">
              Receive updates and news via email
            </p>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              emailNotifications ? 'bg-[#328E6E]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-gray-700 font-medium mb-1">
              Push Notifications
            </h3>
            <p className="text-gray-500 text-sm">
              Get notified about new skills and achievements
            </p>
          </div>
          <button
            onClick={() => setPushNotifications(!pushNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              pushNotifications ? 'bg-[#328E6E]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
