import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/collections/PostCollection';

// Import schema for validation
import '/imports/api/schemas/PostSchema';

// Publish posts
Meteor.publish('post', () => PostCollection.find());

Meteor.startup(async () => {
  // Clear collection asynchronously
  await PostCollection.removeAsync({});

  const mockPosts = [
    {
      title: 'Test Post 1',
      description:
        'Placing feet precisely, applying the right pressure, and adjusting body weight to maintain balance and efficient movement.',
      verification: 1,
      user: 'James',
      date: new Date('2025-05-01T10:00:00Z'),
      evidence: '/images/pic1.jpg', // Updated evidence path
      subskill: 'Footwork',
      upvotes: 0,
      downvotes: 0
    },
    {
      title: 'Test Post 2',
      description: 'Recognising and utilising different types of handholds',
      verification: 5,
      user: 'Adam',
      date: new Date('2025-05-02T11:30:00Z'),
      evidence: '/images/pic3.png',
      subskill: 'Handholds',
      upvotes: 0,
      downvotes: 0
    },
    {
      title: 'Test Post 3',
      description:
        'Controlling body weight and shifting the centre of gravity to maintain stability on the wall',
      verification: 3,
      user: 'Sally',
      date: new Date('2025-05-03T15:45:00Z'),
      evidence: '/images/pic4.png',
      subskill: 'Balance',
      upvotes: 0,
      downvotes: 0
    },
    {
      title: 'Test Post 4',
      description:
        'Using momentum and power to propel oneself up the wall, requiring core engagement and coordination.',
      verification: 10,
      user: 'Kate',
      date: new Date('2025-05-04T09:20:00Z'),
      evidence: '/images/pic5.png',
      subskill: 'Dynamic Movement',
      upvotes: 0,
      downvotes: 0
    },
    {
      title: 'Test Post 5',
      description:
        'Recognising and using rest points to recover and conserve energy.',
      verification: 4,
      user: 'Lily',
      date: new Date('2025-05-05T14:10:00Z'),
      evidence: '/images/pic6.png',
      subskill: 'Resting',
      upvotes: 0,
      downvotes: 0
    }
  ];

  // Insert posts asynchronously
  for (const post of mockPosts) {
    await PostCollection.insertAsync(post);
  }
});
