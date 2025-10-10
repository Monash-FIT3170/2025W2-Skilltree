import React, { useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'flowbite-react';

import { EventLeaderboardList } from './EventLeaderboadList';

/**
 * EventLeaderboardModal.jsx
 * 
 * Render a modal component which contains the leaderboard for an event
 * 
 * @component
 * @example
 * // Example usage
 * <EventLeaderboardModal eventId = {eventId}/>
 * 
 * @param {String} eventId _id of event
 * 
 * @returns Button which shows the modal
 */
export const EventLeaderboardModal = ({ eventId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        dismissible
        size="7xl"
      >
        <ModalHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <span>Event Leaderboard</span>
          </div>
        </ModalHeader>
        <ModalBody className="w-full h-full min-h-[70vh] max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            <EventLeaderboardList eventId={eventId}></EventLeaderboardList>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="green"
            onClick={() => setIsOpen(false)}
            pill
            className="cursor-pointer position-relative text-lg font-bold mt-2 text-white leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <button
        className="cursor-pointer w-full sm:w-auto bg-[#328E6E] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2a7d60] transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Leaderboard
      </button>
    </>
  );
};
