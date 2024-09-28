import React, { useEffect } from "react";
import { Button, Modal, Table, Form, Input, Select } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

function ManageMember() {
  const [openModal, setOpenModal] = React.useState(false);
  const [members, setMembers] = React.useState([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [form] = useForm();

  const api = "https://66f75283b5d85f31a3427688.mockapi.io/Member";

  const fetchMember = async () => {
    const response = await axios.get(api);
    console.log(response);
    setMembers(response.data);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Birth Year",
      dataIndex: "birthYear",
      key: "birthYear",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const yearOptions = [];
  for (let i = 1920; i <= 2024; i++) {
    yearOptions.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  const handleSubmitMember = async (values) => {
    //post xuong api
    console.log(values);
    //dua xuong back-end
    try {
      setSubmitting(true);
      const response = await axios.post(api, values);
      // thanh cong
      alert("Successfully create new student");
      setOpenModal(false);
      setSubmitting(false);
      //clear du lieu cu
      form.resetFields();
      //lay lai du lieu moi
      fetchMember();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Create new member</Button>
      <Table columns={columns} dataSource={members}></Table>
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new member"
        open={openModal}
        onCancel={handleCloseModal}
        footer={null} // Để ẩn nút footer mặc định
      >
        {/* form: dai dien cho nguyen cai form */}
        <Form form={form} layout="vertical" onFinish={handleSubmitMember}>
          <Form.Item
            label="Member name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input member's name!",
              },
              {
                pattern:
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠƯ \s]+$/,
                message: "Name should only contain letters, spaces!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Member gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select member's gender!",
              },
            ]}
          >
            <Select placeholder="Select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Member birth year"
            name="birthYear"
            rules={[
              {
                required: true,
                message: "Please select member's birth year!",
              },
            ]}
          >
            <Select placeholder="Select birth year">{yearOptions}</Select>
          </Form.Item>
          <Form.Item
            label="Member email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input member's email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Member phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input member's phone!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number should be 10 digits!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageMember;

