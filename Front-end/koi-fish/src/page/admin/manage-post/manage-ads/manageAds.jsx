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
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  // const reactQuillRef = useRef(null);
  useEffect(() => {
    form.setFieldsValue({ context: content }); // Cập nhật giá trị vào form
  }, [content, form]);
  // Upload function
  const uploadToCloudinary = async (file) => {
    const cloudName = "ddqgjy50x";
    const uploadPreset = "postAdmin";

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration is missing.");
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(
        data.error?.message || "Failed to upload image to Cloudinary"
      );
    }
  };

  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(
        `v1/post/getPostByCategory/3?page=${page}&limit=${limit}`
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

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (thumbnailFile) {
        values.imageThumbnail = await uploadToCloudinary(thumbnailFile);
      } else {
        // If editing and no new thumbnail is uploaded, retain the existing URL
        if (values._id) {
          const existingPost = datas.find((post) => post._id === values._id);
          if (existingPost) {
            values.imageThumbnail = existingPost.imageThumbnail;
          }
        }
      }

      if (values._id) {
        // Update existing post
        await api.put(`v1/post/updatePost/${values._id}`, values);
        toast.success("News updated successfully!");
      } else {
        // Create new post
        await api.post("v1/post/createPost", values);
        toast.success("News created successfully!");
      }

      fetchData();
      form.resetFields();
      setThumbnailFile(null); // Reset the file input
      setExistingThumbnail(""); // Reset existing thumbnail
      setShowModal(false);
    } catch (err) {
      toast.error(
        err.response?.data?.data || err.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async (_id) => {
    try {
      await api.delete(`v1/post/deletePost/${_id}`);
      toast.success("Deleted successfully!");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.data || "An error occurred");
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
        `v1/post/searchPost?categoryID=3&title=${encodeURIComponent(
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
          Edit
        </Button>
        <Popconfirm
          title="Delete"
          description="Do you want to delete this news?"
          onConfirm={() => handleDelete(_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
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
              background: "#FFD700",
              marginLeft: 8,
            }}
          >
            Censorship
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
          <label className="mr-4"> Search Advertising :</label>
          <Input
            value={searchValue}
            placeholder="Search advertising by title"
            style={{ width: 300, marginBottom: 20 }}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Button
        type="primary"
        onClick={() => {
          form.resetFields(); // Clear form fields when adding a new post
          setThumbnailFile(null); // Reset thumbnail file
          setExistingThumbnail(""); // Reset existing thumbnail
          setShowModal(true);
          setTitle(""); // Set title for preview
          setContent("");
          setAuthor("admin");
          setCreatedAt(""); // Set createdAt for preview
          setUpdatedAt(""); // Set updatedAt for preview
        }}
        style={{ marginBottom: 16 }}
      >
        Create New Post
      </Button>

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
        handleSubmit={handleSubmit}
        loading={loading}
        userId={userId}
        thumbnailFile={thumbnailFile}
        setThumbnailFile={setThumbnailFile}
        existingThumbnail={existingThumbnail}
        setExistingThumbnail={setExistingThumbnail}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        uploadToCloudinary={uploadToCloudinary}
        author={author}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </div>
  );
}

export default ManageNews;
