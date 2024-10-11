import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Button, Modal, Table, Form, Input, Popconfirm, Select } from "antd";
import { toast } from "react-toastify";

function ManagePonds() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //Get
  const fetchData = async () => {
    try {
      const response = await api.get("v1/pond/getAllPond");
      setDatas(response.data.data);
    } catch (err) {
      toast.error(err.response.data.data);
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
    2: "Water",
    3: "Wood",
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
    {
      title: "Element",
      dataIndex: "elementID",
      key: "elementID",
      render: (elementID) => elementMap[elementID] || "Unknown",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id, pond) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(pond);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this pond?"
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
      <Table dataSource={datas} columns={columns}></Table>

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
            <Input.TextArea placeholder="Enter a description of the Koi pond" />
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
            rules={[{ required: true, message: "Please enter the image!" }]}
          >
            <Input placeholder="Enter the path or URL of the image" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagePonds;
