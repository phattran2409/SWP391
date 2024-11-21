import React, { useEffect, useState, useRef, useContext } from "react";
import api from "../../config/axios";
import Loading from '../../components/loading/Loading';
import '../../components/animation/fadein.css';
import AnimationReveal from '../../components/animation/AnimationReveal';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { CartContext } from '../../components/context/Cart'
import Cart from '../../components/Cart'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tag } from "antd";
const ShowPond = () => {
    const [ponds, setPonds] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const { cartItems, addToCart } = useContext(CartContext);
    const [showModal, setshowModal] = useState(false);
    const [activeItemId, setActiveItemId] = useState(null);
    const ref = useRef();
    const navigate = new useNavigate();  
    const [elementUser ,setElementUser] = useState();
    const [selectedCard, setSelectedCard] = useState([]); 
    const [selectNotSuitable, setSelectNotSuitable] = useState([]);

    // Fetch Koi Ponds from multiple API endpoints
    const fetchKoiPonds = async () => {
        try {
            const pondRequests = [];
            // Loop through 1 to 5 and create a list of promises for the requests
            for (let i = 1; i <= 6; i++) {
                pondRequests.push(api.get(`v1/pond/getByElement/${i}`));
            }

            // Resolve all promises and aggregate the results
            const responses = await Promise.all(pondRequests);
            const allPonds = responses.flatMap(response => response.data.data); // Combine data from all requests

            setPonds(allPonds);
        } catch (error) {
            console.error("Error fetching koi ponds:", error.response?.status, error.response?.data || error.message);
        }
    };
      const suitablePond = async (item) => {
        console.log(item.elementID);
        console.log(elementUser);
        
        const elementID_pond = item.elementID;
        const elementID_user = elementUser.elementID;

        try {
          const res = await api.post("v1/user/suitableKoi?object=0", {
            elementID_pond,
            elementID_user,
          });
          console.log(res.data);
          toast.success(res.data.message);

          setSelectedCard((prevSelected) =>
            prevSelected.includes(item._id)
              ? prevSelected.filter((cardID) => cardID !== item._id)
              : [...prevSelected, item._id]
          );
        } catch (error) {
          toast.info("Not Suitable");
          setSelectNotSuitable((prevSelected) => [...prevSelected, item._id]);
          console.log("message error : " + error.message);
        }
      };
    useEffect(() => {
        fetchKoiPonds(); // Fetch data when the component mounts
       const user = JSON.parse(localStorage.getItem("user"));
       console.log(user);
       if (user != null) { 
        setElementUser(user)
       }else {
        setElementUser(JSON.parse(localStorage.getItem("elementUser")));
       }
    }, []);
    // Loading 
    if (!ponds.length) {
        return (
            <div><Navbar />
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 max-w-[80%] mx-auto fade-in">
                    <Loading />
                </div>
            </div>
        );
    }
    // button show more 
    const handleShowMore = () => {
        setVisibleCount(ponds.length);
    };
    const handleActiveItem = (id) => { 
      setActiveItemId(id)
    }
    //  toggle Modal assess
    const toggle = () => {
    console.log(showModal);

    setshowModal(!showModal);
    };

    return (
      <div>
        <Navbar />
        <AnimationReveal>
          {/* Part 1: What is a Koi Pond? */}
          <section className="mb-10 h-full w-full bg-white rounded-xl p-6 lg:max-w-[80%] max-w-screen mx-auto bg-stone-200 p-6 rounded-xl shadow-md fade-in">
            <h2 className="text-3xl max-[425px]:text-xl max-[768px]:text-md font-bold text-center text-black mb-4">
              What is a Koi Pond?
            </h2>
            <p className="text-lg max-[425px]:text-sm max-[768px]:text-base text-justify text-gray-700">
              A Koi pond is a beautifully designed outdoor water feature
              specifically built to house koi fish. These ponds are known for
              their aesthetic appeal, and koi fish—often featuring vibrant
              colors—are prized for their beauty and symbolism. Koi ponds are
              not only about decoration; they bring a sense of tranquility and
              elegance to any garden or outdoor space. Koi fish can live for
              many decades, sometimes exceeding a century, making them a
              long-term and meaningful addition to any home.
            </p>
          </section>

          {/* Part 2: Why Do We Need a Feng Shui Koi Pond? */}
          <section className="mb-10 h-full w-full bg-white rounded-xl p-6 lg:max-w-[80%] max-w-screen mx-auto bg-stone-200 p-6 rounded-xl shadow-md fade-in">
            <h2 className="text-3xl max-[425px]:text-xl max-[768px]:text-md font-bold text-center text-black mb-4">
              Why Do We Need a Feng Shui Koi Pond?
            </h2>
            <p className="text-lg max-[425px]:text-sm max-[768px]:text-base text-justify text-gray-700">
              According to Feng Shui principles, water elements such as koi
              ponds are powerful sources of positive energy, attracting wealth,
              prosperity, and good fortune. The movement of water in a Feng Shui
              koi pond helps to circulate energy, creating balance and harmony
              within the environment. Proper placement and design of the pond,
              such as the direction of water flow and surrounding elements, are
              crucial in maximizing its benefits. A Feng Shui koi pond not only
              enhances the aesthetic beauty of your space but also plays a vital
              role in improving the overall energy of your home or garden,
              bringing a peaceful and prosperous atmosphere.
            </p>
          </section>

          <div className=" justify-between  flex ">
            <h2 className="text-5xl lg:text-4xl sm:text-4xl max-[1024px]:text-2xl max-[1024px]:text-center max-[1024px]:ml-0 font-bold mb-10 text-black text-left w-full ml-20 xl:ml-20 mx-auto">
              Koi Ponds
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
          <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 lg:max-w max-w-screen min-[1921px]:max-w-[80%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-20 gap-x-10">
              {ponds.slice(0, visibleCount).map((item, index) => (
                <div
                  key={item._id || index}
                  className={`flex flex-col group relative shadow bg-white text-black rounded-xl overflow-hidden sm:h-[800px] h-[600px] w-full sm:w-[80%] mx-auto fade-in border-2 border-gray-600
                   ${
                     activeItemId === item._id
                       ? "active  border-red-800 shadow-xl shadow-red-500"
                       : ""
                   }`}
                >
                  <div className="h-[50%] max-[500px]:h-[40%] max-[768px]:h-[45%]  w-full bg-white bg-center bg-no-repeat flex items-center justify-center">
                    <div
                      className="h-full w-full bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/ponddetail/${item._id}`)}
                    />
                  </div>

                  <div className="h-[50%] max-[500px]:h-[60%] max-[768px]:h-[55%] bg-white p-4 flex flex-col justify-between">
                    <h1 className="text-xl max-[768px]:text-lg font-semibold">
                      Shape: {item.shape}
                    </h1>

                    <p className="text-black text-justify max-[768px]:text-sm overflow-y-auto">
                      {item.description}
                    </p>
                    {/* Direction */}
                    <div className="flex items-center mt-2">
                      <span className="font-semibold max-[768px]:text-base">
                        Direction:
                      </span>
                      {item.direction.map((dir, idx) => (
                        <span key={idx} className="ml-2 max-[768px]:text-base">
                          {dir}
                        </span>
                      ))}
                    </div>
                    {/* tree */}
                    <div className="flex items-center mt-2">
                      <span className="font-semibold max-[768px]:text-base">
                        Trees:
                      </span>
                      <span className="ml-2 max-[768px]:text-base">
                        {item.trees}
                      </span>
                    </div>
                    {/* water flow  */}
                    <div className="flex items-center mt-2">
                      <span className="font-semibold max-[768px]:text-base">
                        Water Flow:
                      </span>
                      <span className="ml-2 max-[768px]:text-base">
                        {item.waterFlow}
                      </span>
                    </div>
                    {/* Light */}
                    <div className="flex items-center mt-2">
                      <span className="font-semibold max-[768px]:text-base">
                        Light:
                      </span>
                      <span className="ml-2 max-[768px]:text-base">
                        {item.light}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        suitablePond(item);
                        handleActiveItem(item._id);
                      }}
                      className="mt-4 px-4 py-2 max-[768px]:px-1 max-[768px]:py-1 text-black border-2 border-gray-300 rounded-lg bg-rounded-lg hover:bg-gray-200"
                    >
                      Calculate suitable
                    </button>
                    <button
                      onClick={() => {
                        addToCart(item);
                        handleActiveItem(item._id);
                      }}
                      className="mt-4 px-4 py-2 max-[768px]:px-1 max-[768px]:py-1 text-black border-2 border-gray-300 rounded-lg bg-rounded-lg hover:bg-gray-200"
                    >
                      {" "}
                      Assess
                    </button>

                    <div className="show-suitable w-full  outline-1">
                      {selectedCard.includes(item._id) && (
                        <div className="flex flex-col mt-1 items-center content-center">
                          <Tag color="#87d068">SUITABLE</Tag>
                        </div>
                      )}
                      {selectNotSuitable.includes(item._id) && (
                        <div className="flex flex-col mt-1 items-center content-center">
                          <Tag color="#f50">NOT SUITABLE </Tag>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < ponds.length && (
              <button
                onClick={handleShowMore}
                className="mt-10 px-4 py-2 text-black border rounded-lg hover:bg-gray-200"
              >
                Show More
              </button>
            )}
          </div>
          <Cart showModal={showModal} toggle={toggle} />
        </AnimationReveal>
        <Footer />
      </div>
    );
};

export default ShowPond;
