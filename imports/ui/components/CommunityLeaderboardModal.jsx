import React , {Suspense} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'flowbite-react';
import { CommunityLeaderboardList } from '/imports/ui/components/CommunityLeaderboardList';
import { Fallback } from '/imports/ui/components/Fallback';

export const CommunityLeaderboardModal = () => {
    // id from url
    const { id } = useParams();

    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1)
    }

  return (
    <div>
      <Modal 
        show={true} 
        onClose={closeModal} 
        dismissible
        size="7xl"
      >
        <ModalHeader>Community Leaderboard</ModalHeader>
        <ModalBody>
            <CommunityLeaderboardList skillTreeId = {id}></CommunityLeaderboardList>
        </ModalBody>
        <ModalFooter>
          <Button 
            color = "green"
            onClick={closeModal}
            pill
            className="cursor-pointer position-relative text-lg font-bold mt-2 text-white font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            >
              Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}