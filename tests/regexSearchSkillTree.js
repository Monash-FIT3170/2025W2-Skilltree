import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import '/imports/api/methods/skillTreeMethods';


describe('searchSkillTrees (Chai)', function () {
    beforeEach(async function () {
        await SkillTreeCollection.removeAsync({});
        
        await SkillTreeCollection.insertAsync({
          title: 'Guitar',
          description: 'learn to play strings?',
          tags: ['music', 'instrument'],
          termsAndConditions: 'Standard terms apply.'
        });
        
        await SkillTreeCollection.insertAsync({
          title: 'Basketball',
          description: 'Learn to play with balls!',
          tags: ['sport', 'ball'],
          termsAndConditions: 'Standard terms apply.'
        });
      });

  // Test 1: keyword as title
  it('finds communities by title', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'Guitar');  // Note: callAsync()!
    expect(results).to.have.lengthOf(1);
    expect(results[0].title).to.equal('Guitar');
  });

  // Test 2: keyword as desc
  it('finds communities by desc', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'play strings');
    expect(results).to.have.lengthOf(1);
    expect(results[0].description).to.include('play strings');
    expect(results[0].title).to.equal('Guitar');
  });

  // Test 3: tag
  it('finds communities by tag', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'sport');
    expect(results).to.have.lengthOf(1);
    expect(results[0].tags).to.include('sport');
    expect(results[0].title).to.equal('Basketball');
  });

  // Test 4: empty
  it('returns all communities if empty', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', '');
    expect(results).to.have.lengthOf(2);
  });
});