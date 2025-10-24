import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import '/imports/api/schemas/SkillTree';

Meteor.publish('skilltrees', () => SkillTreeCollection.find());

Meteor.startup(async () => {
  //generated dummy inputs
  const dummySkillTrees = [
    {
      _id: 'basketball',
      title: 'Basketball',
      owner: 'owner',
      image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
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
      admins: ['basketballpro'],
      subscribers: ['playerA', 'playerB', 'a1S2A2A933jf']
    },
    {
      _id: 'soccer',
      title: 'Soccer',
      owner: 'owner',
      image:
        'https://www.shutterstock.com/image-photo/dynamic-cinematic-shot-professional-soccer-260nw-2469222681.jpg',
      description: 'Learn the core skills for soccer',
      termsAndConditions:
        'Content for personal development in football skills.',
      tags: ['football', 'soccer', 'sports'],
      skillNodes: [
        {
          id: '0',
          type: 'root',
          data: {
            label: 'root',
            description: 'root',
            requirements: 'root',
            xpPoints: null,
            children: ['1', '2', '3']
          },
          position: { x: 0, y: 0 }
        },
        {
          id: '1',
          type: 'view-node-unlocked',
          data: {
            label: 'Passing',
            description: 'Learn how to pass the ball effectively.',
            requirements:
              'Upload a video of yourself passing back and forth 3 times with another player',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 10,
            children: []
          },
          position: { x: 300, y: 100 }
        },
        {
          id: '2',
          type: 'view-node-locked',
          data: {
            label: 'Shooting',
            description: 'Learn how to shoot and score',
            requirements: 'Upload a video of yourself scoring a goal',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 30,
            children: []
          },
          position: { x: 100, y: 250 }
        },
        {
          id: '3',
          type: 'view-node-locked',
          data: {
            label: 'Goalkeeping',
            description: 'Learn how to defend the goal',
            requirements: 'Upload a video of yourself making a save',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 50,
            children: []
          },
          position: { x: 500, y: 350 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: '0', target: '1' },
        { id: 'e2', source: '0', target: '2' },
        { id: 'e3', source: '0', target: '3' }
      ],
      admins: ['soccerpro'],
      subscribers: ['fanX', 'fanY']
    },
    {
      _id: 'cricket',
      title: 'Cricket',
      owner: 'owner',
      image:
        'https://t3.ftcdn.net/jpg/05/10/55/58/360_F_510555809_gSP39J8OgWzaMf21CTnqV7CTXU12rP3K.jpg',
      description: 'Learn batting, bowling, and fielding in cricket.',
      termsAndConditions: 'For cricket enthusiasts and training programs.',
      tags: ['cricket', 'bat', 'sports'],
      skillNodes: [
        {
          id: '0',
          type: 'root',
          data: {
            label: 'root',
            description: 'root',
            requirements: 'root',
            xpPoints: null,
            children: ['1']
          },
          position: { x: 300, y: 0 }
        },
        {
          id: '1',
          type: 'view-node-locked',
          data: {
            label: 'Batting',
            description: 'Learn how to bat effectively.',
            requirements: 'Upload a video of yourself batting for 10 balls',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 15,
            children: ['']
          },
          position: { x: 100, y: 75 }
        },
        {
          id: '2',
          type: 'view-node-locked',
          data: {
            label: 'Bowling',
            description: 'Learn how to bowl effectively.',
            requirements: 'Upload a video of yourself bowling 10 balls',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 25,
            children: []
          },
          position: { x: 300, y: 175 }
        },
        {
          id: '3',
          type: 'view-node-locked',
          data: {
            label: 'Fielding',
            description: 'Learn how to field effectively.',
            requirements: 'Upload a video of yourself fielding and catching',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 35,
            children: []
          },
          position: { x: 500, y: 275 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: '0', target: '1' },
        { id: 'e2', source: '0', target: '2' },
        { id: 'e3', source: '0', target: '3' }
      ],
      admins: ['cricketpro'],
      subscribers: ['user1', 'user2']
    },
    {
      _id: 'tennis',
      title: 'Tennis',
      owner: 'owner',
      image:
        'https://media.istockphoto.com/id/1412188048/photo/tennis-balls-and-racket-on-the-grass-court.jpg?s=612x612&w=0&k=20&c=r9NHYjskuj8I7br4sQOUTM6as6ECdHYpsYoJ6WaaPOk=',
      description: 'hit the ball to eachother with a racket',
      termsAndConditions: 'For use by tennis players and trainers.',
      tags: ['tennis', 'racket', 'sports'],
      skillNodes: [
        {
          id: '0',
          type: 'root',
          data: {
            label: 'root',
            description: 'root',
            requirements: 'root',
            xpPoints: null,
            children: ['1', '2']
          },
          position: { x: 0, y: 0 }
        },
        {
          id: '1',
          type: 'view-node-unlocked',
          data: {
            label: 'Serving',
            description: 'Learn how to serve the tennis ball effectively.',
            requirements: 'Upload a video of yourself serving 5 times',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 20,
            children: ['3']
          },
          position: { x: 300, y: 100 }
        },
        {
          id: '2',
          type: 'view-node-locked',
          data: {
            label: 'Rally Techniques',
            description: 'Learn how to rally with a partner.',
            requirements:
              'Upload a video of yourself making a rally with at least 10 hits',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 30,
            children: []
          },
          position: { x: 100, y: 200 }
        },
        {
          id: '3',
          type: 'view-node-locked',
          data: {
            label: 'Serve and Volley',
            description: 'Learn how serve and volley for the winner',
            requirements:
              'Upload a video of yourself winning a point with a serve and volley',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 75,
            children: []
          },
          position: { x: 300, y: 200 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: '0', target: '1' },
        { id: 'e2', source: '0', target: '2' },
        { id: 'e3', source: '1', target: '3' }
      ],
      admins: ['tennispro'],
      subscribers: ['playerZ', 'coachY']
    },
    {
      _id: 'Climbing',
      title: 'Climbing',
      owner: 'owner',
      image:
        'https://t3.ftcdn.net/jpg/02/22/06/58/360_F_222065854_pgIzW1KCCgoYkqWKSccIHNeplvR8L5G1.jpg',
      description: 'Learn how to climb effectively.',
      termsAndConditions: 'For use by climbing enthusiasts and trainers.',
      tags: ['climbing', 'outdoor', 'sports'],
      skillNodes: [
        {
          id: '0',
          type: 'root',
          data: {
            label: 'root',
            description: 'root',
            requirements: 'root',
            xpPoints: null,
            children: ['1', '2']
          },
          position: { x: 0, y: 0 }
        },
        {
          id: '1',
          type: 'view-node-unlocked',
          data: {
            label: 'Bouldering',
            description: 'Learn how to boulder effectively.',
            requirements: 'Upload a video of yourself bouldering for 5 minutes',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 20,
            children: []
          },
          position: { x: 100, y: 100 }
        },
        {
          id: '2',
          type: 'view-node-locked',
          data: {
            label: 'Climbing Techniques',
            description: 'Learn how to climb with a partner.',
            requirements:
              'Upload a video of yourself making a climb with at least 10 holds',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 30,
            children: ['3']
          },
          position: { x: 300, y: 100 }
        },
        {
          id: '3',
          type: 'view-node-locked',
          data: {
            label: 'Turning Techniques',
            description: 'Learn how to turn effectively while climbing.',
            requirements: 'Upload a video of yourself turning while climbing',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 75,
            children: []
          },
          position: { x: 300, y: 200 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: '0', target: '1' },
        { id: 'e2', source: '0', target: '2' },
        { id: 'e3', source: '2', target: '3' }
      ],
      admins: ['tennispro'],
      subscribers: ['playerZ', 'coachY']
    },
    {
      _id: 'jeditraining',
      title: 'Jedi Training',
      owner: 'owner',
      image:
        'https://www.cnet.com/a/img/resize/e886705292a95994de4fea6be716f215f594027f/hub/2017/03/13/557b221e-633d-41ba-8ba6-545dc30c0d9b/yodacrop.jpg?auto=webp&fit=crop&height=675&width=1200',
      description:
        'Train to become a Jedi Master, from mastering the Force to wielding a lightsaber.',
      termsAndConditions:
        'This SkillTree is for entertainment and fan-based learning purposes only.',
      tags: ['star wars', 'jedi', 'force', 'fiction'],
      skillNodes: [
        {
          id: '0',
          type: 'root',
          data: {
            label: 'Youngling Initiation 🌟',
            description: 'Begin your Jedi journey.',
            requirements: 'None',
            xpPoints: null
          },
          position: { x: 0, y: 0 }
        },
        {
          id: '1',
          type: 'view-node-unlocked',
          data: {
            label: 'Force Sensitivity ✨',
            description: 'Learn how to sense the Force.',
            requirements:
              'Watch a video about the Force and answer 3 quiz questions.',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 10,
            children: ['4']
          },
          position: { x: 150, y: 100 }
        },
        {
          id: '2',
          type: 'view-node-unlocked',
          data: {
            label: 'Lightsaber Basics ⚔️',
            description: 'Understand the basic lightsaber forms.',
            requirements: 'Upload a video of you mimicking Form I (Shii-Cho).',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 15,
            children: ['5']
          },
          position: { x: -150, y: 100 }
        },
        {
          id: '3',
          type: 'view-node-unlocked',
          data: {
            label: 'Jedi Meditation 🧘‍♂️',
            description: 'Develop mental clarity and connection to the Force.',
            requirements: 'Record a 2-minute meditation log.',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 10,
            children: []
          },
          position: { x: 0, y: 200 }
        },
        {
          id: '4',
          type: 'view-node-locked',
          data: {
            label: 'Force Telekinesis 🌀',
            description: 'Master the art of moving objects with your mind.',
            requirements:
              'Upload a short creative video simulating telekinesis.',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 20,
            children: []
          },
          position: { x: 200, y: 300 }
        },
        {
          id: '5',
          type: 'view-node-locked',
          data: {
            label: 'Lightsaber Duel 🥷',
            description: 'Engage in your first training duel.',
            requirements:
              'Upload a video of a lightsaber duel (with a friend or animation).',
            netUpvotesRequired: 10,
            currentNetUpvotes: 0,
            xpPoints: 10,
            children: []
          },
          position: { x: -200, y: 300 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: '0', target: '1' },
        { id: 'e2', source: '0', target: '2' },
        { id: 'e3', source: '0', target: '3' },
        { id: 'e4', source: '1', target: '4' },
        { id: 'e5', source: '2', target: '5' }
      ],
      admins: ['masterYoda'],
      subscribers: ['padawan1', 'padawan2']
    }
  ];

  // Insert dummy data if collection is empty
  const collectionCount = await SkillTreeCollection.find().countAsync();

  if (collectionCount == 0) {
    for (const skillTree of dummySkillTrees) {
      await SkillTreeCollection.insertAsync(skillTree);
    }
  }
});
