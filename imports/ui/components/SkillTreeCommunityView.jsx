import React from 'react';
import { Meteor } from 'meteor/meteor';
import { SkillTreeView } from '../components/SkillTreeView';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { useParams } from 'react-router-dom';
import { NavigationDropdown } from '../components/NavigationDropdown';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { SubscribeButton } from './SubscribeButton';
import { UserList } from './UserList';
import { useTracker } from 'meteor/react-meteor-data';

export const SkillTreeCommunityView = () => {
  // extract id from url params
  const { id } = useParams();
  const userId = useTracker(() => Meteor.userId(), []);

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
    </div>
  );
};
