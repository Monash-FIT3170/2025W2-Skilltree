import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import '/imports/api/methods/skillTreeMethods';

describe('searchSkillTrees (Chai)', function () {
  beforeEach(async function () {
    // clear existing data
    await SkillTreeCollection.removeAsync({});

    // insert data
    await SkillTreeCollection.insertAsync({
      title: 'Guitar',
      description: 'learn to play strings?',
      termsAndConditions: 'Basic usage terms apply.',
      tags: ['music', 'instrument'],
      skillNodes: [
        {
          id: '1',
          type: 'default',
          data: { label: 'Basic chords' },
          position: { x: 0, y: 0 }
        }
      ],
      skillEdges: [],
      admins: ['test-admin-1'],
      subscribers: ['test-user-1']
    });

    await SkillTreeCollection.insertAsync({
      title: 'Basketball',
      description: 'Learn to play with balls!',
      termsAndConditions: 'Basic usage terms apply.',
      tags: ['sport', 'ball'],
      skillNodes: [
        {
          id: '2',
          type: 'default',
          data: { label: 'Dribbling' },
          position: { x: 0, y: 0 }
        }
      ],
      skillEdges: [],
      admins: ['test-admin-2'],
      subscribers: ['test-user-2']
    });
  });

  afterEach(async function () {
    // clean after each test
    await SkillTreeCollection.removeAsync({});
  });

  // Test 1: keyword as title
  it('finds communities by title', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'Guitar');
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
