import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base'; //we are using Meteor's account-base package. It gives us the ability to create new users



//This is the SignUp React Component to handle user registration
export const SignUp = () => {

  //Initialise state variables: const [state, setState] = useState(initialState)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [valid, setValid] = useState(''); //Stoes any validation message
  const [error, setError] = useState(''); //This is to store any error messages when validating the account
  
  
  //Event listener: Clicking Sign Up
  const handleSignUp = (e) =>{
    e.preventDefault(); //no refreshing when submitting
    console.log("fijrgi")
    
    //note the password hash is generated automatically
    const userOptions = {
      username:"Example223232",
      email:email,
      password: password,
      profile: {
        name: 'Steven Kaing',
      }
    };

    console.log(Accounts)
    console.log(userOptions)


    

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

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required className="w-full p-2 border"></input>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>

    </form>

  )







};
