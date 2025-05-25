import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import '/imports/api/schemas/SkillTree';

Meteor.publish('skilltreeById', function (id) {
  return SkillTreeCollection.find({ _id: id });
});

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
          id: 'dribble',
          type: 'view-node-unlocked',
          data: {
            label: 'Dribbling',
            description: 'Learn how to dribble the basketball effectively.',
            progressXp: 10,
            requirements: 'Upload a video of yourself dribbling for 10 seconds',
            xpPoints: 10
          },
          position: { x: 300, y: 100 }
        },
        {
          id: 'shoot',
          type: 'view-node-locked',
          data: {
            label: 'Shooting',
            description: 'Learn how to shoot the basketball effectively.',
            progressXp: 20,
            requirements: 'Upload a video of yourself scoring a basket',
            xpPoints: 20
          },
          position: { x: 200, y: 200 }
        },
        {
          id: 'defend',
          type: 'view-node-locked',
          data: {
            label: 'Defensive Skills',
            description: 'Learn how to defend against other players.',
            progressXp: 50,
            requirements: 'Upload a video of yourself blocking another player',
            xpPoints: 50
          },
          position: { x: 400, y: 200 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'dribble', target: 'shoot' },
        { id: 'e2', source: 'dribble', target: 'defend' }
      ],
      admins: ['basketballpro'],
      subscribers: ['playerA', 'playerB']
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
    }
  ];

  for (const skillTree of dummySkillTrees) {
    await SkillTreeCollection.insertAsync(skillTree);
  }
});
