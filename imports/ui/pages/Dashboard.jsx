import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Plus, Users, Search, Settings, ChevronRight } from 'lucide-react';

const SkillTreeCard = ({ skillTree, showSubscribers = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer">
      <div
        className={`relative h-32 
        ${
          !skillTree.image
            ? 'bg-gradient-to-br from-[#025940] to-[#04BF8A]'
            : ''
        }`}
      >
        {skillTree.image && (
          <img
            src={skillTree.image}
            alt={skillTree.title}
            className="w-full h-full object-cover opacity-65"
            onError={e => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
          {skillTree.title}
        </h3>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {skillTree.description}
        </p>

        <div className="flex items-center justify-between">
          {showSubscribers && (
            <div className="flex items-center gap-1 text-gray-500">
              <Users size={14} />
              <span className="text-xs">
                {skillTree.subscribers.length} members
              </span>
            </div>
          )}
          <button className="text-[#04BF8A] hover:text-[#025940] transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ type }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {type === 'created' ? (
          <Plus className="text-gray-400" size={24} />
        ) : (
          <Search className="text-gray-400" size={24} />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {type === 'created'
          ? 'No Skill Trees Created'
          : 'No Communities Joined'}
      </h3>
      <p className="text-gray-500 text-center text-sm max-w-md leading-relaxed">
        {type === 'created'
          ? 'Start building your first skill tree and help others learn new skills.'
          : "Looks like you don't have any skill trees. Head to the search bar and join one!"}
      </p>
      <button className="mt-4 bg-[#04BF8A] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#025940] transition-colors">
        {type === 'created' ? 'Create Skill Tree' : 'Explore Communities'}
      </button>
    </div>
  );
};

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
    if (!user) {
      setTimeout(() => {
        setLoading(false);
        return;
      });
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
          console.log(createdSkillTrees);
          console.log(joinedSkillTrees);
        }
      }
    };

    fetchSkillTrees();

    return () => {
      cancelled = true;
    };
  }, [user?.profile?.createdCommunities, user?.profile?.subscribedCommunities]);

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-8">
            {[1, 2].map(section => (
              <div key={section}>
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map(item => (
                    <div
                      key={item}
                      className="bg-gray-200 rounded-xl h-48"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
