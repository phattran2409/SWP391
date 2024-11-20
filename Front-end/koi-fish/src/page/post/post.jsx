import React, { useState, useRef, useCallback } from "react";
import { FaImage } from "react-icons/fa";
import {
  GiMetalBar,
  GiWoodBeam,
  GiWaterDrop,
  GiFire,
  GiMountainCave,
} from "react-icons/gi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticlePostingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    elements: 0,
    thumbnail: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default user
  const currentUser = {
    id: "66fc1f73618f189b9875e83c",
    name: "John Doe",
  };

  // Ref for ReactQuill
  const reactQuillRef = useRef(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle element selection
  const handleElementChange = (element) => {
    setFormData((prevData) => ({ ...prevData, elements: element }));
    setErrors((prevErrors) => ({ ...prevErrors, elements: "" }));
  };

  // Handle file inputs
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      [field]: field === "thumbnail" ? files[0] : files,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  // Handler for ReactQuill content change
  const handleContentChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
    if (errors.content) {
      setErrors((prevErrors) => ({ ...prevErrors, content: "" }));
    }
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    const cloudName = "ddqgjy50x";
    const uploadPreset = "dat12po";

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
          setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
        }
      }
    };
  }, []); // Removed [errors]

  // Quill modules and formats
  const quillModules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
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
    "indent",
    "image",
  ];

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.thumbnail) newErrors.thumbnail = "Thumbnail is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.elements) newErrors.elements = "Please select an element";
    if (formData.category !== "advertising") {
      const plainText = formData.content.replace(/<[^>]+>/g, "").trim();
      if (!plainText) {
        newErrors.content = "Content is required for non-advertising posts";
      } else if (plainText.length < 10) {
        newErrors.content = "Content must be at least 10 characters long";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get category ID
  const getCategoryID = (category) => {
    switch (category) {
      case "news":
        return 1;
      case "blog":
        return 2;
      case "advertising":
        return 3;
      default:
        return 1;
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitted(false);
      setErrors({});

      try {
        // . Upload Thumbnail
        let thumbnailUrl = "";
        if (formData.thumbnail) {
          const formDataThumbnail = new FormData();
          formDataThumbnail.append("postArticle_Thumbnail", formData.thumbnail);

          // API to upload thumbnail image
          const uploadThumbnailResponse = await fetch(
            "http://localhost:8081/v1/post/uploadImage",
            {
              method: "POST",
              body: formDataThumbnail,
            }
          );

          if (!uploadThumbnailResponse.ok) {
            const errorData = await uploadThumbnailResponse.json();
            throw new Error(errorData.message || "Failed to upload thumbnail");
          }

          const uploadThumbnailResult = await uploadThumbnailResponse.json();
          thumbnailUrl = uploadThumbnailResult.data;
        }

        // 3. Create Post
        const postData = {
          elementID: formData.elements,
          categoryID: getCategoryID(formData.category),
          title: formData.title,
          context: formData.content,
          imageThumbnail: thumbnailUrl,
          author: currentUser.id,
        };

        // API to create post
        const createPostResponse = await fetch(
          "http://localhost:8081/v1/post/createPost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          }
        );

        if (!createPostResponse.ok) {
          const errorData = await createPostResponse.json();
          throw new Error(errorData.message || "Failed to create post");
        }

        const createPostResult = await createPostResponse.json();
        console.log("Post created:", createPostResult);
        setSubmitted(true);

        // Reset form after successful submission
        setFormData({
          title: "",
          content: "",
          category: "",
          elements: 0,
          thumbnail: null,
        });

        // Clear ReactQuill's internal content
        if (reactQuillRef.current) {
          reactQuillRef.current.getEditor().setContents([]);
        }
      } catch (error) {
        console.error(error);
        setErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Get Element Icon
  const getElementIcon = (element) => {
    switch (element) {
      case "metal":
        return <GiMetalBar className="mr-1" />;
      case "wood":
        return <GiWoodBeam className="mr-1" />;
      case "water":
        return <GiWaterDrop className="mr-1" />;
      case "fire":
        return <GiFire className="mr-1" />;
      case "earth":
        return <GiMountainCave className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddqgjy50x/image/upload/v1727930619/203697_bunbi0.jpg')",
      }}
    >
      <div className="max-w-4xl w-full mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create New Article
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base p-2 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base p-2 ${
                errors.category ? "border-red-500" : ""
              }`}
            >
              <option value="">Select a category</option>
              <option value="news">News</option>
              <option value="blog">Blog</option>
              <option value="advertising">Advertising</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Content if the category isn't "Advertising" */}
          {formData.category !== "advertising" && (
            <div>
              <label
                htmlFor="content"
                className="block text-base font-medium text-gray-700"
              >
                Content
              </label>
              <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your content here..."
                className={`mt-1 block w-full rounded-md ${
                  errors.content ? "border-red-500" : ""
                }`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              )}
            </div>
          )}

          {/* Elements */}
          <div>
            <span className="block text-base font-medium text-gray-700 mb-2">
              Elements
            </span>
            <div className="flex flex-wrap gap-4">
              {["metal", "wood", "water", "fire", "earth"].map(
                (element, index) => (
                  <label key={element} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="element"
                      value={index + 1}
                      checked={formData.elements === index + 1}
                      onChange={() => handleElementChange(index + 1)}
                      className={`form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out ${
                        errors.elements ? "border-red-500" : ""
                      }`}
                    />

                    <span className="ml-2 text-gray-700 capitalize flex items-center text-sm">
                      {getElementIcon(element)} {element}
                    </span>
                  </label>
                )
              )}
            </div>
            {errors.elements && (
              <p className="mt-1 text-sm text-red-500">{errors.elements}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-base font-medium text-gray-700"
            >
              Post Thumbnail
            </label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {formData.thumbnail ? (
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Thumbnail preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaImage className="h-full w-full text-gray-300" />
                )}
              </span>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                accept="image/*"
                className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </div>
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
            )}
          </div>

          {/* Posted By */}
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-base font-medium text-gray-700">Posted by:</p>
            <p className="mt-1 text-base text-gray-900">{currentUser.name}</p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? "Submitting..." : "Submit Article"}
            </button>
          </div>
        </form>

        {/* Notification */}
        {errors.submit && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-medium text-base">{errors.submit}</p>
          </div>
        )}
        {submitted && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p className="font-medium text-base">
              Article submitted successfully!
            </p>
          </div>
        )}
        {isSubmitting && (
          <div className="mt-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
            <p className="font-medium text-base">Submitting your article...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePostingForm;
