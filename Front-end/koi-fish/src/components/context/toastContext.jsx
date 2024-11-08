import { createContext, useContext, useState } from "react";

// Tạo context cho thông báo
const ToastContext = createContext();

// Provider quản lý thông báo
export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  // Hàm để hiển thị thông báo
  const addToast = (message) => {
    setToastMessage(message);
  };

  // Hàm để xóa thông báo
  const clearToast = () => {
    setToastMessage(null);
  };

  return (
    <ToastContext.Provider value={{ toastMessage, addToast, clearToast }}>
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => useContext(ToastContext);
