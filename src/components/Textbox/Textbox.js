import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./Textbox.css";
import UserInputBox from "../../AI/UserInputBox";

const TextBox = ({ text, size = "250px", results }) => {
  console.log({results})
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    { chatContent: text, originatingUser: "bot" },
  ]);
  const realResults = `Results from Upper:\n${JSON.stringify(results, null, 2)}`;
  console.log(`Real Results: ${realResults}`)

  const bottomRef = useRef(null);

  // 2. scroll whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const addMessage = async (chatContent, originatingUser) => {
  // 1) Build a *pure* message object
  const newMessage = { chatContent, originatingUser };
  const history    = [...messages, newMessage];
  setMessages(history);

  // 2) If the user just sent a message, call your API
  if (originatingUser === "user") {
    try {
      // 2a) Pack up the payload: current turn, full history, plus your results
      const payload = {
        currentMessage:    newMessage,
        previousMessages:  history,
        results:           realResults
      };

      // 2b) Fire off the POST
      const res = await fetch("http://localhost:8000/api/messages", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      // 2c) Parse & append the bot’s reply
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { chatContent: data.response, originatingUser: "bot" },
      ]);
    } catch (err) {
      // 2d) On error, show a failure message from “bot”
      setMessages((prev) => [
        ...prev,
        {
          chatContent: `⚠️ Error reaching the AI:\n${err.message}`,
          originatingUser: "bot",
        },
      ]);
    }
  }
};

  const handleClick = () => setShowChat(true);

  return (
    <>
      {!showChat ? (
        <div
          className="textbox text-lg leading-relaxed"
          style={{ width: size, cursor: "pointer" }}
          onClick={handleClick}
        >
          {text}
          <div className="textbox-hint">(Click to chat)</div>
        </div>
      ) : (
        <div className="textbox chatbox-mode" style={{ width: "100%" }}>
          {/* Chat messages */}
          <div className="chat-scroll-area">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${
                  msg.originatingUser === "user" ? "user-msg" : "bot-msg"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  skipHtml={false}              // allow raw HTML
                >
                  {msg.chatContent}
                </ReactMarkdown>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <UserInputBox addMessage={addMessage} />
        </div>
      )}
    </>
  );
};

export default TextBox;
