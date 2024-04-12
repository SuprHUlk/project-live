import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Props {
  roomId: string;
}

const Chat: React.FC<Props> = ({ roomId }) => {
  const [messages, setMessages] = useState<
    { roomId: string; text: string; timeStamp: Date; _id: any }[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.emit("join room", roomId);

    newSocket.on(
      "chat message",
      (msg: { roomId: string; text: string; timeStamp: Date; _id: any }) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    );

    newSocket.on(
      "load messages",
      (
        loadedMessages: {
          roomId: string;
          text: string;
          timeStamp: Date;
          _id: any;
        }[]
      ) => {
        setMessages(loadedMessages);
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat message", { roomId: roomId, msg: message });
      setMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg: any) => (
          <li key={msg._id.toString()}>{msg.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
