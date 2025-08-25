import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'users.getById'(userId) {
    //check(userId, String);
    return Meteor.users.findOne(userId, {
      fields: {
        username: 1,
        emails: 1,
        profile: 1
      }
    });
  },

  'users.getMultipleByIds'(userIds) {
    //check(userIds, [String]);
    return Meteor.users
      .find(
        {
          _id: { $in: userIds }
        },
        {
          fields: {
            username: 1,
            emails: 1,
            profile: 1
          }
        }
      )
      .fetch();
  }
});
