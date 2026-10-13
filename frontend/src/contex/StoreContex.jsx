import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContex = createContext(null);

const StoreContexProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3001";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        const itemInfo = food_list.find(
          (product) => String(product._id) === String(items),
        );
        if (itemInfo) {
          totalAmount += Number(itemInfo.price) * Number(cartItems[items]);
        }
      }
    }
    return totalAmount
  }

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } },
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const constextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContex.Provider value={constextValue}>
      {props.children}
    </StoreContex.Provider>
  );
};

export default StoreContexProvider;
