import { Select, InputNumber, Badge, Card, Progress, message } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Regex } from "lucide-react";
const { Option } = Select;
// const  navigate = useNavigate();
const FishpondAdvisor = ({pondId, elementName}) => {
   const navigate = useNavigate();
  const [selectedFish, setSelectedFish] = useState(null);
  const [fishKoiType, setFishKoiType] = useState([]);
  const [fishQuantity, setFishQuantity] = useState(0);
  const [status, setStatus] = useState("default"); // default, success, warning, error
  const [pondDetail, setPondDetail] = useState(`${elementName}`); 

  // Quy định số lượng cá theo mệnh
  const fishRules = {
    Metal: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84, 89, 94, 99],
    Wood: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93, 8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
    Water: [4, 9],
    Fire: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
    Earth: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  
  };
  
  const koiData = async () => {
    const response = await api.get(`v1/fish/getKoiElement/${pondId}?page=1&limit=20`);
    setFishKoiType(response.data.data);
   
  }

  useEffect(() => {
    koiData();
  }, []);



  // Handle selection change
  const handleFishChange = (value) => {
    setSelectedFish(value);
    setFishQuantity(0); // Reset quantity when fish type changes
    setStatus("default"); // Reset progress bar status
  };

  // Handle quantity change
  const handleQuantityChange = (value) => {
         const regex = /^([1-9][0-9]?|100)$/;
      
         const isValid = regex.test(value);
     (!isValid) &&  message.error("Please enter a number between 1 and 100");
    setFishQuantity(value);

    // Kiểm tra tính phù hợp
    const validQuantities = fishRules[pondDetail];
    if (validQuantities.includes(value)) {
      setStatus("success"); // Phù hợp
      message.success("This number of fish is suitable for your koi pond!");
    } else if (
      validQuantities.some(
        (validQuantity) => Math.abs(validQuantity - value) === 1
      )
    ) {
      setStatus("warning"); // Gần đúng
      message.warning("The number of fish is approximately correct but not quite right.");
    } else {
      setStatus("error"); // Không phù hợp
      message.error("The number of fish is not suitable for this koi pond.");
    }
  };

  const handleFishClick = (fishId) => {
    navigate(`/koidetail/${fishId}`);
  }; 

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-700">
        Suitable Koi Fish For This Pond
      </h3>

      {/* Select fish type */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Select Koi Fish:</label>
        <Select
          style={{ width: "100%" }}
          placeholder="Select a fish"
          onChange={handleFishChange}
        >
         {fishKoiType && fishKoiType.length > 0 ? (
    fishKoiType.map((fish) => (
      <Option key={fish._id} value={fish._id}>
        {fish.koiName}
      </Option>
    ))
  ) : (
    <Option disabled>No fish available</Option>
  )}
        </Select>
      </div>

      {/* Display fish details when selected */}
      {selectedFish && (
        <div className="mb-4">
       <Card style={{ display: "flex", alignItems: "center" }} bordered={true}>
  <div  style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
    {/* Image and Badge */}
    <Badge count={fishQuantity} style={{ backgroundColor: "red" , position: "absolute" , right: "20px" , top: "0" }}>
      <img
        onClick={() => {handleFishClick(selectedFish)}}
        src={fishKoiType.find((fish) => fish._id === selectedFish)?.image}
        alt="Fish Koi"
        style={{
          width: "100px",
          height: "150px",
          objectFit: "cover",
          marginRight: "16px" , 
          cursor: "pointer"// Add spacing between the image and text
        }}
      />
    </Badge>

    {/* Text content */}
    <div style={{ flex: 1 }}>
      <strong style={{ margin: 0 }}>
        {fishKoiType.find((fish) => fish._id === selectedFish)?.koiName}
      </strong>
      <p style={{ margin: 0, color: "#888", wordWrap: "break-word" }}>
        {fishKoiType.find((fish) => fish._id === selectedFish)?.description}
      </p>
    </div>
  </div>
</Card>

        </div>
      )}

      {/* Input number for quantity */}
      {selectedFish && (
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Enter Quantity:</label>
          <InputNumber
            // min={0}
            // max={100}
            value={fishQuantity}
            onChange={handleQuantityChange}
            style={{ width: "100%" }}
            render={
            (node) => {
              console.log(node.value);
              const regex = /^([1-9][0-9]?|100)$/;
              const value = node.value;
              const isValid = regex.test(value);
              
              return (
                <div style={{ position: 'relative' }}>
                  {node.input}
                  {!isValid && value && (
                    <div style={{ 
                      color: 'red',
                      fontSize: '12px',
                      position: 'absolute',
                      top: '100%'
                    }}>
                      Please enter a number between 1 and 100
                    </div>
                  )}
                </div>
              );
            }
           }
          />
        </div>
      )}

      {/* Display progress bar */}
      {selectedFish && (
  <div className="mb-4">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor:
          status === "success"
            ? "#f6ffed"
            : status === "warning"
            ? "#fffbe6"
            : status === "error"
            ? "#fff1f0"
            : "#f5f5f5",
        border:
          status === "success"
            ? "1px solid #b7eb8f"
            : status === "warning"
            ? "1px solid #ffe58f"
            : status === "error"
            ? "1px solid #ffa39e"
            : "1px solid #d9d9d9",
      }}
    >
      {status === "success" && (
        <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "24px" }} />
      )}
      {status === "warning" && (
        <WarningOutlined style={{ color: "#faad14", fontSize: "24px" }} />
      )}
      {status === "error" && (
        <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: "24px" }} />
      )}

      <div style={{ flex: 1 }}>
        <Progress
          percent={100}
          status={status}
          showInfo={false}
          strokeColor={
            status === "success"
              ? "#52c41a"
              : status === "warning"
              ? "#faad14"
              : status === "error"
              ? "#ff4d4f"
              : "#d9d9d9"
          }
          style={{ marginBottom: "5px" }}
        />
        <div>
          {status === "success" && (
            <span style={{ color: "#52c41a" }}>The amount of fish was right!</span>
          )}
          {status === "warning" && (
            <span style={{ color: "#faad14" }}>
              Quantity is approximate, please adjust further.
            </span>
          )}
          {status === "error" && (
            <span style={{ color: "#ff4d4f" }}>
              The quantity of fish is not suitable!
            </span>
          )}
        </div>
      </div>
    </div>
    
  </div>
  
)}
    </div>
    
  );
};

export default FishpondAdvisor;
