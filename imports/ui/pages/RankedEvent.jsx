import { Meteor } from 'meteor/meteor';
import React, { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';
import { EventCard } from '../components/RankedEvents/EventCard';
import { EventInfoModal } from '../components/RankedEvents/EventInfoModal';
import { NavigationMenu } from '../components/SkillTrees/NavigationMenu';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

import { JoinEventButton } from '../components/SkillTrees/Events/JoinEventButton';
import { ProofUploadButton } from '../components/SkillTrees/Skill/ProofUploadButton';
import { EventCollection } from '/imports/api/collections/Events';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { EventLeaderboardModal } from '../components/RankedEvents/EventLeaderboardModal';

export const RankedEvent = () => {
  const { skilltreeId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useSubscribe('skilltrees');
  useSubscribe('events');

  /**
   * Get the ID of the current active event for this skilltree
   */
  const currentEventId = useFind(
    EventCollection,
    [
      { skilltreeId: { $eq: skilltreeId }, active: { $eq: true } },
      { fields: { _id: 1 } }
    ],
    [skilltreeId]
  );
  const eventId = currentEventId[0]?._id || '';

  const skilltree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: skilltreeId } },
      {
        fields: {
          title: 1,
          description: 1,
          termsAndConditions: 1
        }
      }
    ],
    [skilltreeId]
  )[0];

  // Get the current user's role in this skilltree using useFind
  const userId = Meteor.userId();
  const userProgress = useFind(
    SubscriptionsCollection,
    [
      { userId: { $eq: userId }, skilltreeId: { $eq: skilltreeId } },
      { fields: { roles: 1 } }
    ],
    [userId, skilltreeId]
  )[0];
  const userRoles = userProgress?.roles || [];
  if (userRoles.length > 0) {
    console.log('User roles in this skilltree:', userRoles);
  } else {
    console.log('No roles found for user in this skilltree.');
  }

  // Filter state: 'default' or 'upvotes'
  const [filter, setFilter] = useState('default');

  useSubscribe('subscriptions');
  const subscription = useFind(
    SubscriptionsCollection,
    [
      {
        userId: { $eq: userId },
        skilltreeId: { $eq: skilltreeId },
        active: { $eq: true }
      },
      { fields: { _id: 1 } }
    ],
    [userId, skilltreeId]
  )[0];

  const isUserSubscribed = !!subscription;

  const checkJoined =
    useFind(EventCollection, [
      { _id: { $eq: eventId }, participants: { $in: [userId] } },
      { fields: { _id: 1 } }
    ])[0] ?? null;

  const isUserJoined = !!checkJoined;

  if (!skilltree) return <div>Skill Tree not found</div>;

  // Require subscription to access events page
  if (!isUserSubscribed) {
    return (
      <>
        <Helmet>
          <title>SkillTree - Ranked Events</title>
        </Helmet>
        <div className="p-2">
          <NavigationMenu id={skilltreeId} />
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
              <h2 className="text-xl font-bold mb-2">Subscription Required</h2>
              <p>
                You must be subscribed to this skilltree to access ranked
                events.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>SkillTree - Ranked Events</title>
      </Helmet>
      <div className="p-2">
        <NavigationMenu id={skilltreeId} />
        {/* Header with filter dropdown and action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 pt-4 gap-4">
          <div className="relative w-60">
            <select
              id="event-filter"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="block w-full rounded-lg px-3 py-2 bg-[#328E6E] text-white font-semibold border border-[#328E6E] focus:outline-none focus:ring-2 focus:ring-[#328E6E] appearance-none shadow"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            >
              <option
                value="default"
                className="bg-white text-[#328E6E] font-semibold"
              >
                Default (by date)
              </option>
              <option
                value="upvotes"
                className="bg-white text-[#328E6E] font-semibold"
              >
                Most Upvoted
              </option>
            </select>
            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <ProofUploadButton
              skilltreeId={skilltreeId}
              eventId={eventId}
              onUploadProof={() => {
                console.log('onUploadProof');
              }}
              disabled={!isUserSubscribed || !isUserJoined}
            />
            <JoinEventButton
              eventId={eventId}
              isUserJoined={isUserJoined}
              disabled={!isUserSubscribed}
            />
            <EventLeaderboardModal eventId={eventId} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-[#328E6E] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2a7d60] transition-colors"
            >
              ℹ️ Info
            </button>
            <button
              onClick={() =>
                alert('Placeholder for adding a new event/image upload.')
              }
              className="w-full sm:w-auto bg-[#328E6E] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2a7d60] transition-colors"
            >
              + Add Event
            </button>
          </div>
        </div>

        {/* Responsive container for EventCard */}
        <Suspense>
          <EventCard
            eventId={eventId}
            skilltreeId={skilltreeId}
            filter={filter}
          />
        </Suspense>
      </div>
      <EventInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        skilltree={skilltree}
      />
    </>
  );
};
