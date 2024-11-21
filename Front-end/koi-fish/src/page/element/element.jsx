import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import api from "../../config/axios";
import { GiMetalBar } from "react-icons/gi";
import {
  MdWater,
  MdLandscape,
  MdGrass,
  MdLocalFireDepartment,
} from "react-icons/md";
import { Modal, Button, Input, Space, Badge, Avatar } from "antd";
import Footer from "../../components/footer/Footer";
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group;

const userElement = JSON.parse(localStorage.getItem("elementUser"));

const fitWithElements = [
  {
    name: "Metal",
    color: "#696969",
    icon: GiMetalBar,
    imageUrl: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1732168795/metal_ji36bm.png",
    description:
      "People with the Metal Element should prioritize using colors like white, yellow, metallic items, and materials that are strong to enhance positive energy. Additionally, the West and Northwest directions are good positions to activate fortune. For a harmonious and luckier life, you can refer to Feng Shui items such as metallic wind chimes, tiger statues, white quartz, as well as lucky numbers like 4, 7, and 9. Note: Feng Shui is a profound science, and applying it to life requires thorough research. Combine Feng Shui knowledge with a healthy lifestyle to achieve the best results."
  },
  {
    name: "Wood",
    color: "#008000",
    icon: MdGrass,
    imageUrl: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1732169366/wood_oxj9kj.png",
    description:
      "People with the Wood Element should prioritize using colors like green, blue, natural wood items, and plants to enhance positive energy. Additionally, the East and Southeast directions are good positions to activate fortune. For a harmonious and luckier life, you can refer to Feng Shui items, lucky numbers, and ways to resolve misfortune. Note: Feng Shui is a profound science, and applying it to life requires thorough research. Combine Feng Shui knowledge with a healthy lifestyle to achieve the best results."
  },
  {
    name: "Water",
    color: "#00A8E3",
    icon: MdWater,
    imageUrl: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1732168785/water_kpml8h.png",
    description:
      "People with the Water Element should prioritize using colors like blue, black, glass items, aquariums, and materials that are soft to enhance positive energy. Additionally, the North and Northeast directions are good positions to activate fortune. For a harmonious and luckier life, you can refer to Feng Shui items such as ocean landscape paintings, koi fish statues, black quartz, as well as lucky numbers like 1, 6, and 7. Note: Feng Shui is a profound science, and applying it to life requires thorough research. Combine Feng Shui knowledge with a healthy lifestyle to achieve the best results."
  },
  {
    name: "Fire",
    color: "#FF4500",
    icon: MdLocalFireDepartment,
    imageUrl: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1732168782/flame_l1pmsj.png",
    description:
      "People with the Fire Element should prioritize using colors like red, orange, ceramic items, candles, and materials that are warm to enhance positive energy. Additionally, the South direction is a good position to activate fortune. For a harmonious and luckier life, you can refer to Feng Shui items such as sun landscape paintings, phoenix statues, red quartz, as well as lucky numbers like 3 and 9. Note: Feng Shui is a profound science, and applying it to life requires thorough research. Combine Feng Shui knowledge with a healthy lifestyle to achieve the best results."
  },
  {
    name: "Earth",
    color: "#8B4513",
    icon: MdLandscape,
    imageUrl: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1732168799/ground_r1nbmp.jpg",
    description:
      "People with the Earth Element should prioritize using colors like light yellow, brown, ceramic items, natural stones, and materials that are stable to enhance positive energy. Additionally, the Southwest and Center directions are good positions to activate fortune. For a harmonious and luckier life, you can refer to Feng Shui items, lucky numbers, and ways to resolve misfortune. Note: Feng Shui is a profound science, and applying it to life requires thorough research. Combine Feng Shui knowledge with a healthy lifestyle to achieve the best results."
  },
];

