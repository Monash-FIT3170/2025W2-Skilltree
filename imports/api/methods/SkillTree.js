import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

import { Schemas } from '/imports/api/schemas/SkillTree';

// Basic methods for SkillTreeCollection
Meteor.methods({
  'skilltrees.insert'(skilltree) {
    Schemas.SkillTree.validate(skilltree);
    return SkillTreeCollection.insert(skilltree);
  },

  'skilltrees.update'(skilltreeId, skilltree) {
    Schemas.SkillTree.validate(skilltree);

    if (!SkillTreeCollection.findOne(skilltreeId)) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    return SkillTreeCollection.update(skilltreeId, { $set: skilltree });
  },

  'skilltrees.remove'(skilltreeId) {
    return SkillTreeCollection.remove(skilltreeId);
  }
});
