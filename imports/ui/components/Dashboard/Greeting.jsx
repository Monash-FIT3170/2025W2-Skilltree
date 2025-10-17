import { Meteor } from 'meteor/meteor';
import React from 'react';
import { injectPreHydration } from '/imports/utils/PreHydration';

const getGreeting = type =>
  injectPreHydration(
    () => {
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
    },
    { type }, // pass unscoped variables dependencies on function serialization
    true // wrapSpan
  );

export const getGreetingMessage = () => getGreeting('message');
export const getGreetingIcon = () => getGreeting('icon');
