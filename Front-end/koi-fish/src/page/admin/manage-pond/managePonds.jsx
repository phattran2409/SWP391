import React, { useEffect, useState, useCallback } from "react";
import api from "../../../config/axios";
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
import { castArray, debounce } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("direction");
  const [formSearch] = Form.useForm();
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

  const handleSubmit = async (values) => {
    console.log(values);


     if (fileList.length > 0) {
       const file = fileList[0];
       console.log(file);

       const url = await uploadFile(file.originFileObj);
       values.image = url;
     }

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
      const { value } = e.target;
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
        `v1/pond/searchPond?${searchOption}=${value}&page=${pagination.current}&limit=${pagination.pageSize}`
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

  // upLoad Image
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    console.log("Preview file  " + file);

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
      <div className="group-search flex">
        {/* Search Option  */}
        <Form form={formSearch} layout="inline">
          {/* Select Search Criteria */}
          <Form.Item name="searchBy" initialValue="Direction">
            <Select
              style={{ width: 150 }}
              onChange={(value) => setSearchOption(value)}
            >
              <Option value="direction">Direction</Option>
              <Option value="shape">Shape</Option>
            </Select>
          </Form.Item>
        </Form>

        {/* searh  Name*/}
        <div className="search-name">
          <label className="mr-4"> Search Name :</label>
          <Input
            value={searchValue}
            placeholder="Search  by name"
            style={{ width: 300, marginBottom: 20 }}
            onChange={handleSearch}
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
            <Input.TextArea placeholder="Enter a description of the Koi pond" style={{height:"100px"}} />
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

          {/* <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Please enter the image!" }]}
          >
            <Input placeholder="Enter the path or URL of the image" />
          </Form.Item> */}

          <Form.Item>
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

export default ManagePonds;
