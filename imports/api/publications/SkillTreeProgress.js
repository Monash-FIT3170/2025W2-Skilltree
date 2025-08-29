import { Meteor } from 'meteor/meteor';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';

Meteor.publish('skillTreeProgress', () => SkillTreeProgressCollection.find());

Meteor.startup(async () => {
  await SkillTreeProgressCollection.removeAsync({});

  const dummyProgressTree = [
    {
      userId: 123123,
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
            progressXp: 10,
            requirements: 'Upload a video of yourself dribbling for 10 seconds',
            xpPoints: 10
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
            progressXp: 6,
            requirements: 'Upload a video of yourself',
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
            progressXp: 10,
            requirements: 'Upload a video of yourself',
            xpPoints: 20
          },
          position: { x: 200, y: 100 }
        },
        {
          id: '4',
          type: 'view-node-unlocked',
          data: {
            label: 'Agility 💨',
            description: 'Learn how to be agile.',
            progressXp: 34,
            requirements:
              'Upload a video of yourself doing the illinois agility test',
            xpPoints: 50
          },
          position: { x: 0, y: 100 }
        },
        {
          id: '5',
          type: 'view-node-unlocked',
          data: {
            label: 'Shooting Form 🎯',
            description: 'Learn how to do proper shooting form.',
            progressXp: 20,
            requirements: 'Upload a video of yourself',
            xpPoints: 20
          },
          position: { x: -200, y: 300 }
        },
        {
          id: '6',
          type: 'view-node-unlocked',
          data: {
            label: 'Free Throws 💸',
            description: 'Learn how to do free throws.',
            progressXp: 6,
            requirements: 'Upload a video of yourself',
            xpPoints: 20
          },
          position: { x: -150, y: 200 }
        },
        {
          id: '7',
          type: 'view-node-locked',
          data: {
            label: 'Three Pointers 💧',
            description: 'Learn how to do a spin move.',
            progressXp: 0,
            requirements: 'Upload a video of yourself',
            xpPoints: 20
          },
          position: { x: -250, y: 100 }
        },
        {
          id: '8',
          type: 'view-node-unlocked',
          data: {
            label: 'Mid Range 🥶',
            description: 'Learn how to do a spin move.',
            progressXp: 4,
            requirements: 'Upload a video of yourself',
            xpPoints: 20
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
      ]
    }
  ];

  // Insert dummy data
  for (const progressTree of dummyProgressTree) {
    await SkillTreeProgressCollection.insertAsync(progressTree);
  }
});
