import { Meteor } from 'meteor/meteor';

export const userService = {
  async getSkillTreeUsers(skilltreeID) {
    //Retrieve skill tree
    const skilltree = await Meteor.callAsync('skilltrees.get', skilltreeID);

    //Get userIds of subscribers of this skill tree
    const userIds = skilltree.subscribers;

    //Get user instances for each userId
    const userInstances = await Meteor.callAsync(
      'users.getMultipleByIds',
      userIds
    );

    //Get skilltree progresses from skilltree
    const allProgressRecords = await Meteor.callAsync(
      'getAllSkillTreeProgress',
      skilltreeID
    );

    // Combine user data with their progress data
    const combinedData = userInstances.map(user => {
      const userProgress = allProgressRecords.find(
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

    return combinedData;
  }
};
