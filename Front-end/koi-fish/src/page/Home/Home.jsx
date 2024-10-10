import React, { useState, useEffect } from 'react';
import Fullpage from '@fullpage/react-fullpage';
import Navbar from '../../components/navbar/Navbar';
import HeroSection from './homeSub/HeroSection';
import News from './homeSub/News';
// import Posts from '../Home/home/Posts';
import Footer from '../../components/footer/Footer';
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

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
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