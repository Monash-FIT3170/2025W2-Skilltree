import { Meteor } from 'meteor/meteor';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TopicList } from '../components/SkillTrees/GeneralForum/TopicListGeneralForum';

export const GeneralForum = () => {
  const { skilltreeId } = useParams();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDesc, setTopicDesc] = useState('');
  const [message, setMessage] = useState('');
  const bottomRef = useRef(null);

  // Fetch topics from DB on mount or when skilltreeId changes
  useEffect(() => {
    if (!skilltreeId) return;

    setLoading(true);
    setError(null);

    // Backend expects skillTreeName as string, using skilltreeId from URL
    Meteor.call('getSkillTreeForums', skilltreeId, (err, res) => {
      if (err) {
        console.error('Error fetching forums:', err);
        setError('Failed to load topics: ' + err.message);
        setTopics([]);
      } else {
        // console.log('Fetched topics:', res);
        setTopics(res || []);
      }
      setLoading(false);
    });
  }, [skilltreeId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [topics, selectedTopicId]);

  const createTopic = async e => {
    e.preventDefault();
    if (!topicTitle.trim()) {
      setError('Topic title is required');
      return;
    }

    setLoading(true);
    setError(null);

    // Backend method expects (forumTitle, skillTreeName)
    Meteor.call('insertForum', topicTitle.trim(), skilltreeId, err => {
      if (err) {
        console.error('Error creating topic:', err);
        setError('Failed to create topic: ' + err.message);
        setLoading(false);
      } else {
        // console.log('Topic created successfully:', res);
        // Refetch topics after successful insert
        Meteor.call('getSkillTreeForums', skilltreeId, (err2, res2) => {
          if (err2) {
            console.error('Error refetching topics:', err2);
            setError('Topic created but failed to refresh list');
          } else {
            setTopics(res2 || []);
            setTopicTitle('');
            setTopicDesc('');
          }
          setLoading(false);
        });
      }
    });
  };

  const sendMessage = e => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }
    if (selectedTopicId === null) {
      setError('No topic selected');
      return;
    }

    const currentUserId = Meteor.userId();
    if (!currentUserId) {
      setError('You must be logged in to send messages');
      return;
    }

    setLoading(true);
    setError(null);

    // console.log('Sending message with topic ID:', selectedTopicId);

    // Find the topic to get the correct forumId
    const topic = topics.find(t => t.forumId === selectedTopicId);

    if (!topic) {
      setError('Selected topic not found');
      setLoading(false);
      return;
    }

    // console.log('Found topic for messaging:', topic);

    // Backend method expects (forumId as Number, content, userId)
    Meteor.call(
      'addMessageToForum',
      topic.forumId,
      message.trim(),
      Meteor.user().username,
      err => {
        if (err) {
          console.error('Error sending message:', err);
          setError('Failed to send message: ' + err.message);
          setLoading(false);
        } else {
          // console.log('Message sent successfully:', res);
          // Refetch topics after successful message send to get updated messages
          Meteor.call('getSkillTreeForums', skilltreeId, (err2, res2) => {
            if (err2) {
              console.error('Error refetching topics after message:', err2);
              setError('Message sent but failed to refresh');
            } else {
              setTopics(res2 || []);
              setMessage('');
            }
            setLoading(false);
          });
        }
      }
    );
  };

  // Find the selected topic using forumId
  const selectedTopic = topics.find(t => t.forumId === selectedTopicId);

  // Debug log to see which topic is being displayed
  // useEffect(() => {
  //   if (selectedTopicId && selectedTopic) {
  //     console.log('Displaying topic:', {
  //       selectedTopicId,
  //       foundTopic: {
  //         title: selectedTopic.title,
  //         forumId: selectedTopic.forumId,
  //         messagesCount: selectedTopic.messages?.length || 0
  //       }
  //     });
  //   }
  // }, [selectedTopicId, selectedTopic]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-2">
        <NavigationMenu id={skilltreeId} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-2 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {selectedTopicId === null && (
        <form
          onSubmit={createTopic}
          className="p-3 bg-white border-b border-gray-300 space-y-2"
        >
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="New Topic Title"
            value={topicTitle}
            onChange={e => setTopicTitle(e.target.value)}
            disabled={loading}
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Description (optional)"
            value={topicDesc}
            onChange={e => setTopicDesc(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-[#328E6E] text-white px-4 py-2 rounded hover:bg-[#267a5c] disabled:opacity-50"
            disabled={loading || !topicTitle.trim()}
          >
            {loading ? 'Creating...' : 'Create Topic'}
          </button>
        </form>
      )}

      {loading && selectedTopicId === null ? (
        <div className="p-4 text-center">Loading topics...</div>
      ) : selectedTopicId === null ? (
        <TopicList
          topics={topics}
          onSelectTopic={id => {
            setSelectedTopicId(id);
          }}
        />
      ) : (
        <>
          <div className="bg-white border-b px-4 py-2">
            <h2 className="font-bold text-lg">
              {selectedTopic?.title || 'Topic'}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!selectedTopic?.messages || selectedTopic.messages.length === 0 ? (
              <div className="text-center text-gray-500 p-4">
                No messages yet. Be the first to start the conversation!
              </div>
            ) : (
              selectedTopic.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-3 rounded-lg shadow"
                >
                  <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full font-bold">
                    {msg.userId?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{msg.userId}</div>
                    <div className="text-gray-700">{msg.content}</div>
                    {msg.timestamp && (
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="p-3 bg-white border-t border-gray-300"
          >
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-full px-4 py-2"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-[#328E6E] text-white rounded-full px-4 py-2 hover:bg-[#267a5c] disabled:opacity-50"
                disabled={loading || !message.trim()}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
          <div className="p-3 bg-white border-t">
            <button
              className="bg-gray-300 text-black px-4 py-2 hover:bg-gray-400"
              onClick={() => setSelectedTopicId(null)}
              disabled={loading}
            >
              Back to Topics
            </button>
          </div>
        </>
      )}
    </div>
  );
};
