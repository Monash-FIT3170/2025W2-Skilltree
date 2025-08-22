import React from 'react';

export const TopicList = ({ topics, onSelectTopic }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {topics.map(topic => (
        <div
          key={topic.id}
          className="bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50"
          onClick={() => onSelectTopic(topic.id)}
        >
          <div className="font-bold">{topic.title}</div>
          <div className="text-sm text-gray-600">{topic.description}</div>
        </div>
      ))}
    </div>
  );
};
