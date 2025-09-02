import { Meteor } from 'meteor/meteor';
import React from 'react';

export const Fallback = ({
  msg = `Loading... ${Meteor.settings.public.enableSSR ? '(refresh page if stuck)' : ''}`
}) => <div className="fallback fadeInEffect">{msg}</div>;
