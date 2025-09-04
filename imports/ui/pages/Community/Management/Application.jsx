import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { FiAlertCircle } from '@react-icons/all-files/fi/FiAlertCircle';
import { ImExit } from '@react-icons/all-files/im/ImExit';

import { SubmittedRoleApplication } from '/imports/ui/components/Community/Management/ApplicationForm/Submission';
import { User } from '/imports/utils/User';
import { ApplicationTimeline } from '/imports/ui/components/Community/Management/ApplicationForm/ApplicationTimeline';

export const Application = () => {
  //Current userid logged in
  const user = User(['_id', 'emails', 'username']);

  const { id: skilltreeID } = useParams();
  const navigate = useNavigate();

  const [applicationType, setApplicationType] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [motivation, setMotivation] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!applicationType) {
      newErrors.applicationType = 'Please select an application type';
    }

    if (!qualifications.trim()) {
      newErrors.qualifications = 'Please describe your qualifications';
    }

    if (!motivation.trim()) {
      newErrors.motivation = 'Please explain your motivation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = {
      userId: user._id,
      username: user.username,
      email: user.emails.at(0).address,
      applicationType: applicationType,
      status: 'pending',
      skillTreeId: skilltreeID,
      qualifications: qualifications,
      motivation: motivation
    };

    //Add the application to the roleApplications collection
    await Meteor.callAsync('addToRoleApplicationQueue', formData);

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SubmittedRoleApplication />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(`/skilltree/${skilltreeID}`)}
          className="flex items-center gap-2 cursor-pointer hover:underline"
        >
          <ImExit className="w-4 h-4" />
          <span> Go Back to SkillTree</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 items-start mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/*Application timeline */}
            <ApplicationTimeline />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg"
            >
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Community Application
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Apply to become a moderator or expert in our SkillTree
                    community
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Application Type Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Application Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setApplicationType('moderator')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          applicationType === 'moderator'
                            ? 'border-[#04BF8A] bg-[#04BF8A]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              applicationType === 'moderator'
                                ? 'text-[#025940]'
                                : 'text-gray-700'
                            }`}
                          >
                            Moderator
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Help maintain community standards
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setApplicationType('expert')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          applicationType === 'expert'
                            ? 'border-[#04BF8A] bg-[#04BF8A]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              applicationType === 'expert'
                                ? 'text-[#025940]'
                                : 'text-gray-700'
                            }`}
                          >
                            Expert
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Share knowledge and mentor others
                        </p>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {errors.applicationType && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-sm text-red-600"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          <span>{errors.applicationType}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Qualifications Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="qualifications"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Qualifications
                    </label>
                    <div className="relative">
                      <textarea
                        id="qualifications"
                        placeholder={`Describe your relevant experience, skills, and background that make you a good fit for this ${applicationType || 'role'}...`}
                        value={qualifications}
                        onChange={e => setQualifications(e.target.value)}
                        rows={4}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white resize-none ${
                          errors.qualifications
                            ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                            : qualifications && !errors.qualifications
                              ? 'border-emerald-300 bg-emerald-50/50 focus:ring-emerald-100'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                        required
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {qualifications.length}/500
                      </div>
                    </div>

                    <AnimatePresence>
                      {errors.qualifications && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-sm text-red-600"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          <span>{errors.qualifications}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Motivation Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="motivation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Motivation
                    </label>
                    <div className="relative">
                      <textarea
                        id="motivation"
                        placeholder={`Why do you want to become a ${applicationType || 'community member'}? How will you contribute to our community?`}
                        value={motivation}
                        onChange={e => setMotivation(e.target.value)}
                        rows={4}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#04BF8A]/20 focus:border-[#04BF8A] focus:bg-white resize-none ${
                          errors.motivation
                            ? 'border-red-300 bg-red-50/50 focus:ring-red-100'
                            : motivation && !errors.motivation
                              ? 'border-emerald-300 bg-emerald-50/50 focus:ring-emerald-100'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                        required
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {motivation.length}/500
                      </div>
                    </div>

                    <AnimatePresence>
                      {errors.motivation && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-sm text-red-600"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          <span>{errors.motivation}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#04BF8A] hover:bg-[#025940] shadow-lg hover:shadow-xl active:shadow-md'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      `Submit ${applicationType ? applicationType.charAt(0).toUpperCase() + applicationType.slice(1) : ''} Application`
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
