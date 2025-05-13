import { Meteor } from 'meteor/meteor';

Meteor.methods ({

    async updateUserFields(userID, updateFields){
    
        //This returns the number of documeets modified = 1
        return await Meteor.users.updateAsync(
            { _id: userID},
            {$set: updateFields},
        )
    }
})