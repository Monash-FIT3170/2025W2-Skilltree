export const getDisplayName = (givenName, familyName, username) => {
  if (givenName && familyName) {
    return `${givenName} ${familyName}`;
  } else if (givenName) {
    return givenName;
  } else if (username) {
    return username;
  }
  return 'Unknown User';
};

export const getPrimaryEmail = emails => {
  return emails && emails.length > 0 ? emails[0].address : 'No email';
};
