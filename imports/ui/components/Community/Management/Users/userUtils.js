export const getDisplayName = user => {
  if (user.profile?.givenName && user.profile?.familyName) {
    return `${user.profile.givenName} ${user.profile.familyName}`;
  } else if (user.profile?.givenName) {
    return user.profile.givenName;
  } else if (user.username) {
    return user.username;
  }
  return 'Unknown User';
};

export const getPrimaryEmail = user => {
  return user.emails && user.emails.length > 0
    ? user.emails[0].address
    : 'No email';
};
