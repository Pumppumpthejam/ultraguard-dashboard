import React, { useState } from 'react';

const AIAssistantCard = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('Hello! How can I assist you today?');

  const handleSubmit = () => {
    if (!input.trim()) return;
    setResponse(`🤖 Responding to: "${input}"`);
    setInput('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl flex flex-col">
      <h2 className="text-lg font-semibold mb-2">AI Assistant</h2>

      <div className="flex-1 bg-gray-100 p-3 rounded mb-4 text-sm text-gray-700">
        {response}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistantCard;
