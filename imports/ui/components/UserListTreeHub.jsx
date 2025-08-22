import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'flowbite-react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

export const UserListTreeHub = ({ skillTreeId }) => {
  useSubscribeSuspense('skilltrees', skillTreeId);
  const skillTrees = useFind(SkillTreeCollection, [
    { _id: { $eq: skillTreeId } }
  ]);
  const targetSkillTree = skillTrees?.[0];
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]); // [{ id, username }]

  // Stable list of subscriber IDs to trigger effect only when they genuinely change
  const subscriberIds = useMemo(
    () =>
      targetSkillTree?.subscribers ? [...targetSkillTree.subscribers] : [],
    [targetSkillTree?.subscribers]
  );

  useEffect(() => {
    let cancelled = false;

    const toUserEntry = async userId => {
      try {
        const user = await Meteor.callAsync('getUsers', userId);
        // If no user (dummy data), fall back to showing the ID as the name
        return { id: userId, username: user?.username ?? userId };
      } catch (e) {
        console.error('getUsers failed for', userId, e);
        return { id: userId, username: userId };
      }
    };

    const load = async () => {
      if (!subscriberIds.length) {
        setUsers([]);
        return;
      }
      const results = await Promise.all(subscriberIds.map(toUserEntry));
      if (!cancelled) setUsers(results);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [subscriberIds]);

  const handleRemoved = useCallback(removedId => {
    setUsers(prev => prev.filter(u => u.id !== removedId));
  }, []);

  if (!targetSkillTree) return null;

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
            {users.length === 0 ? (
              <p className="text-sm text-gray-500">No users subscribed.</p>
            ) : (
              <ul className="space-y-2">
                {users.map(({ id, username }) => (
                  <li
                    key={id}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <span className="truncate">{String(username)}</span>
                    <RemoveUserButton
                      userId={id}
                      skillTreeId={skillTreeId}
                      onRemoved={handleRemoved}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="green"
            pill
            className="cursor-pointer position-relative text-lg font-bold mt-2 text-white font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            onClick={() => setOpenModal(false)}
          >
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
