import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

// Schema
import '/imports/api/schemas/Users'; // Enable Users Schema Validation

// Publish the publication named as "users" from the backend, lets clients (front-end JSX) subscribe to the data for real time changes
Meteor.publish('users', () => Meteor.users.find());

const dummyProgressTree = [
  {
    userId: 123123,
    skilltreeId: 'basketball',
    skillNodes: [
      {
        id: '0',
        type: 'root',
        data: {
          label: 'root',
          description: 'root',
          requirements: 'root',
          xpPoints: null,
          children: ['7', '4', '3']
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
          proofId: 'testProofId',
          children: []
        },
        position: { x: 200, y: 300 }
      },
      {
        id: '2',
        type: 'view-node-unlocked',
        data: {
          label: 'Layup 🏃‍♂️',
          description:
            'A close-range shot taken by driving toward the basket and laying the ball off the backboard.',
          requirements: 'Upload a video of yourself',
          netUpvotesRequired: 10,
          currentNetUpvotes: 0,
          xpPoints: 10,
          children: ['1']
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
          currentNetUpvotes: 0,
          xpPoints: 15,
          children: ['2']
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
          xpPoints: 10,
          children: []
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
          xpPoints: 10,
          children: []
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
          xpPoints: 10,
          children: ['5']
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
          xpPoints: 10,
          children: ['6', '8']
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
          xpPoints: 10,
          children: ['5']
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
    roles: ['user', 'expert'],
    active: true
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

  await Meteor.callAsync('skilltrees.subscribeUser', 'basketball', sampleId);

  await Meteor.callAsync(
    'skilltrees.subscribeUser',
    'basketball',
    communityMemberA
  );

  // There is a hardcoded subscription object for sampleId and basketball, so we need to run this method to ensure consistency with the subscribers list.
  await Meteor.callAsync('skilltrees.subscribeUser', 'basketball', sampleId);

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

    // Dummy account progress for users in basketball community
    // Delete if needed
    const memberId = await Accounts.createUserAsync({
      username: memberUsername,
      profile: {
        avatarUrl:
          i === 42
            ? 'https://i.pinimg.com/736x/c2/1e/7e/c21e7e2976743369ca7f86349aeb22a9.jpg'
            : null
      }
    });

    await Meteor.callAsync('skilltrees.subscribeUser', 'basketball', memberId);

    // Insert dummy data
    for (const progressTree of dummyProgressTree) {
      const copyProgressTree = { ...progressTree, userId: memberId };

      await SubscriptionsCollection.insertAsync(copyProgressTree);
    }

    if (i % 6 == 0) {
      const dummyProof = {
        title: 'Dribbling',
        description: 'chat',
        user: memberId,
        username: memberUsername,
        date: new Date(),
        evidenceLink:
          'https://pbs.twimg.com/card_img/1975252080320520198/0VebYBGO?format=jpg&name=4096x4096',
        verification: 10,
        skilltreeId: 'basketball',
        eventId: 'dribbling_basketball',
        upvotes: i
      };

      await Meteor.callAsync('insertProof', dummyProof);
    }
  }
});
