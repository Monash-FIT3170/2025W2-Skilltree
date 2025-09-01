import React from 'react';
import { ModeratorApplicationCard } from '/imports/ui/components/Community/Management/Cards/ModeratorApplicationCard';
import { ExpertApplicationCard } from '/imports/ui/components/Community/Management/Cards/ExpertApplicationCard';
import { NoApplications } from '/imports/ui/components/Community/Fallbacks/NoApplications';

export const ApplicationQueue = ({
  applications,
  type,
  onReviewApplication
}) => {
  if (applications.length === 0) {
    return <NoApplications />;
  }

  return (
    <div className="space-y-4">
      {applications.map(application => {
        if (type === 'moderator') {
          return (
            <ModeratorApplicationCard
              key={application._id}
              application={application}
              onReview={onReviewApplication}
            />
          );
        } else if (type === 'expert') {
          return (
            <ExpertApplicationCard
              key={application._id}
              application={application}
              onReview={onReviewApplication}
            />
          );
        }
      })}
    </div>
  );
};
