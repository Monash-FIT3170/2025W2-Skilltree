import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// JSX UI
import { CreateTreeForm } from '/imports/ui/components/CreateTreeForm';
import { SkillTreeEdit } from '../components/SkillTree';

export const CreateSkillTree = () => {
  const [showAddDetailsForm, setShowAddDetailsForm] = useState(true);
  const [showAddSkillsForm, setShowAddSkillsForm] = useState(false);
  const [skillTree, setSkillTree] = useState({
    title: '',
    //add image later
    description: '',
    tags: [],
    termsAndConditions: '',
    skillNodes: [],
    skillEdges: [],
    admins: [], //add the user who created the skill tree
    subscribers: []
  });

  const updateNodesAndEdges = ({ nodes, edges }) => {
    console.log(
      'updateNodesAndEdges called with nodes:',
      nodes,
      'and edges:',
      edges
    );
    const updatedSkillTree = {
      ...skillTree,
      skillNodes: nodes,
      skillEdges: edges
    };
    setSkillTree(updatedSkillTree);

    console.log('skillTreeBeforeInsert', updatedSkillTree);
    handleSaveSkillTree(updatedSkillTree);
  };

  useEffect(() => {
    console.log('Skill tree details', skillTree);
  }, [skillTree]);

  const handleOnAddSkills = (
    title,
    tags,
    description,
    termsAndConditions,
    image
  ) => {
    console.log(title, tags, description, termsAndConditions, image);
    setSkillTree(prev => ({
      ...prev,
      title: title,
      tags: tags,
      description: description,
      termsAndConditions: termsAndConditions,
      image: image
    }));

    setShowAddSkillsForm(true);
    setShowAddDetailsForm(false);
  };

  const handleOnBack = () => {
    setShowAddSkillsForm(false);
    setShowAddDetailsForm(true);
    console.log('back button clicked');
    console.log(showAddDetailsForm);
  };

  const handleSaveSkillTree = async skilltreeToSave => {
    try {
      await Meteor.callAsync('skilltrees.insert', skilltreeToSave);
      console.log('Skill Tree saved successfully');
    } catch (error) {
      console.error('Error saving skill tree:', error);
    }
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
            <SkillTreeEdit isAdmin={true} onSave={updateNodesAndEdges} />
            <button onClick={handleOnBack}> Back</button>
          </>
        )}
        <button onClick={handleSaveSkillTree}>Save SkillTree</button>
      </div>
    </>
  );
};
