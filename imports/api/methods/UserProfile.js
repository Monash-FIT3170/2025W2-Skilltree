import {Meteor} from 'meteor/meteor'

import { UsersProfileCollection } from '/imports/api/collections/UserProfile';

Meteor.methods({

    async createUserProfile(userID, userProfileOptions){

        //Insert the profile into the collection
        const profileID = await UsersProfileCollection.insertAsync(userProfileOptions);

        return profileID;
    }
})