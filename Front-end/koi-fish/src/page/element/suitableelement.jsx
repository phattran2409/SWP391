import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Modal, Button, Flex, Progress } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

function SuitableElement({ compatible, conflicting }) {
  const [isInfoVisible, setIsInfoVisible] = useState(false); // Trạng thái hiển thị thông tin chi tiết
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [percent, setPercent] = useState(0);

  const colorMapping = {
    Water: "text-blue-500 ",
    Fire: "text-red-500",
    Earth: "text-yellow-600",
    Metal: "text-gray-600",
    Wood: "text-green-500",
  }; // Bảng ánh xạ màu sắc

  const colorMapping1 = {
    Water: "w-24 text-blue-500 bg-blue-50 border border-blue-500",
    Fire: "w-24 text-red-500 bg-red-50 border border-red-500",
    Earth: "w-24 text-yellow-700 bg-yellow-50 border border-yellow-600",
    Metal: "w-24 text-gray-600 bg-gray-100 border border-gray-500",
    Wood: "w-24 text-green-500 bg-green-50 border border-green-500",
  }; // Bảng ánh xạ màu sắc

  const conicColors = {
    '0%': '#ffe58f',
    '30%': '#ffccc7',
    '60%': '#108ee9',
    '90%': '#87d068',
  };

  const toggleInfo = () => {
    if (!isInfoVisible) {
      setIsLoading(true); // Bắt đầu loading khi mở
      setTimeout(() => {
        setIsInfoVisible(true); // Hiển thị thông tin sau khi loading
        setIsLoading(false); // Kết thúc loading
      }, 1000); // Thời gian trễ 1 giây
    } else {
      setIsInfoVisible(false); // Đóng thông tin mà không cần loading
    }
  };

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
    <div className="my-4">
      <div className="bg-white px-4 rounded-md mt-12 w-full">
        <h2 className="text-3xl font-bold text-start mb-4 relative pl-10">
          <div className="absolute left-6 bottom-0 z-20 bg-white px-4">Suitable Element</div>
          <span className="absolute left-0 bottom-4 z-10 w-full h-[2px] bg-gray-400"></span>
        </h2>
      </div>

      {/* Mũi tên để toggle thông tin */}
      <button className="ml-4 flex items-center cursor-pointer" onClick={toggleInfo}>
        {isInfoVisible ? (
          <FaAngleUp size={20} /> // Mũi tên hướng lên khi hiển thị thông tin
        ) : (
          <FaAngleDown size={20} /> // Mũi tên hướng xuống khi không hiển thị thông tin
        )}
      </button>

      {/* Hiển thị loading nếu đang trong trạng thái loading */}
      {isLoading && (
        <div className="mt-4 p-4 text-lg bg-gray-100 rounded-lg mx-4 py-6">
          <p>Calculating...</p>
        </div>
      )}

      {/* Hiển thị thông tin sau khi loading */}
      {isInfoVisible && !isLoading && (
        <div className="mt-4 p-4 bg-gray-100 mx-4 py-6">
          <div>
            <h3 className="text-xl font-semibold pl-6">Compatible Elements:</h3>
            <ul className="text-lg font-medium list-disc pl-14">
              {compatible.map((item, index) => (
                <li key={index} className={colorMapping[item] || "text-black"}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold pl-6">Conflicting Elements:</h3>
            <ul className="text-lg font-medium list-disc pl-14">
              {conflicting.map((item, index) => (
                <li key={index} className={colorMapping[item] || "text-black"}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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


        <Flex vertical gap="small">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold">Select Koi Fish Compatibility</h3>
          </div>
          <div className="flex justify-center items-start gap-20">

            <div className="items-start">
              <h3 className="text-xl font-semibold  mb-3">Compatible Elements:</h3>
              <ul className="text-lg font-medium list-none ">
                {compatible.map((item, index) => (
                  <li key={index} className="mb-2 text-center">
                    <button
                      className={`px-4 py-2 mb-2 rounded shadow ${colorMapping1[item] || "bg-black text-white"}`}
                      onClick={() => setPercent((prev) => Math.min(prev + 10, 100))} // Thay bằng logic xử lý của bạn
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full items-start ">
              <h3 className="text-xl font-semibold mb-3">Conflicting Elements:</h3>
              <ul className="text-lg font-medium list-none mx-auto">
                {conflicting.map((item, index) => (
                  <li key={index} className="mb-2 text-center">
                    <button
                      className={`px-4 py-2 mb-2 rounded shadow ${colorMapping1[item] || "bg-black text-white"}`}
                      onClick={() => setPercent((prev) => Math.max(prev - 10, 0))} // Thay bằng logic xử lý của bạn
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Thanh tiến trình */}
          <Progress percent={percent} type="line" className="mt-6" strokeColor={conicColors} />
        </Flex>
      </Modal>
    </div>
  );
}

export default SuitableElement;
