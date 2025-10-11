import React from 'react';

import { AccountSetup } from '/imports/ui/layouts/Auth/AccountSetup';

export const SignUp = () => (
  <AccountSetup
    showStepBar={true}
    currentStep={1}
    totalSteps={3}
    showFooter={true}
  />
);
