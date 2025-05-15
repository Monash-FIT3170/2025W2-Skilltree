import SimpleSchema from 'meteor/aldeed:simple-schema';
import { Schemas } from '/imports/api/Schemas';

// Define the schema for the authorSample using SimpleSchema to Schemas (for reusability)
Schemas.AuthorSample = new SimpleSchema({ author: String });
