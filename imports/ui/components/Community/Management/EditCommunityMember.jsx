import React, { useMemo } from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

import { FiUser, FiUserCheck, FiStar, FiSettings } from 'react-icons/fi';

import { useFormData } from '/imports/ui/components/Community/hooks/FormDataHook';

export const EditCommunityMember = ({
  isOpen,
  onClose,
  user,
  skilltreeId,
  onUserUpdate,
  fallBackUpdate
}) => {
  //use formdata hook
  const initialData = useMemo(
    () => ({
      roles: user?.skilltreeRoles || []
    }),
    [user?.skilltreeRoles]
  );

  const { formData, updateFormData, isModified } = useFormData(initialData);

  const availableRoles = ['user', 'expert', 'moderator', 'admin'];

  const roleConfig = {
    user: {
      icon: FiUser,
      color: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
      description:
        'Basic access to community features. Note: everyone is a user!',
      removable: false
    },
    expert: {
      icon: FiStar,
      color:
        'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
      description: 'Expert role with greater weightage in voting'
    },
    moderator: {
      icon: FiUserCheck,
      color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      description: 'Can moderate discussions and content in the community'
    },
    admin: {
      icon: FiSettings,
      color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
      description: 'Give full administrative access of this skilltree'
    }
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

      if (onUserUpdate) {
        onUserUpdate(user._id, {
          //add more properties in the future if needed
          skilltreeRoles: formData.roles
        });
      }

      onClose();
    } catch (error) {
      console.error(error.reason || "Failed to update Member's data!");

      if (fallBackUpdate) {
        await fallBackUpdate(); //fetch skilltree users again to refresh table if needed
      }

      console.error('Failed to save changes!');
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
                const config = roleConfig[role];
                const IconComponent = config.icon;
                const isSelected = formData.roles.includes(role);

                return (
                  <div
                    key={role}
                    className={`flex items-center gap-2 justify-between p-4 border rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#04BF8A] bg-[#04BF8A]/5'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() =>
                      isSelected ? removeRole(role) : addRole(role)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${config.color.split(' ')[0]} ${config.color.split(' ')[1]}`}
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
            className="px-2 py-1 border rounded-full bg-[#328E6E] text-white text-sm"
          >
            Save
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};
