import React from 'react';
export const TopicList = ({ topics, onSelectTopic }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {topics.map(topic => (
        <div
          key={topic.id}
          className="bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50"
          onClick={() => onSelectTopic(topic.forumId || topic._id)} // Use forumId or _id, not topic.id
        >
          <div className="font-bold">{topic.title}</div>
          <div className="text-sm text-gray-600">{topic.description}</div>
          <div className="text-xs text-gray-400 mt-1">
            {topic.messages?.length || 0} messages
          </div>
        </div>
      ))}
    </div>
  );
};
