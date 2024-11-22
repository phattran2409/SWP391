import  { useState, useEffect, useCallback } from "react";
import api from "../../../../config/axios";
import {
  Button,
  Table,
  Form,
  Input,
  Popconfirm,
  Pagination,

} from "antd";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import "quill/dist/quill.snow.css"; // Import Quill CSS

// Import NewsModal and NewsTableColumns
import NewsModal from "../../../../components/admin-dashboard/ModalPost";
import NewsTableColumns from "../../../../components/admin-dashboard/TableColumn";

function ManageNews() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 10, // Default limit
    total: 0, // Initially 0
  });

  const [thumbnailFile, setThumbnailFile] = useState(null); // New state for thumbnail file
  const [existingThumbnail, setExistingThumbnail] = useState(""); // State for existing thumbnail
  const userData = localStorage.getItem("user");
  const parsedUser = JSON.parse(userData);
  const userId = parsedUser._id;
  const userRole = parsedUser.admin;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

 

  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(
        `v1/post/getPostByCategory/1?page=${page}&limit=${limit}`
      );

      // Update state with fetched data
      setDatas(response.data.data);

      // Update pagination info
      setPagination((prev) => ({
        ...prev,
        current: response.data.currentPage,
        total: response.data.totalDocuments,
        pageSize: limit,
      }));
    } catch (err) {
      toast.error(err.response?.data?.result?.data || "An error occurred");
    }
  };

 
 

  const handleStatus = async (_id, statusData) => {
    try {
      await api.put(`v1/post/setStatus/${_id}`, statusData);
      console.log(statusData);
      toast.success("Changed successfully!");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.data || "An error occurred");
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Debounced search to prevent excessive API calls
  const debouncedSearch = useCallback(
    debounce((value) => {
      callApiSearch(value);
    }, 500),
    [] // Ensure debounce is not recreated on every render
  );

  // Call API for searching posts
  const callApiSearch = async (value) => {
    try {
      if (value.trim() === "") {
        fetchData(pagination.current, pagination.pageSize);
        return;
      }
      const res = await api.get(
        `v1/post/searchPost?categoryID=1&title=${encodeURIComponent(
          value
        )}&page=${pagination.current}&limit=${pagination.pageSize}`
      );

      setDatas(res.data.data);

      setPagination({
        current: res.data.currentPage,
        total: res.data.totalDocuments,
        pageSize: 10,
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        toast.error("Error 404: Resource not found");
      } else {
        toast.error(err.response?.data?.data || "Search failed");
      }
    }
  };

  // Fetch data on component mount and when pagination changes
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize]);

  // Handle pagination change
  const handleTableChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  // Mapping for element IDs
  const elementMap = {
    1: "Metal",
    2: "Wood",
    3: "Water",
    4: "Fire",
    5: "Earth",
  };

  const actionColumn = {
    title: "Action",
    align: "center",
    dataIndex: "_id",
    key: "_id",
    render: (_id, news) => (
      <>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
            const { imageThumbnail, ...otherFields } = news; // Exclude imageThumbnail
            form.setFieldsValue(otherFields);
            setThumbnailFile(null); // Reset thumbnail file when editing
            setExistingThumbnail(imageThumbnail); // Set existing thumbnail
            setTitle(news.title || ""); // Set title for preview
            setContent(news.context || "");
            setAuthor(news.author.name || "admin");
            setCreatedAt(news.createdAt || ""); // Set createdAt for preview
            setUpdatedAt(news.updatedAt || ""); // Set updatedAt for preview
          }}
          style={{ marginRight: 8, background: "#42b6f5" }}
        >
          Review
        </Button>
      
        <Popconfirm
          title="Update Status"
          description="Do you want to approve or reject this news?"
          onConfirm={() => handleStatus(_id, { postStatus: true })}
          onCancel={() => handleStatus(_id, { postStatus: false })}
          okText="Approve"
          cancelText="Reject"
          okButtonProps={{
            style: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "#FF4D4F",
              borderColor: "#FF4D4F",
              color: "white",
            },
          }}
        >
          <Button
            type="primary"
            style={{
              background: "green",
              marginLeft: 8,
            }}
          >
            Publish Post
          </Button>
        </Popconfirm>
      </>
    ),
  };

  // Define table columns
  const columns = [
    ...NewsTableColumns({
      elementMap,
    }),
    actionColumn,
  ];

  // Render the component
  return (
    <div>
      <div className="group-search flex">
        {/* Search News by Title */}
        <div className="search-name">
          <label className="mr-4"> Search News :</label>
          <Input
            value={searchValue}
            placeholder="Search news by title"
            style={{ width: 300, marginBottom: 20 }}
            onChange={handleSearch}
          />
        </div>
      </div>

 

      <Table
        dataSource={datas}
        columns={columns}
        pagination={false}
        rowKey={(record) => record._id}
      />

      <div className="flex justify-end mt-4">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handleTableChange}
          showSizeChanger={false}
        />
      </div>

      <NewsModal
        showModal={showModal}
        setShowModal={setShowModal}
        form={form}      
        loading={loading}
        userId={userId}
        userRole={userRole}
        thumbnailFile={thumbnailFile}
        setThumbnailFile={setThumbnailFile}
        existingThumbnail={existingThumbnail}
        setExistingThumbnail={setExistingThumbnail}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        author={author}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </div>
  );
}

export default ManageNews;
