import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  
  LoadingOutlined,
} from "@ant-design/icons";
import { Layout, } from "antd";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Popconfirm,
  Upload,
  Image,
  DatePicker,
  Badge,
  Tag,
  Avatar,
  Spin,
  Row,
  Col,
  Card,
  Skeleton,
} from "antd";
import Navbar from "../../components/navbar/Navbar";
import Calculator from "../../components/Fengshui-Calcultor/Calculator";
import "./consulting.css";
import { CgEnter } from "react-icons/cg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoFish, IoNewspaper } from "react-icons/io5";
import { SiSpond } from "react-icons/si";
import api from "../../config/axios";
import { toast } from "react-toastify";
import ContentLoader from "react-content-loader";
import Item from "antd/es/list/Item";
import parse from "html-react-parser";
import Loading from "../../components/loading/Loading";
import Footer from "../../components/footer/Footer";
import AdPopUp from "../../components/Ads/PopUp-ads";
import SliderPopUp from "../../components/Ads/slideAds";
import AnimationReveal from "../../components/animation/AnimationReveal"
export default function Consulting() {
  const [value, setvalue] = useState({});
  // const [valueElement , setValueElement] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCard , setLoadingCard] = useState(false);
  const [koi, setKoi] = useState([]);
  const [pond, setPond] = useState([]);
  const [post, setPost] = useState([]);
  const [ads , setAds] = useState([]);
  const colorArray = ["gray", "green", "blue", "red", "#450803"];
  const textColor = ["#3333", "#ffff", "#ffff", "#ffff", "#ffff"];

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSetValue = (data) => {
    setvalue(JSON.parse(data));
  };

  const handleSetLoading = (data) => {
    setLoading(data);
  };

  //  API get koi by element ID
  const handleAPIKoi = async () => {
    console.log("value element ID : " + value.elementID);

    try {
      const res = await api.get(
        `v1/fish/getKoiElement/${value.elementID || elementID}`
      );
      const resPond = await api.get(
        `v1/pond/getByElement/${value.elementID || elementID}`
      );
      const resPost = await api.get(
        `/v1/post/getPostByElementID/${value.elementID}?categoryID=${2}`
      );
      const resAds = await api.get(
        `/v1/post/getPostByElementID/${value.elementID}?categoryID=3`
      );
      
      console.log("ADS object"+ typeof resAds.data);
      

      setKoi(res.data.data || []);
      setPond(resPond.data.data || []);
      setPost(resPost.data.data || []);
      setAds(resAds.data.data ||  []);
      setLoadingCard(false)
      
      console.log(ads);
      
    } catch (err) {
      toast.error(err.errorCode);
    }
  };
  //  handleAPIKoi();

  useEffect(() => {
    // setValueElement(JSON.stringify(localStorage.getItem("elementUser")));
    setvalue(JSON.parse(localStorage.getItem("elementUser")));
    console.log("hooks " + value);
  }, []);

  useEffect(() => {
    if (value) {
      console.log("thuc hien call api ");
      setLoadingCard(true);
      setTimeout(() => {
        handleAPIKoi();
      }, 1000);
      
      
    }
  }, [value]);
  

  

  return (
    <>
      <div className="w-full overflow-visible sm:overflow-visible">
        <Navbar className="w-full" />

        <div className="max-w-full h-full">
          
            <div className="flex justify-center">
              <Calculator
                setvalue={handleSetValue}
                setLoading={handleSetLoading}
              />
            </div>

            <div className="container  mx-auto">
              <div className="tag-result mt-12">
                {value &&
                  (loading ? (
                    <Spin
                      className="flex text-4xl h-96 justify-center"
                      indicator={<LoadingOutlined spin />}
                      size="large"
                    />
                  ) : (
                    <h1 className="text-xl lg:text-4xl md:text-3xl sm:text-xl font-bold text-center">
                      Your Element is{" "}
                      <Tag
                        className="text-xl sm:text-4xl lg:text-4xl"
                        color={colorArray[value.elementID - 1]}
                      >
                        {value.element}
                      </Tag>
                    </h1>
                  ))}
              </div>
            </div>

            <div className="w-full h-full">
               { value ?  (
                <>
              {/* Koi Fish */}
              <div className="container mx-auto px-4">
                {loadingCard ? (
                  <ContentLoader
                    viewBox="0 0 1644 360"
                    height={360}
                    width="100%"
                  >
                    <rect
                      x="448"
                      y="30"
                      rx="0"
                      ry="0"
                      width="750"
                      height="300"
                    />
                    <rect
                      x="239"
                      y="53"
                      rx="0"
                      ry="0"
                      width="643"
                      height="254"
                    />
                    <rect
                      x="30"
                      y="76"
                      rx="0"
                      ry="0"
                      width="527"
                      height="208"
                    />
                    <rect
                      x="762"
                      y="53"
                      rx="0"
                      ry="0"
                      width="643"
                      height="254"
                    />
                    <rect
                      x="1087"
                      y="76"
                      rx="0"
                      ry="0"
                      width="527"
                      height="208"
                    />
                  </ContentLoader>
                ) : (
                  <h1 className="text-left text-xl sm:text-4xl text-slate-700 my-10 font-bold flex items-center">
                    Your Suggested Koi{" "}
                    <IoFish className="ml-5 text-2xl sm:text-4xl" />
                  </h1>
                )}
                <div>
                  {loading ? (
                    <ContentLoader
                      viewBox="0 0 1644 360"
                      height={360}
                      width="100%"
                    >
                      <rect
                        x="448"
                        y="30"
                        rx="0"
                        ry="0"
                        width="750"
                        height="300"
                      />
                      <rect
                        x="239"
                        y="53"
                        rx="0"
                        ry="0"
                        width="643"
                        height="254"
                      />
                      <rect
                        x="30"
                        y="76"
                        rx="0"
                        ry="0"
                        width="527"
                        height="208"
                      />
                      <rect
                        x="762"
                        y="53"
                        rx="0"
                        ry="0"
                        width="643"
                        height="254"
                      />
                      <rect
                        x="1087"
                        y="76"
                        rx="0"
                        ry="0"
                        width="527"
                        height="208"
                      />
                    </ContentLoader>
                  ) : ( 
                    <Slider {...settings}>
                      {koi.map((kois) => (
                        <div key={kois.id} className="card">
                          <div className="imgBx">
                            <Image src={kois.image} alt={kois.koiName} />
                          </div>
                          <div className="content text-[10px] px-0 sm:text-xs">
                            <span className="price  md:outline lg:outline-none">
                              <a href={`/koidetail/${kois._id}`}>Read more</a>
                            </span>
                            <ul className="card-body sm:h-[200px] sm:pb-2">
                              <li className="text-xl md:text-3xl font-bold">
                                {kois.koiName}
                              </li>

                              <p className="description mt-5 text-[10px] sm:text-[10px] md:text-[10px] lg:text-[15px]  ">
                                {kois.description.substring(0, 100)}...
                              </p>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
              {/* Koi Pond */}
              <div className="container mx-auto px-4">
                {loadingCard ? (
                  <ContentLoader
                    viewBox="0 0 1644 360"
                    height={360}
                    width="100%"
                  >
                    <rect
                      x="448"
                      y="30"
                      rx="0"
                      ry="0"
                      width="750"
                      height="300"
                    />
                    <rect
                      x="239"
                      y="53"
                      rx="0"
                      ry="0"
                      width="643"
                      height="254"
                    />
                    <rect
                      x="30"
                      y="76"
                      rx="0"
                      ry="0"
                      width="527"
                      height="208"
                    />
                    <rect
                      x="762"
                      y="53"
                      rx="0"
                      ry="0"
                      width="643"
                      height="254"
                    />
                    <rect
                      x="1087"
                      y="76"
                      rx="0"
                      ry="0"
                      width="527"
                      height="208"
                    />
                  </ContentLoader>
                ) : (
                  <h1 className="text-left text-xl sm:text-4xl text-slate-700 my-10 font-bold flex items-center">
                    Your Suggested Koi Pond{" "}
                    <IoFish className="ml-5 text-2xl sm:text-4xl" />
                  </h1>
                )}
                <div>
                  <Slider {...settings}>
                    {pond.map((pond) => (
                      <div key={pond.id} className="card">
                        <div className="imgBx">
                          <Image src={pond.image} alt={pond.image} />
                        </div>
                        <div className="content text-[10px] px-0 sm:text-xs">
                          <span className="price">
                            <a href={`/ponddetail/${pond._id}`}>Read more</a>
                          </span>
                          <ul>
                            <li className="text-xl md:text-3xl font-bold">
                              {pond.shape}
                            </li>
                            <li className="text-xs md:text-xl">
                              {pond.direction}
                            </li>
                            <li className="w-full h-full  mt-3">
                              <p className="description text-[10px] md:text-[15px]">
                                {pond.description.substring(0, 100)}...
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              {/* News Post */}
              <div className="container   mx-auto px-4">
                {loadingCard ? (
                  <ContentLoader
                    viewBox="0 0 1644 360"
                    height={360}
                    width="100%"
                  >
                    <rect
                      x="448"
                      y="30"
                      rx="0"
                      ry="0"
                      width="750"
                      height="300"
                    />
                    <rect
                      x="239"
                      y="53"
                      rx="0"
                      ry="0"
                      width="643"
                      height="254"
                    />
                    <rect
                      x="30"
                      y="76"
                      rx="0"
                      ry="0"
                      width="527"
                      height="208"
                    />
                    <rect
                      x="762"
                      y="53"
                      rx="0"
                      ry="0"
                      width="643"
                      height="254"
                    />
                    <rect
                      x="1087"
                      y="76"
                      rx="0"
                      ry="0"
                      width="527"
                      height="208"
                    />
                  </ContentLoader>
                ) : (
                  <h1 className="text-left text-xl sm:text-4xl text-slate-700 my-10 font-bold flex items-center">
                    Your Suggested News{" "}
                    <IoNewspaper className="ml-5 text-2xl sm:text-4xl" />
                  </h1>
                )}
                <div>
                  <Slider {...settings}>
                    {post.map((newsItem) => (
                      <div key={newsItem.id} className="card">
                        <div className="imgBx">
                          <Image
                            src={newsItem.imageThumbnail}
                            alt={newsItem.imageThumbnail}
                          />
                        </div>
                        <div className="content text-[10px] px-0 sm:text-xs">
                          <span className="price">
                            <a href={`/details/${newsItem._id}`}>
                              Read more
                            </a>
                          </span>
                          <ul>
                            <li className="">
                              <h1 className="text-[12px] sm:text-xs md:text-xs lg:text-xl font-bold">
                                {newsItem.title}
                              </h1>
                            </li>
                            <li className="text-[10px] sm:text-xs md:text-xs lg:text-xs text-gray-400">
                              <div className="flex justify-between">
                                {new Date(newsItem.createdAt).toDateString()}
                                <span>Author : {newsItem.author.name}</span>
                              </div>
                            </li>
                            <li className="w-full h-[50px] mt-3 overflow-hidden  ">
                              <p className="description text-[10px]  sm:text-[13px] ">
                                {/* {newsItem.description.substring(0, 100)}... */}
                                {parse(newsItem.context)}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              {/* ADS */}
              <div className="container flex-col mx-auto w-full px-4 h-fit ">
                <h1 className="text-left text-xl sm:text-4xl text-slate-700 my-10 font-bold flex items-center">
                  {" "}
                  Your Suggested Advertising
                </h1>

                <div className="mx-auto h-[100vh] md:w-[400px] lg:w-[600px] mb-4 ">
                  <SliderPopUp ADS={ads}></SliderPopUp>
                </div>
              </div> 
                </>
               ) : ( <div className="h-[50vh]"></div>)
              }
              <Footer />
            </div>
         
        </div>
        {value && (
          <>
            <AdPopUp ADS={ads} value={value} />
          </>
        )}
      </div>
    </>
  );
}
