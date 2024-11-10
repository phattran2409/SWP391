import { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaPaperPlane} from "react-icons/fa";
import { Link } from "react-router-dom";
import SocialLinks from "../social-link/SocialLinks.jsx";
import Navbar from "../navbar/Navbar.jsx";
import ChatBotTemplate from "./botchat-template.jsx";

const ChatBot = () => {
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
        <>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen bg-white">
        <ChatBotTemplate />
        </div>
        </>
    );
};

export default ChatBot;
