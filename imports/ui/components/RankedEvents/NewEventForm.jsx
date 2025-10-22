import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const NewEventModal = ({ isOpen, onClose, skilltreeId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    maxTrophies: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        throw new Error('End date must be after start date.');
      }

      await Meteor.callAsync(
        'createEvent',
        {
          ...formData,
          skilltreeId,
          createdAt: new Date()
        },
        Meteor.userId()
      );

      onClose();
    } catch (err) {
      console.error(err);
      setError(err.reason || err.message || 'Failed to create event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create New Event</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={20} // restrict title to 20 characters
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={100} // restrict description to 100 characters
            className="border p-2 rounded"
          />

          <label className="text-sm font-semibold mt-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            min={new Date().toISOString().split('T')[0]} // today's date in YYYY-MM-DD
          />

          <label className="text-sm font-semibold">End Date (Expiration)</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            min={formData.startDate || new Date().toISOString().split('T')[0]}
          />

          <label className="text-sm font-semibold">Trophy Reward</label>
          <input
            type="number"
            name="maxTrophies"
            value={formData.maxTrophies}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            min={0}
            max={100}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#328E6E] text-white hover:bg-[#2a7d60]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
