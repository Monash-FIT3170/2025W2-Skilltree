import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { User } from '/imports/utils/User';

// JSX UI
import { DashboardSkillTrees } from '/imports/ui/layouts/DashboardSkillTrees';
import { DashboardLoadingState } from '../components/Dashboard/LoadingState';
import {
  getGreetingIcon,
  getGreetingMessage
} from '../components/Dashboard/Greeting';

export const Dashboard = () => {
  const user = User(['profile.givenName']);

  const [greeting, setGreeting] = useState(getGreetingMessage());
  const [greetingIcon, setGreetingIcon] = useState(getGreetingIcon());
  const [communitiesCount, setCommunitiesCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreetingMessage());
      setGreetingIcon(getGreetingIcon());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
            <Link to={'/manage-communities'}>
              <button className="text-[#04BF8A] hover:text-[#025940] text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer">
                Manage Communities ({communitiesCount})
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>
          <Suspense fallback={<DashboardLoadingState />}>
            <DashboardSkillTrees
              key={user._id}
              setCommunitiesCount={setCommunitiesCount}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
