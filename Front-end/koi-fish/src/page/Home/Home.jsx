import React, { useState, useEffect } from 'react';
import Fullpage from '@fullpage/react-fullpage';
import Navbar from '../../components/navbar/Navbar';
import HeroSection from '../Home/home/HeroSection';
import News from '../Home/home/News';
import Posts from '../Home/home/Posts';
import Footer from '../../components/footer/Footer';
import KoiFish from '../Home/home/KoiFish';
import KoiPond from '../Home/home/KoiPond';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <div>
          {/* Mobile Layout */}
          <div className="section">
            <Navbar />
            <HeroSection />
          </div>
          <div className="section">
            <News />
            <KoiFish />
            <KoiPond />
            {/* <Posts /> */}
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
                    <HeroSection />
                  </div>

                  {/* Content Section */}
                  <div className="section">
                    <div className="mx-auto text-center w-full max-w-[80%]">
                      <div className="h-10" />
                      <News />
                      <div className="h-10" />
                      <KoiFish />
                      <div className="h-10" />
                      <KoiPond />
                      <div className="h-10" />
                      {/* <Posts /> */}
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
};

export default Home;
