import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// Always-visible NavigationMenu component
export const NavigationMenu = ({ id }) => {
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
      icon: <img src="/images/CommunityTree.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />,
      link: `/skilltree/${id}`
    },
    {
      id: 'general-forum',
      label: 'General Forum',
      icon: <img src="/images/GeneralForum.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />,
      link: `/generalforum/${id}`
    },
    {
      id: 'pending-proof',
      label: 'Pending Proofs',
      icon: <img src="/images/PendingProof.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />,
      link: `/pendingproofs/${id}`
    }
  ];

  const handleMenuItemClick = (itemId) => {
    const selectedItem = menuItems.find(item => item.id === itemId);
    if (selectedItem) navigate(selectedItem.link);
  };

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <div className="w-full">
      {/* Dark green container with title + menu items in one row */}
      <div className="flex items-center gap-6 px-6 py-3 bg-[#328E6E] rounded-[22px] overflow-x-auto">
        {/* Skilltree Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src={skilltree.image || 'https://picsum.photos/100'}
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h2 className="text-white text-2xl font-semibold leading-none !font-sans">
            {skilltree.title}
          </h2>
        </div>

        {/* Inline Menu Items */}
        <div className="flex items-center gap-4 ml-6">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-[#4AA355] hover:text-white text-black font-sans transition-all duration-200"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
