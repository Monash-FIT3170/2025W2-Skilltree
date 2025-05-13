import {Meteor} from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'; //we are using Meteor's account-base package. It gives us the ability to create new users
import { Schemas } from '/imports/api/Schemas';

Meteor.methods({
    validateNewUser(userOptions) {

        //Validate the userOptions against our Users Schema
        const userSchema = Schemas.User; 
        console.log(Schemas.User);

        const validationContext = userSchema.newContext();
        validationContext.validate(userOptions);

        console.log(validationContext.validationErrors())

    

    }
})