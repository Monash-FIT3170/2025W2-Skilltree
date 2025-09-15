// UserTable.jsx - Table Container
import React, { useMemo, Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { UserRow } from '/imports/ui/components/Community/Management/Users/UserRow';
import { LoadingUserManagementRow } from '/imports/ui/components/Community/Fallbacks/LoadingUserManagementRow';
import {
  getDisplayName,
  getPrimaryEmail
} from '/imports/ui/components/Community/Management/Users/userUtils';

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

  //Get the skilltree user's records
  const userRecords = useFind(Meteor.users, [
    { _id: { $in: userIds } },
    {
      fields: {
        _id: 1,
        username: 1,
        emails: 1,
        'profile.givenName': 1,
        'profile.familyName': 1
      }
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

  const userMap = useMemo(() => {
    const map = new Map();
    userRecords.forEach(user => {
      map.set(user._id, user);
    });
    return map;
  }, [userRecords]);

  //Retrive user's subscription progress
  const getUserSubscription = userId => subscriptionRecordByUserId.get(userId);
  const getUser = userId => userMap.get(userId);

  //Filter users based on search term and role filter
  //filteredUserIds: [userId]
  const filteredUserIds = useMemo(() => {
    return userIds.filter(userId => {
      const user = getUser(userId);
      const subscription = getUserSubscription(userId);

      if (!user) return false;

      //MAtching role
      if (roleFilter !== 'all') {
        const userRoles = subscription?.roles || [];
        if (!userRoles.includes(roleFilter)) {
          return false;
        }
      }

      //Matching the search term we got
      if (searchTerm) {
        const displayName = getDisplayName(user);
        const primaryEmail = getPrimaryEmail(user);
        const matchesSearch =
          displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          primaryEmail.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [userIds, roleFilter, searchTerm, userMap, subscriptionRecordByUserId]);

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
