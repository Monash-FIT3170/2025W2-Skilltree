import React, { useContext, useEffect, useState } from 'react';
import { SkillTreeView } from './SkillTreeView';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { NavigationMenu } from './NavigationMenu';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { SubscribeButton } from './SubscribeButton';

// AuthContext
import { AuthContext } from '/imports/utils/contexts/AuthContext';
import { Button } from 'flowbite-react';
import { Meteor } from 'meteor/meteor';

export const SkillTreeCommunityView = () => {
  // extract id from url params
  const { id } = useParams();
  const userId = useContext(AuthContext); // Reactive when value changes
  // extract location
  const { location } = useLocation();

  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);

  useSubscribe('skilltrees');
  const skilltree = useFind(
    SkillTreeCollection,
    [
      { _id: { $eq: id } },
      {
        fields: {
          title: 1,
          owner: 1,
          description: 1,
          termsAndConditions: 1,
          admins: 1,
          subscribers: 1
        }
      }
    ],
    [id]
  )[0];

  useEffect(() => {
    if (!skilltree?._id || !userId) return;

    const checkStatus = async () => {
      const isAdmin = await checkUserIsAdmin();
      setIsUserAdmin(isAdmin);

      const isSubscribed = await checkUserIsSubscribed();
      setIsUserSubscribed(isSubscribed);
    };
    checkStatus();
  }, [skilltree?._id, userId, skilltree?.subscribers]);

  const checkUserIsAdmin = async () => {
    //Retrieve roles
    const currUserSkillTreeProgress = await Meteor.callAsync(
      'getSubscription',
      skilltree._id
    );

    if (currUserSkillTreeProgress) {
      return currUserSkillTreeProgress.roles.includes('admin');
    }
    console.log(currUserSkillTreeProgress);
    return false;
  };

  const checkUserIsSubscribed = async () => {
    try {
      const foundUser = await Meteor.callAsync(
        'skilltrees.findUser',
        skilltree._id,
        userId
      );
      return !!foundUser;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  if (!skilltree) return <div>Skill Tree not found</div>;

  return (
    <div key={id}>
      <div className="p-2">
        <NavigationMenu id={id} />

        {/*If the user is the creator of this skill tree community, hide the subscribe button */}
        <div className="flex gap-4 items-center mt-2">
          {userId !== skilltree.owner && <SubscribeButton skillTreeId={id} />}
          <Link to="leaderboard" state={{ background: location }}>
            <Button
              color="green"
              pill
              className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
            >
              Leaderboard
            </Button>
          </Link>

          {/*Only admins have access to these mod tools button
           */}

          {isUserAdmin && (
            <Link to="admin-tools" state={{ background: location }}>
              <Button
                color="blue"
                pill
                className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
              >
                Mod Tools
              </Button>
            </Link>
          )}

          {isUserSubscribed && (
            <Link to="application" state={{ background: location }}>
              <Button
                color="green"
                pill
                className="cursor-pointer w-full position-relative mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#328E6E] rounded-[22px] transition-all duration-200 hover:bg-[#2a7a5e] focus:outline-none focus:ring-0"
              >
                Help our Community
              </Button>
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-bold mt-2">
          Welcome to {skilltree.title}!
        </h1>
        <div className="text-lg mt-2">
          <p>Description: {skilltree.description}</p>
          <p>Terms & Conditions: {skilltree.termsAndConditions}</p>
        </div>
      </div>
      <SkillTreeView id={id} isAdmin={false} />
      <Outlet />
    </div>
  );
};
