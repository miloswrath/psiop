import React, { useState, useImperativeHandle, forwardRef } from 'react';


const ChatBox = forwardRef(({ preMessageContent, interpretation }, ref) => {
  const [messages, setMessages] = useState([]);
  const [showPreMessage, setShowPreMessage] = useState(true);
  const [isPreMessageExiting, setIsPreMessageExiting] = useState(false);

  // Function to add a message from the user and fetch a bot response
  const addMessage = async (chatContent, originatingUser) => {
    const newMessage = { chatContent, originatingUser };
    if (originatingUser === 'user') {
      setMessages(prev => [...prev, newMessage]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentMessage: newMessage,
          previousMessages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Server response:', data);

      setMessages(prev => [
        ...prev,
        { chatContent: data.response, originatingUser: 'bot' },
      ]);
    } catch (error) {
      console.error('Error sending message to server:', error);
      setMessages(prev => [
        ...prev,
        { chatContent: `BEEP BOOP. ERROR CONNECTING TO API: \n \n${error}`, originatingUser: 'bot' },
      ]);
    }
  };

  useImperativeHandle(ref, () => ({
    addMessage,
  }));

  return (
    <div className="textbox" style={{ width: '100%' }}>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message ${msg.originatingUser === 'user' ? 'user-msg' : 'bot-msg'}`}
        >
          {msg.chatContent}
        </div>
      ))}
    </div>
  );
});

export default ChatBox;
