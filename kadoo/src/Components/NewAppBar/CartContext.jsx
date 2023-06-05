import React, { createContext, useState, useMemo, useEffect } from "react";

import axiosInstance from "../../Utils/axios";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchPlantCartInfo = async () => {
    axiosInstance
      .get(`v1/cart/plant-cart`)
      .then((response) => {
        console.log("Cart Info: ", response);
        setCartCount((prevState) => prevState + response.data.length);
      })
      .catch((error) => {
        console.error("Error User Info:", error);
      });
  };

  const fetchToolCartInfo = async () => {
    axiosInstance
      .get(`v1/cart/tool-cart`)
      .then((response) => {
        console.log("Cart Info: ", response);
        setCartCount((prevState) => prevState + response.count);
      })
      .catch((error) => {
        console.error("Error User Info:", error);
      });
  };

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  const contextValue = useMemo(
    () => ({ cartCount, updateCartCount }),
    [cartCount, updateCartCount]
  );
  useEffect(() => {
    fetchPlantCartInfo().then(() => fetchToolCartInfo());
  }, []);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export { CartContext, CartProvider };
