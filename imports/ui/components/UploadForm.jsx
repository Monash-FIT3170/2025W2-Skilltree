import React, { useState } from 'react';
import { Buffer } from 'buffer'; //
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import _ from 'lodash';

/** A form for a user to upload proof of progression in the SkillTree.
 * Uploads proof photo/videos to an Amazon Web Services S3 storage bucket,
 * and inserts a proof document into the MongoDB 'proof' collection.
 * */
export const UploadForm = () => {
  /** CREDITS */
  // AWS s3 upload logic is from https://www.youtube.com/watch?v=SQWJ_goOxGs

  /** useStates */
  // Stores the file upload progress
  const [fileUploadProgress, setFileUploadProgress] = useState(undefined);
  // Stores the file upload result
  const [result, setResult] = useState(null);
  // Stores the file URL of the chosen file for the pre-upload preview (Note: NOT the S3 url)
  const [previewUrl, setPreviewUrl] = useState('');
  // Stores the type of the chosen file for the pre-upload preview
  const [previewType, setPreviewType] = useState(''); // 'image' | 'video'
  // Stores whether the chosen file is of valid format and size
  const [isValidFile, setIsValidFile] = useState(false);

  /**  Helper Functions */
  /**
   * Handles uploading a file to the AWS S3 bucket.
   * @param file the file to upload
   * @returns {Promise<any>}
   */
  const handleUploadFile = async file => {
    setFileUploadProgress(null);
    const key = `${Random.id()}.${_.last(file.name.split('.'))}`;

    const multipartUpload = await Meteor.callAsync(
      'createMultiPartUpload',
      key
    );
    const uploadId = multipartUpload.UploadId;
    const uploadPromises = [];
    const partSize = 10 * 1024 * 1024;
    const totalParts = Math.ceil(file.size / partSize);
    try {
      let partCount = 0;
      const executeAndPrint = async (buffer, iteration, runCount = 0) => {
        try {
          const res = await Meteor.callAsync(
            'uploadPartS3',
            key,
            uploadId,
            buffer,
            iteration
          );
          setFileUploadProgress(
            (((iteration + 1) / totalParts) * 100).toFixed(2)
          );

          return res;
        } catch (error) {
          if (runCount > 5) {
            console.error('Item', iteration, 'completely failed to upload');
            return; // should throw new Meteor.Error() here really
          }

          console.warn(error);
          // If we haven't hit 5 tries, try again
          const res = await executeAndPrint(buffer, iteration, runCount + 1);
          return res;
        }
      };

      do {
        const start = partCount * partSize;
        const end = start + partSize;
        const filePart = file.slice(start, end);
        if (filePart.size < 1) {
          break;
        }
        const arrayBuffer = await filePart.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const res = await executeAndPrint(buffer, partCount);
        uploadPromises.push(res);
        partCount++;
      } while (true);

      const res = await Meteor.callAsync(
        'completeMultiPartUpload',
        key,
        uploadId,
        uploadPromises
      );
      setResult(res);
      return res;
    } catch (error) {
      console.error(error);
      if (uploadId) {
        await Meteor.callAsync('abortMultiPartUpload', key, uploadId);
      }
    }
  };

  /**
   * Validates that a file is under 30MB and is either an image or video
   * @param file the file to be validated
   * @returns {Promise<boolean>} true if file is valid, false otherwise
   */
  const validateFile = async file => {
    const maxSizeInBytes = 30 * 1024 * 1024; // 30MB

    if (file.size > maxSizeInBytes) {
      alert('File must be smaller than 30MB.');
      return false;
    }

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Only image and video files are allowed.');
      return false;
    }

    return true;
  };

  /**
   * Handles inserting the proof into the database.
   * @param data the proof data to be inserted as a document (must follow the Proof schema)
   * @returns {Promise<void>}
   */
  const insertProof = async data => {
    await Meteor.callAsync('proofUpload', data);
  };

  /**  Main Functions */
  /**
   * Handles submission of the upload form, uploading the file and inserting the
   * proof data in the database.
   * @param e
   * @returns {Promise<void>}
   */
  const handleSubmit = async e => {
    e.preventDefault();
    const uploadResults = await handleUploadFile(
      _.first(e.target.elements.file.files)
    );
    const data = {
      title: e.target.title.value,
      author: 'my user', // TODO dummy data
      communityId: 'samplecommunityid', // TODO dummy data
      caption: e.target.caption.value,
      link: uploadResults.Location,
      uploadedAt: new Date()
    };
    await insertProof(data);
  };

  /**
   * Updates the file preview to use the currently chosen file
   * @param e event object from the file input onChange event
   * @returns {Promise<void>}
   */
  const updatePreview = async e => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const fileValid = await validateFile(file);
    if (!fileValid) {
      // Set the file input to empty
      e.target.value = '';
      setPreviewUrl('');
      return;
    }
    setIsValidFile(fileValid);

    // Set preview type
    if (file.type.startsWith('image/')) {
      setPreviewType('image');
    } else if (file.type.startsWith('video/')) {
      setPreviewType('video');
    } else {
      setPreviewType('');
    }

    // Display file preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  /** JSX */
  return (
    <>
      <div className=" border-2 border-red-500">
        <form className="upload-form" onSubmit={handleSubmit}>
          {/* Title */}
          <label htmlFor="title">Title:</label>
          <input
            className=" border-1 border-solid"
            name="title"
            type="text"
            required
          />
          {/* Caption */}
          <label htmlFor="caption">Caption:</label>
          <input
            className=" border-1 border-solid"
            name="caption"
            type="text"
            required
          />
          {/* File */}
          <input
            className="file:bg-slate-500 file:pr-2 file:pl-1 file:text-white file:cursor-pointer border-1  border-solid"
            name="file"
            type="file"
            accept="image/*,video/*"
            onChange={updatePreview}
          />
          {/* File Preview */}
          <div id="preview" className="w-96 border-2 border-green-500">
            {previewUrl && previewType === 'image' && (
              <img alt="Image preview" src={previewUrl} />
            )}
            {previewUrl && previewType === 'video' && (
              <video autoPlay={false} controls={true} src={previewUrl} />
            )}
          </div>
          {/* File Upload Progress */}
          <div id="progress" className=" border-2 border-aqua-500 w-96">
            {fileUploadProgress !== undefined && (
              <p>
                File Upload Progress:{' '}
                {fileUploadProgress === null
                  ? 'Starting upload'
                  : `${fileUploadProgress}%`}
              </p>
            )}
            {result && (
              <p>
                file link: <a href={result.Location}>click me</a>{' '}
              </p>
            )}
          </div>
          {/* Submit button */}
          <button
            className="enabled:cursor-pointer enabled:bg-blue-500 enabled:hover:bg-blue-700 enabled:text-white bg-gray-300 text-gray-400 font-bold py-2 px-4 rounded"
            type="submit"
            disabled={!isValidFile}
          >
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};
