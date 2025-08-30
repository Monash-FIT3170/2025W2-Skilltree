import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { Schemas } from '/imports/api/schemas/SkillTree';

const AWS_REGION = 'ap-southeast-2';
const AWS_BUCKET = '2025w2-skilltree';

const AWSAccessKeyId = Meteor.settings.private.AWSAccessKeyId;
const AWSSecretAccessKey = Meteor.settings.private.AWSSecretKey;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretAccessKey
  }
});

// Basic methods for SkillTreeCollection
Meteor.methods({
  async 'skilltrees.insert'(skilltree) {
    // Schemas.SkillTree.validate(skilltree); // TO DO: fix validate errors, seems to be issue with Schema handling and importing
    const {
      title,
      description,
      termsAndConditions,
      tags = [],
      image,
      skillNodes = [],
      skillEdges = []
    } = skilltree || {};

    let imageUrl = image;

    // Upload base64 image to S3
    if (image && image.startsWith('data:')) {
      const buffer = Buffer.from(image.split(',')[1], 'base64');
      const fileName = `skilltrees/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;

      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET,
        Key: fileName,
        Body: buffer,
        ContentType: 'image/png'
      });

      await s3.send(command);

      imageUrl = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
    }

    const doc = {
      title,
      description,
      termsAndConditions,
      tags,
      image: imageUrl,
      skillNodes,
      skillEdges,
      owner: this.userId,
      admins: [this.userId],
      subscribers: [this.userId]
    };

    return SkillTreeCollection.insertAsync(doc);
  },


  async 'skilltrees.insertAsync'(skillTree) {
    return await SkillTreeCollection.insertAsync(skillTree);
  },

  'skilltrees.update'(skilltreeId, skilltree) {
    // Schemas.SkillTree.validate(skilltree);

    if (!SkillTreeCollection.findOne(skilltreeId)) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    return SkillTreeCollection.update(skilltreeId, { $set: skilltree });
  },

  'skilltrees.remove'(skilltreeId) {
    return SkillTreeCollection.remove(skilltreeId);
  },

  async 'skilltrees.get'(skilltreeId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });
    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }
    return skilltree;
  },

  // add user to skill tree user field
  async 'skilltrees.subscribeUser'(skilltreeId, userId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });

    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    // set async if needed
    return await SkillTreeCollection.updateAsync(
      { _id: skilltreeId },
      {
        $addToSet: {
          subscribers: userId
        }
      }
    );
  },

  async 'skilltrees.unsubscribeUser'(skilltreeId, userId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });

    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    return await SkillTreeCollection.updateAsync(
      { _id: skilltreeId },
      {
        $pull: {
          subscribers: userId
        }
      }
    );
  },

  async 'skilltrees.findUser'(skilltreeId, userId) {
    const skilltree = await SkillTreeCollection.findOneAsync({
      _id: skilltreeId
    });
    if (!skilltree) {
      throw new Meteor.Error('skilltree-not-found', 'SkillTree not found');
    }

    // select the document where subscribers contains desired user OR null if none are found
    return await SkillTreeCollection.findOneAsync({
      _id: skilltreeId,
      subscribers: { $in: [userId] }
    });
  }
});
