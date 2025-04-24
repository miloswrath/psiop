import React, { useState } from "react";
import "./UserInputBox.css";

function UserInputBox({ addMessage }) {
  const [userQuery, setUserQuery] = useState("");

  const handleInputChange = (e) => setUserQuery(e.target.value);

  const handleSendMessage = async () => {
    if (userQuery.trim() === "") return;
    await addMessage(userQuery, "user");
    setUserQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="user-input-container">
      <input
        type="text"
        value={userQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Ask a question..."
        className="user-input"
      />
    </div>
  );
}

export default UserInputBox;
