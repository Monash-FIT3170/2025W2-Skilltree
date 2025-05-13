import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Schema
import '/imports/api/schemas/Users'; // Enable Users Schema Validation (demonstration)

// Publish the publication named as "users" from the backend, lets clients (front-end JSX) subscribe to the data for real time changes
Meteor.publish('users', () => {
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

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  Meteor.users.removeAsync({}); // Drop users content to update and avoid dupes (debug)
  Accounts.createUser({
    username: 'username',
    email: 'example@email.com',
    password: 'password'
  });

  Accounts.createUser({
    username: 'typeShii',
    email: 'godDragonSlayer@example.com',
    password: 'pass',
    profile: {
      fullName: 'Steven Kaing',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'idk what to put here lol',
      dateOfBirth: new Date('2024-05-07'),
      subscribedCommunities: ['iCZmdXWy5GyqoqBox', 'iCZmdXWy5GyqoqBox'],
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
      membership_tier: 'pro'
    }
  });
});
