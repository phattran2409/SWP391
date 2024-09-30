// eslint-disable-next-line no-unused-vars
import { Button, Input, Modal, Table, Form } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function ManageMember() {
  const [dataMembers, setDataMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //GET
  const fetchDataMember = async () => {
    try {
      const response = await api.get("v1/user");
      setDataMembers(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  //CREATE OR UPDATE
  const handleSubmit = () => {};

  //DELETE
  const handleDelete = (id) => {};

  useEffect(() => {
    fetchDataMember();
  }, []);

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add</Button>
      <Table dataSource={dataMembers}></Table>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="member"
      >
        <Form>
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
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
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
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="avatar" label="Avatar" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please specify your gender!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[
              { required: true, message: "Please enter your birth date!" },
              { type: "date", message: "Please enter a valid birth date!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageMember;
