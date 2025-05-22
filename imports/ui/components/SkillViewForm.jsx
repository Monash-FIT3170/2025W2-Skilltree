import React from 'react';
import { Link } from 'react-router-dom';

export const SkillViewForm = ({ editingNode, onCancel }) => {
  const progress = Math.floor(
    (editingNode.progressXp / editingNode.xpPoints) * 100
  );
  const remainder = editingNode.xpPoints - editingNode.progressXp;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
      <div className="bg-neutral-200 p-5 rounded-lg w-[800px]">
        <h3 className="block mb-2 text-xl font-bold text-emerald-700">
          {editingNode.label}
        </h3>
        <form>
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
            readOnly={true}
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
            readOnly={true}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          />
          <br />
          <label
            htmlFor="xpPoints"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            XP Required:
          </label>
          <div className="flex items-center gap-4">
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-yellow-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {remainder}XP to go!
              </div>
            </div>
            <div stle={{ marginRight: 10 }}>
              {' '}
              {editingNode.progressXp}/{editingNode.xpPoints}{' '}
            </div>
          </div>
          <br />
          <div className="mt-2.5 flex w-full justify-between">
            <button type="button" onClick={onCancel} className="ml-2.5">
              Cancel
            </button>
            <Link
              to="/upload"
              className="relative left-1 mr-0.5 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Upload Proof
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
