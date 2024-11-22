import { Button, Flex, Modal, message } from "antd";
import { useState } from "react";

function AdviseColor({ element }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [advice, setAdvice] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const adviseKoiAmount = () => {
        setLoading(true);  // Bắt đầu loading

        let result = "";
        let colorOptions = [];

        // Giả lập quá trình xử lý mất 3 giây
        setTimeout(() => {
            // Check the element and give advice on the appropriate koi colors
            switch (element.name) {
                case "Metal":
                    result = "Recommended Koi colors:";
                    colorOptions = ["white", "gold", "silver"];
                    break;
                case "Wood":
                    result = "Recommended Koi colors:";
                    colorOptions = ["green", "blue", "black"];
                    break;
                case "Water":
                    result = "Recommended Koi colors:";
                    colorOptions = ["blue", "black", "white"];
                    break;
                case "Fire":
                    result = "Recommended Koi colors:";
                    colorOptions = ["red", "orange", "yellow", "pink", "purple"];
                    break;
                case "Earth":
                    result = "Recommended Koi colors:"; 
                    colorOptions = ["orange", "brown", "yellow", "red", "purple"];
                    break;
                default:
                    result = "No advice available for this element.";
                    colorOptions = ["gray"];
            }

            setAdvice(result);  // Cập nhật lời khuyên
            setColors(colorOptions);  // Cập nhật màu sắc
            setLoading(false);  // Tắt loading sau khi có kết quả
        }, 3000);  // Đặt thời gian delay là 3 giây (3000ms)
    };

    return (
        <div className="bg-white p-4 rounded-md mt-8 w-full">
            <h2 className="text-3xl font-bold text-start mb-4 relative pl-10">
                <div className="absolute left-6 bottom-0 z-20 bg-white px-4">
                    Advise On Color Of Koi Fish
                </div>
                <span className="absolute left-0 bottom-4 z-10 w-full h-[2px] bg-gray-400"></span>
            </h2>

            <div className="flex flex-col items-start px-6">
                <Button 
                    color="danger" 
                    variant="solid" 
                    onClick={showModal} 
                    className="w-72"
                >
                    Advise
                </Button>
            </div>

            <Modal
                title="Koi Fish Color Advice for Owner's Element"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" color="danger" variant="outlined" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button 
                        key="submit" 
                        color="danger" 
                        variant="solid" 
                        onClick={adviseKoiAmount}
                        loading={loading}  // Hiển thị hiệu ứng loading khi đang xử lý
                    >
                        Advise
                    </Button>,
                ]}
                width={800}
            >
                <Flex vertical gap="small">
                    <div className="text-3xl font-bold flex items-center py-4">
                        <span>Your Element:</span>
                        {element?.icon && (
                            <div className="flex items-center ml-2">
                                <span
                                    style={{
                                        color: element.color,
                                        marginLeft: "8px",
                                        fontSize: "1.875rem",
                                    }}
                                >
                                    {element.name}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-xl">
                        <h3 className="font-bold">Advice on Koi Color:</h3>
                        <p>{advice}</p>

                        {/* Displaying multiple colors */}
                        <div className="flex gap-4 mt-4">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "8px",
                                        backgroundColor: color,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Flex>
            </Modal>
        </div>
    );
}

export default AdviseColor;
