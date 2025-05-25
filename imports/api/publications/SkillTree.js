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
      _id: '1', // manually set _id for testing, normally this is auto-generated
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
          type: 'input',
          data: { label: 'Dribbling' },
          position: { x: 100, y: 100 }
        },
        {
          id: 'shoot',
          type: 'default',
          data: { label: 'Shooting' },
          position: { x: 300, y: 100 }
        },
        {
          id: 'defend',
          type: 'output',
          data: { label: 'Defensive Skills' },
          position: { x: 500, y: 100 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'dribble', target: 'shoot' },
        { id: 'e2', source: 'shoot', target: 'defend', animated: true }
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
          type: 'input',
          data: { label: 'Passing' },
          position: { x: 100, y: 100 }
        },
        {
          id: 'shoot',
          type: 'default',
          data: { label: 'Shooting' },
          position: { x: 300, y: 100 }
        },
        {
          id: 'goalkeep',
          type: 'output',
          data: { label: 'Goalkeeping' },
          position: { x: 500, y: 100 }
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
          type: 'input',
          data: { label: 'Batting' },
          position: { x: 100, y: 100 }
        },
        {
          id: 'bowl',
          type: 'default',
          data: { label: 'Bowling' },
          position: { x: 300, y: 100 }
        },
        {
          id: 'field',
          type: 'output',
          data: { label: 'Fielding' },
          position: { x: 500, y: 100 }
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
          type: 'input',
          data: { label: 'Serving' },
          position: { x: 100, y: 100 }
        },
        {
          id: 'rally',
          type: 'default',
          data: { label: 'Rally Techniques' },
          position: { x: 300, y: 100 }
        },
        {
          id: 'strategy',
          type: 'output',
          data: { label: 'Match Strategy' },
          position: { x: 500, y: 100 }
        }
      ],
      skillEdges: [
        { id: 'e1', source: 'serve', target: 'rally' },
        { id: 'e2', source: 'rally', target: 'strategy', animated: true }
      ],
      admins: ['tennispro'],
      subscribers: ['playerZ', 'coachY']
    }
  ];

  for (const skillTree of dummySkillTrees) {
    await SkillTreeCollection.insertAsync(skillTree);
  }
});
