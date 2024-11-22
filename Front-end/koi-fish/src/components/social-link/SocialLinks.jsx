import { Link } from 'react-router-dom';
import { FaFacebook} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import { CommentOutlined, LeftOutlined } from '@ant-design/icons';

const SocialLinks = () => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 767);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
        }, );

        return () => clearInterval(interval);
    }, []);

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
                </>
            )}
        </div>
    );
};

export default SocialLinks;
