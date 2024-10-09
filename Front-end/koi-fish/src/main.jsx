// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
<<<<<<< HEAD

createRoot(document.getElementById("root")).render(<App />);
=======
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>
);
>>>>>>> 62e274878aab737080067527491c7915c0644949
