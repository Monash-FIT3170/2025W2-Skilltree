import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async updateFields(user, updateFields) {
    const userID = user._id;

    return await Meteor.users.updateAsync(
      { _id: userID },
      { $set: updateFields }
    );
  }
});
