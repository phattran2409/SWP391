import React, { useState, useEffect } from 'react';
import Fullpage from '@fullpage/react-fullpage';
import Navbar from '../../components/navbar/Navbar';



import Footer from '../../components/footer/Footer.jsx';
import KoiFish from './homeSub/KoiFish.jsx';
import KoiPond from './homeSub/KoiPond.jsx';
import AnimationReveal from '../../components/animation/AnimationReveal'; // Assuming you have the AnimationReveal component

import HeroSection from './homeSub/HeroSection.jsx';
import News from './homeSub/News.jsx';
// import Posts from '../Home/home/Posts';
import Welcome from './homeSub/Welcome.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from '../../components/context/toastContext.jsx';




const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // useNavigate từ react-router-dom

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();


    window.addEventListener('resize', handleResize);

    // Add event listener
    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const location = useLocation();
  //  thông báo đăng nhập thành công
  useEffect(() => {
    // Kiểm tra nếu có message trong state, hiển thị toast
    console.log(location); 
   
    if(location.search == "?status=login_gg_success") {
      toast.success("Login successfull ");
    } 
    if (location.search == "?status=logout_success")  toast.success("Logout Successfull");
      
  }, [location.search]);
  //  

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
            <AnimationReveal>
            <div className="h-10" />
              <News />
              <div className="h-10" />
              <KoiFish />
              <div className="h-10" />
              <KoiPond />
              <div className="h-10" />
            </AnimationReveal>
            <Footer />
          </div>
        </div>
      ) : (
        <Fullpage
          scrollingSpeed={1000}
          render={() => {

          // render={({ state, fullpageApi }) => {

            return (
              <div>
                <Fullpage.Wrapper>
                  <div className="section">
                    <Navbar />
                    <HeroSection />
                  </div>

                  {/* Content Section */}
                  <div className="section">
                    <div className="mx-auto text-center w-full max-w-[90%]">
                      <div className="h-10" />
                      <AnimationReveal>
                        <News />
                        <div className="h-10" />
                        <KoiFish />
                        <div className="h-10" />
                        <KoiPond />
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
};

export default Home;
