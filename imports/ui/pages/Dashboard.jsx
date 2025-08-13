import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Users, ChevronRight } from 'lucide-react';
import { User } from '/imports/utils/User';

import { SkillTreeCard } from '../components/Dashboard/SkillTreeWidget';
import { EmptyState } from '../components/Dashboard/EmptyState';
import { DashboardLoadingState } from '../components/Dashboard/LoadingState';
import {
  getGreetingIcon,
  getGreetingMessage
} from '../components/Dashboard/Greeting';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const user = User([
    '_id',
    'profile.subscribedCommunities',
    'profile.createdCommunities',
    'profile.givenName'
  ]);

  const navigate = useNavigate();
  const [greeting, setGreeting] = useState(getGreetingMessage());
  const [greetingIcon, setGreetingIcon] = useState(getGreetingIcon());
  const [allSkillTrees, setAllSkillTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and categorise skill trees
  const skillTreesWithRoles = allSkillTrees.map(skillTree => ({
    ...skillTree,
    isOwner: skillTree.owner === user?._id,
    isMember:
      user?.profile?.subscribedCommunities?.includes(skillTree._id) || false
  }));

  const displayedSkillTrees = skillTreesWithRoles.slice(0, 6);

  // Sort by ownership first, then by join date or creation date
  const sortedSkillTrees = [...skillTreesWithRoles].sort((a, b) => {
    if (a.isOwner && !b.isOwner) return -1;
    if (!a.isOwner && b.isOwner) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreetingMessage());
      setGreetingIcon(getGreetingIcon());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        return;
      }

      let cancelled = false;

      const fetchSkillTrees = async () => {
        try {
          setLoading(true);

          // Get all unique skill tree IDs (created + subscribed)
          const createdIds = user?.profile?.createdCommunities ?? [];
          const subscribedIds = user?.profile?.subscribedCommunities ?? [];
          //Using Set will make all elements unique
          const allUniqueIds = [...new Set([...createdIds, ...subscribedIds])];

          const skillTrees = await Promise.all(
            allUniqueIds.map(id => Meteor.callAsync('skilltrees.get', id))
          );

          if (!cancelled) {
            //Some elements were null, so we filter out any null results
            setAllSkillTrees(skillTrees.filter(Boolean));
          }
        } catch (err) {
          console.error('Error:', err.message);
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

      fetchSkillTrees();

      return () => {
        cancelled = true;
      };
    }, 1000);
  }, [user?.profile?.createdCommunities, user?.profile?.subscribedCommunities]);

  const handleManageCommNav = () => {
    navigate('/manage-communities');
  };

  if (loading) {
    return <DashboardLoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Intro message */}
        <div className="mb-8 bg-gradient-to-r text-[#328E6E] rounded-xl p-6 border-l-4 border-[#328E6E] shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{greetingIcon}</span>
            <h1 className="text-2xl lg:text-4xl font-bold text-[#328E6E]">
              {greeting}, {user?.profile?.givenName}!
            </h1>
          </div>
          <p className="text-gray-600 ml-12">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#025940] mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your skill trees and track your learning journey
          </p>
        </div>

        {/* My Skill Trees Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users size={20} className="text-[#04BF8A]" />
                My Skill Trees
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Skill trees you own and communities you've joined
              </p>
            </div>

            <button
              onClick={handleManageCommNav}
              className="text-[#04BF8A] hover:text-[#025940] text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              Manage Communities ({skillTreesWithRoles.length})
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
            {sortedSkillTrees.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedSkillTrees.map(skillTree => (
                  <SkillTreeCard
                    key={skillTree._id}
                    skillTree={skillTree}
                    showSubscribers={true}
                    currentUserId={user._id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
