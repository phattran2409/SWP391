import { Link } from 'react-router-dom';
import { FaFacebook, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import ChatBotTemplate from '../bot-chat/botchat-template';
import { FloatButton } from 'antd';
import { CommentOutlined, LeftOutlined } from '@ant-design/icons';

const SocialLinks = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isChatHidden, setIsChatHidden] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 767);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        setIsChatHidden(false);
    };

    const handleHideChat = () => {
        setIsChatHidden(true);
    };

    return (
        <div className="fixed z-30">
            {/* Kiểm tra nếu là màn hình nhỏ (767px hoặc nhỏ hơn) thì hiển thị 3 nút trong FloatButton.Group */}
            {isMobileView ? (
                <FloatButton.Group
                    trigger="click"
                    placement="left"
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                    }}
                    icon={<LeftOutlined />}
                >
                    <Link to="https://zalo.me/0383329357" target="_blank" rel="noopener noreferrer">
                        <FloatButton
                            icon={
                                <img
                                    src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1730632858/zalo-icon-circle-1_mzdgxm.png"
                                    alt="Zalo Logo"
                                    className="w-6 h-6"
                                />
                            }
                        />
                    </Link>
                    <Link to="https://www.facebook.com/profile.php?id=61567880709547" target="_blank" rel="noopener noreferrer">
                        <FloatButton icon={<FaFacebook size={24} />} />
                    </Link>
                    <Link  to="/botchat">
                    <FloatButton icon={<CommentOutlined />} />
                    </Link>
                    
                </FloatButton.Group>
            ) : (
                // Nếu là màn hình lớn hơn 767px thì hiển thị 3 nút riêng lẻ
                <>
                    <Link
                        to="https://zalo.me/0383329357"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed left-4 top-40 text-white"
                        aria-label="Chat with us on Zalo"
                    >
                        <img
                            src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1730632858/zalo-icon-circle-1_mzdgxm.png"
                            alt="Zalo Logo"
                            className="w-12 h-12 rounded-full shadow-lg"
                        />
                    </Link>

                    <Link
                        to="https://www.facebook.com/profile.php?id=61567880709547"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed left-4 top-24 bg-blue-900 text-white rounded-full p-3 shadow-lg hover:bg-blue-767 transition duration-300"
                        aria-label="Chat with us on Facebook"
                    >
                        <FaFacebook size={24} />
                    </Link>

                    <button
                        className="fixed left-4 bottom-4 bg-white rounded-full p-2 shadow-lg"
                        aria-label="Chat with us"
                        onClick={handleOpenChat}
                    >
                        <CommentOutlined className="text-lg text-black" />
                    </button>
                </>
            )}

            {/* Thông báo và Chat Window */}
            <div className="fixed left-4 bottom-4 items-start md:flex space-x-2 hidden ">
            <button
                    className="bg-white text-white"
                    aria-label="Chat with us"
                    onClick={handleOpenChat}
                >
                    <div className="overflow-hidden w-20 h-40 border-2 border-black ">
                        <img
                            src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif"
                            alt="Bot Chat Logo"
                            className="w-full h-full object-cover "
                        />
                    </div>
                </button>
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

            {!isChatHidden && isChatOpen && (
                <div className="bg-white shadow-lg rounded-lg fixed bottom-20 left-28">
                    <ChatBotTemplate>
                        <div className="flex justify-end">
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
