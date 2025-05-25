// import React, { useState, useEffect } from 'react';

// export const SkillEditForm = ({ editingNode, onSave, onCancel }) => {
//   const initialSliderValue = editingNode.xpPoints;
//   const [sliderValue, setSliderValue] = useState(initialSliderValue);

//   useEffect(() => {
//     setSliderValue(initialSliderValue);
//   }, [initialSliderValue]);

//   const handleSliderChange = e => {
//     setSliderValue(e.target.value);
//   };

//   const handleInputChange = e => {
//     const newValue = Math.max(0, Math.min(100, e.target.value));
//     setSliderValue(newValue);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
//       <div className="bg-neutral-200 p-5 rounded-lg w-[1000px] max-w-[70vw]">
//         <div className="flex justify-between items-start">
//           <div className="flex-1">
//             <h3 className="block mb-2 text-3xl font-bold "
//             style={{ color: '#328E6E' }}>
//               Add Skill Details
//             </h3>
//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 onSave({
//                   label: formData.get('title'),
//                   description: formData.get('description'),
//                   requirements: formData.get('requirements'),
//                   xpPoints: formData.get('xpPoints'),
//                   previewImage: formData.get('previewImage')
//                 });
//               }}
//               className="max-w-[55%]"
//             >
//               <label
//                 htmlFor="title"
//                 className="block mb-2 text-xl font-medium"
//                 style={{ color: '#328E6E' }}
//               >
//                 Skill Title:
//               </label>
//               <input
//                 name="title"
//                 id="title"
//                 defaultValue={editingNode.label}
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
//               />
//               <br />
//               <label
//                 htmlFor="description"
//                 className="block mb-2 text-xl font-medium"
//                 style={{ color: '#328E6E' }}
//               >
//                 Description:
//               </label>
//               <textarea
//                 name="description"
//                 id="description"
//                 rows="4"
//                 placeholder="Write your thoughts here..."
//                 defaultValue={editingNode.description}
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
//               />
//               <br />
//               <label
//                 htmlFor="requirements"
//                 className="block mb-2 text-xl font-medium"
//                 style={{ color: '#328E6E' }}
//               >
//                 Requirements:
//               </label>
//               <input
//                 name="requirements"
//                 id="requirements"
//                 defaultValue={editingNode.requirements}
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
//               />
//               <br />
//               <label
//                 htmlFor="xpPoints"
//                 className="block mb-2 text-xl font-medium"
//                 style={{ color: '#328E6E' }}
//               >
//                 XP Required:
//               </label>
//               <div className="flex items-center gap-4">
//                 <input
//                   name="xpPoints"
//                   id="xpPoints"
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={sliderValue}
//                   onChange={handleSliderChange}
//                   className="w-full h-1 bg-emerald-700 rounded-lg range-lg appearance-none cursor-pointer"
//                 />
//                 <input
//                   type="number"
//                   value={sliderValue}
//                   onChange={handleInputChange}
//                   className="block w-20 px-3 py-2 text-sm border bg-gray-50 border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//             </form>
//             <div className="flex justify-end gap-2 mt-4">
//                 <button 
//                   type="button" 
//                   onClick={onCancel} 
//                   className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
//                 >
//                   Save
//                 </button>
//                 </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   );
// };

