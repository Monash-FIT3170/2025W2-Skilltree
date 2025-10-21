import { Meteor } from 'meteor/meteor';
import React, { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useParams } from 'react-router-dom';

import { EventCard } from '../components/RankedEvents/EventCard';
import { EventInfoModal } from '../components/RankedEvents/EventInfoModal';
import { NavigationMenu } from '../components/SkillTrees/NavigationMenu';
import { NewEventModal } from '../components/RankedEvents/NewEventForm';
import { JoinEventButton } from '../components/SkillTrees/Events/JoinEventButton';
import { ProofUploadButton } from '../components/SkillTrees/Skill/ProofUploadButton';
import { EventLeaderboardModal } from '../components/RankedEvents/EventLeaderboardModal';

import { EventCollection } from '/imports/api/collections/Events';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';

export const RankedEvent = () => {
  const { skilltreeId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useSubscribe('skilltrees');
  useSubscribe('events');
  useSubscribe('subscriptions');

  // Fetch current active event
  const currentEvent =
    useFind(
      EventCollection,
      [
        { skilltreeId: { $eq: skilltreeId }, active: { $eq: true } },
        { fields: { _id: 1, title: 1, description: 1, endDate: 1 } }
      ],
      [skilltreeId]
    )[0] ?? null;

  const eventId = currentEvent?._id || '';

  // Fetch skilltree info
  const skilltree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: skilltreeId } },
      { fields: { title: 1, description: 1, termsAndConditions: 1 } }
    ],
    [skilltreeId]
  )[0];

  if (!skilltree) return <div>Skill Tree not found</div>;

  const userId = Meteor.userId();

  // Check user subscription
  const subscription = useFind(
    SubscriptionsCollection,
    [
      {
        userId: { $eq: userId },
        skilltreeId: { $eq: skilltreeId },
        active: { $eq: true }
      },
      { fields: { _id: 1, roles: 1 } }
    ],
    [userId, skilltreeId]
  )[0];

  const isUserSubscribed = !!subscription;
  const userRoles = subscription?.roles || [];

  // Check if user joined current event
  const checkJoined =
    useFind(
      EventCollection,
      [
        { _id: { $eq: eventId }, participants: { $in: [userId] } },
        { fields: { _id: 1 } }
      ],
      [eventId, userId]
    )[0] ?? null;

  const isUserJoined = !!checkJoined;

  // Filter state
  const [filter, setFilter] = useState('default');

  // Calculate remaining days
  const remainingDays = currentEvent?.endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(currentEvent.endDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <>
      <Helmet>
        <title>SkillTree - Ranked Events</title>
      </Helmet>

      <div className="p-2">
        <NavigationMenu id={skilltreeId} />

        {/* Current Event Info */}
        <div className="my-4 relative">
          {currentEvent ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-green-700">
                  {currentEvent.title}
                </h2>
                <p className="text-gray-700 mt-1">{currentEvent.description}</p>
                {remainingDays !== null && (
                  <p className="text-gray-500 text-sm mt-1">
                    Ends in {remainingDays}{' '}
                    {remainingDays === 1 ? 'day' : 'days'}
                  </p>
                )}
              </div>

              {/* Action Buttons next to event title */}
              <div className="flex flex-col sm:flex-row gap-2">
                <ProofUploadButton
                  skilltreeId={skilltreeId}
                  eventId={eventId}
                  disabled={!isUserSubscribed || !isUserJoined}
                />
                <JoinEventButton
                  eventId={eventId}
                  isUserJoined={isUserJoined}
                  disabled={!isUserSubscribed}
                />
                <EventLeaderboardModal eventId={eventId} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">No event going on now.</p>
          )}
        </div>

        {/* Filter & Info/Add Event Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between my-4 gap-4">
          <div className="relative w-60">
            <select
              id="event-filter"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="block w-full rounded-lg px-3 py-2 bg-[#328E6E] text-white font-semibold border border-[#328E6E] focus:outline-none focus:ring-2 focus:ring-[#328E6E] appearance-none shadow"
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

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-[#328E6E] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2a7d60] transition-colors"
            >
              Info
            </button>
            {/* Add Event Button (Admin Only, Greyed Out for Non-Admins) */}
            <button
              onClick={() => {
                if (userRoles.includes('admin')) {
                  setIsAddModalOpen(true);
                } else {
                  alert('Only admins are allowed to create ranked events');
                }
              }}
              className={`w-full sm:w-auto font-semibold py-2 px-4 rounded-lg shadow transition-colors ${
                userRoles.includes('admin')
                  ? 'bg-[#328E6E] text-white hover:bg-[#2a7d60]'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              + Add Event
            </button>
          </div>
        </div>

        {/* Event Card */}
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
      <NewEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        skilltreeId={skilltreeId}
      />
    </>
  );
};
