import React, { useState } from 'react';
import { Schemas } from '/imports/api/Schemas';
import '/imports/api/schemas/Users';




//This is the SignUp React Component to handle user registration
export const SignUp = () => {

  //Initialise state variables: const [state, setState] = useState(initialState)
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[repeatPass, setRepeatPass] = useState('');
  const [dateOfBirth, setDOB] = useState('');
  const [valid, setValid] = useState(''); //Stoes any validation message
  const [error, setError] = useState(''); //This is to store any error messages when validating the account
  
  
  //Event listener: Clicking Sign Up
  const handleSignUp = (e) =>{

    e.preventDefault(); //no refreshing when submitting


    //Note: Meteor by default restricts what user fields are published to the client.
    //We can actually override this with a Meteor.publish
    //However, this is not good practice apparently
    //Instead, we can just include every custom field inside profile
    const userOptions = {
        username: username,
        email,
        password: password,
        profile:{
          profileID:'Nothing Yet'
        }
    };

    //Validate the userOptions against our Users Schema
    const userSchema = Schemas.Users; 
    const validationContext = userSchema.newContext();
    validationContext.validate(userOptions);

    console.log(validationContext.validationErrors())



  
    Meteor.call('createNewUser', {
      userOptions
    }, (error, res) => {

      if(error) setError(error.reason);

      else{

        setError('');
        console.log("User has been created with ID: ", res);

        const userProfileOptions = {
          userId: res,
          firstName: "Steven",
          lastName: "Kaing",
          avatarURL:'https://example.com/avatar.jpg',
          bio: 'This is my bio guys!',
          dateOfBirth: new Date(dateOfBirth),
          roles: ['user'],
          membership_tier: 'Community',
          subscribedCommunities: [],
          friends: [],
          skillForests: [],
          proof_of_practice_uploads: [],
          expertise_areas: [],
          isActive:true,
          createdAt: new Date(),
        }

        Meteor.call('createUserProfile',res,userProfileOptions, (profileError, profileRes) =>{

          if (profileError){
            console.error("Error Creating User Profile: ", profileError)
          } else{
            console.log("New Profile was created with userProfileID: ", profileRes)
          }
        });
      }
    })
  }

  //

  return (
    // className used to apply CSS classes to elements
    <form onSubmit={handleSignUp} className="max-w-sm mx-auto mt-8 space-y-4">


      <h2 className="text-x1 font-bold">Create Your Account</h2>
      {error && <p className="text-red-500">{error}</p>}

     
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required className="w-full p-2 border"></input>
      <input type="username" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required className="w-full p-2 border" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border" />
      <input type="password" value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} placeholder="Repeat Password" required className="w-full p-2 border" />
      <input type="date" value={dateOfBirth} onChange={(e) => setDOB(e.target.value)} placeholder="DD/MM/YYYY" required className="w-full p-2 border" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>

    </form>

  )







};
