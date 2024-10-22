import React, { useState, useEffect, useCallback, useRef } from "react";
import { Form, Input, Select, Row, Col, Button } from "antd";

import "quill/dist/quill.snow.css"; // Import Quill CSS
import ReactQuill from "react-quill"; // Import ReactQuill
import parse from "html-react-parser";
import { toast } from "react-toastify";
import api from "../../config/axios.js";

export function PostMember() {
  const [form] = Form.useForm();
  const [thumbnailFile, setThumbnailFile] = useState(null); // New state for thumbnail file
  const [existingThumbnail, setExistingThumbnail] = useState(""); // State for existing thumbnail
  const user = JSON.parse(localStorage.getItem("user"));

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [showContent, setShowContent] = useState(false); // State to control content visibility

  const handleCategoryChange = (value) => {
    // Set showContent based on the selected category
    setShowContent(value === "1" || value === "2"); // Show content for News (1) and Blog (2)
  };

  const reactQuillRef = useRef(null);

  // Upload function
  const uploadToCloudinary = async (file) => {
    const cloudName = "ddqgjy50x";
    const uploadPreset = "postMember";

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

  const handleSubmit = async (values) => {
    try {
      values.imageThumbnail = await uploadToCloudinary(thumbnailFile);

      // Create new post
      await api.post("v1/post/createPost", values);
      toast.success("Your post has been created successfully!");

      form.resetFields();
      setThumbnailFile(null); // Reset the file input
      setExistingThumbnail(""); // Reset existing thumbnail
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 style={{ fontSize: "30px" }}>
        <strong>Post Article Koi Fish</strong>
      </h1>
      <div style={{ padding: "10px" }}>
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
                initialValue={user._id}
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
                rules={[
                  { required: true, message: "Please select an Category!" },
                ]}
              >
                <Select
                  placeholder="Select an element"
                  onChange={handleCategoryChange}
                >
                  <Select.Option value="1">News</Select.Option>
                  <Select.Option value="2">Blog</Select.Option>
                  <Select.Option value="3">Advertising</Select.Option>
                </Select>
              </Form.Item>

              {showContent && (
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
              )}

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
                  maxHeight: "100px", 
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
                  <strong>Author:</strong> {user.name}
                </h2>

                <br />

                <div>
                  <h2>{showContent && <strong>Content:</strong>}</h2>

                  <div>{content ? parse(content) : <p></p>}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" 
            style={{ marginTop: "20px", width: "100%", height: "40px", fontSize: "18px", backgroundColor: "#fb4143" }}
            >
              Create Your Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}