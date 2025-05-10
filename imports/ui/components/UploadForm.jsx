import React, { useState } from 'react';
import { Buffer } from 'buffer'; //
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import _ from 'lodash';

export const UploadForm = () => {
  // s3 upload logic from https://www.youtube.com/watch?v=SQWJ_goOxGs
  /** useStates */
  // Stores the file upload progress
  const [fileUploadProgress, setFileUploadProgress] = useState(undefined);
  // Stores the file upload result
  const [result, setResult] = useState(null);
  // Stores the file URL of the chosen file for the pre-upload preview (Note: NOT the S3 url)
  const [previewUrl, setPreviewUrl] = useState('');
  // Stores the type of the chosen file for the pre-upload preview
  const [previewType, setPreviewType] = useState(''); // 'image' | 'video'

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
      const uploadResult = res;
      return res;
    } catch (error) {
      console.error(error);
      if (uploadId) {
        await Meteor.callAsync('abortMultiPartUpload', key, uploadId);
      }
    }
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
      author: 'my user',
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
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('image/')) {
      setPreviewType('image');
    } else if (file.type.startsWith('video/')) {
      setPreviewType('video');
    } else {
      setPreviewType(null);
    }

    setPreviewUrl(url);
  };

  /** JSX */
  return (
    <>
      <div className=" border-2 border-red-500">
        <form className="upload-form" onSubmit={handleSubmit}>
          {/* Title */}
          <label htmlFor="title">Title:</label>
          <input className=" border-1 border-solid" name="title" type="text" />
          {/* Caption */}
          <label htmlFor="caption">Caption:</label>
          <input
            className=" border-1 border-solid"
            name="caption"
            type="text"
          />
          {/* File */}
          <input
            className="file:bg-slate-500 file:pr-2 file:pl-1 file:text-white file:cursor-pointer border-1  border-solid"
            name="file"
            type="file"
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
          <div id="progress" className=" border-2 border-aqua-500 w-64">
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
