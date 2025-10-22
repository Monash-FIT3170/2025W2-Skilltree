import React, { use } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SkillTreeCard } from '../components/Dashboard/SkillTreeCard';
import { SubscriptionsCollection } from '../../api/collections/Subscriptions';
import { Meteor } from 'meteor/meteor';
import { User } from '/imports/utils/User';

export const ProfileOverview = () => {
  const { profileUsername } = useParams(); // Get profileUsername
  // TODO: fetch other data here using profileUsername as query

  const profileUser = useFind(Meteor.users, [
    { username: { $eq: profileUsername } },
    {
      fields: {
        _id: 1,
        username: 1
      }
    }
  ])[0]; // Gets a specific user's data

  // const allUsers = useFind(Meteor.users, []);
  // console.log("All users:", allUsers)
  const profileUserId = profileUser._id;
  // console.log("Profile user ID:", profileUserId);
  // console.log("Profile user:", profileUser);
  // console.log("Profile user id:", profileUser._id);

  // subscribe to skilltrees data
  useSubscribe('skilltrees');

  // fetch skill trees created by this user
  const userSkillTrees = useFind(SkillTreeCollection, [
    { owner: { $eq: profileUserId } },
    {
      fields: {
        _id: 1,
        owner: 1,
        image: 1,
        title: 1,

        description: 1,
        subscribers: 1
      }
    }
  ]);

  // const allSkillTrees = useFind(SkillTreeCollection, []);
  // console.log("All skill trees:", allSkillTrees)

  useSubscribe('subscriptions');
  const userSubscriptions = useFind(SubscriptionsCollection, [
    { userId: { $eq: profileUserId } },
    {
      fields: {
        _id: 1,
        userId: 1,
        skillTreeId: 1
      }
    }
  ]);

  // get skill tree IDs the user is subscribed to
  const subscribedSkillTreeIds = userSubscriptions.map(sub => sub.skillTreeId);

  // fetch skill trees the user is subscribed to
  const subscribedSkillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: subscribedSkillTreeIds } },
    {
      fields: {
        _id: 1,
        owner: 1,
        image: 1,
        title: 1,
        description: 1,
        subscribers: 1
      }
    }
  ]);

  return (
    <>
      {/* Profile's user overview goes here (reuse skilltree/forest list components etc) */}
      <div className="p-6 space-y-8">
        {/* Created Skill Trees Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Created Skill Trees ({userSkillTrees.length})
          </h2>
          {userSkillTrees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No skill trees created yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSkillTrees.map(skillTree => (
                <SkillTreeCard
                  key={skillTree._id}
                  skillTreeId={skillTree._id}
                  showSubscribers={true}
                  currentUserId={profileUserId}
                />
              ))}
            </div>
          )}
        </div>

        {/* Subscribed Skill Trees Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Subscribed Skill Trees ({subscribedSkillTrees.length})
          </h2>
          {subscribedSkillTrees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Not subscribed to any skill trees yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscribedSkillTrees.map(skillTree => (
                <SkillTreeCard
                  key={skillTree._id}
                  skillTreeId={skillTree._id}
                  showSubscribers={true}
                  currentUserId={profileUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
