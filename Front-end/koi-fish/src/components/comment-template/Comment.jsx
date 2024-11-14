import { useState } from 'react';

const initialComments = [
    { id: 1, username: "Jesus Plushie", content: "Yoo", replies: [] },
    { id: 2, username: "Quandale Dingle", content: "sigma", replies: [] },
    { id: 3, username: "Nathan Baker", content: "Red blue", replies: [] },
];

function CommentSystem() {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [replyContent, setReplyContent] = useState(""); // State for reply content
    const [replyToCommentId, setReplyToCommentId] = useState(null); // Track which comment the reply is for

    const addComment = () => {
        setComments([...comments, { id: Date.now(), username: "Your Name", content: newComment, replies: [] }]);
        setNewComment("");
    };

    const deleteComment = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    const startEdit = (id, content) => {
        setEditCommentId(id);
        setEditContent(content);
    };

    const saveEdit = (id) => {
        setComments(comments.map(comment =>
            comment.id === id ? { ...comment, content: editContent } : comment
        ));
        setEditCommentId(null);
        setEditContent("");
    };

    const addReply = (commentId) => {
        if (replyContent.trim()) {
            setComments(comments.map(comment =>
                comment.id === commentId
                    ? { ...comment, replies: [...comment.replies, { id: Date.now(), username: "Your Name", content: replyContent }] }
                    : comment
            ));
            setReplyContent("");
            setReplyToCommentId(null); // Reset reply state after adding
        }
    };

    return (
        <div className="p-4 max-w-screen">
            <div
                className={`mb-4 border ${isFocused ? 'border-black ' : 'border-gray-300 '} rounded transition-all duration-300`}
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
                <div className='flex justify-end mr-3 mb-2 '>
                    <button onClick={addComment} className="flex justify-end bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 mt-2 rounded ">
                        Post
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className="mb-4 border-b border-gray-300 pb-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="bg-gray-300 h-8 w-8 rounded-full mr-2"></div>
                                <p className="font-semibold">{comment.username}</p>
                            </div>
                            <div className="relative">
                                <select
                                    className="text-gray-500 bg-white border border-gray-200 rounded px-2 py-1"
                                    onChange={(e) => {
                                        if (e.target.value === "edit") {
                                            startEdit(comment.id, comment.content);
                                        } else if (e.target.value === "delete") {
                                            deleteComment(comment.id);
                                        }
                                    }}
                                >
                                    <option value="" hidden></option>
                                    <option value="edit">Edit</option>
                                    <option value="delete">Delete</option>
                                </select>
                            </div>
                        </div>
                        <p className="ml-10">{comment.content}</p>

                        {/* Edit functionality */}
                        {editCommentId === comment.id && (
                            <div className="mt-2 ml-10">
                                <textarea
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                                <button onClick={() => saveEdit(comment.id)} className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 mt-2 rounded">
                                    Save
                                </button>
                            </div>
                        )}

                        {/* Reply functionality */}
                        <div className="mt-4 ml-10">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Write a reply..."
                                value={replyToCommentId === comment.id ? replyContent : ""}
                                onChange={(e) => setReplyContent(e.target.value)}
                                onFocus={() => setReplyToCommentId(comment.id)}
                            />
                            {replyToCommentId === comment.id && (
                                <button onClick={() => addReply(comment.id)} className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 mt-2 rounded">
                                    Post Reply
                                </button>
                            )}
                        </div>

                        {/* Render replies */}
                        {comment.replies.length > 0 && (
                            <div className="mt-4 ml-16">
                                <h3 className="text-sm font-semibold mb-2">Replies</h3>
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="border-b border-gray-300 pb-2 mb-2">
                                        <div className="flex items-center">
                                            <div className="bg-gray-300 h-6 w-6 rounded-full mr-2"></div>
                                            <p className="font-semibold">{reply.username}</p>
                                        </div>
                                        <p className="ml-8">{reply.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSystem;
