import { useState, useEffect, useCallback } from "react";
import api from "../../../config/axios";
import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  Popconfirm,
  Upload,
  Select,
  Image,
  Pagination,
} from "antd";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";
import {  debounce } from "lodash";


function ManageKoiFish() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    current: 1, // Trang hiện tại
    pageSize: 10, //(limit mặc định)
    total: 0, // ban đầu là 0
  });

  const [selectedColor , setSelectColor]  = useState([]);
 


  //Get
  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      // truyen tham số page và limit
      const response = await api.get(
        `v1/fish?page=${page}&limit=${limit}`
      );

      // Cập nhật dữ liệu vào state
      setDatas(response.data.data);

      // Cập nhật thông tin phân trang
      setPagination({
        current: response.data.currentPage, // cập nhật trang hiện tại
        total: response.data.totalDocuments, // tổng số cá
        pageSize: limit, // số cá trên mỗi trang
      });
    } catch (err) {
      toast.error(err.response.data.result.data);
    }
  };
  // log data
  console.log("Datas" + datas);

  const handleSubmit = async (values) => {
    console.log(values);

    //truoc khi xu li them
    //upload anh len truoc
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);

      const url = await uploadFile(file.originFileObj);
      values.image = url;
    }
    //day data xuong
    try {
      setLoading(true);

      if (values._id) {
        // update
        const response = await api.put(
          `v1/fish/updateKoi/${values._id}`,
          values
        );
        toast.success("Koi updated sucessfully!");
      } else {
        const response = await api.post("v1/fish/createKoi", values);
        toast.success("Successfully saved!");
      }

      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleDelete = async (_id) => {
    try {
      await api.delete(`v1/fish/deleteKoi/${_id}`);
      toast.success("Successfully deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.response.data.data);
    }
  };


  // ->>  handle search 
  const handleSearch = async (e) => {
    try {
     const {value} = e.target;

      setSearchValue(e.target.value);
      debouncedSearch(value);
    } catch (err) {
      toast.error(err);
    }
  };


  // search với độ trễ tránh xử lý nhiều lần
  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log(value);
      callApiSearch(value);
    }, 500),
    []
  ); // 500ms delay

  // call api cho viec search ca koi
  const callApiSearch = async (value) => {
    try {
      // kiem tra xem value nhap vao co la empty
      if (value === "") {
        fetchData(pagination.current, pagination.pageSize);
      }
      const res = await api.get(
        `v1/fish/search?searchName=${value}&page=${pagination.current}&limit=${pagination.pageSize}`
      );

      console.log("api search" + res.data.data);
      setDatas(res.data.data);
      setPagination({
        current: res.data.currentPage, // cập nhật trang hiện tại
        total: res.data.totalDocuments, // tổng số cá
        pageSize: 10,
      });
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        toast.error("Error 404: Resource not found");
      }
      toast.error(err.res.data);
    }
  };
  // call api search color
  const handleSearchColor = async (value) => {
    console.log("func search color:", value);
    setSelectColor(value);
  
    // Use the updated `value` directly to create the query string
    const queryString = value.join(",");
  
    try {
      if (value.length === 0) {
        // Fetch default data if no color is selected
        fetchData(pagination.current, pagination.pageSize);
      } else {
        // Call the API with the selected colors
        const res = await api.get(
          `v1/fish/search?searchColor=${queryString}&page=${pagination.current}&limit=${pagination.pageSize}`
        );
        console.log("API response:", res.data.data);
  
        // Update state with API response
        setDatas(res.data.data);
        setPagination({
          current: res.data.currentPage, // update current page
          total: res.data.totalDocuments, // total fish count
          pageSize: 10,
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        toast.error("Error 404: Resource not found");
      } else {
        toast.error("An error occurred");
      }
    }
  };


  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const elementMap = {
    1: "Metal",
    2: "Wood",
    3: "Water",
    4: "Fire",
    5: "Earth",
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Koi Name",
      dataIndex: "koiName",
      key: "koiName",
      sorter: (a, b) => a.koiName.localeCompare(b.koiName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      render: (text) => {
        // Set a limit for the description length
        const maxLength = 35; // Adjust the length as needed
        return text.length > maxLength
          ? `${text.slice(0, maxLength)}...`
          : text;
      },
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) => colors.join(", "),
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Koi" style={{ width: 100 }} />,
    },

    {
      title: "Element",
      dataIndex: "elementID",
      key: "elementID",
      render: (elementID) => elementMap[elementID] || "Unknown",
      sorter: (a, b) => a.elementID - b.elementID,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id, koi) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(koi);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this Koi?"
            onConfirm={() => handleDelete(_id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  console.log(pagination);

  return (
    <div>
      <div className="group-search flex"> 
       
  
        {/* searh  koi Name*/}
        <div className="search-name">
          <label className="mr-4"> Search Name :</label>
          <Input
            value={searchValue}
            placeholder="Search Koi Fish by name"
            style={{ width: 300, marginBottom: 20 }}
            onChange={handleSearch}
          />
        </div>
         
        {/* search koi colors */}
        <div className="search-colors w-64 ml-4">
          <Form>
            <Form.Item
              name="colors"
              label="Colors"
              rules={[
                {
                  required: true,
                  message: "Please select the colors of the Koi fish!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select the colors of the Koi fish"
                allowClear
                onChange={handleSearchColor}
              >
                <Select.Option value="Red">Red</Select.Option>
                <Select.Option value="White">White</Select.Option>
                <Select.Option value="Black">Black</Select.Option>
                <Select.Option value="Yellow">Yellow</Select.Option>
                <Select.Option value="Blue">Blue</Select.Option>
                <Select.Option value="Green">Green</Select.Option>
             
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Button
        onClick={() => {
          form.resetFields(); // Clear form fields when adding a new member
          setShowModal(true);
        }}
      >
        Add
      </Button>

      <Table dataSource={datas} columns={columns} pagination={false}></Table>

      <div className="flex justify-end mt-4">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(page, pageSize) => {
            setPagination({
              ...pagination,
              current: page,
              pageSize: pageSize,
            });
            fetchData(page, pageSize); // Gọi lại dữ liệu khi chuyển trang
          }}
        />
      </div>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Create Koi"
        onOk={() => form.submit()}
        confirmLoading={loading}
        
      >
        
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit} >
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="koiName"
            label="Koi Name"
            rules={[
              { required: true, message: "Please enter the Koi fish name!" },
            ]}
          >
            <Input placeholder="Enter the name of the Koi fish" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter a description of the Koi fish" />
          </Form.Item>

          <Form.Item
            name="colors"
            label="Colors"
            rules={[
              {
                required: true,
                message: "Please select the colors of the Koi fish!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select the colors of the Koi fish"
              allowClear
            >
              <Select.Option value="Red">Red</Select.Option>
              <Select.Option value="White">White</Select.Option>
              <Select.Option value="Black">Black</Select.Option>
              <Select.Option value="Yellow">Yellow</Select.Option>
              <Select.Option value="Blue">Blue</Select.Option>
              <Select.Option value="Green">Green</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="elementID"
            label="Element"
            rules={[{ required: true, message: "Please select an element!" }]}
          >
            <Select placeholder="Select an element">
              <Select.Option value="1">Metal</Select.Option>
              <Select.Option value="2">Wood</Select.Option>
              <Select.Option value="3">Water</Select.Option>
              <Select.Option value="4">Fire</Select.Option>
              <Select.Option value="5">Earth</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default ManageKoiFish;
