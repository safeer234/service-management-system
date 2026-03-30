import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

function Chatbot() {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {

    const res =  await axios.post(
  "https://service-management-system-hj06.onrender.com/api/chatbot/ask",
  { message },
  {
    withCredentials: true
  }
);

      const botReply = {
        sender: "bot",
        text: res.data.reply
      };

      setMessages(prev => [...prev, botReply]);

    } catch  {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Something went wrong." }
      ]);
    }

    setLoading(false);

  };

  return (
    <div>

      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#ea580c] text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl flex flex-col">

          <div className="bg-[#ea580c] text-white p-3 rounded-t-xl font-semibold">
            ServiceHub AI Assistant
          </div>

          <div className="h-80 overflow-y-auto p-3 flex flex-col gap-2">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-400">AI is typing...</div>
            )}

          </div>

          <div className="flex border-t">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-[#ea580c] text-white px-4"
            >
              Send
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Chatbot;