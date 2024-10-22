import React, { useState, useEffect, useCallback, useRef } from "react";
import api from "../../../../config/axios";
import { Tag } from "antd";
import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  Popconfirm,
  Select,
  Pagination,
  Row,
  Col,
  Image,
} from "antd";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import "quill/dist/quill.snow.css"; // Import Quill CSS
import ReactQuill from "react-quill"; // Import ReactQuill
import parse from "html-react-parser";
import { AlignCenter } from "lucide-react";
import moment from "moment";

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

  const reactQuillRef = useRef(null);

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

  // Image handler for ReactQuill
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        try {
          const url = await uploadToCloudinary(file);
          const quill = reactQuillRef.current;
          if (quill) {
            const editor = quill.getEditor();
            let range = editor.getSelection();
            console.log("Current selection range:", range);
            if (!range) {
              console.log("No selection found. Inserting at the end.");
              range = { index: editor.getLength() };
            }
            editor.insertEmbed(range.index, "image", url);
            editor.setSelection(range.index + 1);
            console.log("Image inserted at index:", range.index);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
          toast.error(error.message || "Failed to upload image");
        }
      }
    };
  }, []); // Removed [errors]

  const quillModules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "image",
  ];

  const fetchData = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(
        `http://localhost:8081/v1/post/getPostByCategory/1?page=${page}&limit=${limit}`
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
      await api.put(
        `http://localhost:8081/v1/post/setStatus/${_id}`,
        statusData
      );
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
        `http://localhost:8081/v1/post/searchPost?categoryID=1&title=${encodeURIComponent(
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

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        // const name = author?.name || "Admin";
        const maxLength = 10;
        return _id.length > maxLength ? `${_id.slice(0, maxLength)}...` : _id;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => {
        // const name = author?.name || "Admin";
        const maxLength = 20;
        return title.length > maxLength
          ? `${title.slice(0, maxLength)}...`
          : title;
      },
    },
    {
      title: "Content",
      dataIndex: "context",
      key: "context",
      width: "15%",
      render: (text) => {
        const maxLength = 20;

        const extractTextFromP = (html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const pTags = doc.getElementsByTagName("p");

          let extractedText = "";
          for (let i = 0; i < pTags.length; i++) {
            extractedText += pTags[i].textContent;
            if (extractedText.length >= maxLength) {
              break;
            }
          }

          return extractedText.length > maxLength
            ? `${extractedText.slice(0, maxLength)}...`
            : extractedText;
        };

        return extractTextFromP(text);
      },
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => {
        const name = author?.name || "Admin";
        const maxLength = 20;
        return name.length > maxLength
          ? `${name.slice(0, maxLength)}...`
          : name;
      },
    },
    {
      title: "Thumbnail",
      dataIndex: "imageThumbnail",
      key: "imageThumbnail",
      render: (imageThumbnail) =>
        imageThumbnail ? (
          <Image src={imageThumbnail} alt="Thumbnail" style={{ width: 100 }} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Element",
      dataIndex: "elementID",
      key: "elementID",
      render: (elementID) => elementMap[elementID] || "Unknown",
      sorter: (a, b) => a.elementID - b.elementID,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "postStatus",
      key: "postStatus",
      render: (status) =>
        status ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="red">Rejected</Tag>
        ),
      sorter: (a, b) => b.postStatus - a.postStatus, // Đảo ngược để true (1) lên trước false (0)
    },

    {
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
    },
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
        Add News
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

      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setThumbnailFile(null); // Reset thumbnail file when modal is closed
          setExistingThumbnail(""); // Reset existing thumbnail
        }}
        title={form.getFieldValue("_id") ? "Update News" : "Create News"}
        onOk={() => form.submit()}
        confirmLoading={loading}
        width={1300}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Row gutter={16}>
            {/* Left Side: Form Inputs */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter the title!" }]}
              >
                <Input
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="author"
                label="Author"
                initialValue={userId}
                hidden
              >
                <Input readOnly />
              </Form.Item>

              <Form.Item name="createdAt" label="Created At" hidden>
                <Input readOnly />
              </Form.Item>

              <Form.Item name="updatedAt" label="Updated At" hidden>
                <Input readOnly />
              </Form.Item>

              <Form.Item
                name="categoryID"
                label="Category"
                initialValue="1"
                hidden
              >
                <Input readOnly />
              </Form.Item>

              <Form.Item label="Content" name="context">
                <ReactQuill
                  ref={reactQuillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder="Enter content for your post"
                  style={{ height: "200px", marginBottom: "20px" }}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </Form.Item>

              <Form.Item
                name="postStatus"
                label="Post Status"
                rules={[
                  {
                    required: true,
                    message: "Please select the status",
                  },
                ]}
              >
                <Select placeholder="Status" allowClear>
                  <Select.Option value={true}>True</Select.Option>
                  <Select.Option value={false}>False</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="elementID"
                label="Element"
                rules={[
                  { required: true, message: "Please select an element!" },
                ]}
              >
                <Select placeholder="Select an element">
                  <Select.Option value="1">Metal</Select.Option>
                  <Select.Option value="2">Wood</Select.Option>
                  <Select.Option value="3">Water</Select.Option>
                  <Select.Option value="4">Fire</Select.Option>
                  <Select.Option value="5">Earth</Select.Option>
                </Select>
              </Form.Item>
              {/* File Input for Thumbnail */}

              <Form.Item
                label="Thumbnail (required)"
                rules={[
                  {
                    required: !form.getFieldValue("_id"),
                    message: "Please upload a thumbnail image!",
                  },
                ]}
              >
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setThumbnailFile(e.target.files[0]);
                        setExistingThumbnail(""); // Clear existing thumbnail if a new file is selected
                      }
                    }}
                  />
                  {(thumbnailFile || existingThumbnail) && (
                    <img
                      src={
                        thumbnailFile
                          ? URL.createObjectURL(thumbnailFile)
                          : existingThumbnail
                      }
                      alt="Thumbnail Preview"
                      style={{ width: 100, marginTop: 10 }}
                    />
                  )}
                </>
              </Form.Item>
              <Form.Item name="_id" label="Post ID">
                <Input readOnly />
              </Form.Item>
            </Col>

            {/* Right Side: Preview */}
            <Col xs={24} sm={24} md={12}>
              <div
                style={{
                  border: "2px solid black",
                  padding: "20px",
                  minHeight: "100%",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  overflowY: "auto",
                }}
              >
                <h2>
                  <strong>Thumbnail:</strong>
                </h2>
                {thumbnailFile || existingThumbnail ? (
                  <img
                    src={
                      thumbnailFile
                        ? URL.createObjectURL(thumbnailFile)
                        : existingThumbnail
                    }
                    alt="Thumbnail Preview"
                    style={{ width: "70%", marginTop: "20px" }}
                  />
                ) : (
                  <p>No thumbnail available</p>
                )}
                <br />
                <h2>
                  <strong>Title:</strong>{" "}
                  {title ? parse(title) : <p>Your Title</p>}
                </h2>

                <br />
                <h2>
                  <strong>Author:</strong> {author}
                </h2>

                <br />
                <h2>
                  <strong>Created At: </strong>

                  {createdAt
                    ? moment(createdAt).format("YYYY-MM-DD HH:mm:ss")
                    : "Loading..."}
                </h2>
                <h2>
                  <strong> Updated At: </strong>

                  {updatedAt
                    ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss")
                    : "Loading..."}
                </h2>
                <br />
                <h2>
                  <strong>Content:</strong>
                </h2>

                <div>
                  {content ? (
                    parse(content)
                  ) : (
                    <p>Preview content will appear here...</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageNews;
