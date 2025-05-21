import React from 'react';

export const Fallback = ({ msg = 'Loading... (refresh page if stuck)' }) => (
  <div className="fallback">{msg}</div>
);
