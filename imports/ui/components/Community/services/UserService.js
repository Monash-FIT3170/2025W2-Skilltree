import { Meteor } from 'meteor/meteor';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { useMemo } from 'react';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const useSkillTreeUsers = skilltreeID => {
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

  //Get all progressRecords for target skilltree
  const progressRecords = useFind(SubscriptionsCollection, [
    { skillTreeId: skilltreeID },
    {
      fields: {
        userId: 1,
        skillTreeId: 1,
        roles: 1
      }
    }
  ]);

  const userRecords = useFind(Meteor.users, [
    { _id: { $in: userIds } },
    {
      fields: {
        _id: 1,
        username: 1,
        emails: 1,
        profile: 1
      }
    }
  ]);

  // Reactively combine user data with the progress data
  const users = useMemo(() => {
    return userRecords.map(user => {
      const userProgress = progressRecords.find(
        progress => progress.userId === user._id
      );

      return {
        ...user,
        skilltreeProgress: userProgress,
        skilltreeRoles: userProgress?.roles || ['user'],
        skilltreeXP: userProgress?.xpPoints || 0,
        skilltreeActive: userProgress?.active ?? true,
        completedNodes:
          userProgress?.skillNodes?.filter(
            node => node.type === 'view-node-completed'
          )?.length || 0,
        totalNodes: userProgress?.skillNodes?.length || 0,
        joinedSkilltree: userProgress?.createdAt || 'ACTIVE TODAY',
        lastActiveSkilltree: userProgress?.lastActive || 'ACTIVE TODAY'
      };
    });
  }, [userRecords, progressRecords]);

  const isLoading = !skilltree || (userIds.length > 0 && users.length === 0);

  return {
    users,
    loading: isLoading,
    skillTreeOwner
  };
};
