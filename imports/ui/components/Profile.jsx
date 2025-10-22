import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { useFind } from 'meteor/react-meteor-data/suspense';

export default function ProfileInsert() {
  const { profileUserId } = useParams(); // from URL
  const { userId: loggedInUserId } = useContext(AuthContext); // from auth
  const [finalUserId, setFinalUserId] = useState(null);

  // If it's blank → fallback to logged in user
  // If it's a username → look up the real ID
  useEffect(() => {
    if (!profileUserId) {
      // /profile/ → show logged-in user profile
      setFinalUserId(loggedInUserId);
    } else {
      // /profile/12345 → assume already a valid ID
      setFinalUserId(profileUserId);
    }
  }, [profileUserId, loggedInUserId]);

  if (!finalUserId) return <div>Loading profile…</div>;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Showing profile for user ID: {finalUserId}</p>
      {/* later you’ll plug in followers/following/overview here */}
    </div>
  );
}
