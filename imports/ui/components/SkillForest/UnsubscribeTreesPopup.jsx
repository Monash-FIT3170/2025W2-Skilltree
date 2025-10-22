import React from 'react';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { UnsubscribeSkillTreeGrid } from './UnsubscribeTreesGrid';
import { FiCheck } from '@react-icons/all-files/fi/FiCheck';

export const UnsubscribeTreesPopup = ({
  skillForestTitle,
  subscribedTreeIds,
  selectedTreeIds,
  selectAll,
  onSelectAll,
  onTreeToggle,
  onConfirm,
  onClose
}) => {
  const skillTrees = useFind(
    SkillTreeCollection,
    [{ _id: { $in: subscribedTreeIds || [] } }],
    [subscribedTreeIds]
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white shadow-xl z-[1001] transition-all duration-300 flex flex-col w-full max-w-4xl mx-4 my-4 rounded-xl max-h-[90vh]">
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-2xl cursor-pointer z-10"
          >
            ×
          </button>
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Unsubscribe from {skillForestTitle}
          </h1>
          <p className="text-gray-600">
            Check the box to select SkillTrees to unsubscribe.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectAll}
                onChange={onSelectAll}
                className="sr-only"
              />
              <label
                htmlFor="selectAll"
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-2 transition-all duration-200 ${
                    selectAll
                      ? 'bg-red-500 border-red-500'
                      : 'border-gray-300 hover:border-red-400'
                  }`}
                >
                  {selectAll && (
                    <FiCheck className="w-3 h-3 text-white m-0.5" />
                  )}
                </div>
                <span className="font-semibold text-gray-700">
                  Select All SkillTrees
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Grid */}
        <UnsubscribeSkillTreeGrid
          skillTrees={skillTrees}
          selectedTreeIds={selectedTreeIds}
          onTreeToggle={onTreeToggle}
        />

        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              {selectedTreeIds.length > 0
                ? `${selectedTreeIds.length} SkillTree${selectedTreeIds.length > 1 ? 's' : ''} selected`
                : 'No SkillTrees selected'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 rounded-lg font-medium transition-colors bg-red-500 text-white hover:bg-red-600"
              >
                {selectedTreeIds.length === 0
                ? 'Unsubscribe from SkillForest'
                : `Unsubscribe (${selectedTreeIds.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
