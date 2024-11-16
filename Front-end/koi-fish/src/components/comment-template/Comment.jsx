import { useState, useEffect } from "react";
import api from "../../config/axios";
import { FaClock, FaEllipsisH } from "react-icons/fa"; // Import the icon for the three dots
import { Popconfirm, Dropdown, Menu } from "antd";
import { IoArrowUndoOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const CommentSystem = ({ postId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [comments, setComments] = useState([]);
  const [countComments, setCountComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [visibleComments, setVisibleComments] = useState(3); // Show first 3 comments initially

  const fetchData = async () => {
    try {
      const res = await api.get(`v1/comment/${postId}`);
      setComments(res.data.data);
      setCountComments(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addComment = async () => {
    try {
      await api.post("v1/comment/createComment", {
        content: newComment,
        author: user._id,
        post: postId,
      });
      fetchData();
      toast.success("Comment added successfully");
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (id) => {
    try {
      await api.delete(`v1/comment/deleteComment/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReply = async (commentId, relyId) => {
    try {
      await api.delete(
        `v1/comment/deleteReply?commentId=${commentId}&replyId=${relyId}`
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (id, content) => {
    setEditCommentId(id);
    setEditContent(content);
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`v1/comment/updateComment/${id}`, { content: editContent });
      fetchData();
      setEditCommentId(null); // Close edit mode after saving
      toast.success("Comment edited successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const saveEditReply = async (commentId, replyId) => {
    try {
      await api.put(
        `v1/comment/updateReply?commentId=${commentId}&replyId=${replyId}`,
        { content: editContent }
      );
      fetchData();
      setEditCommentId(null); // Close edit mode after saving
      toast.success("Reply edited successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const menu = (comment) => (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() => startEdit(comment._id, comment.content)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this comment?"
          onConfirm={() => deleteComment(comment._id)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const menuReply = (comment, reply) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => startEdit(reply._id, reply.content)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this reply?"
          onConfirm={() => deleteReply(comment._id, reply._id)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const addReply = async (commentId) => {
    try {
      await api.post(`v1/comment/createReply/${commentId}`, {
        content: replyContent,
        author: user._id,
      });
      fetchData();
      toast.success("Reply added successfully");
      setReplyContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 3); // Load 3 more comments
  };

  return (
    <div className="p-4 max-w-screen">
      {user == null ? (
        <p className="text-sm text-gray-500">Please login to post a comment.</p>
      ) : (
        <div
          className={`mb-4 border ${
            isFocused ? "border-black " : "border-gray-300 "
          } rounded transition-all duration-300`}
        >
          <textarea
            type="text"
            className="w-full m-1 mr-2 outline outline-2 outline-white "
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="flex justify-end mr-3 mb-2 ">
            <button
              onClick={addComment}
              className="flex justify-end bg-red-600 text-white hover:bg-red-500 px-4 py-2 mt-2 rounded "
            >
              Comment
            </button>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-xl flex font-semibold mb-10 ml-5">
          Comments ({countComments})
        </h2>
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment._id} className="mb-4 border-b border-gray-300 pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={comment.author.avatar}
                  className="bg-gray-300 h-8 w-8 rounded-full mr-2"
                />
                <p className="font-semibold text-sm">
                  {comment.author.userName}
                </p>
              </div>
              {comment.author._id === user?._id && (
                <Dropdown overlay={menu(comment)} trigger={["click"]}>
                  <FaEllipsisH className="text-gray-500 cursor-pointer" />
                </Dropdown>
              )}
            </div>
            <div
              className="ml-10 flex justify-start max-w-full"
              style={{
                maxHeight: "100px", // Adjust to desired max height
                overflowY: "auto", // Adds vertical scroll if needed
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {comment.content}
            </div>

            <p className=" text-sm flex justify-end items-center ">
              <FaClock className="mr-1 text-gray-500" />
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>

            {/* Edit functionality */}
            {editCommentId === comment._id && (
              <div className="mt-2 ml-10">
                <textarea
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="mt-2">
                  <button
                    onClick={() => saveEdit(comment._id)}
                    className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white hover:bg-gray-500 px-3 py-1 ml-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Toggle Reply Section */}
            <button
              onClick={() => toggleReplies(comment._id)}
              className="text-gray-500 text-sm hover:text-red-700 flex ml-10"
            >
              <IoArrowUndoOutline className="mr-1" />
              {showReplies[comment._id]
                ? "Hide Replies"
                : `Show ${comment.repliesCount} Replies`}
            </button>

            {/* Reply section */}
            {showReplies[comment._id] && (
              <div className="mt-4 ml-10">
                {user == null ? (
                  <p className="text-sm text-gray-500">
                    Please login to reply.
                  </p>
                ) : (
                  <div>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Write a reply..."
                      value={
                        replyToCommentId === comment._id ? replyContent : ""
                      }
                      onChange={(e) => setReplyContent(e.target.value)}
                      onFocus={() => setReplyToCommentId(comment._id)}
                    />
                    {replyToCommentId === comment._id && (
                      <button
                        onClick={() => addReply(comment._id)}
                        className="flex bg-red-600 text-white hover:bg-red-500 px-2 py-1 mt-2 rounded"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                )}
                {/* Render replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-8">
                    <h3 className="flex text-sm font-semibold mb-5">Replies</h3>

                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="border-b border-gray-300 pb-2 mb-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={reply.author.avatar}
                              className="bg-gray-300 h-6 w-6 rounded-full mr-2"
                            />
                            <p className="flex text-xs font-semibold">
                              {reply.author.userName}
                            </p>
                          </div>
                          {reply.author._id === user?._id && (
                            <Dropdown
                              overlay={menuReply(comment, reply)}
                              trigger={["click"]}
                            >
                              <FaEllipsisH className="text-gray-500 cursor-pointer" />
                            </Dropdown>
                          )}
                        </div>

                        <p
                          className="ml-10 flex justify-start max-w-full"
                          style={{
                            maxHeight: "100px", // Adjust to desired max height
                            overflowY: "auto", // Adds vertical scroll if needed
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {reply.content}
                        </p>
                        <p className=" text-xs flex justify-end items-center ">
                          <FaClock className="mr-1 text-gray-500" />
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </p>
                        {editCommentId === reply._id && (
                          <div className="mt-2 ml-10">
                            <textarea
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded"
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                            />
                            <div className="mt-2">
                              <button
                                onClick={() =>
                                  saveEditReply(comment._id, reply._id)
                                }
                                className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="bg-gray-400 text-white hover:bg-gray-500 px-3 py-1 ml-2 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {visibleComments < comments.length && (
          <button
            onClick={loadMoreComments}
            className="bg-red-600 text-white hover:bg-red-500 px-4 py-2 mt-4 rounded"
          >
            Load More Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentSystem;