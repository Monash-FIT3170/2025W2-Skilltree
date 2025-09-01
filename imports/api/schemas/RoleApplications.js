import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';

// Base schema with common fields
Schemas.application = new SimpleSchema({
  userId: {
    type: String
  },
  name: {
    type: String,
    label: 'Full Name'
  },
  email: {
    type: String,
    label: 'Email Address'
  },
  applicationType: {
    type: String,
    allowedValues: ['moderator', 'expert'],
    label: 'Application Type'
  },
  status: {
    type: String,
    allowedValues: ['pending', 'approved', 'rejected', 'under_review'],
    defaultValue: 'pending',
    label: 'Application Status'
  },
  skillTreeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    label: 'Skill Tree ID'
  },
  qualifications: {
    type: String,
    min: 50,
    max: 1000,
    label: 'Describe your qualifications and experience'
  },
  motivation: {
    type: String,
    min: 50,
    max: 500,
    label: 'Why do you want to become an expert in this community?'
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    label: 'Application Date'
  },
  updatedAt: {
    type: Date,
    defaultValue: new Date(),
    label: 'Last Updated'
  },
  reviewedBy: {
    type: String,
    optional: true,
    label: 'Reviewed By Admin'
  },
  reviewedAt: {
    type: Date,
    optional: true,
    label: 'Review Date'
  },
  reviewNotes: {
    type: String,
    optional: true,
    max: 500,
    label: 'Admin Review Notes'
  }
});

RoleApplicationCollection.attachSchema(Schemas.application);
