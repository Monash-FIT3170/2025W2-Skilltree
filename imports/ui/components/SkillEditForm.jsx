import React, { useState, useEffect } from 'react';

export const SkillEditForm = ({ editingNode, onSave, onCancel }) => {
  const initialSliderValue = editingNode.xpPoints;
  const [sliderValue, setSliderValue] = useState(initialSliderValue);

  useEffect(() => {
    setSliderValue(initialSliderValue);
  }, [initialSliderValue]);

  const handleSliderChange = e => {
    setSliderValue(e.target.value);
  };

  const handleInputChange = e => {
    const newValue = Math.max(0, Math.min(100, e.target.value));
    setSliderValue(newValue);
  };

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
              xpPoints: formData.get('xpPoints')
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
          <label
            htmlFor="xpPoints"
            className="block mb-2 text-sm font-medium text-emerald-700"
          >
            XP Required:
          </label>
          <div className="flex items-center gap-4">
            <input
              name="xpPoints"
              id="xpPoints"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-1 bg-emerald-700 rounded-lg range-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              value={sliderValue}
              onChange={handleInputChange}
              className="block w-20 px-3 py-2 text-sm border bg-gray-50 border-gray-300 rounded-md shadow-sm"
            />
          </div>
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
