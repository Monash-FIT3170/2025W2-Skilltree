import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// JSX UI
import { CreateTreeForm } from '../components/SkillTrees/CreateTreeForm';
import { SkillTreeEdit } from '../components/SkillTrees/SkillTree';
import { ToastContainer, toast, Flip } from 'react-toastify';
// import { update } from 'lodash';
//import { useNavigate } from 'react-router-dom';

export const CreateSkillTree = () => {
  //Current user id logged in
  const userId = useContext(AuthContext); // Reactive when value changes
  //const navigate = useNavigate();
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
      let skillTreeId = skillTree._id;

      if (!skillTreeId) {
        // First save: insert new SkillTree
        const newSkillTreeId = await Meteor.callAsync(
          'skilltrees.insert',
          skilltreeToSave
        );
        // Store the new ID
        setSkillTree(prev => ({ ...prev, _id: newSkillTreeId }));
        skillTreeId = newSkillTreeId;

        //Update the owner's created communities list
        await Meteor.callAsync('updateCreatedCommunities', skillTreeId);
        //Update the owner's subscribed communities list
        await Meteor.callAsync('updateSubscribedCommunities', skillTreeId);
        //Add skilltree progress --> this will execute the else condition
        await Meteor.callAsync('saveSubscription', skillTreeId);
        //Add Admin role
        await Meteor.callAsync('updateSkillTreeProgress', skillTreeId, userId, {
          $addToSet: { roles: 'admin' }
        });

        // Add admin role
        toast.success('Successfully created SkillTree!');
      } else {
        // Subsequent saves: update existing SkillTree
        const updateData = { ...skilltreeToSave };
        console.log('Updating with data:', updateData);

        await Meteor.callAsync('skilltrees.update', skillTreeId, updateData);

        // Update local state
        setSkillTree(prev => ({
          ...prev,
          ...updateData,
          updatedAt: new Date()
        }));
        // await Meteor.callAsync('updateCreatedCommunities', skillTreeId);
        // await Meteor.callAsync('updateSubscribedCommunities', skillTreeId);
        await Meteor.callAsync('saveSubscription', skillTreeId);
        console.log('SkillTree updated successfully');
        toast.success('SkillTree updated!');
      }
    } catch (error) {
      console.error('Error saving skill tree:', error);
      toast.error('Error saving SkillTree!');
    }
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
            {console.log('Skilltree found and loaded')}
            {/* {console.log(skilltreeToSave)} */}
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
            {console.log('0 Skill tree found')}
            {/* {console.log(skilltreeToSave)} */}
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
