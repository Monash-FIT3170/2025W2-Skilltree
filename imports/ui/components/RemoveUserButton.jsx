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

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

/** Small red remove button */
const RemoveUserButton = ({ userId, skillTreeId, onRemoved }) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      await Meteor.callAsync('skilltrees.unsubscribeUser', skillTreeId, userId);
      onRemoved?.(userId);
    } catch (error) {
      console.error(error);
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
