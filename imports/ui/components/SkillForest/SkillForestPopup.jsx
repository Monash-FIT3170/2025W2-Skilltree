import React from 'react';
import { SubscribedTreesPopup } from './SubscribedTreesPopup';
import { useNavigate } from 'react-router-dom';

export const SkillForestPopup = ({
  skillForestTitle,
  skillForestDescription,
  selectedSkillTrees,
  onConfirm,
  onClose
}) => {
  const navigate = useNavigate();

  if (!selectedSkillTrees.length) return null;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    navigate('/Dashboard', { state: { showToast: true } }); // Redirect to Dashboard after confirming
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Semi-transparent background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose} // clicking outside closes popup
      />

      {/* Popup content */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 z-[1001]">
        {/* Close X button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-2xl cursor-pointer"
        >
          ×
        </button>

        {/* Main Title */}
        <h1 className="text-2xl font-bold text-gray-400 mb-2">
          Preview SkillForest
        </h1>

        {/* SkillForest title and description */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold" style={{ color: '#328E6E' }}>
            {skillForestTitle}
          </h2>
          <p className="text-gray-600 mt-2">{skillForestDescription}</p>
        </div>

        {/* Subtitle above selected skilltrees */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Selected SkillTrees
        </h2>

        {/* Grid of selected skill trees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto">
          {selectedSkillTrees.map(tree => (
            <div key={tree._id} className="flex justify-center">
              <SubscribedTreesPopup
                skillTreeId={tree._id}
                className="w-48 h-40" // smaller card size
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg text-white font-semibold hover:bg-green-700 cursor-pointer"
            style={{ backgroundColor: '#328E6E' }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
