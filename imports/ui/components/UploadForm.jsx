import React from 'react';
import { Meteor } from 'meteor/meteor';

export const UploadForm = () => {
  const insertProof = async () => {
    await Meteor.callAsync('proofUpload', 'testitle', 'C:/test.svg');
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
