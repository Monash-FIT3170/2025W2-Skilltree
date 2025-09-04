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
      // {
      //   _id: 'software',
      //   title: 'Software Development',
      //   description:
      //     'This skill forest covers the fundamentals of software development including programming languages, algorithms, and data structures.',
      //   skilltreeIds: ['basketball', 'soccer', 'cricket', 'tennis'],
      //   owner: sampleUser._id
      // },
      // {
      //   title: 'Athletic Training',
      //   description:
      //     'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
      //   skilltreeIds: ['tennis', 'Climbing', 'jeditraining'],
      //   owner: sampleUser._id
      // }
      // ,
      // {
      //   title: 'Digital Marketing',
      //   description: 'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
      //   skilltreeIds: ['7', '8', '9'],
      //   owner: sampleUser._id,
      //   image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmarketing&psig=AOvVaw0erwMW3q6aJnL87PBG21LJ&ust=1756516816177000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJD3p5jtro8DFQAAAAAdAAAAABAK'
      // },
      // {
      //   title: 'Drumming Mastery',
      //   description: 'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
      //   skilltreeIds: ['10', '11', '12'],
      //   owner: sampleUser._id,
      //   image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdittomusic.com%2Fen%2Fblog%2Ftop-10-drumming-techniques-to-level-up-your-sound&psig=AOvVaw3jxZ1VeeKE5t-C6ho5CjSs&ust=1756516760711000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIju7v3sro8DFQAAAAAdAAAAABAE'
      // }
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