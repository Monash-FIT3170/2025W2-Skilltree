import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TopicList } from '/imports/ui/components/TopicListGeneralForum';

export const GeneralForum = () => {
  const { skilltreeId } = useParams();

  const [topics, setTopics] = useState([
    {
      id: 1,
      title: 'Welcome Thread',
      description: 'Introduce yourself here!',
      messages: [
        { id: 1, username: 'user1', text: 'Hey everyone!', createdAt: new Date() }
      ]
    }
  ]);

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDesc, setTopicDesc] = useState('');
  const [message, setMessage] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [topics, selectedTopicId]);

  const createTopic = e => {
    e.preventDefault();
    if (!topicTitle.trim()) return;
    setTopics(prev => [
      ...prev,
      {
        id: Date.now(),
        title: topicTitle.trim(),
        description: topicDesc.trim(),
        messages: []
      }
    ]);
    setTopicTitle('');
    setTopicDesc('');
  };

  const sendMessage = e => {
    e.preventDefault();
    if (!message.trim() || selectedTopicId === null) return;

    setTopics(prev =>
      prev.map(topic =>
        topic.id === selectedTopicId
          ? {
              ...topic,
              messages: [
                ...topic.messages,
                {
                  id: Date.now(),
                  username: 'You',
                  text: message,
                  createdAt: new Date()
                }
              ]
            }
          : topic
      )
    );
    setMessage('');
  };

  const selectedTopic = topics.find(t => t.id === selectedTopicId);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-[#328E6E] text-white px-4 py-3 font-bold text-lg shadow">
        General Forum - Skill Tree {skilltreeId}
      </div>

      {selectedTopicId === null && (
        <form onSubmit={createTopic} className="p-3 bg-white border-b border-gray-300 space-y-2">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="New Topic Title"
            value={topicTitle}
            onChange={e => setTopicTitle(e.target.value)}
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Description (optional)"
            value={topicDesc}
            onChange={e => setTopicDesc(e.target.value)}
          />
          <button className="bg-[#328E6E] text-white px-4 py-2 rounded hover:bg-[#267a5c]">
            Create Topic
          </button>
        </form>
      )}

      {selectedTopicId === null ? (
        <TopicList topics={topics} onSelectTopic={setSelectedTopicId} />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedTopic?.messages.map(msg => (
              <div key={msg.id} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow">
                <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full font-bold">
                  {msg.username?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="font-semibold">{msg.username}</div>
                  <div className="text-gray-700">{msg.text}</div>
                  <div className="text-xs text-gray-400">
                    {msg.createdAt.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-300 flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded-full px-4 py-2"
              placeholder="Type a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type="submit" className="bg-[#328E6E] text-white rounded-full px-4 py-2 hover:bg-[#267a5c]">
              Send
            </button>
          </form>

          <button
            className="bg-gray-300 text-black px-4 py-2"
            onClick={() => setSelectedTopicId(null)}
          >
            Back to Topics
          </button>
        </>
      )}
    </div>
  );
};
