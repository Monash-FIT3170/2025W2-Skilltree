import { Meteor } from 'meteor/meteor';
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { RoleApplicationCollection } from '/imports/api/collections/RoleApplications';
import { ReviewApplication } from '/imports/ui/components/Community/Management/ReviewApplication';
import { ApplicationQueue } from './ApplicationsQueue';

export const Roles = () => {
  const { id: skilltreeID } = useParams();

  const [activeTab, setActiveTab] = useState('moderator');
  const [selectedApplication, setSelectedApplication] = useState(null);

  //Subscribe to rolesApplication
  useSubscribe('roleApplications');

  //Find all applications in this skilltree
  const allApplications = useFind(RoleApplicationCollection, [
    { skillTreeId: skilltreeID },
    {
      fields: {
        _id: 1,
        userId: 1,
        name: 1,
        email: 1,
        applicationType: 1,
        status: 1,
        qualifications: 1,
        motivation: 1,
        createdAt: 1,
        updatedAt: 1
      },
      sort: { createdAt: -1 }
    }
  ]);

  //Listens to changes to allApplications
  const { moderatorApplications, expertApplications, stats } = useMemo(() => {
    const moderators = allApplications.filter(
      app => app.applicationType === 'moderator'
    );
    const experts = allApplications.filter(
      app => app.applicationType === 'expert'
    );

    //Update the dashbaord overview
    const dashboardStats = {
      total: allApplications.length || 0,
      pending:
        allApplications.filter(app => app.status === 'pending').length || 0,
      pendingModerators:
        moderators.filter(app => app.status === 'pending').length || 0,
      pendingExperts:
        experts.filter(app => app.status === 'pending').length || 0,
      approved:
        allApplications.filter(app => app.status === 'approved').length || 0,
      rejected:
        allApplications.filter(app => app.status === 'rejected').length || 0
    };

    return {
      moderatorApplications: moderators,
      expertApplications: experts,
      stats: dashboardStats
    };
  }, [allApplications]);

  const currentApplications =
    activeTab === 'moderator' ? moderatorApplications : expertApplications;

  const handleReviewApplication = application => {
    setSelectedApplication(application);
  };

  const handleApproveApplication = async application => {
    //Add the role to the users skiltree progress
    //This checks if the user exists as well
    const updateOperation = {
      $addToSet: { roles: application.applicationType }
    };
    await Meteor.callAsync(
      'updateSkillTreeProgress',
      skilltreeID,
      application.userId,
      updateOperation
    );

    //Approve the application
    await Meteor.callAsync(
      'approveRoleApplication',
      application._id,
      skilltreeID
    );

    setSelectedApplication(null);
  };

  const handleRejectApplication = async application => {
    await Meteor.callAsync(
      'rejectRoleApplication',
      application._id,
      skilltreeID
    );

    setSelectedApplication(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#328E6E] mb-2">
          Role Management
        </h1>
        <p className="text-gray-600">
          Review and manage applications for your Skiltree community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                Pending Expert Applications
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pendingExperts}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                Pending Moderator Applications
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pendingModerators}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('moderator')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'moderator'
                ? 'border-[#328E6E] text-[#328E6E]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>Moderator Applications</span>
              {moderatorApplications.length > 0 && (
                <span className="bg-[#328E6E] text-white text-xs rounded-full px-2 py-1">
                  {stats.pendingModerators}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('expert')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'expert'
                ? 'border-[#328E6E] text-[#328E6E]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>Expert Applications</span>
              {expertApplications.length > 0 && (
                <span className="bg-[#328E6E] text-white text-xs rounded-full px-2 py-1">
                  {stats.pendingExperts}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>

      {/*Application list for targer type */}
      <ApplicationQueue
        applications={currentApplications}
        type={activeTab}
        onReviewApplication={handleReviewApplication}
      />

      {/* Application Review Modal */}
      {selectedApplication && (
        <ReviewApplication
          selectedApplication={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          approveApplication={handleApproveApplication}
          rejectApplication={handleRejectApplication}
        />
      )}
    </div>
  );
};
