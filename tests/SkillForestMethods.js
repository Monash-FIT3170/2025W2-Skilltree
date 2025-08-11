import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';
import '/imports/api/methods/SkillForest';

const TEST_SKILLFOREST = {
  title: 'Test SkillForest',
  description:
    'Hello there, this is a test skillforest. If a tree falls in a forest and no one is around to hear it, does it make a sound?',
  skilltreeIds: ['skilltree1', 'skilltree2']
};

if (Meteor.isServer) {
  describe('SkillForest Methods', function () {
    beforeEach(async function () {
      await SkillForestCollection.removeAsync({});
    });

    it('should insert a new skillforest', async function () {
      const skillforestId = await Meteor.callAsync(
        'insertSkillforest',
        TEST_SKILLFOREST
      );
      assert.ok(skillforestId);
      const insertedSkillforest =
        await SkillForestCollection.findOneAsync(skillforestId);

      assert.deepEqual(insertedSkillforest, {
        ...TEST_SKILLFOREST,
        _id: skillforestId
      });
    });

    it('should get a skillforest by ID', async function () {
      const skillforestId = await Meteor.callAsync(
        'insertSkillforest',
        TEST_SKILLFOREST
      );
      const fetchedSkillforest = await Meteor.callAsync(
        'getSkillforest',
        skillforestId
      );

      assert.deepEqual(fetchedSkillforest, {
        ...TEST_SKILLFOREST,
        _id: skillforestId
      });
    });

    it('should update skillforest title', async function () {
      const skillforestId = await Meteor.callAsync(
        'insertSkillforest',
        TEST_SKILLFOREST
      );
      await Meteor.callAsync(
        'updateSkillforestTitle',
        skillforestId,
        'Updated Title'
      );
      const updatedSkillforest =
        await SkillForestCollection.findOneAsync(skillforestId);

      assert.strictEqual(updatedSkillforest.title, 'Updated Title');
    });

    it('should update skillforest description', async function () {
      const skillforestId = await Meteor.callAsync(
        'insertSkillforest',
        TEST_SKILLFOREST
      );
      await Meteor.callAsync(
        'updateSkillforestDescription',
        skillforestId,
        'Updated Description'
      );
      const updatedSkillforest =
        await SkillForestCollection.findOneAsync(skillforestId);

      assert.strictEqual(updatedSkillforest.description, 'Updated Description');
    });

    it('should update skillforest skilltree IDs', async function () {
      const skillforestId = await Meteor.callAsync(
        'insertSkillforest',
        TEST_SKILLFOREST
      );
      await Meteor.callAsync('updateSkillforestSkilltreeIds', skillforestId, [
        'skilltree3',
        'skilltree4'
      ]);
      const updatedSkillforest =
        await SkillForestCollection.findOneAsync(skillforestId);

      assert.deepEqual(updatedSkillforest.skilltreeIds, [
        'skilltree3',
        'skilltree4'
      ]);
    });
  });
}
