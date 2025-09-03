import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';

import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { SkillTreeView } from '../components/SkillTreeView';
import { NavigationDropdown } from '../components/NavigationDropdown';
import { SubscribeButton } from './SubscribeButton';
import { UserList } from './UserList';

// Auth
import { AuthContext } from '/imports/utils/contexts/AuthContext';

// Apply buttons
import { ExpertFormButton } from './ExpertFormButton';
import { ModeratorFormButton } from './ModeratorFormButton';

export const SkillTreeCommunityView = () => {
  // extract id from url params
  const { id } = useParams();

  // subscriptions
  useSubscribeSuspense('skilltrees');
  useSubscribeSuspense('skilltree.single', id); // in case you have a per-tree pub; harmless if not present

  // fetch skill tree doc
  const skilltree =
    useFind(() => SkillTreeCollection.find({ _id: id }), [id])[0] || null;

  // auth (if you need to show/hide apply buttons or personalize UI)
  const { user, isLoggedIn } = useContext(AuthContext) ?? {};

  if (!skilltree) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="rounded-lg border p-6">
          <p className="text-gray-600">Loading skill tree…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header / Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <NavigationDropdown />
          <h1 className="text-2xl font-bold">{skilltree.title}</h1>
        </div>
        <SubscribeButton skillTreeId={id} />
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 rounded-lg border p-4 space-y-2">
          <p><span className="font-medium">Category:</span> {skilltree.category}</p>
          <p><span className="font-medium">Owner:</span> {skilltree.ownerName}</p>
          <p><span className="font-medium">Visibility:</span> {skilltree.visibility}</p>
          <p><span className="font-medium">Terms &amp; Conditions:</span> {skilltree.termsAndConditions}</p>
        </div>

        {/* Apply actions */}
        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="text-lg font-semibold">Participate</h2>
          <div className="flex flex-col gap-2">
            <ExpertFormButton skillTreeId={id} requireLogin />
            <ModeratorFormButton skillTreeId={id} requireLogin />
          </div>
          {!isLoggedIn && (
            <p className="text-sm text-gray-600">
              You’ll be asked to log in before applying.
            </p>
          )}
        </div>
      </div>

      {/* Community */}
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-2">Community Members</h3>
        <UserList skillTreeId={id} />
      </div>

      {/* The actual skill tree view */}
      <SkillTreeView id={id} isAdmin={false} />
    </div>
  );
};

