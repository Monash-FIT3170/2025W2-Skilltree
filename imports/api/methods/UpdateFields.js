import { Meteor } from 'meteor/meteor';

/*

To update only profile.dateOfBirth, without replacing the whole profile object, you must use dot notation:
Meteor.users.update(userId, {
  $set: {
    'profile.dateOfBirth': newDate
  }
});

Dont do this:
profile: {
    dateOfBirth: '2001-01-01'
}
    Otherwise, you replace the entire profile object :)
 */

Meteor.methods({
  async updateFields(updateFields) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised', 'User must be logged in first!');
    }

    return await Meteor.users.updateAsync(
      { _id: this.userId },
      { $set: updateFields }
    );
  }
});
