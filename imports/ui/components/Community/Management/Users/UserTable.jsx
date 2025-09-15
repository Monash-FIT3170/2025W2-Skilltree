// UserTable.jsx - Table Container
import React, { useMemo, Suspense } from 'react';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { UserRow } from '/imports/ui/components/Community/Management/Users/UserRow';
import { LoadingUserManagementRow } from '/imports/ui/components/Community/Fallbacks/LoadingUserManagementRow';

export const UserTable = ({
  userIds,
  skilltreeId,
  skillTreeOwner,
  loggedInUserId,
  searchTerm,
  roleFilter,
  onEditUser
}) => {
  //Get all subscription records for filtering
  const subscriptionRecords = useFind(SubscriptionsCollection, [
    { skillTreeId: skilltreeId },
    {
      fields: {
        userId: 1,
        skillTreeId: 1,
        roles: 1,
        active: 1
      },
      sort: { userId: 1 }
    }
  ]);

  //Create a hash map finding the user's skilltree progress/subscription
  //Just for easier o(1) fetching instead of using find()
  const subscriptionRecordByUserId = useMemo(() => {
    const map = new Map();
    subscriptionRecords.forEach(record => {
      map.set(record.userId, record);
    });
    return map;
  }, [subscriptionRecords]);

  //Retrive user's subscription progress
  const getUserSubscription = userId => subscriptionRecordByUserId.get(userId);

  //Filter users based on search term and role filter
  //filteredUserIds: [userId]
  const filteredUserIds = useMemo(() => {
    if (!searchTerm && roleFilter === 'all') {
      return userIds;
    }

    return userIds.filter(userId => {
      const subscription = getUserSubscription(userId);

      if (roleFilter !== 'all') {
        const userRoles = subscription?.roles || [];
        if (!userRoles.includes(roleFilter)) {
          return false;
        }
      }

      // Note: Search filter will be handled in UserRow part
      // since we need user data for name/email matching
      return true;
    });
  }, [userIds, roleFilter, subscriptionRecordByUserId]);

  if (filteredUserIds.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {searchTerm || roleFilter !== 'all'
          ? 'No users found matching your filters.'
          : 'No users found.'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              User
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Role
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Status
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUserIds.map((currUserId, index) => (
            <Suspense key={currUserId} fallback={<LoadingUserManagementRow />}>
              <UserRow
                userId={currUserId}
                skilltreeId={skilltreeId}
                skillTreeOwner={skillTreeOwner}
                loggedInUserId={loggedInUserId}
                searchTerm={searchTerm}
                index={index}
                onEditUser={onEditUser}
              />
            </Suspense>
          ))}
        </tbody>
      </table>
    </div>
  );
};
