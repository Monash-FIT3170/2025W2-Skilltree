import React, { useState } from 'react';
import { Buffer } from 'buffer'; //
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import _ from 'lodash';
import { Button } from 'flowbite-react';
import { Dropzone } from './Dropzone';
import { AiOutlineClose } from 'react-icons/ai';

/** A form for a user to upload proof of progression in the SkillTree.
 * Uploads proof photo/videos to an Amazon Web Services S3 storage bucket,
 * and inserts a proof document into the MongoDB 'proof' collection.
 *
 * NOTE: To input your AWS credentials, create a settings.json file in the
 * project root and ADD IT TO .GITIGNORE, never commit this.
 * Inside, type your Access Key ID and Secret Access Key for the bucket like so:
 * {
 *     "private": {
 *     "AWSAccessKeyId": "accesskeyhere",
 *     "AWSSecretAccessKey": "secretkeygoesherealsoitsverylong"
 *   }
 * }
 * */
export const ProofUploadForm = () => {
  /** CREDITS */
  // AWS s3 upload logic is from https://www.youtube.com/watch?v=SQWJ_goOxGs

  /** useStates */
  // Stores the file upload progress
  const [fileUploadProgress, setFileUploadProgress] = useState(undefined);
  // Stores the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // Stores the file upload result
  const [result, setResult] = useState(null);
  // Stores the file URL of the chosen file for the pre-upload preview (Note: NOT the S3 url)
  const [previewUrl, setPreviewUrl] = useState('');
  // Stores the type of the chosen file for the pre-upload preview
  const [previewType, setPreviewType] = useState(''); // 'image' | 'video'
  // Stores whether the chosen file is of valid format and size
  const [isValidFile, setIsValidFile] = useState(false);
  // Modal Controller
  const [openModal, setOpenModal] = useState(false);

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
          return await executeAndPrint(buffer, iteration, runCount + 1);
        }
      };

      const start = partCount * partSize;
      const end = start + partSize;
      const filePart = file.slice(start, end);
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
      } while (filePart.size >= 1);

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
    await Meteor.callAsync('insertProof', data);
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
    const uploadResults = await handleUploadFile(selectedFile);
    const proof = {
      title: 'given title',
      description: 'given desc',
      user: 'my user', // TODO dummy data
      date: new Date(),
      evidenceLink: uploadResults.Location,
      verification: 0,
      skillTreeId: 'my skilltree', // should eventually be a community/skillTree ID
      subskill: 'my subskill'
    };
    await insertProof(proof);
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
    setSelectedFile(file);

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

  /**
   * Removes the selected file so a new one can be chosen
   */
  const removeFile = () => {
    setPreviewUrl('');
    setPreviewType('');
    setIsValidFile(false);
  };

  /** JSX */
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpenModal(false)}
        >
          <div
            id="uploadModal"
            className="w-[90vw] max-w-[90vw] bg-[#d9d9d9] rounded-4xl border-2 border-green-300 flex flex-col justify-between p-4 max-h-[95vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <form
              className="flex flex-col flex-1 justify-between m-4"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl text-[#328E6E] font-bold">
                  Skill: C Major Scale
                </h1>
                <Button
                  className="focus:ring-0 hover:text-gray-700 text-2xl"
                  color="black"
                  pill
                  outline
                  onClick={() => setOpenModal(false)}
                >
                  <AiOutlineClose />
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-xl font-bold self-start">Requirements:</p>
                <p className="text-xl self-start">
                  Upload a video of yourself playing 2 octaves of the C Major
                  scale.
                </p>
              </div>

              <div
                id="preview"
                className="flex items-center justify-center h-96 bg-white rounded-4xl m-4"
              >
                {previewUrl && previewType === 'image' ? (
                  <img
                    alt="Image preview"
                    src={previewUrl}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : previewUrl && previewType === 'video' ? (
                  <video
                    autoPlay={false}
                    controls={true}
                    src={previewUrl}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Dropzone onChangeFunc={updatePreview} />
                )}
              </div>

              <div
                id="progress"
                className="text-[#328E6E] font-bold self-center text-center h-6 items-center justify-center"
              >
                {fileUploadProgress !== undefined && (
                  <p>
                    {fileUploadProgress === null
                      ? 'Starting upload'
                      : `${fileUploadProgress}%`}
                  </p>
                )}
                {result && <p>Done!</p>}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                {selectedFile && (
                  <Button
                    className="focus:ring-0"
                    color="red"
                    pill
                    outline
                    onClick={removeFile}
                  >
                    <AiOutlineClose />
                  </Button>
                )}
                <Button
                  pill
                  color="green"
                  className="focus:ring-0 w-32 font-bold text-lg enabled:cursor-pointer"
                  type="submit"
                  disabled={!isValidFile}
                >
                  Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
