import { Meteor } from 'meteor/meteor';
import React from 'react';

export const Fallback = ({ msg = 'Loading...' }) => (
  <div className="fallback fadeInEffect">{msg}</div>
);
