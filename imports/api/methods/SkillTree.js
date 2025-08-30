import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
// import { Schemas } from '/imports/api/schemas/SkillTree';

// Basic methods for SkillTreeCollection
Meteor.methods({
  'skilltrees.insert'(skilltree) {
    // Schemas.SkillTree.validate(skilltree); // TO DO: fix validate errors, seems to be issue with Schema handling and importing
    const {
      title,
      description,
      termsAndConditions,
      tags = [],
      image,
      skillNodes = [],
      skillEdges = []
    } = skilltree || {};

    const doc = {
      title,
      description,
      termsAndConditions,
      tags,
      image, // S3 URL string
      skillNodes,
      skillEdges,
      owner: this.userId,
      admins: [this.userId],
      subscribers: [this.userId],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return SkillTreeCollection.insertAsync(doc);
  },

  async 'skilltrees.insertAsync'(skillTree) {
    // Ensure imageUrl is properly handled
    const processedSkillTree = {
      ...skillTree,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return await SkillTreeCollection.insertAsync(processedSkillTree);
  },

  'skilltrees.update'(skilltreeId, skilltree) {
    // Schemas.SkillTree.validate(skilltree);

    if (!SkillTreeCollection.findOne(skilltreeId)) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    // Add updatedAt timestamp
    const updateData = {
      ...skilltree,
      updatedAt: new Date()
    };

    return SkillTreeCollection.update(skilltreeId, { $set: updateData });
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
        },
        $set: {
          updatedAt: new Date()
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
        },
        $set: {
          updatedAt: new Date()
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

    // select the document where subscribers contains desired user OR null if none are found
    return await SkillTreeCollection.findOneAsync({
      _id: skilltreeId,
      subscribers: { $in: [userId] }
    });
  }
});