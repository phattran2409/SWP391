import React, { useState, useEffect } from 'react';
import Fullpage from '@fullpage/react-fullpage';
import Navbar from '../../components/navbar/Navbar';
import HeroSection from '../Home/home/HeroSection';
import News from '../Home/home/News';
// import Posts from '../Home/home/Posts';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div>
      <Navbar />
      {isMobile ? (
        <div>
          <div className="section">
            <HeroSection />
          </div>
          <div className="section">
            <News />
            {/* <Posts /> */}
            <Footer />
          </div>
        </div>
      ) : (
        <Fullpage
          scrollingSpeed={1000} 
          render={({ state, fullpageApi }) => {
            return (
              <div>
                <Fullpage.Wrapper>
                  <div className="section">
                    <HeroSection />
                  </div>
                  <div className="section">
                    <News />
                    {/* <Posts /> */}
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
      `}</style>
    </div>
    
  );
};

export default Home;