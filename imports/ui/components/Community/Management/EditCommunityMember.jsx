import React, { useMemo, useState, useEffect, useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiStar } from '@react-icons/all-files/fi/FiStar';
import { FiUserCheck } from '@react-icons/all-files/fi/FiUserCheck';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';

import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { AuthContext } from '/imports/utils/contexts/AuthContext';

export const EditCommunityMember = ({
  isOpen,
  onClose,
  selectedUserId,
  skilltreeId,
  skillTreeOwner
}) => {
  const loggedInUserId = useContext(AuthContext);
  //Subscribe to any collections
  useSubscribe('subscriptions');

  //Get the selected user's subscription progress
  const userSubscriptionRecord = useFind(SubscriptionsCollection, [
    { userId: selectedUserId, skillTreeId: skilltreeId },
    {
      fields: {
        userId: 1,
        skillTreeId: 1,
        roles: 1
      }
    }
  ])[0];

  const initialData = useMemo(
    () => ({
      roles: userSubscriptionRecord?.roles || []
    }),
    [userSubscriptionRecord?.roles]
  );

  const [formData, setFormData] = useState(initialData);
  const [isModified, setIsModified] = useState(false);
  const availableRoles = ['user', 'expert', 'moderator', 'admin'];
  const isOwner = loggedInUserId === skillTreeOwner;

  useEffect(() => {
    setFormData(initialData);
    setIsModified(false);
  }, [initialData]);

  const updateFormData = (path, value) => {
    setFormData(prev => {
      const updated = { ...prev };
      let current = updated;
      const keys = Array.isArray(path) ? path : path.split('.');

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });

    setIsModified(true);
  };

  const addRole = role => {
    if (!formData.roles.includes(role)) {
      updateFormData('roles', [...formData.roles, role]);
    }
  };

  const removeRole = role => {
    if (role === 'user') {
      return;
    }
    const newUserRoles = formData.roles.filter(currRole => currRole !== role);

    updateFormData(
      'roles',
      newUserRoles.length === 0 ? ['user'] : newUserRoles
    );
  };

  const handleSave = async () => {
    try {
      /*
          As of 28/08/2025 version of SkillTree, the factors considered when updating the roles of a user in skilltree:
          - Update the roles for user in skilltree progress collection on MongoDB, for the specific skilltree
          - Update the roles in skilltree arrays it self: this includes admin, moderator and expert array
      */
      await Meteor.callAsync(
        'saveEditCommunityMemberModal',
        selectedUserId,
        skilltreeId,
        formData
      );

      onClose();
    } catch (error) {
      console.error(error.reason || "Failed to update Member's data!");
    }
  };

  const handleClose = () => {
    onClose(); //call the onCLose method provided intially
  };

  const ROLE_CONFIG = {
    user: {
      icon: FiUser,
      colour: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
      description:
        'Basic access to community features. Note: everyone is a user!',
      removable: false
    },
    expert: {
      icon: FiStar,
      colour:
        'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
      description: 'Expert role with greater weightage in voting'
    },
    moderator: {
      icon: FiUserCheck,
      colour: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      description: 'Can moderate discussions and content in the community'
    },
    admin: {
      icon: FiSettings,
      colour: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
      description: 'Give full administrative access of this skilltree'
    }
  };

  return (
    <Modal show={isOpen} onClose={handleClose} dismissible size="7xl">
      <ModalHeader className="border-b border-gray-900">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Community Member
          </h3>
        </div>
      </ModalHeader>

      <ModalBody className="p-6">
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            Roles & Permissions
          </h4>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              {' '}
              Current User Roles
            </h4>
            <div className="space-y-2">
              {availableRoles.map(role => {
                const config = ROLE_CONFIG[role];
                const IconComponent = config.icon;
                const isSelected = formData.roles.includes(role);

                //Disable admin role interaction if user is not the owner
                const isAdminRestricted = role === 'admin' && !isOwner;

                return (
                  <div
                    key={role}
                    className={`flex items-center gap-2 justify-between p-4 border rounded-lg transition-all ${
                      isAdminRestricted
                        ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-100'
                        : `cursor-pointer ${
                            isSelected
                              ? 'border-[#04BF8A] bg-[#04BF8A]/5'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`
                    }`}
                    onClick={() => {
                      if (isAdminRestricted) return;
                      isSelected ? removeRole(role) : addRole(role);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${config.colour.split(' ')[0]} ${config.colour.split(' ')[1]}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 capitalize">
                          {role}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {config.description}
                        </p>
                      </div>
                    </div>

                    {role === 'user' && (
                      <div className="px-2 py-1 border rounded-full bg-[#328E6E] text-white text-sm ">
                        Default
                      </div>
                    )}

                    {role === 'admin' && (
                      <div className="px-2 py-1 border rounded-full bg-[#328E6E] text-white text-sm ">
                        Owner Only
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        {isModified && (
          <button
            onClick={handleSave}
            className="px-2 py-1 border rounded-full bg-[#328E6E] text-white text-sm cursor-pointer"
          >
            Save
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};
