import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { CreateTreeForm } from '/imports/ui/components/CreateTreeForm';
import { SkillTreeEdit } from '../components/SkillTree';

export const CreateSkillTree = () => {
  const [showAddDetailsForm, setShowAddDetailsForm] = useState(true);
  const [showAddSkillsForm, setShowAddSkillsForm] = useState(false);

  const handleOnAddSkills = () => {
    setShowAddSkillsForm(true);
    setShowAddDetailsForm(false);
    console.log('Add Skills Clicked');
  };

  const handleOnBack = () => {
    setShowAddSkillsForm(false);
    setShowAddDetailsForm(true);
    console.log('back button clicked');
    console.log(showAddDetailsForm);
  };

  return (
    <>
      <Helmet></Helmet>
      <div className="p-2">
        {/* Conditionally render create tree form */}
        {showAddDetailsForm && (
          <CreateTreeForm onAddSkills={handleOnAddSkills} />
        )}
        {/* Conditionally render add skills form */}
        {showAddSkillsForm && (
          <>
            <SkillTreeEdit isAdmin={true} />
            <button onClick={handleOnBack}> Back</button>
          </>
        )}
      </div>
    </>
  );
};
