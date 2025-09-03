import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const GeneralForum = () => {
  const { skilltreeId } = useParams(); // <-- Get skilltreeId from URL

  // Mock messages for now, you can later filter by skilltreeId or fetch real data
  const [messages, setMessages] = useState([
    { id: 1, username: 'Alice', text: 'Hey everyone!', createdAt: new Date() },
    {
      id: 2,
      username: 'Lisa',
      text: 'Hi Alice! How are you?',
      createdAt: new Date()
    },
    {
      id: 3,
      username: 'Charlie',
      text: 'Welcome to the community forum',
      createdAt: new Date()
    }
  ]);

  const [message, setMessage] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        username: 'You',
        text: message,
        createdAt: new Date()
      }
    ]);
    setMessage('');
  };

  const handleInputChange = e => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#328E6E] text-white px-4 py-3 font-bold text-lg shadow">
        General Forum - Skill Tree {skilltreeId}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className="flex items-start gap-3 bg-white p-3 rounded-lg shadow"
          >
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

      {/* Input bar */}
      <form
        onSubmit={sendMessage}
        className="p-3 bg-white border-t border-gray-300 flex gap-2"
      >
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-[#328E6E] text-white rounded-full px-4 py-2 hover:bg-[#267a5c]"
        >
          Send
        </button>
      </form>
    </div>
  );
};
