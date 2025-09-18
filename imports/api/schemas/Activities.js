import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { ActivitiesCollection } from '/imports/api/collections/Activities';

/*
So far, we will track the following activities in skilltree:
-If someone else follows your account, it appears on your feed and/or vice versa
-If someone you follow creates a skilltree/skillforest and the activity IS PUBLIC, then it appears on your feed

Some other activities to think about:
-proof of practice
-skills learned
-new roles acquired
-which posts the user has upvoted/downvoted
*/

export const ACTIVITY_TYPES = {
  USER_FOLLOWED: 'user_followed',
  SKILLTREE_CREATED: 'skilltree_created',
  SKILLFOREST_CREATED: 'skillforest_created',
  COMMUNITY_JOINED: 'community_joined',

  PROOF_SUBMITTED: 'proof_submitted'
};

// Enhanced ActivityData schema to support all your planned activities
Schemas.ActivityData = new SimpleSchema({
  //Skilltree-related fields
  skillId: {
    type: String,
    label: 'Skill ID',
    optional: true
  },
  skillTreeId: {
    type: String,
    label: 'SkillTree ID',
    optional: true
  },
  skillForestId: {
    type: String,
    label: 'SkillForest ID',
    optional: true
  },
  communityId: {
    type: String,
    label: 'The community ID joined by the actor',
    optional: true
  },

  //Follow-related fields
  followedUserId: {
    type: String,
    label: 'ID of user being followed',
    optional: true
  },
  followedUserName: {
    type: String,
    label: 'Name of user being followed',
    optional: true
  },

  //Proof of practice upload fields
  postId: {
    type: String,
    label: 'Post',
    optional: true
  }
});

Schemas.Activities = new SimpleSchema({
  userId: {
    type: String,
    label: 'The current userId'
  },
  type: {
    type: String,
    label: 'Activity type',
    allowedValues: Object.values(ACTIVITY_TYPES)
  },
  data: {
    type: Schemas.ActivityData,
    label: 'Activity-specific data',
    optional: true
  },
  isPublic: {
    type: Boolean,
    label: 'Whether this activity is public',
    defaultValue: true
  },
  createdAt: {
    type: Date,
    label: 'Activity creation date',
    defaultValue: new Date()
  }
});

/*just an idea: Implement createIndex for faster/speeds up query pre-computation

ActivitiesCollection.createIndex({ userId: 1, createdAt: -1 });
ActivitiesCollection.createIndex({ userId: 1, isPublic: 1, createdAt: -1 });
ActivitiesCollection.createIndex({ type: 1, createdAt: -1 });
ActivitiesCollection.createIndex({ isPublic: 1, createdAt: -1 });


For example, we will probably be calling these actions across the application
ActivitiesCollection.find(
  { userId: someUserId },
  { sort: { createdAt: -1 }, limit: 20 }
)
retrieves the latest activities for this specific user
*/

ActivitiesCollection.attachSchema(Schemas.Activities);
