import React, { useContext, useEffect, useState } from "react";
import api from "../../config/axios";
import Loading from "../../components/loading/Loading";
import "../../components/animation/fadein.css";
import AnimationReveal from "../../components/animation/AnimationReveal";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { CartContext } from "../../components/context/Cart";
import Cart from "../../components/Cart.jsx";
import { Card } from "antd";
import { yellow } from "@mui/material/colors";
import { Link , redirect , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
const ShowFish = () => {
  const [fishs, setFish] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const { cartItems, addToCart } = useContext(CartContext);
  const [showModal, setshowModal] = useState(false);
  const [activeItemId , setActiveItemId] = useState(null);
  const  navigate = new useNavigate();
  // Fetch Koi Fish from API
  const fetchKoiFish = async () => {
    try {
      const response = await api.get("/v1/fish?page=1&limit=17");
      setFish(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching koi fish:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchKoiFish();
  }, []);

  if (!fishs.length) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 max-w-[80%] mx-auto fade-in">
          <Loading />
        </div>
      </div>
    );
  }

  const colorToHex = (color) => {
    const colorMap = {
      Blue: "#0000FF",
      Red: "#FF0000",
      White: "#FFFFFF",
      Green: "#008000",
      Yellow: "#FFD700",
    };
    return colorMap[color] || "#000";
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };
  const handleActiveItem = (id) => { 
    setActiveItemId(id)
  }

  const toggle = () => {
    console.log(showModal);

    setshowModal(!showModal);
  };

  console.log( "active  item id " + activeItemId);
  
  return (
    <div>
      <Navbar />
      <AnimationReveal>
        <section className="mb-10 h-full w-full bg-white rounded-xl p-6 lg:max-w-[80%] max-w-screen mx-auto bg-stone-200 p-6 rounded-xl shadow-md fade-in">
          <h2 className="text-3xl max-[425px]:text-xl max-[768px]:text-md font-bold text-center text-black mb-4">
            What is a Koi Fish?
          </h2>
          <p className="text-lg max-[425px]:text-sm max-[768px]:text-base text-justify text-gray-700">
            Koi fish, a domesticated variety of the common carp, are known for
            their striking colors and are often kept for decorative purposes in
            outdoor koi ponds or water gardens. Originating in Japan, koi fish
            have become symbols of luck, prosperity, and perseverance in
            Japanese culture. These resilient fish can live for decades,
            sometimes even surpassing a century. Their vivid color patterns,
            serene nature, and unique appearance make them a popular addition to
            ornamental ponds around the world.
          </p>
        </section>

        <section className="mb-10 h-full w-full bg-white rounded-xl p-6 lg:max-w-[80%] max-w-screen mx-auto bg-stone-200 p-6 rounded-xl shadow-md fade-in">
          <h2 className="text-3xl max-[425px]:text-xl max-[768px]:text-md font-bold text-center text-black mb-4">
            Why Do We Need Feng Shui Koi Fish?
          </h2>
          <p className="text-lg max-[425px]:text-sm max-[768px]:text-base text-justify text-gray-700">
            Feng Shui koi fish are highly regarded for their ability to bring
            harmony, prosperity, and positive energy into a space. According to
            Feng Shui principles, koi fish symbolize wealth, good fortune, and
            resilience. The graceful movement of koi fish in a pond is believed
            to generate life-affirming energy, known as Chi, that enhances the
            flow of abundance and success. By incorporating koi fish into a Feng
            Shui-designed environment, individuals aim to attract balance,
            serenity, and prosperity, making them a powerful element in the
            pursuit of a harmonious and successful life.
          </p>
        </section>
        <div className=" justify-between  flex ">
          <h2 className="text-5xl lg:text-4xl sm:text-4xl max-[1024px]:text-2xl max-[1024px]:text-center max-[1024px]:ml-0 font-bold mb-10 text-black text-left w-full ml-20 xl:ml-20 mx-auto">
            Koi Fish
          </h2>
          {!showModal && (
            <button
              className="mb-10 sticky h-[30px] sm:h-[40px] md:h-[50px] lg:h-[50px] sm:w-[100px] md:w-[200px] lg:w-[300px] px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={toggle}
            >
              <p className="text-white text-[7px] sm:text-[10px] md:text-[10px] lg:text-sm xl:text-sm font-bold uppercase ">
                Assess suitability ({cartItems.length})
              </p>
            </button>
          )}
        </div>
        <div className="relative flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 lg:max-w max-w-screen min-[1921px]:max-w-[80%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-10 max-[1921px]:gap-x-0">
            {fishs.slice(0, visibleCount).map((item, index) => (
              <div
                key={item._id || index}
                className={`flex flex-col group relative shadow bg-white text-black rounded-xl overflow-hidden h-[600px] max-[1920px]:h-[500px] max-[768px]:h-[400px] w-full sm:w-[80%] mx-auto fade-in border-2 border-gray-600 ${
                  activeItemId === item._id ? "active border-red-800 shadow-xl shadow-red-500" : ""
                }`}
              >
                <div className="h-[50%] max-[500px]:h-[40%] max-[768px]:h-[45%]  w-full bg-white bg-center bg-no-repeat flex items-center justify-center">
                  <div
                    className="h-full w-full bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundColor: "white",
                      cursor : "pointer"
                    }}
                    onClick={() => {navigate(`/koidetail/${item._id}`)}}
                  />
                  
                </div>

                <div className=" h-[50%] max-[500px]:h-[60%] max-[768px]:h-[55%] bg-white p-4 flex flex-col justify-between overflow-y-auto">
                  <h1 className="text-xl max-[768px]:text-lg font-semibold">
                    {item.koiName}
                  </h1>
                  <p className="text-black text-justify max-[768px]:text-sm overflow-y-auto max-h-[80%]">
                    {item.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="font-semibold max-[768px]:text-base">
                      Color:
                    </span>
                    {item.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="ml-2 w-4 h-4 max-[768px]rounded-full border border-black"
                        style={{ backgroundColor: colorToHex(color) }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => { addToCart(item); handleActiveItem(item._id) } }
                    className="mt-4 px-4 py-2 max-[768px]:px-1 max-[768px]:py-1 text-black border-2 border-gray-300 rounded-lg bg-rounded-lg hover:bg-gray-200"
                  >
                    assess
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Cart showModal={showModal} toggle={toggle} />

          {visibleCount < fishs.length && (
            <button
              onClick={handleShowMore}
              className="mt-10 px-4 py-2 text-black border rounded-lg hover:bg-gray-200"
            >
              Show More
            </button>
          )}
        </div>
      </AnimationReveal>
      <Footer />
    </div>
  );
};

export default ShowFish;