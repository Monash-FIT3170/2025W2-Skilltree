import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// JSX UI
import { CreateForestForm } from '/imports/ui/components/SkillForest/CreateForestForm';
import { SelectSkillTrees } from '../layouts/SelectSkillTrees';
import { SkillForestPopup } from '../components/SkillForest/SkillForestPopup';

export const CreateSkillForest = () => {
  // for popup
  const [showPopup, setShowPopup] = useState(false);
  // for selected skilltrees
  const [selectedSkillTrees, setSelectedSkillTrees] = useState([]);
  // state for form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  return (
    <>
      <CreateForestForm
        onChange={(title, description) => {
          setFormTitle(title);
          setFormDescription(description);
        }}
      />
      <SelectSkillTrees
        onOpenPopup={selectedSkillTrees => {
          setSelectedSkillTrees(selectedSkillTrees);
          setShowPopup(true);
        }}
      />

      {showPopup && (
        <SkillForestPopup
          skillForestTitle={formTitle}
          skillForestDescription={formDescription}
          selectedSkillTrees={selectedSkillTrees}
          onConfirm={() => {
            console.log('Confirmed SkillForest:', selectedSkillTrees);
            setShowPopup(false);
          }}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};
