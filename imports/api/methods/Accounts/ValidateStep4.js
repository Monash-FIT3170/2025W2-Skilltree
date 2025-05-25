import { Meteor } from 'meteor/meteor';
import {} from '/imports/api/Schemas';

Meteor.methods({
  async validateStep4(userOptions) {
    console.log(userOptions);

    return { success: true };
  }
});
