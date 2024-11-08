// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/context/Cart.jsx";
createRoot(document.getElementById("root")).render(
  <>

    <CartProvider>
      <App />
    </CartProvider>
  

  </>
);

