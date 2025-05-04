import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from "/imports/api/Schemas";
import { UsersCollection } from "/imports/api/collections/Users"; // UsersCollection

// Schema References (Nested/Dependencies)

// Define the schema for the UsersCollection using SimpleSchema to Schemas (for reusability)
Schemas.Users = new SimpleSchema({
  proof_of_practice_uploads: {
    type: Array,
    optional: true,
    label: "Your Proof of Practice Uploads",
  },
  "proof_of_practice_uploads.$": Int8Array,
  expertise_areas: {
    type: Array,
    optional: true,
    label: "Users Expertise Areas",
  },
  "expertise_areas.$": String,
  membership_tier: {
    type: String,
    label: "Membership Tier",
  },
});

// Attach the defined schema (from Schemas) to the UsersCollection
UsersCollection.attachSchema(Schemas.Users);
