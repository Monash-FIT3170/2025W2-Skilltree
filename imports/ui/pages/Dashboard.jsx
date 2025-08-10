import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Users, Settings, ChevronRight } from 'lucide-react';

import { SkillTreeCard } from '../components/Dashboard/SkillTreeWidget';
import { EmptyState } from '../components/Dashboard/EmptyState';
import { DashboardLoadingState } from '../components/Dashboard/LoadingState';

export const Dashboard = () => {
  const user = useTracker(() => {
    if (Meteor.isClient) {
      return Meteor.user();
    }

    return null;
  }, []);

  const [createdSkillTrees, setCreatedSkillTrees] = useState([]);
  const [joinedSkillTrees, setJoinedSkillTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayedCreated = createdSkillTrees.slice(0, 6);
  const displayedJoined = joinedSkillTrees.slice(0, 6);
  const hasMoreCreated = createdSkillTrees.length > 6;
  const hasMoreJoined = joinedSkillTrees.length > 6;

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        return;
      }

      let cancelled = false;

      const fetchSkillTrees = async () => {
        try {
          setLoading(true);

          const [createdTemp, joinedTemp] = await Promise.all([
            Promise.all(
              (user?.profile?.createdCommunities ?? []).map(id =>
                Meteor.callAsync('skilltrees.get', id)
              )
            ),
            Promise.all(
              (user?.profile?.subscribedCommunities ?? []).map(id =>
                Meteor.callAsync('skilltrees.get', id)
              )
            )
          ]);

          if (!cancelled) {
            console.log(createdTemp);
            console.log(joinedTemp);
            setCreatedSkillTrees(createdTemp);
            setJoinedSkillTrees(joinedTemp);
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

  if (loading) {
    return <DashboardLoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#025940] mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your skill trees and track your learning journey
          </p>
        </div>

        {/* My Created Skill Trees Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Settings size={20} className="text-[#04BF8A]" />
                My Created Skill Trees
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Skill trees you've created and manage
              </p>
            </div>
            {hasMoreCreated && (
              <button className="text-[#04BF8A] hover:text-[#025940] text-sm font-medium flex items-center gap-1 transition-colors">
                Manage All
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
            {displayedCreated.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedCreated.map(skillTree => (
                  <SkillTreeCard
                    key={skillTree._id}
                    skillTree={skillTree}
                    showSubscribers={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="created" />
            )}
          </div>
        </div>

        {/* Communities I've Joined Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users size={20} className="text-[#04BF8A]" />
                Communities I've Joined
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Skill tree communities you're part of
              </p>
            </div>
            {hasMoreJoined && (
              <button className="text-[#04BF8A] hover:text-[#025940] text-sm font-medium flex items-center gap-1 transition-colors">
                Manage Communities
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6">
            {displayedJoined.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedJoined.map(skillTree => (
                  <SkillTreeCard
                    key={skillTree._id}
                    skillTree={skillTree}
                    showSubscribers={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="joined" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
