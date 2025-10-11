import React from 'react';
import { AccountSetup } from '../layouts/Auth/AccountSetup';

export const CompleteProfile = () => (
  <AccountSetup currentStep={0} showStepBar={false} showFooter={false} />
);
