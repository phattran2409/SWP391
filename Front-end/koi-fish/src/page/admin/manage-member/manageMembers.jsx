import React, { useEffect, useState, useCallback } from "react";
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
  Pagination,
  DatePicker,
  Badge,
  Tag,
  Avatar
} from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";
import { castArray, debounce } from "lodash";
import moment from "moment";

function ManageMembers() {
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
  
  //get data
  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(`/v1/user?page=${page}&limit=${limit}`);
      // đổi gender từ 0, 1 thành "Nam", "Nữ"
      const modifiedData = response.data.data.map((member) => ({
        ...member,
        birthDate:  moment(member.birthDate)
      }));
      console.log("fecth API ---> "+modifiedData);

      setDatas(modifiedData);
      setPagination({
        current: response.data.result.currentPage, // cập nhật trang hiện tại
        total: response.data.result.totalDocuments, // tổng số cá
        pageSize: limit, // số cá trên mỗi trang
      });
    } catch (err) {
      toast.error(err);
    }
  };

  //submit form
  const handleSubmit = async (values) => {
    console.log("handle Submit : "+ values.phoneNumber);
    const formatBirthDate = values.birthDate.format();
    console.log(formatBirthDate);
    
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      values.avatar = url;
    }
    values.birthDate  = formatBirthDate;
   
    try {
      setLoading(true);

      if (values._id) {
        //update
        await api.put(`v1/user/update/id=${values._id}`, values);
      } else {
        await api.post("/v1/user/create", values);
      }
      toast.success("Successfully saved!");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      if(err.status == 500) { 
        toast.error("Error update User")
      }
    } finally {
      setLoading(false);
    }
  };

  //chuyen doi file sang dang bases64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    console.log("Preview file  "+file);
    
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/v1/user/id=${id}`);
      toast.success("Successfully deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.response.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ->>  handle search
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
        `v1/user/search?searchName=${value}&page=${pagination.current}&limit=${pagination.pageSize}`
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
      render: (id) => {
        return id.length > 5 ? `${id.substring(0, 5)}...` : id; // Cắt ID và thêm dấu ...
      },
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (password) => {
        return password.length > 0
          ? "*".repeat(Math.min(password.length, 10))
          : ""; // Chỉ hiển thị tối đa 10 dấu *
      },
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        if (a.name && b.name) {
          return a.name.length - b.name.length;
        }
        return 0;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender - b.gender,
      sortDirections: ["descend", "ascend"],
      render: (number) => {
        return <>{number == 0 ? <>Male</> : <>Female</>}</>;
      },
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (text) => {
        if (!text) return ""; // Nếu không có giá trị, trả về chuỗi rỗng
        const date = new Date(text); // Tạo đối tượng Date từ chuỗi ngày

        const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng và đảm bảo có 2 chữ số
        const year = date.getFullYear(); // Lấy năm

        return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
      },
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <>
          {avatar ? (
            <Image src={avatar} alt="Avatar" style={{ width: 100 }} />
          ) : (
            <Image src="https://placehold.co/100x100/png" />
          )}
        </>
      ),
    },
    {
      title: "status",
      dataIndex: "memberStatus",
      key: `memberStatus`,
      render: (isMember ,record) => {
        return (
          <>
          <div className="flex">
            {isMember ? (
              <Tag color="green" text="member">
                Member
              </Tag>
            ) : (
              <Tag color="cyan" text="user">
                User
              </Tag>
            )}
            { (record.admin) && ( 
              <Tag color="red"> Admin</Tag>
            )}
          </div>
          </>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id, member) => (
        <>
          <div className="flex gap-1">
            <Button
              type="primary"
              onClick={() => {
                setShowModal(!showModal);
                form.setFieldsValue({...member  , avatar : member.avatar});
                
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this category?"
              onConfirm={() => handleDelete(_id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="group-search flex">
        {/* searh  Name*/}
        <div className="search-name">
          <label className="mr-4"> Search Name :</label>
          <Input
            value={searchValue}
            placeholder="Search By Full Name"
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

      {/* Show Data Table */}
      <Table
        dataSource={datas}
        columns={columns}
        pagination={false}
        className="w-full overflow-x-auto"
      />

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
        onCancel={() => setShowModal()}
        title="Create Member"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="userName"
            label="UserName"
            rules={[
              { required: true, message: "Please enter your username!" },
              {
                min: 6,
                message: "Username must be at least 6 characters long!",
              },
              {
                max: 20,
                message: "Username cannot be longer than 20 characters!",
              },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "Username can only contain letters and numbers!",
              },
            ]}
          >
            <Input placeholder="Enter member's UserName" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name!" },
              { min: 2, message: "Name must be at least 2 characters long!" },
              { max: 50, message: "Name cannot be longer than 50 characters!" },
              {
                pattern:
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơưƯĂắằẳẵặÂấầẩẫậÊếềểễệÔốồổỗộƠớờởỡợỲỵỷỹÝýỴýỶỹ ]+$/,
                message:
                  "Please enter a valid name (letters, including Vietnamese characters only)!",
              },
              {
                pattern: /^[^\d!@#\$%\^\&*\)\(+=._-]+$/,
                message: "Name cannot contain numbers or special characters!",
              },
            ]}
          >
            <Input placeholder="Enter member's full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
              {
                max: 100,
                message: "Email cannot be longer than 100 characters!",
              },
            ]}
          >
            <Input placeholder="Enter member's email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
              { pattern: /^\S*$/, message: "Password cannot contain spaces!" },
            ]}
          >
            <Input.Password placeholder="Enter member's password" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^(0|\+84)[3-9][0-9]{8}$/,
                message: "Please enter a valid phone number!",
              },
              { len: 10, message: "Phone number must be exactly 10 digits!" },
            ]}
          >
            <Input placeholder="Enter member's phone number" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please specify your gender!" }]}
          >
            <Select placeholder="Select member's gender">
              <Select.Option value="0">Male</Select.Option>
              <Select.Option value="1">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Birth Year"
            rules={[
              { required: true, message: "Please select your birth year!" },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>

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

export default ManageMembers;
