export const emailRegex =
  /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~^()_+=-])[A-Za-z\d@$!%*?&#~^()_+=-]{8,64}$/;

export const userNameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
