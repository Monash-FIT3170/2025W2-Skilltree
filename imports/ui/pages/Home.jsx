import React from 'react';
import { Helmet } from 'react-helmet';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

/*
1. Use GoogleLogin and GoogleAuthProvider
In the credentialResponse, there is a specific useful field called 'credential'.

- It’s a JWT string (a long base64-encoded token).
- This token contains information about the user who just signed in with Google.
- Proves that the user has logged in successfully
- we need to exract the email,name, google ID etc......

To decode the credential, we use a decoder
*/

/*
2. Use Meteor Login with google
- requestPermissions: Grants access to either the user's email , profile or openid
- cannot access services.google on client side since it has sensitive data
- Update email on server side


*/

export const Home = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async e => {
    e.preventDefault();

    Meteor.loginWithGoogle(
      { requestPermissions: ['email', 'profile'] },
      async err => {
        if (err) {
          console.error('Google login failed', err);
        } else {
          console.log('Logged in with Google successfully!');

          try {
            const user = Meteor.user();
            const validation = await Meteor.callAsync('updateUserFields', user);
            console.log('Update result:', validation); // 1 if update successful

            navigate('/signup');
          } catch (error) {
            console.error('Failed to update user fields:', error);
          }
        }
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>SkillTree - Sign Up</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-6">Sign Up with Google</h1>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
        >
          Sign Up with Google
        </button>
      </div>
    </>
  );
};
