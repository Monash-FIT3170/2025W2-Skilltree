import { Meteor } from 'meteor/meteor';
import { ProofCollection } from '/imports/api/collections/Proof';

// Import schema for validation
import '/imports/api/schemas/Proof';

// Publish proofs
Meteor.publish('proof', () => ProofCollection.find());

Meteor.startup(async () => {
  // Clear collection asynchronously
  await ProofCollection.removeAsync({});

  const mockProofs = [
    {
      _id: 'testProof1',
      title: 'Test Proof 1',
      description:
        'Placing feet precisely, applying the right pressure, and adjusting body weight to maintain balance and efficient movement.',
      user: 'jamesid',
      username: 'James',
      date: new Date('2025-05-01T10:00:00Z'),
      evidenceLink: '/images/pic1.jpg',
      verification: 1,
      skillTreeId: 'Climbing', // should eventually be a community/skillTree ID
      subskill: 'Footwork',
      upvotes: 1,
      downvotes: 0
    },
    {
      _id: 'testProof2',
      title: 'Test Proof 2',
      description: 'Recognising and utilising different types of handholds',
      user: 'adamid',
      username: 'Adam',
      date: new Date('2025-05-02T11:30:00Z'),
      evidenceLink: '/images/pic3.png',
      verification: 5,
      skillTreeId: 'Climbing',
      subskill: 'Handholds',
      upvotes: 5,
      downvotes: 0
    },
    {
      _id: 'testProof3',
      title: 'Test Proof 3',
      description:
        'Controlling body weight and shifting the centre of gravity to maintain stability on the wall',
      user: 'sallyid',
      username: 'Sally',
      date: new Date('2025-05-03T15:45:00Z'),
      evidenceLink: '/images/pic4.png',
      verification: 3,
      skillTreeId: 'Climbing',
      subskill: 'Balance',
      upvotes: 3,
      downvotes: 0
    },
    {
      _id: 'testProof4',
      title: 'Test Proof 4',
      description:
        'Using momentum and power to propel oneself up the wall, requiring core engagement and coordination.',
      user: 'kateid',
      username: 'Kate',
      date: new Date('2025-05-04T09:20:00Z'),
      evidenceLink: '/images/pic5.png',
      verification: 10,
      skillTreeId: 'Climbing',
      subskill: 'Dynamic Movement',
      upvotes: 10,
      downvotes: 0
    },
    {
      _id: 'testProof5',
      title: 'Test Proof 5',
      description:
        'Recognising and using rest points to recover and conserve energy.',
      user: 'lilyid',
      username: 'Lily',
      date: new Date('2025-05-05T14:10:00Z'),
      evidenceLink: '/images/pic6.png',
      verification: 4,
      skillTreeId: 'Climbing',
      subskill: 'Resting',
      upvotes: 0,
      downvotes: 0
    }
  ];

  // Insert proofs asynchronously
  for (const proof of mockProofs) {
    await ProofCollection.insertAsync(proof);
  }
});
