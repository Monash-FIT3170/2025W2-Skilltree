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
      skilltreeId: 'Climbing', // should eventually be a community/skillTree ID
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
      skilltreeId: 'Climbing',
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
      skilltreeId: 'Climbing',
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
      skilltreeId: 'Climbing',
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
      skilltreeId: 'Climbing',
      subskill: 'Resting',
      upvotes: 0,
      downvotes: 0
    }
  ];

  // Event-specific proofs for the Speedclimbing contest
  const eventProofs = [
    {
      _id: 'eventProof1',
      title: 'Speed Climb - Personal Best',
      description:
        'Completed the speed climb in 8.5 seconds! Focused on explosive power and precise footwork.',
      user: 'mikeid',
      username: 'Mike',
      date: new Date('2025-05-10T14:30:00Z'),
      evidenceLink: '/images/pic1.jpg',
      verification: 8,
      skilltreeId: 'Climbing',
      subskill: 'Speed Climbing',
      eventId: 'speedclimbing_contest',
      upvotes: 12,
      downvotes: 0
    },
    {
      _id: 'eventProof2',
      title: 'Fast Ascent Technique',
      description:
        'Using dynamic movement and momentum to reach the top quickly. Time: 9.2 seconds.',
      user: 'sarahid',
      username: 'Sarah',
      date: new Date('2025-05-11T10:15:00Z'),
      evidenceLink: '/images/pic3.png',
      verification: 7,
      skilltreeId: 'Climbing',
      subskill: 'Speed Climbing',
      eventId: 'speedclimbing_contest',
      upvotes: 8,
      downvotes: 1
    },
    {
      _id: 'eventProof3',
      title: 'Efficient Route Finding',
      description:
        'Analyzed the best sequence of holds for maximum speed. Achieved 10.1 second climb.',
      user: 'alexid',
      username: 'Alex',
      date: new Date('2025-05-12T16:45:00Z'),
      evidenceLink: '/images/pic4.png',
      verification: 6,
      skilltreeId: 'Climbing',
      subskill: 'Speed Climbing',
      eventId: 'speedclimbing_contest',
      upvotes: 15,
      downvotes: 0
    },
    {
      _id: 'eventProof4',
      title: 'Power and Speed Combined',
      description:
        'Combining upper body strength with rapid leg movement. 7.8 second personal record!',
      user: 'emilyjid',
      username: 'Emily',
      date: new Date('2025-05-13T11:20:00Z'),
      evidenceLink: '/images/pic5.png',
      verification: 9,
      skilltreeId: 'Climbing',
      subskill: 'Speed Climbing',
      eventId: 'speedclimbing_contest',
      upvotes: 20,
      downvotes: 0
    },
    {
      _id: 'eventProof5',
      title: 'Consistent Speed Training',
      description:
        'Maintained an average time of 9.5 seconds over 5 attempts. Consistency is key!',
      user: 'davidid',
      username: 'David',
      date: new Date('2025-05-14T09:30:00Z'),
      evidenceLink: '/images/pic6.png',
      verification: 5,
      skilltreeId: 'Climbing',
      subskill: 'Speed Climbing',
      eventId: 'speedclimbing_contest',
      upvotes: 6,
      downvotes: 2
    },
    {
      _id: 'eventProof6',
      title: 'Lightning Fast Finish',
      description:
        'New competition record! Finished in 7.2 seconds with perfect technique.',
      user: 'lisaid',
      username: 'Lisa',
      date: new Date('2025-05-15T13:00:00Z'),
      evidenceLink: '/images/pic1.jpg',
      verification: 10,
      skilltreeId: 'Climbing',
      subskill: 'Speed Climbing',
      eventId: 'speedclimbing_contest',
      upvotes: 25,
      downvotes: 0
    }
  ];

  // Insert regular proofs asynchronously
  for (const proof of mockProofs) {
    await ProofCollection.insertAsync(proof);
  }

  // Insert event-specific proofs asynchronously
  for (const proof of eventProofs) {
    await ProofCollection.insertAsync(proof);
  }
});
