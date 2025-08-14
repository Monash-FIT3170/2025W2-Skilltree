import React, { useContext } from 'react';
import { SkillTreeView } from '../components/SkillTreeView';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { useParams } from 'react-router-dom';
import { NavigationDropdown } from '../components/NavigationDropdown';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { SubscribeButton } from './SubscribeButton';
import { UserList } from './UserList';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { Button } from 'flowbite-react';
import { Meteor } from 'meteor/meteor';

function testSaveTreeProgress(skillTreeId, progressNodes, progressEdges) {
  Meteor.callAsync(
    'saveSkillTreeProgress',
    skillTreeId,
    progressNodes,
    progressEdges
  );
  console.log('saved tree progress');
  return;
}

let progresNodes = [
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
    id: 'bat',
    type: 'view-node-locked',
    data: {
      label: 'Batting',
      description: 'Learn how to bat effectively.',
      progressXp: 0,
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
      progressXp: 0,
      requirements: 'Upload a video of yourself bowling 10 balls',
      xpPoints: 25
    },
    position: { x: 300, y: 175 }
  }
];

let progressEdges = [
  { id: 'e1', source: '0', target: 'bat' },
  { id: 'e2', source: 'bat', target: 'bowl' }
];

export const SkillTreeCommunityView = () => {
  // extract id from url params
  const { id } = useParams();
  const userId = useContext(AuthContext); // Reactive when value changes

  useSubscribeSuspense('skilltrees');
  const skilltree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: id } },
      {
        fields: {
          title: 1,
          owner: 1,
          description: 1,
          termsAndConditions: 1
        }
      }
    ],
    [id]
  )[0];

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <div key={id}>
      <div className="p-2">
        <NavigationDropdown id={id} />

        <div className="p-2"></div>
        {/*If the user is the creator of this skill tree community, hide the subscribe button */}
        {userId !== skilltree.owner && <SubscribeButton skillTreeId={id} />}
        <div className="p-2"></div>

        <UserList skillTreeId={id}></UserList>
        <h1 className="text-3xl font-bold mt-2">
          Welcome to {skilltree.title}!
        </h1>
        <div className="text-lg mt-2">
          <p>Description: {skilltree.description}</p>
          <p>Terms & Conditions: {skilltree.termsAndConditions}</p>
        </div>
      </div>
      <SkillTreeView id={id} isAdmin={false} />
      <Button
        onClick={() => testSaveTreeProgress(id, progresNodes, progressEdges)}
      ></Button>
    </div>
  );
};
