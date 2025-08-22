import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal } from 'flowbite-react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

const AssignRoleButton = ({ userId, skillTreeId, onRemoved }) => {
  const [assigning, setAssigning] = useState(false);

  const handleAssigning = async () => {
    if (assigning) return;
    setAssigning(true);
    try {
      await Meteor.callAsync('skilltrees.unsubscribeUser', skillTreeId, userId);
      onRemoved?.(userId);
    } catch (err) {
      console.error(err);
      console.log('Unable to remove the user.');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Button
      color="failure"
      pill
      size="xs"
      onClick={handleAssigning}
      disabled={assigning}
      className="!py-1 !px-2 ml-2"
      title="Remove user"
    >
      {assigning ? 'Removing…' : 'Remove'}
    </Button>
  );
};

const RemoveUserButton = ({ userId, skillTreeId, onRemoved }) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      await Meteor.callAsync('skilltrees.unsubscribeUser', skillTreeId, userId);
      onRemoved?.(userId);
    } catch (err) {
      console.error(err);
      console.log('Unable to remove the user.');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <Button
      color="failure"
      pill
      size="xs"
      onClick={handleRemove}
      disabled={removing}
      className="!py-1 !px-2 ml-2"
      title="Remove user"
    >
      {removing ? 'Removing…' : 'Remove'}
    </Button>
  );
};

export const UserListTreeHub = ({ skillTreeId }) => {
  useSubscribeSuspense('skilltrees', skillTreeId);
  const skillTrees = useFind(SkillTreeCollection, [
    { _id: { $eq: skillTreeId } }
  ]);
  const targetSkillTree = skillTrees?.[0];

  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]); // [{ id, username }]

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

  // Don’t render anything until the doc is ready
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
        {/* Header */}
        <div className="px-6 pt-6">
          <h3 className="text-xl font-bold mt-2">
            List of users for {targetSkillTree.title}
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-4 text-lg">
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

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 pb-6 border-t">
          <Button
            color="green"
            pill
            className="cursor-pointer text-lg font-bold mt-2 text-white !font-sans px-6 py-3 bg-[#328E6E] rounded-[22px] hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            onClick={() => setOpenModal(false)}
          >
            Exit
          </Button>
        </div>
      </Modal>
    </div>
  );
};
