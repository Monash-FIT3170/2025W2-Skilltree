import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
// import { Schemas } from '/imports/api/schemas/SkillTree';

// Basic methods for SkillTreeCollection
Meteor.methods({
  'skilltrees.insert'(skilltree) {
    // Schemas.SkillTree.validate(skilltree); // TO DO: fix validate errors, seems to be issue with Schema handling and importing
    return SkillTreeCollection.insertAsync(skilltree);
  },

  async 'skilltrees.insertAsync'(skillTree) {
    return await SkillTreeCollection.insertAsync(skillTree);
  },

  'skilltrees.update'(skilltreeId, skilltree) {
    // Schemas.SkillTree.validate(skilltree);

    if (!SkillTreeCollection.findOne(skilltreeId)) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    return SkillTreeCollection.update(skilltreeId, { $set: skilltree });
  },

  'skilltrees.remove'(skilltreeId) {
    return SkillTreeCollection.remove(skilltreeId);
  },

  async 'skilltrees.get'(skilltreeId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });
    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }
    return skilltree;
  },

  // add user to skill tree user field
  async 'skilltrees.subscribeUser'(skilltreeId, userId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });

    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    // set async if needed
    return await SkillTreeCollection.updateAsync(
      { _id: skilltreeId },
      {
        $addToSet: {
          subscribers: userId
        }
      }
    );
  },

  async 'skilltrees.unsubscribeUser'(skilltreeId, userId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });

    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    return await SkillTreeCollection.updateAsync(
      { _id: skilltreeId },
      {
        $pull: {
          subscribers: userId
        }
      }
    );
  },

  async 'skilltrees.findUser'(skilltreeId, userId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });
    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    const userList = skilltree.subscribers;

    // select the document where subscribers contains desired user OR null if none are found
    return await SkillTreeCollection.findOneAsync({
      _id: skilltreeId,
        subscribers: { $in: [userId] } }
    });
  }
});
