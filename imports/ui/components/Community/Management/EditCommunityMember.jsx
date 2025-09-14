import React, { useMemo, useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

import { ROLE_CONFIG } from '/imports/ui/components/Community/utils/rolesUtils';

export const EditCommunityMember = ({
  isOpen,
  onClose,
  user,
  skilltreeId,
  skillTreeOwner,
  loggedInUser
}) => {
  const initialData = useMemo(
    () => ({
      roles: user?.skilltreeRoles || []
    }),
    [user?.skilltreeRoles]
  );

  const [formData, setFormData] = useState(initialData);
  const [isModified, setIsModified] = useState(false);
  const availableRoles = ['user', 'expert', 'moderator', 'admin'];
  const isOwner = loggedInUser === skillTreeOwner;

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
        user._id,
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

  if (!user) {
    return (
      <Modal show={isOpen} onClose={onClose} dismissible size="7xl">
        <div>No User Found</div>
      </Modal>
    );
  }

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