const ElementPage = () => {
  const [users, setUsers] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [count, setCount] = useState(5);
  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };
  const random = () => {
    const newCount = Math.floor(Math.random() * 100);
    setCount(newCount);
  };

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getUser(user._id);
    }
  }, []);

  const getUser = async (id) => {
    try {
      const response = await api.get(`v1/user/id=${id}`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch user: ", error);
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm tính toán số lượng cá koi (ví dụ: số lượng cá Koi = diện tích hồ / 2)
  const calculateKoiAmount = () => {

  };

  return (
    <div >
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white text-black-700 px-10 pt-1 pb-16 rounded-sm text-sm mt-1 ">
          {userElement?.elementID ? (
            <div>
              <div className="text-5xl font-bold flex items-center justify-center py-10">
                <span>Your element is:</span>
                {fitWithElements[userElement.elementID - 1]?.icon && (
                  <div className="flex items-center ml-2">
                    {React.createElement(
                      fitWithElements[userElement.elementID - 1].icon,
                      {
                        size: 50,
                        style: {
                          color:
                            fitWithElements[userElement.elementID - 1]
                              .color,
                        },
                      }
                    )}
                    <span
                      style={{
                        color:
                          fitWithElements[userElement.elementID - 1].color,
                        marginLeft: "8px",
                        fontSize: "3rem",
                      }}
                    >
                      {fitWithElements[userElement.elementID - 1].name}
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full grid grid-cols-12 gap-10">
                <div className="aspect-square bg-white py-4 rounded-2xl col-start-3">
                  {fitWithElements[userElement.elementID - 1] && (
                    <div className="flex flex-col items-center mt-4 ">
                      <img
                        src={fitWithElements[userElement.elementID - 1].imageUrl}
                        alt={`${fitWithElements[userElement.elementID - 1].name} Element`}
                        className="max-w-72 max-h-72 object-cover rounded-full mb-4"
                      />
                      <span
                        style={{
                          color: fitWithElements[userElement.elementID - 1].color,
                          fontSize: "3rem",
                        }}
                        className="font-semibold"
                      >
                        {fitWithElements[userElement.elementID - 1].name}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="text-lg flex flex-col items-center justify-center bg-white px-4 pb-4 rounded-2xl lg:col-start-7 lg:col-end-12 sm:col-start-6 sm:col-end-13"
                  style={{
                    backgroundColor: fitWithElements[userElement.elementID - 1]?.color,
                    color: "white",
                    border: "3px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {fitWithElements[userElement.elementID - 1] && (
                    <div className="flex flex-col items-center mt-4">
                      <p className="text-white">
                        {fitWithElements[userElement.elementID - 1].description
                          .split('.')
                          .map((sentence, index) => (
                            <React.Fragment key={index}>
                              {sentence.trim() && <span>- {sentence.trim()}.</span>}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <span>Your element is: Not set</span>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-md mt-8 w-full">
        <h2 className="text-3xl font-bold text-start mb-4 relative pl-10">
          <div className="absolute left-6 bottom-0 z-20 bg-white px-4" >Suitable Element</div>
          <span className="absolute left-0 bottom-4 z-10 w-full h-[2px] bg-gray-400"></span>
        </h2>
      </div>

      {/* Đề mục tính toán số lượng cá Koi */}
      <div className="bg-white p-4 rounded-md mt-8 w-full">
        <h2 className="text-3xl font-bold text-start mb-4 relative pl-10">
          <div className="absolute left-6 bottom-0 z-20 bg-white px-4" >Koi Fish Quantity Calculation for Suitable Owner's Element</div>
          <span className="absolute left-0 bottom-4 z-10 w-full h-[2px] bg-gray-400"></span>
        </h2>
        <div className="flex flex-col items-start px-6">
          <Button
            color="danger"
            variant="solid"
            onClick={showModal}
            className="w-72"
          >
            Calculate
          </Button>
        </div>
      </div>

      <Modal
        title="Koi Fish Quantity Calculation for Suitable Owner's Element"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" color="danger" variant="outlined" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="submit" color="danger" variant="solid" onClick={calculateKoiAmount}>
            Calculate
          </Button>,
        ]}
        width={800}
      >
        <Space direction="vertical">
          <Space size="large">
            <Badge count={count}>
              <Avatar shape="square" size="large" />
            </Badge>
            <ButtonGroup>
              <Button onClick={decline} icon={<MinusOutlined />} />
              <Button onClick={increase} icon={<PlusOutlined />} />
              <Button onClick={random} icon={<QuestionOutlined />} />
            </ButtonGroup>
          </Space>
        </Space>
      </Modal>

      <Footer />
    </div>
  );
};

export default ElementPage;
