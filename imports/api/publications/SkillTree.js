import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import '/imports/api/schemas/SkillTree';

Meteor.publish('skilltrees', () => SkillTreeCollection.find());

Meteor.startup(async () => {
  await SkillTreeCollection.removeAsync({});
  //generated dummy inputs
  const dummySkillTrees = [
    {
      title: 'Basketball',
      image:
        'https://media.istockphoto.com/id/1636022764/photo/basketball-ball.jpg?s=612x612&w=0&k=20&c=NVi1V5dCAZKUHdrhnRq-G5t8XSvZE1YXvgw8NxX3N0I=',
      description: 'Learn dribbling to shooting.',
      termsAndConditions:
        'This SkillTree is intended for sports training purposes.',
      tags: ['basketball', 'sports', 'ball'],
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
          type: 'view-node-locked',
          data: {
            label: 'Spin Move 😵',
            description: 'Learn how to do a spin move.',
            progressXp: 0,
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
      ],
      admins: ['basketballpro'],
      subscribers: [
        "playerA",
        "playerB",
        "a1S2A2A933jf",
      ],
    },
    {
      title: 'Soccer',
      image: 'https://example.com/image1.png',
      description: 'Learn the core skills for soccer',
      termsAndConditions:
        'Content for personal development in football skills.',
      tags: ['football', 'soccer', 'sports'],
      skillNodes: [
        {
          id: 'pass',
          type: 'view-node-unlocked',
          data: {
            label: 'Passing',
            description: 'Learn how to pass the ball effectively.',
            progressXp: 10,
            requirements:
              'Upload a video of yourself passing back and forth 3 times with another player',
            xpPoints: 10
          },
          position: { x: 300, y: 100 }
        },
        {
          id: 'shoot',
          type: 'view-node-locked',
          data: {
            label: 'Shooting',
            description: 'Learn how to shoot and score',
            progressXp: 30,
            requirements: 'Upload a video of yourself scoring a goal',
            xpPoints: 30
          },
          position: { x: 100, y: 250 }
        },
        {
          id: 'goalkeep',
          type: 'view-node-locked',
          data: {
            label: 'Goalkeeping',
            description: 'Learn how to defend the goal',
            progressXp: 50,
            requirements: 'Upload a video of yourself making a save',
            xpPoints: 50
          },
          position: { x: 500, y: 350 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'pass', target: 'shoot' },
        { id: 'e2', source: 'shoot', target: 'goalkeep' }
      ],
      admins: ['soccerpro'],
      subscribers: ['fanX', 'fanY']
    },
    {
      title: 'Cricket',
      image: 'https://example.com/image1.png',
      description: 'Learn batting, bowling, and fielding in cricket.',
      termsAndConditions: 'For cricket enthusiasts and training programs.',
      tags: ['cricket', 'bat', 'sports'],
      skillNodes: [
        {
          id: 'bat',
          type: 'view-node-unlocked',
          data: {
            label: 'Batting',
            description: 'Learn how to bat effectively.',
            progressXp: 15,
            requirements: 'Upload a video of yourself batting for 10 balls',
            xpPoints: 15
          },
          position: { x: 100, y: 75 }
        },
        {
          id: 'bowl',
          type: 'view-node-locked',
          data: {
            label: 'Bowling',
            description: 'Learn how to bowl effectively.',
            progressXp: 25,
            requirements: 'Upload a video of yourself bowling 10 balls',
            xpPoints: 25
          },
          position: { x: 300, y: 175 }
        },
        {
          id: 'field',
          type: 'view-node-locked',
          data: {
            label: 'Fielding',
            description: 'Learn how to field effectively.',
            progressXp: 35,
            requirements: 'Upload a video of yourself fielding and catching',
            xpPoints: 35
          },
          position: { x: 500, y: 275 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'bat', target: 'bowl' },
        { id: 'e2', source: 'bowl', target: 'field' }
      ],
      admins: ['cricketpro'],
      subscribers: ['user1', 'user2']
    },
    {
      title: 'Tennis',
      image: 'https://example.com/image1.png',
      description: 'hit the ball to eachother with a racket',
      termsAndConditions: 'For use by tennis players and trainers.',
      tags: ['tennis', 'racket', 'sports'],
      skillNodes: [
        {
          id: 'serve',
          type: 'view-node-unlocked',
          data: {
            label: 'Serving',
            description: 'Learn how to serve the tennis ball effectively.',
            progressXp: 20,
            requirements: 'Upload a video of yourself serving 5 times',
            xpPoints: 20
          },
          position: { x: 300, y: 100 }
        },
        {
          id: 'rally',
          type: 'view-node-locked',
          data: {
            label: 'Rally Techniques',
            description: 'Learn how to rally with a partner.',
            progressXp: 30,
            requirements:
              'Upload a video of yourself making a rally with at least 10 hits',
            xpPoints: 30
          },
          position: { x: 300, y: 200 }
        },
        {
          id: 'serve-and-volley',
          type: 'view-node-locked',
          data: {
            label: 'Serve and Volley',
            description: 'Learn how serve and volley for the winner',
            progressXp: 75,
            requirements:
              'Upload a video of yourself winning a point with a serve and volley',
            xpPoints: 75
          },
          position: { x: 300, y: 300 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'serve', target: 'rally' },
        { id: 'e2', source: 'rally', target: 'serve-and-volley' }
      ],
      admins: ['tennispro'],
      subscribers: ['playerZ', 'coachY']
    },
    {
      _id: 'Climbing',
      title: 'Climbing',
      image: 'https://example.com/image1.png',
      description: 'Learn how to climb effectively.',
      termsAndConditions: 'For use by climbing enthusiasts and trainers.',
      tags: ['climbing', 'outdoor', 'sports'],
      skillNodes: [
        {
          id: 'bouldering',
          type: 'view-node-unlocked',
          data: {
            label: 'Bouldering',
            description: 'Learn how to boulder effectively.',
            progressXp: 20,
            requirements: 'Upload a video of yourself bouldering for 5 minutes',
            xpPoints: 20
          },
          position: { x: 300, y: 100 }
        },
        {
          id: 'climbing-techniques',
          type: 'view-node-locked',
          data: {
            label: 'Climbing Techniques',
            description: 'Learn how to climb with a partner.',
            progressXp: 30,
            requirements:
              'Upload a video of yourself making a climb with at least 10 holds',
            xpPoints: 30
          },
          position: { x: 300, y: 200 }
        },
        {
          id: 'turn',
          type: 'view-node-locked',
          data: {
            label: 'Turning Techniques',
            description: 'Learn how to turn effectively while climbing.',
            progressXp: 75,
            requirements: 'Upload a video of yourself turning while climbing',
            xpPoints: 75
          },
          position: { x: 300, y: 300 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'bouldering', target: 'climbing-techniques' },
        { id: 'e2', source: 'climbing-techniques', target: 'turn' }
      ],
      admins: ['tennispro'],
      subscribers: ['playerZ', 'coachY']
    },
    {
      title: 'Jedi Training',
      image:
        'https://upload.wikimedia.org/wikipedia/en/8/8e/Jedi_Order_symbol.svg',
      description:
        'Train to become a Jedi Master, from mastering the Force to wielding a lightsaber.',
      termsAndConditions:
        'This SkillTree is for entertainment and fan-based learning purposes only.',
      tags: ['star wars', 'jedi', 'force', 'fiction'],
      skillNodes: [
        {
          id: 'root',
          type: 'root',
          data: {
            label: 'Youngling Initiation 🌟',
            description: 'Begin your Jedi journey.',
            progressXp: null,
            requirements: 'None',
            xpPoints: null
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'force-sense',
          type: 'view-node-unlocked',
          data: {
            label: 'Force Sensitivity ✨',
            description: 'Learn how to sense the Force.',
            progressXp: 5,
            requirements:
              'Watch a video about the Force and answer 3 quiz questions.',
            xpPoints: 10
          },
          position: { x: 150, y: 100 }
        },
        {
          id: 'lightsaber-basics',
          type: 'view-node-unlocked',
          data: {
            label: 'Lightsaber Basics ⚔️',
            description: 'Understand the basic lightsaber forms.',
            progressXp: 10,
            requirements: 'Upload a video of you mimicking Form I (Shii-Cho).',
            xpPoints: 15
          },
          position: { x: -150, y: 100 }
        },
        {
          id: 'meditation',
          type: 'view-node-unlocked',
          data: {
            label: 'Jedi Meditation 🧘‍♂️',
            description: 'Develop mental clarity and connection to the Force.',
            progressXp: 10,
            requirements: 'Record a 2-minute meditation log.',
            xpPoints: 10
          },
          position: { x: 0, y: 200 }
        },
        {
          id: 'telekinesis',
          type: 'view-node-locked',
          data: {
            label: 'Force Telekinesis 🌀',
            description: 'Master the art of moving objects with your mind.',
            progressXp: 0,
            requirements:
              'Upload a short creative video simulating telekinesis.',
            xpPoints: 20
          },
          position: { x: 200, y: 300 }
        },
        {
          id: 'duel',
          type: 'view-node-locked',
          data: {
            label: 'Lightsaber Duel 🥷',
            description: 'Engage in your first training duel.',
            progressXp: 0,
            requirements:
              'Upload a video of a lightsaber duel (with a friend or animation).',
            xpPoints: 30
          },
          position: { x: -200, y: 300 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'root', target: 'force-sense' },
        { id: 'e2', source: 'root', target: 'lightsaber-basics' },
        { id: 'e3', source: 'root', target: 'meditation' },
        { id: 'e4', source: 'force-sense', target: 'telekinesis' },
        { id: 'e5', source: 'lightsaber-basics', target: 'duel' }
      ],
      admins: ['masterYoda'],
      subscribers: ['padawan1', 'padawan2']
    }
  ];

  for (const skillTree of dummySkillTrees) {
    await SkillTreeCollection.insertAsync(skillTree);
  }
});
