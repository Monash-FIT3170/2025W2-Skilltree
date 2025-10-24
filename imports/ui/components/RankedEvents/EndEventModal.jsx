import { Meteor } from 'meteor/meteor';
import React from 'react';

export const EndEventModal = ({ isOpen, onClose, eventId }) => {
  const userId = Meteor.userId() || '';

  const handleEndEvent = async () => {
    try {
      await Meteor.callAsync('stopEvent', eventId, userId);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to end this event?
        </h2>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleEndEvent}
            className="px-4 py-2 rounded bg-[#328E6E] text-white hover:bg-[#2a7d60]"
          >
            End Event
          </button>
        </div>
      </div>
    </div>
  );
};
