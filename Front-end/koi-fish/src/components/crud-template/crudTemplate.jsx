// eslint-disable-next-line no-unused-vars
import { Button, Input, Modal, Table, Form, Select, Popconfirm } from "antd";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";

function CRUDTemplate({
  columns,
  formItems,
  path,
  createPath,
  updatePath,
  deletePath,
  searchPath,
}) {
  const [dataMembers, setDataMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const tableColumn = [
    ...columns,
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, category) => {
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldValue(category);
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

  //GET
  const fetchDataMember = async () => {
    try {
      const response = await api.get(path);
      setDataMembers(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  //CREATE OR UPDATE
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (values.id) {
        // => update
        const response = await api.put(`${updatePath}/${values.id}`, values);
      } else {
        // => create
        const response = await api.post(`${createPath}`, values);
      }

      fetchDataMember();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`${deletePath}/${id}`);
      toast.success("Successfully deleted");
      fetchDataMember();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchDataMember();
  }, []);

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add</Button>
      <Table dataSource={dataMembers} columns={tableColumn}></Table>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Create a new member"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default CRUDTemplate;
