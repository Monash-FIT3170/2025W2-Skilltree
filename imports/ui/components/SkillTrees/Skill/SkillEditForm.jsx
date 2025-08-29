import React from 'react';
import { SliderInput } from './SliderInput';

export const SkillEditForm = ({ editingNode, onSave, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
      <div className="bg-neutral-200 p-5 rounded-lg w-[800px]">
        <h3 className="block mb-2 text-xl font-bold text-emerald-700">
          Add Skill Details
        </h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            onSave({
              label: formData.get('title'),
              description: formData.get('description'),
              requirements: formData.get('requirements'),
              xpPoints: formData.get('xpPoints'),
              netUpvotesRequired: formData.get('upvotesRequired')
            });
          }}
        >
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            Skill Title:
          </label>
          <input
            name="title"
            id="title"
            defaultValue={editingNode.label}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          />
          <br />
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            placeholder="Write your thoughts here..."
            defaultValue={editingNode.description}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          />
          <br />
          <label
            htmlFor="requirements"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            Requirements:
          </label>
          <input
            name="requirements"
            id="requirements"
            defaultValue={editingNode.requirements}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          />
          <br />
          <SliderInput
            name="upvotesRequired"
            displayedLabel="Upvotes Required"
            minVal={1}
            maxVal={100}
          />
          <SliderInput
            name="xpPoints"
            displayedLabel="XP earned"
            minVal={1}
            maxVal={100}
          />
          <br />
          <div style={{ marginTop: 10 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
