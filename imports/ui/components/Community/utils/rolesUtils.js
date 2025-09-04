import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiStar } from '@react-icons/all-files/fi/FiStar';
import { FiUserCheck } from '@react-icons/all-files/fi/FiUserCheck';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';

export const roleUtils = {
  getRoleColour(role) {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'expert':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  },

  getStatusColour(isActive) {
    return isActive
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const ROLE_CONFIG = {
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
