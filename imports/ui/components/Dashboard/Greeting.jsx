import React from 'react';

export const getGreetingMessage = () => {
  const currHour = new Date().getHours();

  if (currHour >= 5 && currHour < 12) {
    return 'Good morning';
  } else if (currHour >= 12 && currHour < 17) {
    return 'Good afternoon';
  } else if (currHour >= 17 && currHour < 21) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};

export const getGreetingIcon = () => {
  const currHour = new Date().getHours();

  if (currHour >= 5 && currHour < 12) {
    return '🌅';
  } else if (currHour >= 12 && currHour < 17) {
    return '☀️';
  } else if (currHour >= 17 && currHour < 21) {
    return '🌆';
  } else {
    return '🌙';
  }
};
