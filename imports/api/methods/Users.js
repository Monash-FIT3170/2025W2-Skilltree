import {Meteor} from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'; //we are using Meteor's account-base package. It gives us the ability to create new users


Meteor.methods({
    createNewUser({userOptions}) {
        //Create the new Skill Tree User
        const userID = Accounts.createUser(userOptions, (err) =>{
            console.log(err)
            if (err) setError(err.reason);
            else setError('');
        });
        return userID;
    }
})