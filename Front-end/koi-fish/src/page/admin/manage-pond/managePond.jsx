import React from "react";
import CRUDTemplate from "../../../components/crud-template/crudTemplate";
import { Form, Input } from "antd";

function ManagePond() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
    },
  ];

  const formItems = (
    <>
      <Form.Item name="id" hidden>
        <Input />
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
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea placeholder="Enter a description of the Koi pond" />
      </Form.Item>

      <Form.Item
        name="trees"
        label="Trees"
        rules={[{ required: true, message: "Please enter tree information!" }]}
      >
        <Input placeholder="Enter information about trees around the pond" />
      </Form.Item>

      <Form.Item
        name="waterFlow"
        label="Water Flow"
        rules={[
          { required: true, message: "Please enter water flow information!" },
        ]}
      >
        <Input placeholder="Enter information about water flow" />
      </Form.Item>

      <Form.Item
        name="light"
        label="Light"
        rules={[{ required: true, message: "Please enter light information!" }]}
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
        rules={[{ required: true, message: "Please enter the image!" }]}
      >
        <Input placeholder="Enter the path or URL of the image" />
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        path="v1/pond"
        createPath="/v1/pond/createPond"
        updatePath="/v1/pond/updatePond"
        deletePath="/v1/pond/deletePond"
        searchPath="/v1/pond/searchPond"
      />
    </div>
  );
}

export default ManagePond;
