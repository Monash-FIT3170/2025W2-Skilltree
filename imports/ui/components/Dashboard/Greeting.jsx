import React from 'react';

const getGreeting = type => {
  const isIcon = type === 'icon';
  const currHour = new Date().getHours();

  const greeting = () => {
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

  return greeting();
};

export const getGreetingMessage = () => getGreeting('message');
export const getGreetingIcon = () => getGreeting('icon');
