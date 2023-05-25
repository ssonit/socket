import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Chat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("user-chat", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("user-chat");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;

    socket.emit("chat", {
      name: "son",
      message: value,
    });

    setValue("");
  };
  return (
    <div>
      <h2>Chat app real time</h2>

      <ul>
        {messages.map((item, index) => (
          <li key={index}>
            {item.name}: {item.message}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          name="message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default Chat;
