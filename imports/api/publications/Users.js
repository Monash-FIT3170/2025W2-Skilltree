import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Schema
import '/imports/api/schemas/Users'; // Enable Users Schema Validation

// Publish the publication named as "users" from the backend, lets clients (front-end JSX) subscribe to the data for real time changes
Meteor.publish('users', () => Meteor.users.find()); // Note: this is only intended for ProfileCompleteRoute, utils/User should be used instead.
Meteor.publish('user', () => {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { username: 1, emails: 1, profile: 1 }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.publish('usernames', function (userIds) {
  if (!userIds) {
    return this.ready();
  }

  return Meteor.users.find(
    { _id: { $in: userIds } },
    {
      fields: {
        username: 1
      }
    }
  );
});

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  // Remove existing users to avoid duplicates (debug only)
  await Meteor.users.removeAsync({});

  // Create first sample user
  await Accounts.createUser({
    username: 'sample',
    password: 'Sample123!',
    email: 'sample@email.com',
    profile: {
      givenName: 'sample',
      familyName: 'sampleLast',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'idk what to put here lol',
      dateOfBirth: new Date('2024-05-07'),
      subscribedCommunities: [],
      roles: ['user', 'moderator'],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      proof_of_practice_uploads: [
        '65a8b11f3d93c27b3c1b9de1',
        '65a8b11f3d93c27b3c1b9de2'
      ],
      expertise_areas: ['Web Development', 'Cybersecurity', 'Devsssps'],
      membership_tier: 'pro',
      createdCommunities: [],
      friends: [],
      skillForests: [],
      isProfileComplete: true
    }
  });

  // Create second sample user
  await Accounts.createUser({
    username: 'example',
    password: 'example123!',
    email: 'example@gmail.com',
    profile: {
      givenName: 'John',
      familyName: 'Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'idk what to put here lol',
      dateOfBirth: new Date('2024-05-07'),
      subscribedCommunities: ['iCZmdXWy5GyqoqBox', 'ZmdXoqCGoWyixyqB5'],
      roles: ['user', 'moderator'],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      proof_of_practice_uploads: [
        '65a8b11f3d93c27b3c1b9de1',
        '65a8b11f3d93c27b3c1b9de2'
      ],
      expertise_areas: ['Web Development', 'Cybersecurity', 'Devsssps'],
      membership_tier: 'pro',
      createdCommunities: [],
      friends: [],
      skillForests: [],
      isProfileComplete: true
    },
    services: {
      password: 'example123!'
    }
  });

  const communityMemberA = await Accounts.createUserAsync({
    username: 'member A',
    password: 'testpass4',
    email: 'lebron@gmail.com',
    profile: {
      givenName: 'John',
      familyName: 'Wall',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'idk what to put here lol',
      dateOfBirth: new Date('2024-05-07'),
      subscribedCommunities: ['iCZmdXWy5GyqoqBox', 'ZmdXoqCGoWyixyqB5'],
      roles: ['user', 'moderator'],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      proof_of_practice_uploads: [
        '65a8b11f3d93c27b3c1b9de1',
        '65a8b11f3d93c27b3c1b9de2'
      ],
      expertise_areas: ['Web Development', 'Cybersecurity', 'Devsssps'],
      membership_tier: 'pro',
      createdCommunities: [],
      friends: [],
      skillForests: [],
      isProfileComplete: true
    },
    services: {
      password: 'example123!'
    }
  });

  await Meteor.callAsync('skilltrees.subscribeUser','basketball',communityMemberA);

  for (let i=0;i<50;i++){
    const memberUsername = 'member' + String(i);

    const memberId = await Accounts.createUserAsync({username: memberUsername});

    await Meteor.callAsync('skilltrees.subscribeUser','basketball',memberId);
  }
});
