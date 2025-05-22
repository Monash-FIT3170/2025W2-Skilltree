import React, { useRef, useState } from 'react';

export const CreateTreeForm = ({ onAddSkills }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '', // New field for tag
    tags: [],
    newTag: '',
    tsandcs: '',
    image: null,
    previewImage: '',
    showCustomTagInput: false
  });

  const fileInputRef = useRef(null);

  //Used for Custom Tags
  const handleTagChange = e => {
    const value = e.target.value;
    if (value === 'custom') {
      setFormData(prev => ({ ...prev, showCustomTagInput: true }));
      return;
    }
    if (value && !formData.tags.includes(value)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, value],
        showCustomTagInput: false
      }));
    }
  };

  const handleNewTagChange = e => {
    setFormData(prev => ({
      ...prev,
      newTag: e.target.value
    }));
  };

  const addCustomTag = () => {
    if (
      formData.newTag.trim() &&
      !formData.tags.includes(formData.newTag.trim())
    ) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: '',
        showCustomTagInput: false
      }));
    }
  };

  const removeTag = tagToRemove => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleChange = e => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            image: file,
            previewImage: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('SkillTree Created:', formData);
    alert('You have successfully created a SkillTree!');
    setFormData({
      title: '',
      description: '',
      tag: '',
      tsandcs: '',
      image: null,
      previewImage: ''
    });
    onAddSkills();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative p-6">
      {/* Top-right title */}
      <div className="absolute top-6 left-6">
        <h2 className="text-4xl font-bold" style={{ color: '#328E6E' }}>
          Create SkillTree
        </h2>

        {/* Image Upload Section */}
        <div className="pt-6">
          <div
            onClick={triggerFileInput}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors max-w-xl mx-auto"
          >
            {formData.previewImage ? (
              <img
                src={formData.previewImage}
                alt="Preview"
                className="h-48 w-full object-cover rounded-md mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold" style={{ color: '#328E6E' }}>
                    Click to upload
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          {formData.previewImage && (
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-500">Image selected</p>
              <button
                type="button"
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    image: null,
                    previewImage: ''
                  }))
                }
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-13">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-0.5">
            <label
              htmlFor="title"
              className="block text-gray-700 text-xl font-semibold mb-1"
              style={{ color: '#328E6E' }}
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

          {/* Tag Dropdown and Custom Tags*/}
          <div className="pt-6 flex gap-2">
            <select
              onChange={handleTagChange}
              className="border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              value=""
            >
              <option value="">Select a tag</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="wellbeing">Wellbeing</option>
              <option value="technology">Technology</option>
              <option value="cooking">Cooking</option>
              <option value="custom">Add custom tag</option>
            </select>
            {/* Appear only when add custom is selected */}
            {formData.showCustomTagInput && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter custom tag"
                  value={formData.newTag}
                  onChange={handleNewTagChange}
                  className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={addCustomTag}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            )}
            {/* Show the tags selected or created */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-green-600 hover:text-green-900 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pt-6 mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-l font-semibold mb-1"
              style={{ color: '#328E6E' }}
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
              style={{ color: '#328E6E' }}
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

          {/* add skils Button */}
          <button
            type="transition"
            className="text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition-colors"
            style={{
              backgroundColor: '#328E6E',
              width: '100%',
              color: '#ffffff'
            }}
          >
            Add Skils +
          </button>
        </form>
      </div>
    </div>
  );
};
