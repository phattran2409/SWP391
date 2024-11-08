import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from "../../../components/navbar/Navbar.jsx";
import Footer from '../../../components/footer/Footer.jsx';
import AnimationReveal from '../../../components/animation/AnimationReveal.jsx';
import Fullpage from '@fullpage/react-fullpage';
import SocialLinks from '../../../components/social-link/SocialLinks.jsx';
import DetailContent from './detailcontent.jsx';
import DetailBanner from './detailbanner.jsx';

export default function Test() {
    const [isMobile, setIsMobile] = useState(false);
    // const navigate = useNavigate();

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
            <div className='fixed z-50 bottom-5 right-5'>
                <SocialLinks />
            </div>

            {isMobile ? (
                <div>
                    {/* Mobile Layout */}
                    <div className="section">
                        <Navbar />
                        <DetailBanner />
                        </div>
                    <div className="section">
                        <AnimationReveal>
                            <div className="h-10" />
                            <DetailContent />
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
                                        <DetailBanner />
                                    </div>
                                    <div className="section">
                                        <div className="mx-auto text-center w-full max-w-[90%]">
                                            <div className="h-10" />
                                            <AnimationReveal>
                                                <div className="h-10" />
                                                <DetailContent />
                                                <div className="h-10" />
                                            </AnimationReveal>
                                            <div className="h-10" />
                                        </div>

                                    </div>
                                    <div className="section bg-black">
                                        <Footer>
                                        </Footer    >
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
