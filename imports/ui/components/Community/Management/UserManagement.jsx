import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { UserTable } from '/imports/ui/components/Community/Management/Users/UserTable';

export const UserManagement = () => {
  const { id: skilltreeID } = useParams();

  //Subscribe to all necessary collections
  useSubscribe('users');
  useSubscribe('skilltrees');
  useSubscribe('subscriptions');

  //Find the target skiltree --> get all subscriber's ids
  const skilltree = useFind(SkillTreeCollection, [
    { _id: skilltreeID },
    { fields: { owner: 1, subscribers: 1 } }
  ])[0];

  const userIds = skilltree?.subscribers || [];
  const skillTreeOwner = skilltree.owner;

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6"
      style={{ minHeight: '800px' }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">
            Manage and monitor your community members
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {userIds.length} users total
        </div>
      </div>

      {/*User Table */}
      <UserTable
        userIds={userIds}
        skilltreeId={skilltreeID}
        skillTreeOwner={skillTreeOwner}
      />
    </div>
  );
};
