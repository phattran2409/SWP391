import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function SuitableElement({ compatible, conflicting }) {
  const [isInfoVisible, setIsInfoVisible] = useState(false); // Trạng thái hiển thị thông tin chi tiết
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

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

  return (
    <div className="my-4">
        <div className="bg-white px-4 rounded-md mt-12 w-full">
          <h2 className="text-3xl font-bold text-start mb-4 relative pl-10">
            <div className="absolute left-6 bottom-0 z-20 bg-white px-4" >Suitable Element</div>
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
          <p>Calculating...</p> {/* Bạn có thể thay đổi thông báo này hoặc thêm hiệu ứng loading */}
        </div>
      )}

      {/* Hiển thị thông tin sau khi loading */}
      {isInfoVisible && !isLoading && (
        <div className="mt-4 p-4 bg-gray-100 mx-4 py-6">
          <div>
            <h3 className="text-xl font-semibold pl-6">Compatible Elements:</h3>
            <ul className="text-lg list-disc pl-14">
              {compatible.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold pl-6">Conflicting Elements:</h3>
            <ul className="text-lg list-disc pl-14">
              {conflicting.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuitableElement;
