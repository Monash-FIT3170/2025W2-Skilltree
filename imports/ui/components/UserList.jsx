import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';


import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

export const UserList = ({ skillTreeId }) => {
  useSubscribeSuspense('skilltrees',skillTreeId);
  const skillTrees = useFind(SkillTreeCollection,[{_id: {$eq: skillTreeId}}])
  const targetSkillTree = skillTrees[0]
  const [openModal, setOpenModal] = useState(false);

  // Formatted as button, change if necessary
  return (
    <div className='flex flex-wrap items-start gap-2 w-15/100'>
      <Button color="green" pill className="w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0" onClick={() => setOpenModal(true)}>User List</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="text-xl font-bold mt-2">List of users for {targetSkillTree.title}</ModalHeader>
        <ModalBody className="text-lg mt-2">
          <div>
            <ul>
              {targetSkillTree.subscribers.map(user => (
                <li>
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="green" pill className="position-relative text-lg font-bold mt-2 text-white font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0" onClick={() => setOpenModal(false)}>Exit</Button>
        </ModalFooter>
      </Modal>
    </div>

    // <div className="relative inline-block">
    //   <button
    //     id="multiLevelDropdownButton"
    //     data-dropdown-toggle="dropdown"
    //     className="text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e]"
    //     type="button"
    //   >
    //     User List
    //     <svg
    //       className="w-2.5 h-2.5 ms-3"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 10 6"
    //     >
    //       <path
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="m1 1 4 4 4-4"
    //       />
    //     </svg>
    //   </button>
    //   <div
    //     id="dropdown"
    //     className=" z-10 hidden divide-y rounded-lg relative overflow-x-auto"
    //   >
    //     <ul className="hover:{bg-328E6E} text-left font-semibold leading-none !font-sans">
    //       {subscribers.map(userId => (
    //         <li className="px-6 font-semibold leading-none !font-sans">
    //           {userId} - {getUserInfo(userId.username)} -{' '}
    //           {getUserInfo(userId.emails[0])}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
};
