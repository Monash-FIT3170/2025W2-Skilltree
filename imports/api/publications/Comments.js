// server/publications.js
import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '/imports/api/collections/Comments';

// Schema
import '/imports/api/schemas/Comments'; // Enable Comments Schema Validation

// Publish the comments collection
Meteor.publish('comments', () => CommentsCollection.find());

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
  console.log('comments.js loaded');

  // Add dummy comments data
  await CommentsCollection.removeAsync({}); // Clean existing comments

  const dummyComments = [
    {
      username: 'user1',
      comment: 'This is the first comment!',
      createdAt: new Date()
    },
    {
      username: 'user2',
      comment: 'Here is another comment.',
      createdAt: new Date(Date.now() - 1000 * 60 * 5)
    }, // 5 mins ago
    {
      username: 'user3',
      comment: 'Loving this comment section!',
      createdAt: new Date(Date.now() - 1000 * 60 * 15)
    }, // 15 mins ago
    {
      username: 'user4',
      comment: 'Great work on this feature!',
      createdAt: new Date(Date.now() - 1000 * 60 * 30)
    }, // 30 mins ago
    {
      username: 'user5',
      comment: 'Keep up the good work!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60)
    }, // 1 hour ago
    {
      username: 'bookworm',
      comment:
        'Ulysses by James Joyce is a masterpiece of modernist literature.',
      createdAt: new Date(Date.now() - 1000 * 60 * 120)
    }, // 2 hours ago
    {
      username: 'literature_fan',
      comment:
        'I found the stream of consciousness writing style challenging but rewarding.',
      createdAt: new Date(Date.now() - 1000 * 60 * 180)
    }, // 3 hours ago
    {
      username: 'dublin_reader',
      comment: 'The way Joyce captures a day in Dublin is incredible.',
      createdAt: new Date(Date.now() - 1000 * 60 * 240)
    } // 4 hours ago
  ];

  // Insert all the dummy comments
  for (const comment of dummyComments) {
    await CommentsCollection.insertAsync(comment);
  }

  console.log(`Inserted ${dummyComments.length} dummy comments`);
});
