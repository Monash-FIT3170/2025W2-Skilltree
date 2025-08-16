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

const AWSAccessKeyId = Meteor.settings.private.AWSAccessKeyId;
const AWSSecretAccessKey = Meteor.settings.private.AWSSecretAccessKey;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretAccessKey
  }
});

Meteor.methods({
  async createMultiPartUpload(key) {
    const multipartUpload = await s3.send(
      new CreateMultipartUploadCommand({
        Bucket: AWS_BUCKET,
        Key: key
      })
    );

    return multipartUpload;
  },

  async uploadPartS3(key, uploadId, filePart, iteration) {
    const res = await s3.send(
      new UploadPartCommand({
        Bucket: AWS_BUCKET,
        Key: key,
        UploadId: uploadId,
        Body: filePart,
        PartNumber: iteration + 1
      })
    );

    return res;
  },

  async completeMultiPartUpload(key, uploadId, uploadResults) {
    const res = await s3.send(
      new CompleteMultipartUploadCommand({
        Bucket: AWS_BUCKET,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1
          }))
        }
      })
    );

    return res;
  },

  async abortMultiPartUpload(key, uploadId) {
    const abortCommand = new AbortMultipartUploadCommand({
      Bucket: AWS_BUCKET,
      Key: key,
      UploadId: uploadId
    });

    await s3.send(abortCommand);
  }
});
