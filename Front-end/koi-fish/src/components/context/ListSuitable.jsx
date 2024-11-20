import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../config/axios";
export const  ListSuitable= createContext();

export const ListSuitableProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("listSuitbale")
      ? JSON.parse(localStorage.getItem("listSuitable"))
      : []
  );

  const [koiInCart, setKoiInCart] = useState(false);
  const [koiInPond, setKoiInPond] = useState(false);
  const [koi, setKoi] = useState(0);
  const [pond, setPond] = useState(0);
  const [result, setResult] = useState(null);
  const [value, setValue] = useState(
    localStorage.getItem("elmentUser")
      ? JSON.parse(localStorage.getItem("elementUser"))
      : {}
  );
  const [item, setItem] = useState(null);
  const addToCart = (item) => {
        setCartItems([...cartItems , ...item])
  };

  const removeFromCart = (item) => {
    if (item.koiName) {
      console.log(" remove koi");
      setKoiInCart(false);
    } else {
      console.log("remove pond");
      setKoiInPond(false);
    }

    setCartItems(cartItems.filter((cartItems) => cartItems._id !== item._id));
  };

  const clearCart = () => {
    setCartItems([]);
    setResult(null);
    setKoi(0);
    setPond(0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleMutual = async (navigate) => {
    try {
      if (!value?.elementID) {
        toast.error("You need consulting before you evaluate");
        setTimeout(() => {
          navigate("/consulting");
        }, 2000);

        return;
      }
      const res = await api.post("/v1/user/mutual", {
        elementID_koi: koi,
        elementID_pond: pond,
        elementID_user: value.elementID,
      });
      console.log(res.data);
      setResult(res.data.success);
      res.data.success === 1
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
      console.log(result);
    } catch (err) {
      console.log("Error at Cart Context " + err);
      toast.error(err);

      console.log(err);
    }
  };
  // lưu cart vô storage mỗi lần bị thay đổi
  useEffect(() => {
    localStorage.setItem("listSuitable", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    cartItems.map((items) => {
      console.log(items);

      items.koiName && setKoi(items.elementID);
      items.shape && setPond(items.elementID);
    });
    //
    setValue(JSON.parse(localStorage.getItem("elementUser")));
    console.log(koi, pond);
    // handleMutual(koi, pond);
  }, [cartItems]);

  return (
    <ListSuitable.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        result,
        handleMutual,
      }}
    >
      {children}
    </ListSuitable.Provider>
  );
};
