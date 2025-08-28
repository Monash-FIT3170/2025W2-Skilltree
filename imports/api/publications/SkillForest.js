import { Meteor } from 'meteor/meteor';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';

Meteor.publish('skillForests', () => SkillForestCollection.find());

Meteor.startup(async () => {
  await SkillForestCollection.removeAsync({});

  Meteor.setTimeout(async () => {
    const sampleUser = await Meteor.users.findOneAsync({ username: 'sample' });
    if (!sampleUser) {
      console.log('No sample user found. Make sure Users.js runs first.');
      return;
    }

    const dummySkillForests = [
      {
        title: 'Software Development',
        description: 'This skill forest covers the fundamentals of software development including programming languages, algorithms, and data structures.',
        skilltreeIds: ['1', '2', '3'],
        owner: sampleUser._id
      },
      {
        title: 'Athletic Training',
        description: 'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
        skilltreeIds: ['4', '5', '6'],
        owner: sampleUser._id,
      },
      {
        title: 'Digital Marketing',
        description: 'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
        skilltreeIds: ['7', '8', '9'],
        owner: sampleUser._id,
      },
      {
        title: 'Drumming Mastery',
        description: 'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
        skilltreeIds: ['10', '11', '12'],
        owner: sampleUser._id,
      }
    ];

    // Insert dummy data
    const skillForestIds = [];
    for (const skillforest of dummySkillForests) {
      const id = await SkillForestCollection.insertAsync(skillforest);
      skillForestIds.push(id);
    }

    // Update user's profile
    await Meteor.users.updateAsync(sampleUser._id, {
      $set: {
        'profile.createdCommunities': skillForestIds
      }
    });  
  }, 1000); 
}); 