import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'flowbite-react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const UserList = ({ skillTreeId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [usernameList, setUsernameList] = useState([]);

  // Code to extract a skilltree from the database
  useSubscribe('skilltrees');
  const targetSkillTree = useFind(
    SkillTreeCollection,
    [
      {
        _id: {
          $eq: skillTreeId
        }
      },
      {
        fields: {
          subscribers: 1,
          title: 1
        }
      }
    ],
    [skillTreeId]
  )[0];

  const subscriberIds = targetSkillTree?.subscribers ?? [];

  useSubscribe('usernames', subscriberIds);
  const users = useFind(
    Meteor.users,
    [{ _id: { $in: subscriberIds } }, { fields: { username: 1, _id: 1 } }],
    [subscriberIds]
  );
  
  // Formatted as button, change if necessary
  return (
    <div className="flex flex-wrap items-start gap-2 w-15/100">
      <Button
        color="green"
        pill
        className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
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
              {users.map(user => {
                return <li key={user._id}>{String(user.username)}</li>;
              })}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="green"
            pill
            className="cursor-pointer position-relative text-lg font-bold mt-2 text-white leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            onClick={() => setOpenModal(false)}
          >
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
