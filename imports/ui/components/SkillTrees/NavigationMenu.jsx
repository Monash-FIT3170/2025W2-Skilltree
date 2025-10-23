import React, { Suspense, useContext, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { SubscriptionsCollection } from '/imports/api/collections/Subscriptions';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { SubscribeButton } from './SubscribeButton';

// Always-visible NavigationMenu component
export const NavigationMenu = ({ id }) => {
  const navigate = useNavigate();
  const userId = useContext(AuthContext); // Reactive when value changes
  const location = useLocation();

  // load skilltree and subscription data
  useSubscribe('skilltrees');
  useSubscribe('subscriptions');

  const skilltree = useFind(SkillTreeCollection, [
    { _id: { $eq: id } },
    { fields: { title: 1, image: 1, owner: 1, admins: 1, subscribers: 1 } }
  ])[0];

  const userSubscription = useFind(SubscriptionsCollection, [
    { userId: userId, skilltreeId: id }
  ])[0];

  const isUserAdmin = useMemo(() => {
    return userSubscription?.roles?.includes('admin') ?? false;
  }, [userSubscription]);

  // Check if user is subscribed (reactively)
  const subscribedSkillTree = useFind(SkillTreeCollection, [
    { _id: id, subscribers: { $in: [userId] } }
  ])[0];
  const isUserSubscribed = !!subscribedSkillTree;

  const getLinkClasses = link => {
    const isActive =
      location.pathname === link || location.pathname.endsWith(link);
    return `flex items-center gap-2 block py-2 px-3 rounded transition-all duration-200 ${
      isActive ? 'bg-gray-600 text-white' : 'text-white hover:bg-gray-600'
    }`;
  };

  const menuItems = [
    userId !== skilltree?.owner && {
      id: 'subscribe',
      element: (
        <div key="subscribe">
          <Suspense>
            <SubscribeButton skilltreeId={id} />
          </Suspense>
        </div>
      )
    },
    isUserAdmin && {
      id: 'mod-tool',
      element: (
        <Link
          to={`/skilltree/${id}/admin-tools`}
          state={{ background: location }}
          className={getLinkClasses(`/skilltree/${id}/admin-tools`)}
        >
          <span>Mod Tools</span>
        </Link>
      )
    },
    {
      id: 'leaderboard',
      element: (
        <Link
          to={`/skilltree/${id}/leaderboard`}
          state={{ background: location }}
          className={getLinkClasses(`/skilltree/${id}/leaderboard`)}
        >
          <span>Leaderboard</span>
        </Link>
      )
    },

    isUserSubscribed && {
      id: 'help-community',
      element: (
        <Link
          to={`/skilltree/${id}/application`}
          state={{ background: location }}
          className={getLinkClasses(`/skilltree/${id}/application`)}
        >
          <span>Help our Community</span>
        </Link>
      )
    },
    {
      id: 'community-tree',
      label: 'Community Tree',
      icon: (
        <img
          src="/images/CommunityTree.png"
          alt="Logo"
          className="w-5 h-5 object-contain"
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
          className="w-5 h-5 object-contain"
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
          className="w-5 h-5 object-contain"
        />
      ),
      link: `/pendingproofs/${id}`
    },
    isUserSubscribed && {
      id: 'events',
      label: 'Events',
      icon: (
        <img
          src="/images/EventIcon.jpg"
          alt="Logo"
          className="w-6 h-6 object-contain"
        />
      ),
      link: `/rankedevents/${id}`
    }
  ].filter(Boolean);

  const handleMenuItemClick = itemId => {
    const selectedItem = menuItems.find(item => item.id === itemId);
    if (selectedItem?.link) navigate(selectedItem.link);
  };

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <div className="w-full">
      {/* Classy container with gradient */}
      <div className="flex items-center gap-6 px-6 py-4 bg-gradient-to-r from-[#2D7A5E] to-[#3A9A75] rounded-lg shadow-md overflow-x-auto">
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

        {/* Inline Menu Items aligned to the left */}
        <div className="flex items-center gap-4 ml-6">
          {menuItems.map(item =>
            item.element ? (
              <div key={item.id}>{item.element}</div>
            ) : (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={getLinkClasses(item.link)}
              >
                {/* {item.icon} */}
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
