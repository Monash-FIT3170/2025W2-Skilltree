import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';

// JSX UI
import { CreateForestForm } from '/imports/ui/components/SkillForest/CreateForestForm';
import { SelectSkillTrees } from '../layouts/SelectSkillTrees';
import { SkillForestPopup } from '../components/SkillForest/SkillForestPopup';

import { ToastContainer, toast, Flip } from 'react-toastify';

export const CreateSkillForest = () => {
  // for popup
  const [showPopup, setShowPopup] = useState(false);
  // for selected skilltrees
  const [selectedSkillTrees, setSelectedSkillTrees] = useState([]);
  // state for form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // confirm creating a skillforest
  const handleConfirm = () => {
    const skillforestToSave = {
      title: formTitle || '',
      description: formDescription || '',
      skilltreeIds: selectedSkillTrees.map(tree => tree._id) //<-- only the IDs
    };

    Meteor.call(
      'insertSkillforest',
      skillforestToSave,
      (err, newSkillForestId) => {
        if (err) {
          //console.error('Error creating SkillForest:', err);
          toast.error('Failed to create SkillForest');
        } else {
          // Update user's createdCommunities
          Meteor.call(
            'updateUserCreatedCommunities',
            newSkillForestId,
            error => {
              if (error) {
                toast.error('Failed to update user communities');
              } else {
                toast.success('SkillForest created successfully!');
                setShowPopup(false);
              }
            }
          );
        }
      }
    );
  };

  const handleOpenPopup = selectedTrees => {
    const form = document.getElementById('skillForestForm');

    // Only triggers error messages here
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSelectedSkillTrees(selectedTrees);
    setShowPopup(true);
  };

  return (
    <>
      <form id="skillForestForm" noValidate>
        <CreateForestForm
          onChange={(title, description) => {
            setFormTitle(title);
            setFormDescription(description);
          }}
        />
      </form>
      <SelectSkillTrees
        onOpenPopup={selectedSkillTrees => handleOpenPopup(selectedSkillTrees)}
      />
      {showPopup && (
        <SkillForestPopup
          skillForestTitle={formTitle}
          skillForestDescription={formDescription}
          selectedSkillTrees={selectedSkillTrees}
          onConfirm={() => handleConfirm()}
          onClose={() => setShowPopup(false)}
        />
      )}
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
