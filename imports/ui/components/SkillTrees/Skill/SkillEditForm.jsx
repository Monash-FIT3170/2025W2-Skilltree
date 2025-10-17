import React from 'react';
import { SliderInput } from './SliderInput';

export const SkillEditForm = ({ editingNode, onSave, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
      <div className="bg-neutral-200 p-5 rounded-lg w-[800px]">
        {/* START: Added modal header with close button */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-emerald-700">
            Add Skill Details
          </h3>
          <button
            type="button"
            onClick={onCancel} // Triggers the same function as the "Cancel" button
            className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            aria-label="Close"
          >
            {/* SVG icon for the 'X' button (tailwind components style) */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* END: Added modal header with close button */}
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