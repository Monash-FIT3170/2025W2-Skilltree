// Regex
export const Regex = {
  _id: /^([a-f\d]{24}|[\w\d]{17})$/, // Regex for Mongo _id
  email: /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~^()_+=-])[A-Za-z\d@$!%*?&#~^()_+=-]{8,64}$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/
};
