import React from 'react';
import { Meteor } from 'meteor/meteor';

export const UploadForm = () => {
  const insertProof = async () => {
    // const data = {
    //   title: 'titleaijfawfwa',
    //   author: 'userauthorwahurwa',
    //   caption:
    //     'I would like to create a grid with tailwind css where the first column is very narrow and the second one is very wide.',
    //   filename: '/public/filename.png',
    //   uploadedAt: new Date()
    // };
    await Meteor.callAsync('proofUpload', {
      title: 'titleaijfawfwa',
      author: 'userauthorwahurwa',
      caption:
        'I would like to create a grid with tailwind css where the first column is very narrow and the second one is very wide.',
      filepath: '/public/filename.png',
      uploadedAt: new Date()
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await insertProof();
  };

  return (
    <>
      <div className="border-2 border-solid">
        <form className="upload-form" onSubmit={handleSubmit}>
          <input className="" type="file" />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </>
  );
};
