// The Schemas object allows for schema reuse across files by exporting it as a module
export const Schemas = {};

export const Regex = {
  _id: /^([a-f\d]{24}|[\w\d]{17})$/ // Regex for Mongo _id
};

export const emailRegex =
  /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~^()_+=-])[A-Za-z\d@$!%*?&#~^()_+=-]{8,64}$/;

export const userNameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

/*
-No fullnames has any digits
-Some fullnames have ' : Like Italian/Irish names --> O'Donnell, D'Ambrosio
-Some fullnames have - : Like Aubree-Rose
*/
export const fullNameRegex = /^[\p{L}'\- ]+$/u;
