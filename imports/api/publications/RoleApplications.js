import { Meteor } from 'meteor/meteor';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';

Meteor.publish('roleApplications', () => RoleApplicationCollection.find());

Meteor.startup(() => {
  // Insert dummy moderator application
  RoleApplicationCollection.insertAsync({
    userId: 'dummy-user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    applicationType: 'moderator',
    status: 'pending',
    skillTreeId: 'dummy-skilltree-1',
    motivation:
      'I want to become a moderator because I believe in creating a positive and inclusive learning environment. I enjoy helping others resolve conflicts and ensuring everyone feels welcome in the community. My goal is to maintain high-quality discussions while encouraging participation from learners at all levels.',
    timeAvailability: '10-15 hours per week',
    previousExperience:
      'I moderated a Discord server with 200+ members for 8 months. Also helped moderate a study group forum during university.',
    rulesAgreement: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Insert dummy expert application
  RoleApplicationCollection.insertAsync({
    userId: 'dummy-user-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    applicationType: 'expert',
    status: 'pending',
    skillTreeId: 'dummy-skilltree-1',
    skillArea: 'JavaScript',
    experienceLevel: 'expert (5+ years)',
    qualifications:
      'I have 6 years of professional JavaScript development experience, working with React, Node.js, and various modern frameworks. I have built multiple production applications serving thousands of users and have mentored junior developers at my current company.',
    portfolio: 'https://github.com/sarahchen',
    motivation:
      'I want to give back to the JavaScript community that has taught me so much. I enjoy explaining complex concepts in simple terms and helping new developers avoid common pitfalls.',
    mentorshipExperience:
      'I have mentored 5 junior developers at my company over the past 2 years. I also volunteer at local coding bootcamps teaching JavaScript fundamentals.',
    availabilityForHelp: 'regular weekly assistance',
    createdAt: new Date(),
    updatedAt: new Date()
  });
});
