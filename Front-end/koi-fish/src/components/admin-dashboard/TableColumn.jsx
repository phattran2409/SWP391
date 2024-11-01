import React from 'react';
import { Button, Popconfirm, Tag, Image } from 'antd';

const NewsTableColumns = ({ elementMap }) => {
  
    return [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        const maxLength = 10;
        return _id.length > maxLength ? `${_id.slice(0, maxLength)}...` : _id;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => {
        const maxLength = 20;
        return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
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
        return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
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
        status ? <Tag color="green">Approved</Tag> : <Tag color="red">Rejected</Tag>,
      sorter: (a, b) => b.postStatus - a.postStatus, // Sort by status
    },
   
  ];
};

export default NewsTableColumns;
