import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// Schema
import '/imports/api/schemas/SkillTree'; // do we need this import?

// Publish the skilltrees collection
Meteor.publish('skilltrees', () => SkillTreeCollection.find());

// Add mock data via Meteor Startup
Meteor.startup(async () => {
  const mockData = [
    {
      id: '123',
      title: 'Skill Tree 1',
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
      ]
    }
  ];
  // Insert a sample document into the SampleCollection with schema validation
  await SkillTreeCollection.removeAsync({}); // Drop collection content to update and avoid dupes
  for (const skilltree of mockData) {
    await SkillTreeCollection.insertAsync(skilltree);
  }
  console.log(`Inserted ${mockData.length} mock skilltrees`);
});
