// server/methods/imageUpload.js
import { Meteor } from 'meteor/meteor';
import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';

// Use your existing AWS configuration
export const AWS_REGION = 'ap-southeast-2';
export const AWS_BUCKET = '2025w2-skilltree';

const AWSAccessKeyId = Meteor.settings.private.AWSAccessKeyId;
const AWSSecretAccessKey = Meteor.settings.private.AWSSecretKey;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretAccessKey
  }
});

Meteor.methods({
  async 'images.upload'(imageData, fileName, contentType) {
    // Validate user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Must be logged in to upload images');
    }

    try {
      // Generate unique filename
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = fileName.split('.').pop();
      const uniqueFileName = `skilltree-images/${timestamp}-${randomString}.${fileExtension}`;

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Use multipart upload like your teammate's code
      // Step 1: Create multipart upload
      const multipartUpload = await s3.send(
        new CreateMultipartUploadCommand({
          Bucket: AWS_BUCKET,
          Key: uniqueFileName,
          ContentType: contentType
        })
      );

      const uploadId = multipartUpload.UploadId;

      try {
        // Step 2: Upload the image as a single part
        const uploadPartResponse = await s3.send(
          new UploadPartCommand({
            Bucket: AWS_BUCKET,
            Key: uniqueFileName,
            UploadId: uploadId,
            Body: buffer,
            PartNumber: 1
          })
        );

        // Step 3: Complete the multipart upload
        await s3.send(
          new CompleteMultipartUploadCommand({
            Bucket: AWS_BUCKET,
            Key: uniqueFileName,
            UploadId: uploadId,
            MultipartUpload: {
              Parts: [{
                ETag: uploadPartResponse.ETag,
                PartNumber: 1
              }]
            }
          })
        );

        // Construct the S3 URL (this will work if the bucket allows public access to this path)
        const imageUrl = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${uniqueFileName}`;
        
        return {
          success: true,
          imageUrl: imageUrl,
          key: uniqueFileName
        };

      } catch (uploadError) {
        // If upload fails, abort the multipart upload
        await s3.send(
          new AbortMultipartUploadCommand({
            Bucket: AWS_BUCKET,
            Key: uniqueFileName,
            UploadId: uploadId
          })
        );
        throw uploadError;
      }

    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Meteor.Error('upload-failed', `Failed to upload image: ${error.message}`);
    }
  },

  async 'images.delete'(imageKey) {
    // Validate user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Must be logged in to delete images');
    }

    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: AWS_BUCKET,
        Key: imageKey
      });

      await s3.send(deleteCommand);
      
      return {
        success: true,
        message: 'Image deleted successfully'
      };

    } catch (error) {
      console.error('S3 Delete Error:', error);
      throw new Meteor.Error('delete-failed', `Failed to delete image: ${error.message}`);
    }
  }
});