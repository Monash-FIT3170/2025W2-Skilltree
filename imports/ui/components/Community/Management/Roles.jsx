import React, { useState } from 'react';
import {
  Users,
  Shield,
  Star,
  Check,
  X,
  Clock,
  AlertCircle
} from 'lucide-react';

export const Roles = () => {
  const [activeTab, setActiveTab] = useState('moderator');
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Mock data - in real app this would come from your database
  const [moderatorApplications, setModeratorApplications] = useState([]);

  const [expertApplications, setExpertApplications] = useState([]);

  const handleApproveApplication = (applicationType, applicationId) => {
    if (applicationType === 'moderator') {
      setModeratorApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: 'approved' } : app
        )
      );
    } else {
      setExpertApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: 'approved' } : app
        )
      );
    }
    setSelectedApplication(null);
  };

  const handleRejectApplication = (applicationType, applicationId) => {
    if (applicationType === 'moderator') {
      setModeratorApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: 'rejected' } : app
        )
      );
    } else {
      setExpertApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: 'rejected' } : app
        )
      );
    }
    setSelectedApplication(null);
  };

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const pendingModeratorCount = moderatorApplications.filter(
    app => app.status === 'pending'
  ).length;
  const pendingExpertCount = expertApplications.filter(
    app => app.status === 'pending'
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#328E6E] mb-2">
          Role Management
        </h1>
        <p className="text-gray-600">
          Review and manage moderator and expert applications for your
          community.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Moderators</p>
              <p className="text-2xl font-semibold text-gray-900">
                {pendingModeratorCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Experts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {pendingExpertCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-[#328E6E]" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">
                {moderatorApplications.length + expertApplications.length}
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
              <Shield className="w-4 h-4" />
              <span>Moderator Applications</span>
              {pendingModeratorCount > 0 && (
                <span className="bg-[#328E6E] text-white text-xs rounded-full px-2 py-1">
                  {pendingModeratorCount}
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
              <Star className="w-4 h-4" />
              <span>Expert Applications</span>
              {pendingExpertCount > 0 && (
                <span className="bg-[#328E6E] text-white text-xs rounded-full px-2 py-1">
                  {pendingExpertCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {activeTab === 'moderator' ? (
          moderatorApplications.length > 0 ? (
            moderatorApplications.map(application => (
              <div
                key={application.id}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#328E6E] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.username}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
                      >
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">
                          {application.status}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {application.email}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      Applied on{' '}
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </p>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Experience:{' '}
                        </span>
                        <span className="text-sm text-gray-600">
                          {application.experience}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Availability:{' '}
                        </span>
                        <span className="text-sm text-gray-600">
                          {application.availability}
                        </span>
                      </div>
                    </div>
                  </div>

                  {application.status === 'pending' && (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() =>
                          setSelectedApplication({
                            ...application,
                            type: 'moderator'
                          })
                        }
                        className="px-4 py-2 text-[#328E6E] bg-[#328E6E]/10 hover:bg-[#328E6E]/20 rounded-lg transition-colors text-sm"
                      >
                        Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Moderator Applications
              </h3>
              <p className="text-gray-500">
                There are currently no moderator applications to review.
              </p>
            </div>
          )
        ) : expertApplications.length > 0 ? (
          expertApplications.map(application => (
            <div
              key={application.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#328E6E] transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.username}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
                    >
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">
                        {application.status}
                      </span>
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {application.email}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    Applied on{' '}
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Skill Area:{' '}
                      </span>
                      <span className="text-sm text-[#328E6E] font-medium">
                        {application.skillArea}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Experience:{' '}
                      </span>
                      <span className="text-sm text-gray-600">
                        {application.experience}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Portfolio:{' '}
                      </span>
                      <a
                        href={`https://${application.portfolio}`}
                        className="text-sm text-[#328E6E] hover:text-[#2d7a5e] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {application.portfolio}
                      </a>
                    </div>
                  </div>
                </div>

                {application.status === 'pending' && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() =>
                        setSelectedApplication({
                          ...application,
                          type: 'expert'
                        })
                      }
                      className="px-4 py-2 text-[#328E6E] bg-[#328E6E]/10 hover:bg-[#328E6E]/20 rounded-lg transition-colors text-sm"
                    >
                      Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Expert Applications
            </h3>
            <p className="text-gray-500">
              There are currently no expert applications to review.
            </p>
          </div>
        )}
      </div>

      {/* Application Review Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 border border-gray-200 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                {selectedApplication.type === 'moderator' ? (
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedApplication.type === 'moderator'
                      ? 'Moderator'
                      : 'Expert'}{' '}
                    Application
                  </h3>
                  <p className="text-gray-600">
                    {selectedApplication.username}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {selectedApplication.username}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {selectedApplication.email}
                  </div>
                </div>
              </div>

              {selectedApplication.type === 'expert' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Area
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-[#328E6E] font-medium">
                    {selectedApplication.skillArea}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[60px]">
                  {selectedApplication.experience}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivation
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[80px]">
                  {selectedApplication.motivation}
                </div>
              </div>

              {selectedApplication.type === 'moderator' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {selectedApplication.availability}
                  </div>
                </div>
              )}

              {selectedApplication.type === 'expert' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                      <a
                        href={`https://${selectedApplication.portfolio}`}
                        className="text-[#328E6E] hover:text-[#2d7a5e] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedApplication.portfolio}
                      </a>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certifications
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {selectedApplication.certifications}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                  {new Date(selectedApplication.appliedAt).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() =>
                  handleRejectApplication(
                    selectedApplication.type,
                    selectedApplication.id
                  )
                }
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() =>
                  handleApproveApplication(
                    selectedApplication.type,
                    selectedApplication.id
                  )
                }
                className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
