import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';

// Base schema with common fields
const BaseApplicationSchema = new SimpleSchema({
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

// Moderator-specific schema
Schemas.moderator = new SimpleSchema([
  BaseApplicationSchema,
  {
    // Moderator-specific fields
    motivation: {
      type: String,
      min: 50,
      max: 1000,
      label: 'Why do you want to become a moderator?'
    },
    timeAvailability: {
      type: String,
      allowedValues: [
        'less than 5 hours per week',
        '5-10 hours per week',
        '10-15 hours per week',
        '15-20 hours per week',
        'more than 20 hours per week'
      ],
      label: 'Time Availability'
    },
    previousExperience: {
      type: String,
      optional: true,
      max: 500,
      label: 'Previous moderation experience (optional)'
    },
    rulesAgreement: {
      type: Boolean,
      label: 'I agree to enforce community rules fairly and consistently'
    }
  }
]);

// Expert-specific schema
Schemas.expert = new SimpleSchema([
  BaseApplicationSchema,
  {
    // Expert-specific fields
    skillArea: {
      type: String,
      label: 'Area of Expertise'
    },
    experienceLevel: {
      type: String,
      allowedValues: [
        'beginner (0-1 years)',
        'intermediate (1-3 years)',
        'advanced (3-5 years)',
        'expert (5+ years)',
        'professional (10+ years)'
      ],
      label: 'Experience Level'
    },
    qualifications: {
      type: String,
      min: 50,
      max: 1000,
      label: 'Describe your qualifications and experience'
    },
    portfolio: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Url,
      label: 'Portfolio/GitHub URL (optional)'
    },
    motivation: {
      type: String,
      min: 50,
      max: 500,
      label: 'Why do you want to become an expert in this community?'
    },
    mentorshipExperience: {
      type: String,
      optional: true,
      max: 500,
      label: 'Previous teaching/mentoring experience (optional)'
    },
    availabilityForHelp: {
      type: String,
      allowedValues: [
        'occasional help when available',
        'regular weekly assistance',
        'daily community involvement',
        'intensive mentoring commitment'
      ],
      label: 'How often can you help community members?'
    }
  }
]);

// Attach schemas to collection
RoleApplicationCollection.attachSchema(Schemas.moderator);
RoleApplicationCollection.attachSchema(Schemas.expert);
