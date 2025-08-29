import React, { useState } from 'react';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { useNavigate } from 'react-router-dom';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

//NavigationDropdown component
export const NavigationDropdown = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // load skilltree data
  useSubscribeSuspense('skilltrees');
  const skilltree = useFind(SkillTreeCollection, [
    { _id: { $eq: id } },
    { fields: { title: 1, image: 1 } }
  ])[0];

  const menuItems = [
    {
      id: 'community-tree',
      label: 'Community Tree',
      icon: (
        <img
          src="/images/CommunityTree.png"
          alt="Logo"
          className="w-8 h-8 rounded-lg object-contain"
        />
      ),
      link: `/skilltree/${id}`
    },
    {
      id: 'general-forum',
      label: 'General Forum',
      icon: (
        <img
          src="/images/GeneralForum.png"
          alt="Logo"
          className="w-8 h-8 rounded-lg object-contain"
        />
      ),
      link: `/generalforum/${id}`
    },
    {
      id: 'pending-proof',
      label: 'Pending Proofs',
      icon: (
        <img
          src="/images/PendingProof.png"
          alt="Logo"
          className="w-8 h-8 rounded-lg object-contain"
        />
      ),
      link: `/pendingproofs/${id}`
    },
    {
      id: 'upload-evidence',
      label: 'Upload Evidence',
      icon: (
        <img
          src="/images/UploadEvidence.png"
          alt="Logo"
          className="w-8 h-8 rounded-lg object-contain"
        />
      ),
      link: '/upload' // Eventually should go to specific skill tree upload
    }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = itemId => {
    const selectedItem = menuItems.find(item => item.id === itemId);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
    setIsOpen(false);
  };

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e]"
      >
        <div className="flex items-center gap-2">
          <img
            src={skilltree.image || 'https://picsum.photos/100'}
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h2 className="text-white text-2xl font-semibold leading-none !font-sans">
            {skilltree.title}
          </h2>
        </div>
        <FiChevronDown
          className={`w-6 h-6 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[280px] bg-[#328E6E] rounded-[22px] shadow-lg z-50 overflow-hidden transition-all duration-200 opacity-100 translate-y-0">
          <div className="p-3">
            <div className="bg-white rounded-[18px] overflow-hidden">
              {/*Button for each menu item */}
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 text-black text-base font-sans rounded-none hover:bg-[#328E6E] hover:text-white ${
                    index !== menuItems.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }`}
                >
                  {/* Menu item icon and label */}
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
