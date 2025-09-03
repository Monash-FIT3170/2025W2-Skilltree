import { Meteor } from 'meteor/meteor';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';

//Import for validation
import '/imports/api/schemas/RoleApplications';

Meteor.publish('roleApplications', () => RoleApplicationCollection.find());

Meteor.startup(async () => {
  await RoleApplicationCollection.removeAsync({});

  // Insert dummy moderator application
  RoleApplicationCollection.insertAsync({
    userId: 'dummy-user-1',
    username: 'Username123',
    email: 'alex.johnson@example.com',
    applicationType: 'moderator',
    status: 'pending',
    skillTreeId: 'basketball',
    qualifications:
      'I have been an active community member for over a year, helping newcomers in the discussion forums. I have experience moderating a Discord server with 300+ members where I handled conflict resolution and maintained community guidelines. I understand the importance of fair and consistent rule enforcement.',
    motivation:
      'I want to help create a welcoming environment where everyone feels comfortable asking questions and sharing knowledge. I believe effective moderation helps build stronger learning communities.',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  RoleApplicationCollection.insertAsync({
    userId: 'dummy-user-2',
    username: 'AnthonyEdwardsDaGoat',
    email: 'ant.edwards@example.com',
    applicationType: 'moderator',
    status: 'pending',
    skillTreeId: 'basketball',
    qualifications:
      'I have been an active community member for over a year, helping newcomers in the discussion forums. I have experience moderating a Discord server with 300+ members where I handled conflict resolution and maintained community guidelines. I understand the importance of fair and consistent rule enforcement.',
    motivation:
      'I want to help create a welcoming environment where everyone feels comfortable asking questions and sharing knowledge. I believe effective moderation helps build stronger learning communities.',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Insert dummy expert application
  RoleApplicationCollection.insertAsync({
    userId: 'dummy-user-3',
    username: 'ChrisPaulCP3',
    email: 'sarah.chen@example.com',
    applicationType: 'expert',
    status: 'pending',
    skillTreeId: 'basketball',
    qualifications:
      'I am a Senior Software Engineer with 6 years of professional JavaScript experience. I work primarily with React, Node.js, and TypeScript. I have built multiple production applications serving 10,000+ users. I hold certifications in AWS and React development. I regularly contribute to open-source projects and have spoken at local JavaScript meetups.',
    motivation:
      'I want to share my knowledge with aspiring developers and help them avoid common mistakes I made early in my career. Teaching others also helps me solidify my own understanding.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  });

  // Insert dummy expert application
  RoleApplicationCollection.insertAsync({
    userId: 'dummy-user-4',
    username: 'KarlMaloneLol',
    email: 'kevin.durant@example.com',
    applicationType: 'expert',
    status: 'pending',
    skillTreeId: 'basketball',
    qualifications:
      'I am a Senior Software Engineer with 6 years of professional JavaScript experience. I work primarily with React, Node.js, and TypeScript. I have built multiple production applications serving 10,000+ users. I hold certifications in AWS and React development. I regularly contribute to open-source projects and have spoken at local JavaScript meetups.',
    motivation:
      'I want to share my knowledge with aspiring developers and help them avoid common mistakes I made early in my career. Teaching others also helps me solidify my own understanding.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  });
});
