import React from 'react';

// Checkbox selection to choose which skilltrees to unsubscribe from - when unsubscribing from a skillforest
export const UnsubscribeTreesSelection = ({
  skillTrees,
  selectedSkillTrees,
  unsubscribeAll,
  onSkillTreeCheck,
  onUnsubscribeAll,
  onConfirm,
  onCancel
}) => (
  <div className="absolute top-full mt-2 p-4 bg-white border rounded-lg shadow-lg z-10 min-w-[250px]">
    {skillTrees && (
      <div className="space-y-2 mb-4">
        <h3 className="font-medium mb-2">Unsubscribe from:</h3>
        {skillTrees.map(skilltree => (
          <label key={skilltree._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedSkillTrees.includes(skilltree._id)}
              onChange={() => onSkillTreeCheck(skilltree._id)}
              className="form-checkbox"
            />
            <span>{skilltree.title}</span>
          </label>
        ))}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={unsubscribeAll}
            onChange={e => onUnsubscribeAll(e.target.checked)}
            className="form-checkbox"
          />
          <span>All skilltrees</span>
        </label>
      </div>
    )}

    <div className="flex space-x-2">
      <button
        onClick={onConfirm}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Confirm
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
);
