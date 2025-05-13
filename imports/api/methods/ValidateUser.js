import { Meteor } from 'meteor/meteor';
import { Schemas } from '/imports/api/Schemas';

Meteor.methods({
  validateNewUser(userOptions) {
    //Validate the userOptions against our Users Schema
    console.log(userOptions);
    const userSchema = Schemas.User;

    if (!userSchema) {
      throw new Meteor.Error('schema-not-found', 'User Schema does not exist!');
    }

    //const validationContext = userSchema.newContext();
    //const isValid = validationContext.validate(userOptions);

    //TODO: NOT IMPLEMENTED YET

    return { success: true };
  }
});
