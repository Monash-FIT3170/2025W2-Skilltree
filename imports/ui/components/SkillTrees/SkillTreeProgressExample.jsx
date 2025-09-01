import React, { Suspense } from 'react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';
import { Meteor } from 'meteor/meteor';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';

export const SkillTreeProgressExample = () => {
  const currentUserId = Meteor.userId();
  
  // Subscribe to the current user's skill tree progress
  useSubscribeSuspense('mySkillTreeProgress');
  
  // Subscribe to climbing skill tree progress for the current user
  useSubscribeSuspense('mySkillTreeProgressByTree', 'Climbing');
  
  // Get all skill tree progress for the current user
  const myProgress = useFind(
    SkillTreeProgressCollection,
    [{ userId: currentUserId }],
    [currentUserId]
  );
  
  // Get climbing skill tree progress for the current user
  const climbingProgress = useFind(
    SkillTreeProgressCollection,
    [{ userId: currentUserId, skillTreeId: 'Climbing' }],
    [currentUserId]
  )[0];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skill Tree Progress Example</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Current User ID: {currentUserId}</h3>
        <p className="text-gray-600">This is the ID you can use with meteor.user()._id in the frontend</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">All My Skill Tree Progress ({myProgress.length} entries)</h3>
        {myProgress.map((progress, index) => (
          <div key={index} className="border p-3 mb-2 rounded">
            <p><strong>Skill Tree:</strong> {progress.skillTreeId}</p>
            <p><strong>Total XP:</strong> {progress.totalXp}</p>
            <p><strong>Roles:</strong> {progress.roles.join(', ')}</p>
            <p><strong>Skills Completed:</strong> {progress.skillNodes.filter(node => node.data.verified).length}</p>
          </div>
        ))}
      </div>

      {climbingProgress && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Climbing Skill Tree Progress</h3>
          <div className="border p-3 rounded">
            <p><strong>Skill Tree:</strong> {climbingProgress.skillTreeId}</p>
            <p><strong>Total XP:</strong> {climbingProgress.totalXp}</p>
            <p><strong>Roles:</strong> {climbingProgress.roles.join(', ')}</p>
            <p><strong>Skills:</strong></p>
            <ul className="ml-4">
              {climbingProgress.skillNodes.map((node, index) => (
                <li key={index} className="mb-1">
                  <span className={node.data.verified ? 'text-green-600' : 'text-gray-600'}>
                    {node.data.label} - {node.data.verified ? '✓ Verified' : '○ Pending'}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    (XP: {node.data.xpPoints})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Available Publications:</h3>
        <ul className="list-disc ml-4 space-y-1">
          <li><code>skillTreeProgress</code> - All skill tree progress (admin)</li>
          <li><code>mySkillTreeProgress</code> - Current user's progress</li>
          <li><code>skillTreeProgressByTree</code> - All progress for a specific skill tree</li>
          <li><code>mySkillTreeProgressByTree</code> - Current user's progress for a specific skill tree</li>
        </ul>
      </div>
    </div>
  );
}; 