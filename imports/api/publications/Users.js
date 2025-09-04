import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

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
        username: 1,
        profile: 1
      }
    }
  );
});

const dummyProgressTree = [
  {
    userId: 123123,
    skillTreeId: 'basketball',
    skillNodes: [
      {
        id: '0',
        type: 'root',
        data: {
          label: 'root',
          description: 'root',
          progressXp: null,
          requirements: 'root',
          xpPoints: null
        },
        position: { x: 0, y: 0 }
      },
      {
        id: '1',
        type: 'view-node-unlocked',
        data: {
          label: 'basic dribbling 🏀',
          description: 'Learn how to dribble the basketball effectively.',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10,
          requirements: 'Upload a video of yourself dribbling for 10 seconds',
          proofId: 'testProofId'
        },
        position: { x: 200, y: 300 }
      },
      {
        id: '2',
        type: 'view-node-unlocked',
        data: {
          label: 'Layup 🏃‍♂️',
          description:
            ' A close-range shot taken by driving toward the basket and laying the ball off the backboard.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10
        },
        position: { x: 200, y: 200 }
      },
      {
        id: '3',
        type: 'view-node-unlocked',
        data: {
          label: 'Spin Move 😵',
          description: 'Learn how to do a spin move.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 15,
          currentNetUpvotes: 3,
          xpPoints: 15
        },
        position: { x: 200, y: 100 }
      },
      {
        id: '4',
        type: 'view-node-unlocked',
        data: {
          label: 'Agility 💨',
          description: 'Learn how to be agile.',
          requirements:
            'Upload a video of yourself doing the illinois agility test',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10
        },
        position: { x: 0, y: 100 }
      },
      {
        id: '5',
        type: 'view-node-unlocked',
        data: {
          label: 'Shooting Form 🎯',
          description: 'Learn how to do proper shooting form.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10
        },
        position: { x: -200, y: 300 }
      },
      {
        id: '6',
        type: 'view-node-unlocked',
        data: {
          label: 'Free Throws 💸',
          description: 'Learn how to do free throws.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10
        },
        position: { x: -150, y: 200 }
      },
      {
        id: '7',
        type: 'view-node-locked',
        data: {
          label: 'Three Pointers 💧',
          description: 'Learn how to do a spin move.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10
        },
        position: { x: -250, y: 100 }
      },
      {
        id: '8',
        type: 'view-node-unlocked',
        data: {
          label: 'Mid Range 🥶',
          description: 'Learn how to do a spin move.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10
        },
        position: { x: -350, y: 200 }
      }
    ],
    skillEdges: [
      { id: 'e1', source: '0', target: '7' },
      { id: 'e2', source: '0', target: '4' },
      { id: 'e3', source: '0', target: '3' },
      { id: 'e4', source: '3', target: '2' },
      { id: 'e5', source: '2', target: '1' },
      { id: 'e6', source: '7', target: '6' },
      { id: 'e7', source: '7', target: '8' },
      { id: 'e8', source: '6', target: '5' },
      { id: 'e9', source: '8', target: '5' }
    ],
    roles: ['user', 'expert']
  }
];

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  // Remove existing users to avoid duplicates (debug only)
  await Meteor.users.removeAsync({});

  // Create first sample user
  const sampleId = await Accounts.createUser({
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
      isProfileComplete: true,
      commentNumTEMP: 15
    }
  });

  // Create second sample user
  const exampleId = await Accounts.createUser({
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
      isProfileComplete: true,
      commentNumTEMP: 0
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
      isProfileComplete: true,
      commentNumTEMP: 4
    },
    services: {
      password: 'example123!'
    }
  });

  await Meteor.callAsync(
    'skilltrees.subscribeUser',
    'basketball',
    communityMemberA
  );

  //Sample Dummy skilltree progress
  for (const progressTree of dummyProgressTree) {
    var copyProgressTree1 = { ...progressTree };
    copyProgressTree1.userId = sampleId;
    copyProgressTree1.roles = [...progressTree.roles, 'admin'];
    await SubscriptionsCollection.insertAsync(copyProgressTree1);
  }
  //Example Dummy skilltree progress
  for (const progressTree of dummyProgressTree) {
    var copyProgressTree2 = { ...progressTree };
    copyProgressTree2.userId = exampleId;
    copyProgressTree2.roles = [...progressTree.roles, 'admin'];
    await SubscriptionsCollection.insertAsync(copyProgressTree2);
  }
  //John Wall Dummy skilltree progress
  for (const progressTree of dummyProgressTree) {
    var copyProgressTree3 = { ...progressTree };
    copyProgressTree3.userId = communityMemberA;
    await SubscriptionsCollection.insertAsync(copyProgressTree3);
  }

  for (let i = 0; i < 50; i++) {
    const memberUsername = 'member' + String(i);

    const memberId = await Accounts.createUserAsync({
      username: memberUsername,
      profile: {
        commentNumTEMP: Math.floor(Math.random() * 10)
      }
    });

    await Meteor.callAsync('skilltrees.subscribeUser', 'basketball', memberId);

    // Insert dummy data
    for (const progressTree of dummyProgressTree) {
      const copyProgressTree = { ...progressTree, userId: memberId };

      await SubscriptionsCollection.insertAsync(copyProgressTree);
    }
  }
});
