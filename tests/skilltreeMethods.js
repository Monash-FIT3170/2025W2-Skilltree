import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import '/imports/api/methods/SkillTree';

const skillTreeId1 = 'dfasdfasdfdsf';

const skillTree1 = {
  _id: skillTreeId1,
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
  subscribers: ['playerA', 'playerB']
};

const SkillTreeGet = async skillTreeId => {
  return await Meteor.callAsync('skilltrees.get', skillTreeId);
};

const SkillTreeInsert = async skillTree => {
  return await Meteor.callAsync('skilltrees.insertAsync', skillTree);
};

describe('SkillTree Methods', function () {
  describe('#skilltrees.insertAsync', function () {
    it('should insert the skilltree', async function () {
      await SkillTreeCollection.removeAsync({});
      const res = await SkillTreeInsert(skillTree1);
      assert.strictEqual(res, skillTreeId1);
    });
  });
  describe('#skilltrees.get', function () {
    it('should return the skilltree', async function () {
      const res = await SkillTreeGet(skillTreeId1);
      assert.strictEqual(res.title, 'Basketball');
    });
  });
  describe('#skilltrees.subscribeUser', function () {
    it('should subscribe the user to the SkillTree', async function () {
      const res = await Meteor.callAsync(
        'skilltrees.subscribeUser',
        skillTreeId1,
        'usertest'
      );
      assert.strictEqual(1, res);
    });
  });
  describe('#skilltrees.findUser', function () {
    it('should return that a user is in the SkillTree', async function () {
      const res = await Meteor.callAsync(
        'skilltrees.findUser',
        skillTreeId1,
        'usertest'
      );
      assert.strictEqual(res._id, skillTreeId1);
    });
  });
  describe('#skilltrees.unsubscribeUser', function () {
    it('should unsubscribe a user from the skillTree', async function () {
      await Meteor.callAsync(
        'skilltrees.unsubscribeUser',
        skillTreeId1,
        'usertest'
      );
      const res = await Meteor.callAsync(
        'skilltrees.findUser',
        skillTreeId1,
        'usertest'
      );
      assert.strictEqual(!!res, false);
    });
  });
});
