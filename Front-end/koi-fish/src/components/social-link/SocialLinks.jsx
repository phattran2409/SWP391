        import { Link } from 'react-router-dom';
        import { FaFacebook, FaTimes } from 'react-icons/fa';
        import { useEffect, useState } from 'react';
        import ChatBotTemplate from '../bot-chat/botchat-template';


        const SocialLinks = () => {
            const [isVisible, setIsVisible] = useState(true);
            const [isChatOpen, setIsChatOpen] = useState(false);
            const [isChatHidden, setIsChatHidden] = useState(false); // Trạng thái để ẩn chatbot

            useEffect(() => {
                const interval = setInterval(() => {
                    setIsVisible((prev) => !prev);
                }, 30000);

                return () => clearInterval(interval);
            }, []);

            const handleCloseNotification = () => {
                setIsVisible(false);
            };

            const handleOpenChat = () => {
                setIsChatOpen(true);
                setIsVisible(false);
                setIsChatHidden(false); // Đảm bảo rằng chatbot không bị ẩn
            };

            const handleHideChat = () => {
                setIsChatHidden(true); // Ẩn chatbot
            };

            return (
                <div className='fixed z-30 '>
                    {/* Zalo Link */}
                    <Link
                        to="https://zalo.me/0383329357"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed left-4 top-8 text-white"
                        aria-label="Chat with us on Zalo"
                    >
                        <img
                            src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1730632858/zalo-icon-circle-1_mzdgxm.png"
                            alt="Zalo Logo"
                            className="w-12 h-12 rounded-full shadow-lg"
                        />
                    </Link>

                    {/* Facebook Link */}
                    <Link
                        to="https://www.facebook.com/profile.php?id=61567880709547"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed left-4 top-24 bg-blue-900 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition duration-300"
                        aria-label="Chat with us on Facebook"
                    >
                        <FaFacebook size={24} />
                    </Link>

                    {/* Bot Chat Link */}
                    <div className="fixed left-4 bottom-4 flex items-start space-x-2">
                        <button
                            className="bg-white text-white"
                            aria-label="Chat with us"
                            onClick={handleOpenChat}
                        >
                            <div className="overflow-hidden w-20 h-40 border-2 border-black ">
                                <img
                                    src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif"
                                    alt="Bot Chat Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>

                        {/* Conditional rendering for the message */}
                        {isVisible && (
                            <div className="bg-gray-800 text-white text-sm rounded-md pl-4 pr-6 py-4 shadow-lg flex items-center">
                                <span>How can I help you today?</span>
                                <button
                                    onClick={handleCloseNotification}
                                    className="absolute top-1 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
                                    aria-label="Close notification"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Chat Window */}
                    {!isChatHidden && isChatOpen && ( // Kiểm tra trạng thái isChatHidden
                        <div className="bg-white shadow-lg rounded-lg fixed bottom-20 left-28">

                            <ChatBotTemplate>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={handleHideChat}
                                        className="ml-28 border-2 border-white hover:border-gray-400 rounded-md text-white hover:text-gray-400"
                                    >
                                        <FaTimes className="text-2xl" />
                                    </button>
                                </div>
                            </ChatBotTemplate>
                        </div>
                    )}
                </div>
            );
        };

        export default SocialLinks;
