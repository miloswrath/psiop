import React, { useState, useImperativeHandle, useRef } from "react";
import "./Textbox.css";
import UserInputBox from "../../AI/UserInputBox";
import ChatProfileBubble from "../../AI/ChatProfileBubble";

const TextBox = ({ text, size = "250px" }) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleClick = () => {
    setShowChat(true);
  };

  const addMessage = async (chatContent, originatingUser) => {
    const newMessage = { chatContent, originatingUser };
    setMessages((prev) => [...prev, newMessage]);

    if (originatingUser === "user") {
      try {
        const response = await fetch("http://localhost:8000/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentMessage: newMessage,
            previousMessages: messages,
          }),
        });

        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          { chatContent: data.response, originatingUser: "bot" },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            chatContent: `⚠️ Error reaching the AI: \n\n${error.message}`,
            originatingUser: "bot",
          },
        ]);
      }
    }
  };

  return (
    <>
      {!showChat ? (
        <div
          className="textbox"
          style={{ width: size, cursor: "pointer" }}
          onClick={handleClick}
        >
          {text}
          <div className="textbox-hint">(Click to chat)</div>
        </div>
      ) : (
        <div className="textbox chatbox-mode" style={{ width: "100%" }}>
          <button onClick={() => setShowChat(false)} className="back-button">
            ⬅ Back
          </button>

          {/* Chat messages */}
          <div className="chat-scroll-area">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.originatingUser === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.chatContent}
              </div>
            ))}
          </div>

          {/* Input area */}
          <UserInputBox addMessage={addMessage} />
        </div>
      )}
    </>
  );
};

export default TextBox;
