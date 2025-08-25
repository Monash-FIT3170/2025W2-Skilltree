import React from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// JSX UI
import { CreateForestForm } from '/imports/ui/components/SkillForest/CreateForestForm';
import { SelectSkillTrees } from '../layouts/SelectSkillTrees';

export const CreateSkillForest = () => {
  return (
    <>
      <CreateForestForm />
      <SelectSkillTrees />
    </>
  );
};
