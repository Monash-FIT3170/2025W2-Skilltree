import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { emailRegex, passwordRegex } from '/imports/api/Schemas';

//This is the Login React Component to handle user registration
export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /*
  Logging in with google, does not let us have access to their dateofbirth and other sensitive data.
  The user also misses out on creating a username.
  Default username is their id, however, it is not recommended to render database information to the public eye.
  Thus, we must ask for extra information.
  */
  const handleGoogleLogin = async e => {
    e.preventDefault();

    Meteor.loginWithGoogle(
      { loginStyle: 'popup', requestPermissions: ['email', 'profile'] },
      async err => {
        if (err) {
          console.error('Google login failed', err);
        } else {
          console.log('Logged in with Google successfully!');

          try {
            const user = Meteor.user();

            const validation = await Meteor.callAsync(
              'updateGoogleFields',
              user
            );
            console.log('Update result:', validation);

            navigate('/login/extraStep1');
          } catch (error) {
            console.error('Failed to update user fields:', error);
          }
        }
      }
    );
  };

  const handleFacebookLogin = async e => {
    e.preventDefault();

    Meteor.loginWithFacebook(
      { loginStyle: 'popup', requestPermissions: ['email', 'public_profile'] },
      async err => {
        if (err) {
          console.error('Facebook login failed', err);
        } else {
          console.log('Logged in with Facebook successfully!');

          try {
            const user = Meteor.user();
            const validation = await Meteor.callAsync('updateUserFields', user);
            console.log('Update result:', validation);

            navigate('/home');
          } catch (error) {
            console.error('Failed to update user fields:', error);
          }
        }
      }
    );
  };

  //Event listener: Clicking Login
  const handleLogin = async e => {
    e.preventDefault(); //no refreshing when submitting

    //Validate the email:
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    //Validate the password:
    if (!passwordRegex.test(password)) {
      setError(`Password is invalid:
        - Minimum 8 characters
        - Maximum 64 characters
        - Must include uppercase, lowercase, number, and special character`);
      return;
    }

    setLoggingIn(true);
    setError('');

    Meteor.loginWithPassword(email, password, error => {
      setLoggingIn(false);
      if (error) {
        setError(error.reason || 'Login failed.');
      } else {
        console.log('User logged in successfully');
        navigate('/home'); //should be changed to Dashboard
      }
    });
  };

  //

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9f8]">
      <div className="bg-[#efefef] p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome back to SkillTree
        </h2>

        <div className="w-full flex flex-col items-center gap-4">
          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center gap-3 px-6 py-3 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span className="text-base text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center gap-3 px-6 py-3 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <img
              src="/images/FacebookLogo.svg"
              alt="Facebook logo"
              className="w-5 h-5"
            />
            <span className="text-base text-gray-700 font-medium">
              Continue with Facebook
            </span>
          </button>
        </div>

        <div className="flex items-center my-5 w-full max-w-ws">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="px-3 text-gray-700 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
            className="w-full px-4 py-2 border border-green-800 rounded-full placeholder:text-gray-500"
          />

          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          {/*If showPassword=true, type=text, if showPassword=false, type=password  */}
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-green-800 rounded-full placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 hover:text-gray-800"
            >
              {/*Not sure how to get the popular "eye/closed eye icon. Need to import image*/}
              {showPassword ? '🔒' : '🔓'}
            </button>
          </div>
          <p className="text-xs underline">Forgot my password</p>

          <button
            type="submit"
            className="w-full bg-[#2f8760] hover:bg-[#256b4a] text-white font-bold py-2 rounded-full"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?
        </p>
        <Link
          to="/signup"
          className="block mt-2 w-full bg-[#007a75] hover:bg-[#005f5c] text-white font-bold py-2 rounded-full text-center"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};
