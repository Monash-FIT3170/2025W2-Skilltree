import { Meteor } from 'meteor/meteor';
import { SkillForestCollection } from '/imports/api/collections/SkillForest';

Meteor.publish('skillforests', () => SkillForestCollection.find());

Meteor.startup(async () => {
  await SkillForestCollection.removeAsync({});

  const dummySkillForests = [
    {
      title: 'Software Development',
      description:
        'This skill forest covers the fundamentals of software development including programming languages, algorithms, and data structures.',
      skilltreeIds: ['1', '2', '3']
    },
    {
      title: 'Athletic Training',
      description:
        'Become an all-rounder athlete with skills in strength training, endurance, and flexibility.',
      skilltreeIds: ['4', '5', '6']
    }
  ];

  // Insert dummy data
  for (const skillforest of dummySkillForests) {
    await SkillForestCollection.insertAsync(skillforest);
  }
});
