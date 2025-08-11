import React from 'react';

export const getGreetingMessage = () => {
  const currHour = new Date().getHours();
  switch (currHour) {
    case currHour >= 5 && currHour < 12:
      return 'Good morning';
    case currHour >= 12 && currHour < 17:
      return 'Good afternoon';
    case currHour >= 17 && currHour < 21:
      return 'Good evening';
    default:
      return 'Good night';
  }
};

export const getGreetingIcon = () => {
  const currHour = new Date().getHours();
  switch (currHour) {
    case currHour >= 5 && currHour < 12:
      return '🌅';
    case currHour >= 12 && currHour < 17:
      return '☀️';
    case currHour >= 17 && currHour < 21:
      return '🌆';
    default:
      return '🌙';
  }
};
