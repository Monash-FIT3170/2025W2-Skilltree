import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

// Import Context
import { FromUrlContext } from '/imports/utils/contexts/FromUrlContext';

// Create Provider
export const FromUrlProvider = ({ children }) => {
  const [fromUrl, setFromUrl] = useState('/');
  return (
    <FromUrlContext.Provider value={[fromUrl, setFromUrl]}>
      {children}
    </FromUrlContext.Provider>
  );
};
