import React, { useState, Suspense } from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';

import { EditCommunityMember } from '/imports/ui/components/Community/Management/EditCommunityMember';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { LoadingUserManagementTable } from '/imports/ui/components/Community/Fallbacks/LoadingUserManagementTable';
import { UserFilters } from '/imports/ui/components/Community/Management/Users/UserFilters';
import { UserTable } from '/imports/ui/components/Community/Management/Users/UserTable';

//Filter, Table and the row. nOTE THAT USERMANAGEMENT IS THE CONTAINER, not the table

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

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  //Edit community modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEditAction = userId => {
    setEditModalOpen(true);
    setSelectedUserId(userId);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserId(null);
  };

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

      {/*Filters */}
      <UserFilters
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        onSearchChange={setSearchTerm}
        onRoleFilterChange={setRoleFilter}
      />

      {/*User Table */}
      <UserTable
        userIds={userIds}
        skilltreeId={skilltreeID}
        skillTreeOwner={skillTreeOwner}
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        onEditUser={handleEditAction}
      />

      {/*Edit Modal */}
      {editModalOpen && (
        <Suspense fallback={<LoadingUserManagementTable />}>
          <EditCommunityMember
            isOpen={editModalOpen}
            onClose={closeEditModal}
            selectedUserId={selectedUserId}
            skilltreeId={skilltreeID}
            skillTreeOwner={skillTreeOwner}
          />
        </Suspense>
      )}
    </div>
  );
};
