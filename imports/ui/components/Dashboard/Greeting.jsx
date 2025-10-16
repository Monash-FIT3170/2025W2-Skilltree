import { Meteor } from 'meteor/meteor';
import React from 'react';
import serialize from 'serialize-javascript';

const getGreeting = type => {
  const greeting = () => {
    const isIcon = type === 'icon';
    const currHour = new Date().getHours();

    if (currHour >= 5 && currHour < 12) {
      return isIcon ? '🌅' : 'Good morning';
    } else if (currHour >= 12 && currHour < 17) {
      return isIcon ? '☀️' : 'Good afternoon';
    } else if (currHour >= 17 && currHour < 21) {
      return isIcon ? '🌆' : 'Good evening';
    } else {
      return isIcon ? '🌙' : 'Good night';
    }
  };

  // Define client side inline script as literal string to inject before hydration, sanitised via serialize-javascript
  const inlineScript = `
    (function() {
      const script = document.currentScript; // Reference to this <script> element on the DOM
      
      // Set value before <script> using the client's browser time rather than the server's
      script && (script.before(
        (${serialize(greeting).replace('()=>', 'function() ').replace('type', serialize(type))})()
      ));
      
      // Remove itself <script> to clean up DOM and avoid hydration mismatch
      script && script.remove();
    })();
  `;

  return (
    <>
      {Meteor.isClient && greeting()}
      {Meteor.isServer && (
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      )}
    </>
  );
};

export const getGreetingMessage = () => getGreeting('message');
export const getGreetingIcon = () => getGreeting('icon');
