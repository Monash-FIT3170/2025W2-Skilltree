import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// JSX UI
import { CreateForestForm } from '/imports/ui/components/SkillForestComponents/CreateForestForm';

export const CreateSkillForest = () => {
  return (
    <>
      <CreateForestForm />
    </>
  );
};
