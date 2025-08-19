import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'flowbite-react';
import { CommunityLeaderboardList } from '/imports/ui/components/CommunityLeaderboardList';

/**
 * CommunityLeaderboardModal.jsx
 *
 * Renders a modal containing a leaderboard for a SkillTree
 * Child route of SkillTreeCommunityView.jsx
 *
 * @component
 * @example
 * // Example usage
 * <Link to="leaderboard" state={{ background: location}}> A link </Link>
 * <Outlet/>
 *
 * @returns Modal object which displays leaderboard
 */
export const CommunityLeaderboardModal = () => {
  // id from url
  const { id } = useParams();

  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  // Manage swapping between different leaderboard ordering metrics.
  // NOTE: All filters must come from the user profile, not the root-level user fields like username, email, password.
  const [filter, setFilter] = useState('xpTEMP');

  return (
    <Modal show={true} onClose={closeModal} dismissible size="7xl">
      <ModalHeader>
        <div className="flex flex-row items-center justify-between w-full">
          <span>Community Leaderboard</span>
          {/* TODO abstract this out into a separate component */}
          <div className="flex flex-row items-center justify-between px-4 gap-1">
            <Button
              color="green"
              onClick={() => setFilter('xpTEMP')}
              pill
              style={{
                backgroundColor: filter === 'xpTEMP' ? '#328E6E' : '#7eaa9b'
              }}
              className={`cursor-pointer text-lg font-bold text-white leading-none !font-sans flex items-center gap-3 px-6 py-3 rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0`}
            >
              Top XP
            </Button>
            <Button
              color="green"
              onClick={() => setFilter('_id')}
              pill
              style={{
                backgroundColor: filter === '_id' ? '#328E6E' : '#7eaa9b'
              }}
              className="cursor-pointer text-lg font-bold text-white leading-none !font-sans flex items-center gap-3 px-6 py-3 rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            >
              Top Commenters
            </Button>
          </div>
        </div>
      </ModalHeader>
      <ModalBody className="w-full h-full min-h-[70vh]">
        <div className="space-y-6">
          <CommunityLeaderboardList
            skillTreeId={id}
            filter={filter}
          ></CommunityLeaderboardList>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="green"
          onClick={closeModal}
          pill
          className="cursor-pointer position-relative text-lg font-bold mt-2 text-white font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
