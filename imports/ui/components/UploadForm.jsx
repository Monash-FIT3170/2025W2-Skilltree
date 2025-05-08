import React from 'react';
import { Meteor } from 'meteor/meteor';

export const UploadForm = () => {
  const insertProof = async data => {
    await Meteor.callAsync('proofUpload', data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      author: 'my user',
      caption: 'How could validate pass but insert fail?',
      filepath: '/public/' + e.target.elements.file.files[0], // change to filename
      uploadedAt: new Date()
    };
    await insertProof(data);
  };

  return (
    <>
      <div className="border-2 border-solid">
        <form className="upload-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input className="border-2 border-solid" name="title" type="text" />
          <label htmlFor="caption">Caption:</label>
          <input className="border-2 border-solid" name="caption" type="text" />
          <input
            className="cursor-pointer border-2 border-solid"
            name="file"
            type="file"
          />
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};
