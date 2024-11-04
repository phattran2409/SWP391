import { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaPaperPlane} from "react-icons/fa";
import { Link } from "react-router-dom";

const ChatBotTemplate = ({ children }) => {
    const [messages, setMessages] = useState([
        { id: 1, type: "bot", text: "Hello! I can assist you with Koi fish and pond feng shui. How can I help?", timestamp: new Date().toLocaleTimeString() },
        { id: 2, type: "bot", content: "buttons", options: ["Consult on feng shui for Koi fish", "Guidance on Koi fish care", "Pond design for Koi fish"], timestamp: new Date().toLocaleTimeString() },
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
        const userMessage = {
            id: messages.length + 1,
            type: "user",
            text: option,
            timestamp: new Date().toLocaleTimeString(),
        };

        let botResponseText = "";
        if (option === "Consult on feng shui for Koi fish") {
            botResponseText = (
                <>
                    Please: <Link to="/consulting" className="text-red-900 underline">Click here</Link> to calculate your element.
                </>
            );
        } else if (option === "Guidance on Koi fish care") {
            botResponseText = "Koi fish thrive in clean water and need a balanced diet. Is there a specific care question you have in mind?";
        } else if (option === "Pond design for Koi fish") {
            botResponseText = (
                <>
                    You should choose the elements suitable with your elements and the elements of fish, such as water with wood, not fire with water.
                    <br />
                    <br />
                    If you don`t know your elements please <Link to="/consulting" className="text-red-900 underline">Click here</Link> to calculate your element.
                </>
            );
        }

        const botResponse = {
            id: messages.length + 2,
            type: "bot",
            text: botResponseText,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
    };
    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-800">
            <div className="bg-gray-800 text-white pl-4 py-4 flex flex-rows items-center">
                    <FaRobot className="text-2xl mr-2" />
                    <h2 className="text-xl font-semibold end">Customer Care Bot</h2>
                    <div >{children}</div>
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
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "ml-2 bg-red-700 " : "bg-gray-300"}`}
                            >
                                {message.type === "user" ? (
                                    <FaUser className="text-white" />
                                ) : (
                                    <FaRobot className="text-black" />
                                )}
                            </div>
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${message.type === "user" ? "bg-red-500 text-white" : "bg-red-100 text-red-800"}`}
                            >
                                {message.content === "buttons" ? (
                                    <div className="space-y-2">
                                        {message.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleOptionClick(option)}
                                                className="w-full text-left px-3 py-1 bg-red-50 text-red-800 rounded hover:bg-red-300 transition duration-300 border border-red-900"
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
                    className="flex-grow px-4 py-2 border border-black rounded-l-lg focus:outline-none focus:ring-1 focus:ring-black"
                    aria-label="Type your message"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-gray-900 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    aria-label="Send message"
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default ChatBotTemplate;
