import React, { useRef, useState } from 'react';

export const CreateTreeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '', // New field for tag
    tags: [],
    newTag: '',
    tsandcs: '',
    image: null,
    previewImage: "",
    showCustomTagInput: false
  });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('SkillTree Created:', formData);
    alert('You have successfully created a SkillTree!');
    setFormData({ title: '', description: '', tag: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Create SkillTree</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-0.5">
          <label
            htmlFor="title"
            className="block text-gray-700 text-xl font-semibold mb-1"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Name your SkillTree..."
            required
          />
        </div>

        {/* Tag Dropdown */}
        <div className="mb-4">
          <select
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="h-5 border border-gray-300 rounded text-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Tags</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="wellbeing">Wellbeing</option>
            <option value="technology">Technology</option>
            <option value="cooking">Cooking</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-l font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
            placeholder="Describe your SkillTree..."
            required
          ></textarea>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6">
          <label
            htmlFor="tsandcs"
            className="block text-gray-700 text-l font-semibold mb-1"
          >
            Terms and Conditions
          </label>
          <textarea
            id="tsandcs"
            name="tsandcs"
            rows="5"
            value={formData.tsandcs}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
            placeholder="Enter Terms & Conditions for your SkillTree..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
