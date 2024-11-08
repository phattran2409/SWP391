import  { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  Pagination,
  Tag,
  Avatar,
  Descriptions,
} from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import {  EyeOutlined, ClearOutlined } from "@ant-design/icons";


import { useNavigate } from "react-router-dom";

export default function ManageOrder() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // Trang hiện tại
    pageSize: 10, //(limit mặc định)
    total: 0, // ban đầu là 0
  });
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(`/v1/order?page=${page}&limit=${limit}`);
      console.log(response.data);

      setDatas(response.data.data);
      setPagination({
        current: response.data.currentPage, // cập nhật trang hiện tại
        total: response.data.totalDocuments, // tổng số cá
        pageSize: limit, // số cá trên mỗi trang
      });
    } catch (err) {
      console.log(err);
      if (err.status === 403) {
        navigate("/login");
      }
      toast.error(err.error);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [reload]);

  async function handleShowProfile(accountID) {
    setShowModal(true);

    try {
      const result = await api.get(`/v1/order/getProfile?id=${accountID}`);
      setUser(result.data);
      console.log("API " + result.data);
    } catch (err) {
      console.log(err);

      toast.error("Failed to get order information");
    }
  }
  console.log("User" + user.userName);

  async function handleRemoveOrders(orderId) {
    try {
      const result = await api.delete(`v1/order/delete${orderId}`);
      console.log(result);
      setReload(!reload);
      toast.success(result.data.message);
    } catch (err) {
      toast.error("Can't delete this order");
      console.log(err);
    }
  }

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
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: "20%",
      // render: (id) => {
      //   return id.length > 5 ? `${id.substring(0, 5)}...` : id; // Cắt ID và thêm dấu ...
      // },
    },
    {
      title: "accountID",
      dataIndex: "accountID",
      key: "accountID",
      width: "20%",
    },
    {
      title: "Package name",
      dataIndex: "packageType",
      width: "10%",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "10%",
      render: (message) => {
        console.log(message);

        return message.includes("Success") ? (
          <Tag color="green">{message}</Tag>
        ) : (
          <Tag color="red">{message}</Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "resultCode",
      key: "resultCode",
      render: (number) => {
        return (
          <>
            {number == 0 ? (
              <Tag color="green">Success</Tag>
            ) : (
              <Tag color="Red">Fail</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      dataIndex: "accountID",
      key: "accountID",
      align: "center",

      render: (accountID, order) => {
        console.log("order id" + order._id);

        return (
          <>
            <div className="flex gap-2">
              <Button
                onClick={() => handleShowProfile(accountID)}
                icon={<EyeOutlined />}
                type="primary"
              >
                View User
              </Button>
              <Button type="primary" danger icon={<ClearOutlined />}>
                <Popconfirm
                  title="Delete"
                  description="Do you want to delete this Orders?"
                  onConfirm={() => handleRemoveOrders(order._id)}
                >
                  Delete
                </Popconfirm>
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={datas}
        columns={columns}
        pagination={false}
        className="w-full overflow-x-auto"
      />
      <div className="flex justify-end  mt-5">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          defaultCurrent={1}
          onChange={(page, pageSize) => {
            setPagination({
              ...pagination,
              current: page,
              pageSize: pageSize,
            });
            fetchData(page, pageSize);
          }}
        />
      </div>

      <Modal
        title="User Information"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>,
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">
            {user.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {user.name || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {user.phoneNumber || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Admin">
            {user.admin ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Member Status">
            {user.memberStatus ? "Active" : "Inactive"}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {user.gender === 0 ? "Male" : user.gender === 1 ? "Female" : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {user.birthDate
              ? new Date(user.birthDate).toLocaleDateString()
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Avatar">
            {user.avatar ? <Avatar src={user.avatar} size={64} /> : "No Avatar"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
}
