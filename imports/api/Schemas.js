// The Schemas object allows for schema reuse across files by exporting it as a module
export const Schemas = {};

export const Regex = {
  _id: /^([a-f\d]{24}|[\w\d]{17})$/ // Regex for Mongo _id
};
