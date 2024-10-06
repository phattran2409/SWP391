import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaPaperPlane } from "react-icons/fa";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: "bot", text: "Hello! How can I assist you today?", timestamp: new Date().toLocaleTimeString() },
    { id: 2, type: "user", text: "I'm having trouble with my order.", timestamp: new Date().toLocaleTimeString() },
    { id: 3, type: "bot", text: "I'm sorry to hear that. Can you please provide me with your order number?", timestamp: new Date().toLocaleTimeString() },
    { id: 4, type: "user", text: "Sure, it's ORD123456.", timestamp: new Date().toLocaleTimeString() },
    { id: 5, type: "bot", text: "Thank you. I've found your order. What specific issue are you experiencing?", timestamp: new Date().toLocaleTimeString() },
    { id: 6, type: "bot", content: "buttons", options: ["Wrong item received", "Item damaged", "Order delayed"], timestamp: new Date().toLocaleTimeString() },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      simulateBotResponse();
    }
  };

  const simulateBotResponse = () => {
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        text: "Thank you for providing that information. Our team will look into this issue and get back to you shortly.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleOptionClick = (option) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      text: option,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    simulateBotResponse();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-black">
        <div className="bg-black text-white p-4 flex items-center">
          <FaRobot className="text-2xl mr-2" />
          <h2 className="text-xl font-semibold">Customer Care Bot</h2>
        </div>
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto p-4 space-y-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end space-x-2 ${message.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-black" : "bg-gray-300"}`}
                >
                  {message.type === "user" ? (
                    <FaUser className="text-white" />
                  ) : (
                    <FaRobot className="text-black" />
                  )}
                </div>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${message.type === "user" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                >
                  {message.content === "buttons" ? (
                    <div className="space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left px-3 py-1 bg-white text-black rounded hover:bg-gray-100 transition duration-300 border border-black"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>{message.text}</p>
                  )}
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-black p-4 flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Type your message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
