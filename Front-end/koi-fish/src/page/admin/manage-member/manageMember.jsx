// eslint-disable-next-line no-unused-vars
import { Button, Input, Modal, Table, Form, Select, Popconfirm } from "antd";
import React from "react";
import { toast } from "react-toastify";

import CRUDTemplate from "../../../components/crud-template/crudTemplate";

function ManageMember() {
  const [form] = Form.useForm();

  //handle birth Year
  const years = Array.from({ length: 125 }, (_, index) => 2024 - index);

  const formItems = (
    <>
      <Form.Item name="id" hidden>
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
          {
            max: 20,
            message: "Password cannot be longer than 20 characters!",
          },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
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
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="birthYear"
        label="Birth Year"
        rules={[{ required: true, message: "Please select your birth year!" }]}
      >
        <Select placeholder="Select member's birth year">
          {years.map((year) => (
            <Select.Option key={year} value={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      dataIndex: "id",
      key: "id",
      render: (id, member) => {
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldValue(member);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete"
            description="Do you want to delete this member?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>;
      },
    },
  ];

  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        path="v1/user"
        createPath="/v1/user/create"
        updatePath="/v1/user/update"
        deletePath="/v1/user"
        searchPath="/v1/user/search"
      />
    </div>
  );
}

export default ManageMember;
