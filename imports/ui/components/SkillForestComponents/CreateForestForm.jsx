import React, { useRef, useState } from 'react';

export const CreateForestForm = ({ onAddSkills, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    image: initialValues.image || null,
    previewImage: initialValues.previewImage || ''
  });

  const fileInputRef = useRef(null);

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
    console.log('SkillForest Created:', formData);

    // pass form details to parent component
    onAddSkills(formData.title, formData.image);

    setFormData({
      title: '',
      image: null,
      previewImage: ''
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative p-6">
      {/* Top-right title */}
      <div className="absolute top-6 left-6">
        <h2 className="text-4xl font-bold" style={{ color: '#328E6E' }}>
          Create SkillForest
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
              placeholder="Name your SkillForest..."
              required
            />
          </div>

          {/* add forest Button */}
          <button
            type="submit"
            className="text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition-colors"
            style={{
              backgroundColor: '#328E6E',
              width: '100%',
              color: '#ffffff'
            }}
          >
            Add Forest +
          </button>
        </form>
      </div>
    </div>
  );
};
