// import {
//   AbortMultipartUploadCommand,
//   CompleteMultipartUploadCommand,
//   CreateMultipartUploadCommand,
//   S3Client,
//   UploadPartCommand
// } from '@aws-sdk/client-s3';
// import { Meteor } from 'meteor/meteor';
// export const AWS_REGION = 'ap-southeast-2';
// export const AWS_BUCKET = '2025w2-skilltree';
//
// const AWSAccessKeyId = Meteor.settings.private.AWSAccessKeyId;
// const AWSSecretAccessKey = Meteor.settings.private.AWSSecretAccessKey;
//
// const s3 = new S3Client({
//   region: AWS_REGION,
//   credentials: {
//     accessKeyId: AWSAccessKeyId,
//     secretAccessKey: AWSSecretAccessKey
//   }
// });
// //
// Meteor.methods({
//   /**
//    * Initiates a multipart file upload to the AWS S3 bucket
//    * @param key identifier that keeps the different parts together
//    * @returns {Promise}
//    */
//   async createMultiPartUpload(key) {
//     console.log('CREATE METHOD RUNS');
//     try {
//       const command = new CreateMultipartUploadCommand({
//         Bucket: AWS_BUCKET,
//         Key: key
//       });
//
//       const res = await s3.send(command);
//
//       console.log('createMultipartUpload result:', res); // ✅ should contain UploadId
//
//       return { UploadId: res.UploadId }; // 🔥 this MUST be returned
//     } catch (err) {
//       console.error('createMultipartUpload failed:', err);
//       throw new Meteor.Error('create-multipart-failed', err.message);
//     }
//     // const multipartUpload = await s3.send(
//     //   new CreateMultipartUploadCommand({
//     //     Bucket: AWS_BUCKET,
//     //     Key: key
//     //   })
//     // );
//     //
//     // return multipartUpload;
//   },
//
//   /**
//    * Uploads a part of a file to S3
//    * @param key
//    * @param uploadId
//    * @param filePart
//    * @param iteration ensures order of parts is preserved
//    * @returns {Promise<void>}
//    */
//   async uploadPartS3(key, uploadId, filePart, iteration) {
//     const res = await s3.send(
//       new UploadPartCommand({
//         Bucket: AWS_BUCKET,
//         Key: key,
//         uploadId: uploadId,
//         Body: filePart,
//         PartNumber: iteration + 1
//       })
//     );
//     return res;
//   },
//
//   /**
//    *
//    * @param key
//    * @param uploadId
//    * @param uploadResults
//    * @returns {Promise<void>}
//    */
//   async completeMultipartUpload(key, uploadId, uploadResults) {
//     const res = await s3.send(
//       new CompleteMultipartUploadCommand({
//         Bucket: AWS_BUCKET,
//         Key: key,
//         UploadId: uploadId,
//         MultipartUpload: {
//           Parts: uploadResults.map(({ ETag }, i) => {
//             return {
//               ETag,
//               PartNumber: i + 1
//             };
//           })
//         }
//       })
//     );
//     return res;
//   },
//
//   async abortMultipartUpload(key, uploadId) {
//     const abortCommand = new AbortMultipartUploadCommand({
//       Bucket: AWS_BUCKET,
//       Key: key,
//       UploadId: uploadId
//     });
//     await s3.send(abortCommand);
//   }
// });
import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand
} from '@aws-sdk/client-s3';
import { Meteor } from 'meteor/meteor';

/** CREDITS */
// AWS s3 upload logic is from https://www.youtube.com/watch?v=SQWJ_goOxGs

export const AWS_REGION = 'ap-southeast-2';
export const AWS_BUCKET = '2025w2-skilltree';

// const AWSAccessKeyId = Meteor.settings.private.AWSAccessKeyId;
// const AWSSecretAccessKey = Meteor.settings.private.AWSSecretAccessKey;

// const s3 = new S3Client({
//   region: AWS_REGION,
//   credentials: {
//     accessKeyId: AWSAccessKeyId,
//     secretAccessKey: AWSSecretAccessKey
//   }
// });

// Meteor.methods({
//   async createMultiPartUpload(key) {
//     const multipartUpload = await s3.send(
//       new CreateMultipartUploadCommand({
//         Bucket: AWS_BUCKET,
//         Key: key
//       })
//     );

//     return multipartUpload;
//   },

//   async uploadPartS3(key, uploadId, filePart, iteration) {
//     const res = await s3.send(
//       new UploadPartCommand({
//         Bucket: AWS_BUCKET,
//         Key: key,
//         UploadId: uploadId,
//         Body: filePart,
//         PartNumber: iteration + 1
//       })
//     );

//     return res;
//   },

//   async completeMultiPartUpload(key, uploadId, uploadResults) {
//     const res = await s3.send(
//       new CompleteMultipartUploadCommand({
//         Bucket: AWS_BUCKET,
//         Key: key,
//         UploadId: uploadId,
//         MultipartUpload: {
//           Parts: uploadResults.map(({ ETag }, i) => ({
//             ETag,
//             PartNumber: i + 1
//           }))
//         }
//       })
//     );

//     return res;
//   },

//   async abortMultiPartUpload(key, uploadId) {
//     const abortCommand = new AbortMultipartUploadCommand({
//       Bucket: AWS_BUCKET,
//       Key: key,
//       UploadId: uploadId
//     });

//     await s3.send(abortCommand);
//   }
// });
