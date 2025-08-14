import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'flowbite-react';
import { CommunityLeaderboardList } from '/imports/ui/components/CommunityLeaderboardList';

export const CommunityLeaderboardModal = () => {
    console.log('hello world')

    // id from url
    const { id } = useParams();

    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1)
    }

  return (
    <Modal show={true} onClose={closeModal} dismissible>
    <ModalHeader>Community Leaderboard</ModalHeader>
      <ModalBody>
        <CommunityLeaderboardList skillTreeId = {id}></CommunityLeaderboardList>
      </ModalBody>
      <ModalFooter>
        <Button onClick={closeModal}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}
