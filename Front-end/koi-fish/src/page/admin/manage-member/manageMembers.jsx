import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Select, Input, Popconfirm } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function ManageMembers() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("/v1/user");
      // Chuyển đổi giá trị gender từ 0, 1 thành "Nam", "Nữ"
      const modifiedData = response.data.data.map((member) => ({
        ...member,
        gender: member.gender === 0 ? "Male" : "Female",
      }));
      setDatas(modifiedData);
    } catch (err) {
      toast.error(err.response.data.data);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
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
      toast.err(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id, member) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(member);
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
        </>
      ),
    },
  ];

  const years = Array.from({ length: 125 }, (_, index) => 2024 - index);

  return (
    <div>
      <Button
        onClick={() => {
          form.resetFields(); // Clear form fields when adding a new member
          setShowModal(true);
        }}
      >
        Add
      </Button>
      <Table dataSource={datas} columns={columns} />

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
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
            <Select placeholder="Select member's birth year">
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageMembers;
