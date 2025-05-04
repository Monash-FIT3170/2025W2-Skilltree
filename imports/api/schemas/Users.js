import SimpleSchema from "meteor/aldeed:simple-schema";
import { Schemas } from "/imports/api/Schemas";
import { UsersCollection } from "/imports/api/collections/Users"; // UsersCollection

// Schema References (Nested/Dependencies)

// Define the schema for the UsersCollection using SimpleSchema to Schemas (for reusability)
Schemas.Users = new SimpleSchema({});

// Attach the defined schema (from Schemas) to the UsersCollection
UsersCollection.attachSchema(Schemas.Users);
