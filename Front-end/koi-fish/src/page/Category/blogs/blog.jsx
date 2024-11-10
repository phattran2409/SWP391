import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../components/navbar/Navbar";
import Footer from '../../../components/footer/Footer.jsx';
import BlogsArticles from './blogarticles.jsx';
import BlogBanner from './blogbanner.jsx';
import AnimationReveal from '../../../components/animation/AnimationReveal.jsx';
import Fullpage from '@fullpage/react-fullpage';
import SocialLinks from '../../../components/social-link/SocialLinks.jsx';

export default function Test() {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            {/* Đặt SocialLinks ở đây để có thuộc tính fixed */}
            <div className='fixed z-50 bottom-5 right-5'>
                <SocialLinks />
            </div>

            {isMobile ? (
                <div>
                    {/* Mobile Layout */}
                    <div className="section">
                        <Navbar />
                        <BlogBanner />
                    </div>
                    <div className="section">
                        <AnimationReveal>
                            <div className="h-10" />
                            <BlogsArticles />
                            <div className="h-10" />
                        </AnimationReveal>
                        <Footer />
                    </div>
                </div>
            ) : (
                <Fullpage
                    scrollingSpeed={1000}
                    render={() => {
                        return (
                            <div>
                                <Fullpage.Wrapper>
                                    <div className="section">
                                        <Navbar />
                                        <BlogBanner />
                                    </div>
                                    <div className="section">
                                        <div className="mx-auto text-center w-full max-w-[90%]">
                                            <div className="h-10" />
                                            <AnimationReveal>
                                                <div className="h-10" />
                                                <BlogsArticles />
                                                <div className="h-10" />
                                            </AnimationReveal>
                                            <div className="h-10" />
                                        </div>
                                        <Footer />
                                        
                                    </div>
                                    
                                    
                                    
                                </Fullpage.Wrapper>
                            </div>
                        );
                    }}
                />
            )}
            <style>{`
                .fp-watermark {
                  display: none;
                }
                .section {
                  height: 100vh;
                }
            `}</style>
        </div>
    );
}
