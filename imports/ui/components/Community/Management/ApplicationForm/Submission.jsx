import React from 'react';
import { motion } from 'framer-motion';

import { FiCheck } from '@react-icons/all-files/fi/FiCheck';

export const SubmittedRoleApplication = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl p-12 text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-[#04BF8A] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FiCheck className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your interest. We'll review your application and get
          back to you soon.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.history.back()}
          className="bg-[#04BF8A] hover:bg-[#025940] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
        >
          Back to Community
        </motion.button>
      </motion.div>
    </div>
  );
};
