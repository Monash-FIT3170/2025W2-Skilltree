import React from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SkillTreeCard } from '/imports/ui/components/Dashboard/SkillTreeCard';
import { User } from '/imports/utils/User';

export const ProfileContent = () => {
  const { profileUsername } = useParams(); // Get profileUsername from URL

  // Subscribe to users data
  useSubscribe('users');

  // Get logged-in user's username for fallback
  const loggedInUser = User(['username']);
  const loggedInUsername = loggedInUser?.username;

  // Determine which username to display (from URL or logged-in user)
  // Compute directly instead of using useState to avoid race conditions
  const usernameToDisplay = profileUsername || loggedInUsername;

  // Fetch the profile user with subscribed communities (same as Dashboard)
  const profileUser = useFind(Meteor.users, [
    { username: { $eq: usernameToDisplay } },
    {
      fields: {
        _id: 1,
        username: 1,
        'profile.subscribedCommunities': 1
      }
    }
  ])[0]; // Gets a specific user's data

  // Use optional chaining to safely access _id
  const profileUserId = profileUser?._id;

  // Get subscribed communities array (same as Dashboard)
  const subscribedCommunities =
    profileUser?.profile?.subscribedCommunities || [];

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

  // fetch skill trees the user is subscribed to (same as Dashboard)
  const subscribedSkillTrees = useFind(SkillTreeCollection, [
    { _id: { $in: subscribedCommunities } },
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
                  skilltreeId={skillTree._id}
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
                  skilltreeId={skillTree._id}
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
