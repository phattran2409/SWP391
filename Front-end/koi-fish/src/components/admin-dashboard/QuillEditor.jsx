// QuillEditor.js
import React, { useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";


const QuillEditor = ({ content, setContent, uploadToCloudinary }) => {
  const reactQuillRef = useRef(null);

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


  return (
    <ReactQuill
      ref={reactQuillRef}
      value={content}
      onChange={setContent}
      modules={quillModules}
      formats={quillFormats}
      theme="snow"
      style={{ height: "200px", marginBottom: "20px" }}
       placeholder="Enter content for your post"
     
    />
  );
};

export default QuillEditor;
