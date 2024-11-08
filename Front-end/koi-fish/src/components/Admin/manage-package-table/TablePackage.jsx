import { Tab } from "@mui/material";
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
  Avatar,
} from "antd";
import { data } from "autoprefixer";
import { result } from "lodash";
import { AlignCenter, ImageOff } from "lucide-react";
import { number } from "prop-types";
import { useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { render } from "react-dom";

export default function TablePackage({ dataPackage, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();


  // tao function check var co dau cham khi them hoac edit  cho amount
  const isDot = (amount) => {
    const str = amount.toString();
    const matches = str.match(/\./);
    if (matches) {
      // xoa dau cham trong 1 string
      const amount_replace = amount.replace(/\./, '');
      return amount_replace;
    }
    return null;
  }

  const handleSubmit = async (values) => {
    // console.log(values.amount.replace(/\./g, ""));
    // 2 truong hop xay ra khi edit  
    // TH 1 : Khi admin  nhap vao co dau cham de phan biet hang don vi 
    // TH 2 : admin Khong co dau cham de phan biet
    const amount_replace = isDot(values.amount);

    const {
      id = values._id,
      packageType,
      amount,
      expiresDay = values.expiresDays,
    } = values;

    const data = {
      id,
      packageType,
      amount: amount_replace || amount,
      expiresDay,
    };

    try {
      if (values._id) {
        const result = await api.post("/v1/package/update", data);
        toast.success(result.data.message);
        onUpdate();
        setShowModal(false);
      } else {
        // if  (dataPackage.length >= 3 )  { return toast.error("cant add more package")} 
        const result = await api.post("/v1/package/create", {
          packageType: packageType,
          amount: data.amount,
          expiresDay: data.expiresDay,
        });
        toast.success(result.data.message);
        onUpdate();
        setShowModal(false);
      }
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  }


  const handleDelete = async (_id) => {
    console.log(_id);

    const id = _id;
    try {
      const result = await api.post("/v1/package/delete ", { id: id });
      toast.success(result.data.message);
      onUpdate();
    } catch (error) {
      console.log(error.message);
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
      title: "Package Name",
      dataIndex: "packageType",
      key: "packageType",
      sorter: (a, b) => a.packageType.localeCompare(b.packageType),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount VND",
      dataIndex: "amount",
      key: "amount ",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
      render: (amount) => (
        <>
          <p>{amount.toLocaleString("de-DE")} </p>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      AlignCenter: "center",
      key: "_id",

      render: (_id, dataPackage) => (
        <>
          <div className="flex gap-1">
            <Button
              type="primary"
              onClick={() => {
                setShowModal(true);
                form.setFieldsValue({ ...dataPackage });
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this Package?"
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
    <>
      <Button
        type="primary"
        variant="outlined"
        onClick={() => {
          setShowModal(true);
          form.resetFields();
        }}
      >
        Add
      </Button>
      <Table
        dataSource={dataPackage}
        columns={columns}
        pagination={false}
        className="w-full overflow-x-auto"
      />
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Update Data package"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="packageType"
            label="Package Name"
            rules={[
              { required: true, message: "Please enter Package Name" },
              {
                max: 100,
                message: "enter Name less than 100 character",
              },
            ]}
          >
            <Input placeholder="Enter Package Name" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: "Please enter Amount Name" },
              {
                pattern: /^(?:[1-9]\d{0,2})(?:\.\d{3})*(?:\.\d{3})?$/,
                message:
                  <>
                    Please enter a positive number, with a limit of one million. <br />
                    Or must include a dot separating the hundreds and thousands.
                  </>
              },
            ]}
          >
            <Input placeholder="Enter member's full name" />
          </Form.Item>
          <Form.Item
            name="expiresDay"
            label="Expire Days"
            rules={[
              {
                required: true,
                message: "please enter Days number",
              },
              {
                pattern: /^[1-9]\d{0,2}$/,
                message:
                  "Please enter a positive number that is a thousand or less. ",
              },
            ]}
          >
            <Input placeholder="Enter expire Days " />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

}