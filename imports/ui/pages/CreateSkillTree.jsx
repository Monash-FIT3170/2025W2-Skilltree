import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// JSX UI
import { CreateTreeForm } from '../components/SkillTrees/CreateTreeForm';
import { SkillTreeEdit } from '../components/SkillTrees/SkillTree';
import { ToastContainer, toast, Flip } from 'react-toastify';

export const CreateSkillTree = () => {
  //Current user id logged in
  const userId = useContext(AuthContext); // Reactive when value changes

  const [showAddDetailsForm, setShowAddDetailsForm] = useState(true);
  const [showAddSkillsForm, setShowAddSkillsForm] = useState(false);
  const [skillTree, setSkillTree] = useState({
    title: '',
    owner: userId,
    //add image later
    description: '',
    tags: [],
    termsAndConditions: '',
    skillNodes: [],
    skillEdges: [],
    admins: [], // TO DO: add the user who created the skill tree
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

  const handleOnBack = (nodes, edges) => {
    // set the skilltree nodes and edges
    setSkillTree(prev => ({
      ...prev,
      skillNodes: nodes,
      skillEdges: edges
    }));

    setShowAddSkillsForm(false);
    setShowAddDetailsForm(true);
    console.log('back button clicked');
    console.log(showAddDetailsForm);
  };

  const handleSaveSkillTree = async skilltreeToSave => {
    try {
      //Insert the new skilltree into the collection
      const skillTreeId = await Meteor.callAsync(
        'skilltrees.insert',
        skilltreeToSave
      );

      //Update the owner's created communities list
      await Meteor.callAsync('updateCreatedCommunities', skillTreeId);
      //Update the owner's subscribed communities list
      await Meteor.callAsync('updateSubscribedCommunities', skillTreeId);

      console.log('Skill Tree saved successfully');
    } catch (error) {
      console.error('Error saving skill tree:', error);
    }
    // Show confirmation popup
    toast.success('Successfully created SkillTree!');
  };

  return (
    <>
      <Helmet></Helmet>
      <div className="p-2">
        {/* Conditionally render create tree form */}
        {showAddDetailsForm && (
          <CreateTreeForm
            onAddSkills={handleOnAddSkills}
            initialValues={{
              title: skillTree.title,
              tags: skillTree.tags,
              description: skillTree.description,
              tsandcs: skillTree.termsAndConditions,
              image: skillTree.image,
              previewImage: skillTree.previewImage
            }}
          />
        )}
        {/* Conditionally render add skills form, Only pass nodes and edges if they exist*/}
        {showAddSkillsForm && skillTree.skillNodes.length > 0 && (
          <>
            <SkillTreeEdit
              isAdmin={true}
              onSave={updateNodesAndEdges}
              savedNodes={skillTree.skillNodes}
              savedEdges={skillTree.skillEdges}
              onBack={handleOnBack}
            ></SkillTreeEdit>
          </>
        )}
        {showAddSkillsForm && skillTree.skillNodes.length == 0 && (
          <>
            <SkillTreeEdit
              isAdmin={true}
              onSave={updateNodesAndEdges}
              onBack={handleOnBack}
            ></SkillTreeEdit>
          </>
        )}
      </div>
      {/* For pop up notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </>
  );
};
