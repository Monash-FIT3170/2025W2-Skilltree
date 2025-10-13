import React from 'react';
import { motion } from 'framer-motion';
import { AccountSetupBox } from '/imports/ui/layouts/Auth/AccountSetUpBox';
import { GetMissingGoogleFields } from '/imports/ui/components/SignUp/GetMissingGoogleFields';

export const CompleteProfile = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full"
      >
        <AccountSetupBox>
          <GetMissingGoogleFields />
        </AccountSetupBox>
      </motion.div>
    </div>
  );
};
