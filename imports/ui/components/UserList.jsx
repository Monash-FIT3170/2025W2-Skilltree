import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'flowbite-react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const UserList = ({ skillTreeId }) => {
  useSubscribeSuspense('skilltrees', skillTreeId);
  const skillTrees = useFind(SkillTreeCollection, [
    { _id: { $eq: skillTreeId } }
  ]);
  const targetSkillTree = skillTrees[0];
  const [openModal, setOpenModal] = useState(false);

  // Formatted as button, change if necessary
  return (
    <div className="flex flex-wrap items-start gap-2 w-15/100">
      <Button
        color="green"
        pill
        className="w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
        onClick={() => setOpenModal(true)}
      >
        User List
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="text-xl font-bold mt-2">
          List of users for {targetSkillTree.title}
        </ModalHeader>
        <ModalBody className="text-lg mt-2">
          <div>
            <ul>
              {targetSkillTree.subscribers.map(user => (
                <li>{user}</li>
              ))}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="green"
            pill
            className="position-relative text-lg font-bold mt-2 text-white font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            onClick={() => setOpenModal(false)}
          >
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
