import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base'; //we are using Meteor's account-base package. It gives us the ability to create new users



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
    
  
    //Create the userOptions object
    //note the password hash is generated automatically on mongoDB and MeteorJS

    /*
    Required Fields in userOptions:
    -username
    -email
    -password
    -dateOfBirth
    */
    const userOptions = {
      username:username,
      emails:email,
      dateOfBirth: dateOfBirth,
      membership_tier: "normal",
      profile:{
        firstName: "Steven"
      }
    };

    //Debugging
    console.log(Accounts)
    console.log(userOptions)

        
    //Create the new Skill Tree User
    Accounts.createUser(userOptions, (err) =>{
      console.log(err)
      if (err) setError(err.reason);
      else setError('');
    });
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
