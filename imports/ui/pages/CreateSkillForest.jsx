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

    /*console.log('SkillForest to save:', {
      title: formTitle,
      description: formDescription,
      skilltreeIds: selectedSkillTrees.map(tree => tree._id)
    });*/

    Meteor.call('insertSkillforest', skillforestToSave, (err, res) => {
      if (err) {
        //console.error('Error creating SkillForest:', err);
        toast.error('Failed to create SkillForest');
      } else {
        //console.log('SkillForest created with ID:', res);
        toast.success('SkillForest created successfully!');
        setShowPopup(false);
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }
    // If form is valid -> popup will open when user selects skilltrees
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CreateForestForm
          onChange={(title, description) => {
            setFormTitle(title);
            setFormDescription(description);
          }}
        />
        <SelectSkillTrees
          onOpenPopup={selectedSkillTrees => {
            if (!formTitle.trim() || !formDescription.trim()) {
              // This will trigger built-in validation messages
              document.querySelector('form').reportValidity();
              return;
            }
            setSelectedSkillTrees(selectedSkillTrees);
            setShowPopup(true);
          }}
        />
      </form>

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
