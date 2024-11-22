import React, { useEffect, useState, useCallback } from "react";
import api from "../../../config/axios";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  Popconfirm,
  Select,
  Pagination,
  Image,
  Upload,
} from "antd";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { data } from "autoprefixer";

function ManagePonds() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // Trang hiện tại
    pageSize: 10, //(limit mặc định)
    total: 0, // ban đầu là 0
  });
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("");
  //Get
  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(
        `v1/pond/getAllPond?page=${page}&limit=${limit}`
      );
      setDatas(response.data.data);
      console.log(response.data);
      setPagination({
        current: response.data.currentPage,
        pageSize: limit,
        total: response.data.totalDocuments,
      });
      console.log({
        page_fetch: pagination.current,
        pageSize_fetch: pagination.pageSize,
      });
    } catch (err) {
      toast.error(err.response.data.data);
    }
  };

  const uploadImage = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/ddqgjy50x/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploadpond");

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the form with the image URL
      form.setFieldsValue({ image: response.data.secure_url });

      // Show image preview
      setImagePreview(response.data.secure_url);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      setLoading(true);

      if (values._id) {
        // update
        const response = await api.put(
          `v1/pond/updatePond/${values._id}`,
          values
        );
      } else {
        const response = await api.post("v1/pond/createPond", values);
      }

      toast.success("Successfully saved!");
      fetchData();
      form.resetFields();
      // close modal create
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await api.delete(`v1/pond/deletePond/${_id}`);
      toast.success("Successfully deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.response.data.data);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const elementMap = {
    1: "Metal",
    2: "Wood",
    3: "Water",
    4: "Fire",
    5: "Earth",
  };
  // Handle Search
  const handleSearch = async (e) => {
    try {
      console.log("search option " + searchOption);
      console.log("search Value" + e.target.value);
      setSearchValue(e.target.value);
      debouncedSearch(e.target.value, searchOption);
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
    [searchOption]
  ); // 500ms delay

  const callApiSearch = async (value) => {
    try {
      console.log("search option" + searchOption);
      if (value === "") {
        fetchData(pagination.current, pagination.pageSize);
      }
      const res = await api.get(
        `v1/pond/searchPond?${searchOption || "shape"}=${value}&page=${
          pagination.current
        }&limit=${pagination.pageSize}`
      );

      console.log(res.data);
      setDatas(res.data.data);
      setPagination({
        current: res.data.currentPage,
        total: res.data.totalDocuments,
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => {
        // const name = author?.name || "Admin";
        const maxLength = 50;
        return description.length > maxLength
          ? `${description.slice(0, maxLength)}...`
          : description;
      },
    },
    {
      title: "Trees",
      dataIndex: "trees",
      key: "trees",
    },
    {
      title: "Water Flow",
      dataIndex: "waterFlow",
      key: "waterFlow",
    },
    {
      title: "Light",
      dataIndex: "light",
      key: "light",
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <>
          {image ? (
            <Image src={image} alt="pond" style={{ width: 100 }} />
          
          ) : (
            <img
              src="https://placehold.co/100x100/png"
              alt="pond"
              style={{ width: 100 }}
            />
          )}
        </>
      ),
    },
    {
      title: "Element",
      dataIndex: "elementID",
      key: "elementID",
      sorter: (a, b) => a.elementID - b.elementID,
      sortDirections: ["descend", "ascend"],
      render: (elementID) => elementMap[elementID] || "Unknown",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id, pond) => (
        <>
          <div className="flex gap-1">
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setImagePreview(pond.image);
                  setShowModal(true);
                  form.setFieldsValue(pond);
                }}
              >
                Edit
              </Button>
            </div>
            <div>
              <Popconfirm
                title="Delete"
                description="Do you want to delete this pond?"
                onConfirm={() => handleDelete(_id)}
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="group-search flex ">
        <select
          id="options"
          onChange={(value) => {
            console.log(value.target.value);
            setSearchOption(value.target.value);
          }}
          className="border border-gray-500 mb-4 mr-2 rounded-lg"
        >
          <option value="" disabled></option>
          <option value="shape">Shape</option>
          <option value="direction">Direction</option>
        </select>

        {/* searh  Name*/}
        <div className="search-name">
          <label className="mr-4"> Search :</label>
          <Input
            value={searchValue}
            placeholder="Search  by option"
            style={{ width: 300, marginBottom: 20 }}
            onChange={(value) => handleSearch(value)}
          />
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

      {/* Data khi lay ve */}
      <Table dataSource={datas} columns={columns} pagination={false}></Table>

      <div className="flex justify-end mt-4">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(page, pageSize) => {
            console.log({
              page_Pagination_btn: page,
              pageSize_Pagination_btn: pageSize,
            });

            setPagination({
              ...pagination,
              current: page,
            });
            fetchData(page, pageSize); // Gọi lại dữ liệu khi chuyển trang
          }}
        />
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Create Pond"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="elementID"
            label="Element"
            rules={[{ required: true, message: "Please select an element!" }]}
          >
            <Select placeholder="Select an element">
              <Select.Option value="1">Metal</Select.Option>
              <Select.Option value="2">Water</Select.Option>
              <Select.Option value="3">Wood</Select.Option>
              <Select.Option value="4">Fire</Select.Option>
              <Select.Option value="5">Earth</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="shape"
            label="Shape"
            rules={[{ required: true, message: "Please enter the shape!" }]}
          >
            <Input placeholder="Enter the shape of the pond" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter a description of the Koi pond"
              style={{ height: "100px" }}
            />
          </Form.Item>

          <Form.Item
            name="trees"
            label="Trees"
            rules={[
              { required: true, message: "Please enter tree information!" },
            ]}
          >
            <Input placeholder="Enter information about trees around the pond" />
          </Form.Item>

          <Form.Item
            name="waterFlow"
            label="Water Flow"
            rules={[
              {
                required: true,
                message: "Please enter water flow information!",
              },
            ]}
          >
            <Input placeholder="Enter information about water flow" />
          </Form.Item>

          <Form.Item
            name="light"
            label="Light"
            rules={[
              { required: true, message: "Please enter light information!" },
            ]}
          >
            <Input placeholder="Enter information about light" />
          </Form.Item>

          <Form.Item
            name="direction"
            label="Direction"
            rules={[
              {
                required: true,
                message: "Please enter the direction of the pond!",
              },
            ]}
          >
            <Input placeholder="Enter the direction of the Koi pond" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              name="file"
              showUploadList={false}
              beforeUpload={(file) => {
                setIsUploading(true); // show uploading state
                uploadImage(file); // upload image to Cloudinary
                return false; // prevent auto upload behavior
              }}
            >
              <Button icon={<FaCamera />}>Upload Image</Button>
            </Upload>

            {/* Image Preview */}
            {imagePreview && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagePonds;
