import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// Always-visible NavigationMenu component
export const NavigationMenu = ({ id }) => {
  const navigate = useNavigate();

  // load skilltree data
  useSubscribe('skilltrees');
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
          className="w-6 h-6 object-contain"
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
          className="w-6 h-6 object-contain"
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
          className="w-6 h-6 object-contain"
        />
      ),
      link: `/pendingproofs/${id}`
    }
  ];

  const handleMenuItemClick = itemId => {
    const selectedItem = menuItems.find(item => item.id === itemId);
    if (selectedItem) navigate(selectedItem.link);
  };

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <div className="w-full">
      {/* Classy container with gradient */}
      <div className="flex items-center justify-between gap-6 px-6 py-4 bg-gradient-to-r from-[#2D7A5E] to-[#3A9A75] rounded-2xl shadow-md overflow-x-auto">
        {/* Skilltree Info */}
        <div className="flex items-center gap-3 flex-shrink-0 border-r border-white/30 pr-6">
          <img
            src={skilltree.image || 'https://picsum.photos/100'}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover shadow-md"
          />
          <h2 className="text-white text-xl font-semibold leading-none !font-sans tracking-wide">
            {skilltree.title}
          </h2>
        </div>

        {/* Inline Menu Items */}
        <div className="flex items-center gap-3 ml-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="flex items-center gap-2 px-5 py-2 bg-white/90 rounded-full text-gray-800 font-medium text-sm shadow-sm border border-gray-200 hover:bg-[#3A9A75] hover:text-white hover:shadow-lg transition-all duration-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
