import React from 'react';
import { SkillTreeView } from '../components/SkillTreeView';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { Button } from 'flowbite-react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { NavigationDropdown } from '../components/NavigationDropdown';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { SubscribeButton } from './SubscribeButton';
import { UserList } from './UserList';
import { Background } from '@xyflow/react';

export const SkillTreeCommunityView = () => {
  // extract id from url params
  const { id } = useParams();

  // extract location
  const { location } = useLocation();

  useSubscribeSuspense('skilltrees');
  const skilltree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: id } },
      {
        fields: {
          title: 1,
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
        <SubscribeButton skillTreeId={id} />
        <div className="p-2"></div>
        <div className="flex gap-4">
          <UserList skillTreeId={id}></UserList>
          <Link to="leaderboard" state={{ background: location}}>
            <Button
              color="green"
              pill
              className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            >
              Leaderboard
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mt-2">
          Welcome to {skilltree.title}!
        </h1>
        <div className="text-lg mt-2">
          <p>Description: {skilltree.description}</p>
          <p>Terms & Conditions: {skilltree.termsAndConditions}</p>
        </div>
      </div>
      <SkillTreeView id={id} isAdmin={false} />
      <Outlet/>
    </div>
  );
};
