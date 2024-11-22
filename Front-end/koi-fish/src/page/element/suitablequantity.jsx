import { Button, Flex, Modal, message } from "antd"
import { useState } from "react";
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
const ButtonGroup = Button.Group;



function SuitableQuantity({ element }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, setCount] = useState(0);

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


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const adviseKoiAmount = () => {
        if (element?.name && fishRules[element.name]) {
            const isCountSuitable = fishRules[element.name].includes(count);
            if (isCountSuitable) {
                message.success(`The count of ${count} is suitable for the ${element.name} element.`);
            } else {
                message.error(`The count of ${count} is NOT suitable for the ${element.name} element.`);
            }
        } else {
            console.log("Element name or rules not defined.");
        }
    };

    return (
        <div className="bg-white p-4 rounded-md mt-8 w-full">
            <h2 className="text-3xl font-bold text-start mb-4 relative pl-10">
                <div className="absolute left-6 bottom-0 z-20 bg-white px-4">
                    Advise On The Appropriate Number Of Koi Fish
                </div>
                <span className="absolute left-0 bottom-4 z-10 w-full h-[2px] bg-gray-400"></span>
            </h2>

            <div className="flex flex-col items-start px-6">
                <Button color="danger" variant="solid" onClick={showModal} className="w-72">
                    Calculate
                </Button>
            </div>

            <Modal
                title="Koi Fish Quantity Advise for Owner's Element"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" color="danger" variant="outlined" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button key="submit" color="danger" variant="solid" onClick={adviseKoiAmount}>
                        Calculate
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
                        <div className="flex">
                        <div className=" text-3xl font-bold pr-5"> Number of Fish: </div>
                        <div className=" text-3xl font-bold text-gray-500">  {count}</div>
                        </div>
                        
                    
                    <ButtonGroup>
                        <Button onClick={decline}>
                            <MinusOutlined />
                        </Button>
                        <Button onClick={increase}>
                            <PlusOutlined />
                        </Button>
                        <Button onClick={random}>
                            <QuestionOutlined />
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Modal>
        </div>
    )
}

export default SuitableQuantity;


const fishRules = {
    Metal: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84, 89, 94, 99],
    Wood: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93, 8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
    Water: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
    Fire: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
    Earth: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  
  };