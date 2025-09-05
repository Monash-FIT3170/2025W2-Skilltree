export const userUtils = {
  getInitials(user) {
    const givenName = user.profile?.givenName || '';
    const familyName = user.profile?.familyName || '';

    if (givenName && familyName) {
      return (givenName[0] + familyName[0]).toUpperCase();
    } else if (givenName) {
      return givenName[0].toUpperCase();
    } else if (user.username) {
      return user.username[0].toUpperCase();
    }
    return '?';
  },
  getDisplayName(user) {
    if (user.profile?.givenName && user.profile?.familyName) {
      return `${user.profile.givenName} ${user.profile.familyName}`;
    } else if (user.profile?.givenName) {
      return user.profile.givenName;
    } else if (user.username) {
      return user.username;
    }
    return 'Unknown User';
  },
  getPrimaryEmail(user) {
    return user.emails && user.emails.length > 0
      ? user.emails[0].address
      : 'No email';
  }
};
