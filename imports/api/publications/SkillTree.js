import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// Schema
import '/imports/api/schemas/SkillTree';

// Publish the skilltrees collection
Meteor.publish('skilltrees', () => SkillTreeCollection.find());

// Add mock data via Meteor Startup
Meteor.startup(async () => {
  const mockTree = {
    title: 'Skill Tree title',
    image: 'https://example.com/image1.png',
    description: 'Description for Skill Tree 1',
    termsAndConditions: 'Terms and conditions for Skill Tree 1',
    tags: ['tag1', 'tag2'],
    skillNodes: [
      {
        id: '111',
        type: 'input',
        data: {
          label: 'Node 1'
        },
        position: {
          x: 100,
          y: 200
        }
      },
      {
        id: '222',
        data: {
          label: 'Node 2'
        },
        position: {
          x: 100,
          y: 100
        }
      }
    ],
    skillEdges: [
      {
        id: '111->222',
        source: '111',
        target: '222'
      }
    ],
    admins: ['user_123'],
    subscribers: ['user_456', 'user_789']
  };
  // Insert a sample document into the SampleCollection with schema validation
  await SkillTreeCollection.removeAsync({}); // Drop collection content to update and avoid dupes
  await SkillTreeCollection.insertAsync(mockTree);
});
