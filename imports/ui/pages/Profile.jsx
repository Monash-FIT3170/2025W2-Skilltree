import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import { Avatar, Button } from 'flowbite-react';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { FollowersCollection } from '/imports/api/collections/Followers';
import { RequestsCollection } from '/imports/api/collections/Requests';
import FollowingButton from '../components/Profile/FollowingButton';

export const Profile = () => {
  const { profileUsername } = useParams();
  const loggedInUserId = useContext(AuthContext);

  // --- Subscriptions ---
  useSubscribe('users'); // ensure this publishes username + profile fields
  useSubscribe('followers');
  useSubscribe('requests.mine');

  // --- Resolve profile user ---
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    // Step 1: if no param => current user
    if (!profileUsername) {
      setProfileUser(Meteor.user());
      return;
    }

    // Step 2: check if param looks like an ObjectId (_id)
    const byId = Meteor.users.findOne(
      { _id: profileUsername },
      { fields: { username: 1, profile: 1 } }
    );
    if (byId) {
      setProfileUser(byId);
      return;
    }

    // Step 3: else treat as username
    const byUsername = Meteor.users.findOne(
      { username: profileUsername },
      { fields: { username: 1, profile: 1 } }
    );
    setProfileUser(byUsername);
  }, [profileUsername, Meteor.userId()]);

  const profileUserId = profileUser?._id;
  const isOwnProfile = loggedInUserId === profileUserId;
  const isPublic = profileUser?.profile?.isProfilePublic ?? true;

  // --- Subscribe after we know target id ---
  useSubscribe('requests.forProfile', profileUserId);

  // --- Followers data ---
  const followers = useFind(FollowersCollection, [
    { followingUserId: profileUserId },
    { fields: { _id: 1, followerUserId: 1 } }
  ]);
  const following = useFind(FollowersCollection, [
    { followerUserId: profileUserId },
    { fields: { _id: 1, followingUserId: 1 } }
  ]);
  const followerCount = followers.length;
  const followingCount = following.length;

  // --- Request logic ---
  const myPendingRequest = useFind(RequestsCollection, [
    { requesterUserId: loggedInUserId, requesteeUserId: profileUserId },
    { fields: { _id: 1 } }
  ])[0];

  const incomingRequests = useFind(RequestsCollection, [
    { requesteeUserId: profileUserId },
    { fields: { _id: 1, requesterUserId: 1, createdAt: 1 } }
  ]);

  // --- Handlers ---
  const handleSendRequest = () => {
    Meteor.call(
      'requests.send',
      profileUserId,
      err => err && alert(err.reason || err.message)
    );
  };

  const handleAccept = requestId => {
    Meteor.call(
      'requests.accept',
      requestId,
      err => err && alert(err.reason || err.message)
    );
  };

  const handleDecline = requestId => {
    Meteor.call(
      'requests.decline',
      requestId,
      err => err && alert(err.reason || err.message)
    );
  };

  // --- UI ---
  return (
    <>
      <div className="bg-green-400 p-8 mb-4 flex justify-start">
        <Avatar
          alt="User Profile Picture"
          size="lg"
          icon={
            <svg>
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 16a6 6 0 1112 0H2z" />
            </svg>
          }
          rounded
        />
        <div className="pl-5">
          <p className="text-2xl font-bold text-white">
            {profileUser?.username || 'Profile'}
          </p>
          <p className="text-white">
            Followers: <strong>{followerCount}</strong>
            <span className="ml-4" />
            Following: <strong>{followingCount}</strong>
          </p>
        </div>

        <div className="pl-5">
          {loggedInUserId && !isOwnProfile && profileUserId && (
            <>
              {isPublic ? (
                <FollowingButton
                  userId={loggedInUserId}
                  toFollowId={profileUserId}
                />
              ) : myPendingRequest ? (
                <Button disabled>Requested</Button>
              ) : (
                <Button onClick={handleSendRequest}>Request to follow</Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Owner view: show incoming requests */}
      {isOwnProfile && incomingRequests.length > 0 && (
        <div className="p-4 border rounded-xl max-w-3xl mx-auto mb-4">
          <p className="font-semibold mb-2">Follow requests</p>
          <ul className="space-y-2">
            {incomingRequests.map(r => (
              <li key={r._id} className="flex justify-between">
                <span>Requester: {r.requesterUserId}</span>
                <div className="space-x-2">
                  <Button size="xs" onClick={() => handleAccept(r._id)}>
                    Accept
                  </Button>
                  <Button
                    size="xs"
                    color="light"
                    onClick={() => handleDecline(r._id)}
                  >
                    Decline
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Outlet />
    </>
  );
};