import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SkillEditForm = ({ editingNode, onSave, onCancel }) => {
  //retrive the data that was saved or empty
  const location = useLocation;
  const [formData, setFormData] = useState({
    ...location.state?.formData,
    label: editingNode?.data?.label || '',
    description: editingNode?.data?.description || '',
    requirements: editingNode?.data?.requirements || '',
    xpPoints: editingNode?.data?.xpPoints || 0,
    image: editingNode?.data?.image || null
  });

  // Used to enforce non empty value 
  const [errors, setErrors] = useState({
    label: false,
    description: false,
    requirements: false
  })

  const [previewImage, setPreviewImage] = useState(editingNode?.data?.image || null);
  const fileInputRef = useRef(null);

  // Make changed to the skill node but it cannot be empty
  useEffect(() => {
    setPreviewImage(editingNode?.data?.image || null);
    setFormData({
      label: editingNode?.data?.label || '',
      description: editingNode?.data?.description || '',
      requirements: editingNode?.data?.requirements || '',
      xpPoints: editingNode?.data?.xpPoints || 0,
      image: editingNode?.data?.image || null
    });
    setErrors({
      label: false,
      description: false,
      requirements: false
    })
  }, [editingNode]);

  const validForm =() =>{
    const newErrors = {
      label: formData.label.trim() === '',
      description: formData.description.trim() === '',
      requirements: formData.requirements.trim() === ''
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = e => {
    setFormData(prev => ({
      ...prev,
      xpPoints: e.target.value
    }));
  };

  // Save the image uploaded 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setPreviewImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Saves forms information to database
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validForm
    if (!isValid) return;
    onSave({
      id: editingNode?.id || '',
      type: editingNode?.type || 'default',
      data: {
        label: formData.label.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements.trim(),
        xpPoints: parseInt(formData.xpPoints),
        image: formData.image
      },
      position: editingNode?.position || { x: 0, y: 0 }
    });
  };

  //Checking form is valid no empty fields 
  const isFormValid = formData.label.trim() !== '' && formData.description.trim() !== '' && formData.requirements.trim() !== '';

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40 flex justify-center items-center z-[1000]">
      <div className="bg-neutral-200 p-5 rounded-lg w-[1000px]">
        <h3 className="block mb-2 text-3xl font-bold " style={{ color: '#328E6E' }}>
          Add Skill Details
        </h3>
        
        <div className="flex gap-6">
          {/* Left side - Form inputs */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} id="skillForm">
              <label htmlFor="label" className="block mb-2 text-xl font-medium " style={{ color: '#328E6E' }}>
                Skill Label:
              </label>
              <input
                name="label"
                id="label"
                value={formData.label}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                maxLength={200}
              />
              <br />
              <label htmlFor="description" className="block mb-2 text-xl font-medium "style={{ color: '#328E6E' }}>
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                maxLength={1000}
              />
              <br />
              <label htmlFor="requirements" className="block mb-2 text-xl font-medium" style={{ color: '#328E6E' }} >
                Requirements:
              </label>
              <input
                name="requirements"
                id="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              />
              <br />
              <label htmlFor="xpPoints" className="block mb-2 text-xl font-medium " style={{ color: '#328E6E' }}>
                XP Required:
              </label>
              <div className="flex items-center gap-4">
                <input
                  name="xpPoints"
                  id="xpPoints"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.xpPoints}
                  onChange={handleSliderChange}
                  className="w-full h-1 bg-emerald-700 rounded-lg range-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  name="xpPointsValue"
                  value={formData.xpPoints}
                  onChange={(e) => {
                    const value = Math.max(0, Math.min(100, e.target.value));
                    setFormData(prev => ({ ...prev, xpPoints: value }));
                  }}
                  className="block w-20 px-3 py-2 text-sm border bg-gray-50 border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </form>
          </div>

          {/* Right side - Image upload (styled like CreateTreeForm) */}
          <div className="w-64 flex flex-col">
            <div
              onClick={triggerFileInput}
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors h-64 flex items-center justify-center"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-contain rounded-md mx-auto"
                />
              ) : (
                // Follow SVG rules
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* used to draw a path */}
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
              {/* image only */}
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>

            {previewImage && (
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Image selected</p>
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons at bottom right */}
        <div className="flex justify-end gap-2 mt-4">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="skillForm"
            disabled={!isFormValid}
            className={`px-4 py-2 text-white rounded transition-colors ${
              isFormValid 
                ? 'bg-emerald-600 ' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            style={{ 
              backgroundColor: isFormValid ? '#328E6E' : undefined
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};