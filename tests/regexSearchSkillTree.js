import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';

describe('searchSkillTrees (Using dummy data)', function () {
  
  // No beforeEach insert, assuming dummy data already loaded

  it('finds skill tree by title Basketball', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'Basketball');
    expect(results).to.have.lengthOf(1);
    expect(results[0].title).to.equal('Basketball');
  });

  it('finds skill tree by description Soccer', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'core skills');
    expect(results).to.have.lengthOf(1);
    expect(results[0].title).to.equal('Soccer');
  });

  it('finds skill tree by tag sports', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', 'sports');
    expect(results.length).to.be.gte(1); // should find multiple skill trees
    expect(results.some(tree => tree.title === 'Cricket')).to.be.true;
  });

  it('returns all skill trees if empty', async function () {
    const results = await Meteor.callAsync('searchSkillTrees', '');
    expect(results.length).to.be.gte(4); // your dummy data has 4 skill trees
  });
});
