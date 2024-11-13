// NewsModal.js

import React, { useEffect } from "react";
import  { useState} from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import moment from "moment";
import QuillEditor from "./QuillEditor"; // Ensure this is the correct path
import parse from "html-react-parser";
import "../../components/update-profile/contentStyle.css"


const NewsModal = ({
  showModal,
  setShowModal,
  form,
  handleSubmit,
  loading,
  userId,
  thumbnailFile,
  setThumbnailFile,
  existingThumbnail,
  setExistingThumbnail,
  title,
  setTitle,
  content,
  setContent,
  uploadToCloudinary,
  author,
  createdAt,
  updatedAt,
  userRole,
}) => {
 
 

  return (


    <Modal
      open={showModal}
      onCancel={() => {
        setShowModal(false);
        setThumbnailFile(null); // Reset thumbnail file when modal is closed
        setExistingThumbnail(""); // Reset existing thumbnail
      }}
      title={form.getFieldValue("_id") ? "Update Post" : "Create News"}
     
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={1300}
      footer={!userRole ? undefined : null}
    >
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
        <Row gutter={16}>
          {/* Left Side: Form Inputs */}
          <Col xs={24} sm={24} md={12}>
            {/* Title Input */}
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

            {/* Hidden Fields */}
            <Form.Item name="author" label="Author" initialValue={userId} hidden>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="createdAt" label="Created At" hidden>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="updatedAt" label="Updated At" hidden>
              <Input readOnly />
            </Form.Item>

            <Form.Item name="categoryID" label="Category"  rules={[{ required: true, message: "Please select an element!" }]}>
            <Select placeholder="Select Category" >
                <Select.Option value="1">News</Select.Option>
                <Select.Option value="2">Blog</Select.Option>
                <Select.Option value="3">Advertising</Select.Option>            
              </Select>
            </Form.Item>

            {/* Content Editor */}
       
            <Form.Item label="Content" name="context">
              <QuillEditor
                content={content}
                setContent={setContent}
                uploadToCloudinary={uploadToCloudinary}
              />
            </Form.Item>
  

            {/* Post Status Select */}
            <Form.Item
              hidden
              name="postStatus"
              label="Post Status"
              rules={[{ required: true, message: "Please select the status" }]}
            >
              <Select placeholder="Status" allowClear>
                <Select.Option value={true}>True</Select.Option>
                <Select.Option value={false}>False</Select.Option>
              </Select>
            </Form.Item>

            {/* Element Select */}
            <Form.Item
              name="elementID"
              label="Element"
              rules={[{ required: true, message: "Please select an element!" }]}
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
                      setExistingThumbnail("");
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
              <h2><strong>Thumbnail:</strong></h2>
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
              <h2 ><strong>Title:</strong> {title ? parse(title) : <p>Your Title</p>}</h2>
              <br />
              <h2><strong>Author:</strong> {author}</h2>
              <br />
              <h2><strong>Created At:</strong> {createdAt ? moment(createdAt).format("YYYY-MM-DD HH:mm:ss") : "Loading..."}</h2>
              <h2><strong>Updated At:</strong> {updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : "Loading..."}</h2>
              <br />             
              <h2><strong>Content:</strong></h2>
              <div className="preview-content">{content ? parse(content) : <p>Preview content will appear here...</p>}</div>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewsModal;
