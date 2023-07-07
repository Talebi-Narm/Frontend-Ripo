import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Basket from "../../Components/Cart/Basket";
import Main from "../../Components/Cart/Main";
import { CartContext } from "../../Components/NewAppBar/CartContext";
import showToast from "../../Components/Toast";
import axiosInstance from "../../Utils/axios";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AddtoCart() {
  const [cartItems, setCartItems] = useState([]);
  const [toolCartItems, setToolCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { cartCount, updateCartCount } = useContext(CartContext);

  const fetchUserInfo = async () => {
    axiosInstance
      .get(`v1/user/me/`)
      .then((response) => {
        console.log("User Info: ", response);
        setUserInfo(response.data.user);
      })
      .catch((error) => {
        console.error("Error User Info:", error);
      });
  };

  async function fetchAllProductData() {
    axiosInstance.get(`v1/cart/plant-cart`).then((res) => {
      console.log(
        "plants",
        res.data.map((x) => x.plant_detail)
      );
      setCartItems(res.data);
    });
  }
  async function fetchAllToolsData() {
    axiosInstance.get(`v1/cart/tool-cart`).then((res) => {
      console.log("tools", res);
      setToolCartItems(res.data);
    });
  }

  useEffect(() => {
    // if (cardCount !== null && cardCount !== 0) {
    fetchUserInfo();
    fetchAllProductData();
    fetchAllToolsData();
    // }
  }, []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    const newVal = exist.count + 1;
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, count: newVal } : x
        )
      );
      axiosInstance
        .put(`v1/cart/plant-cart/${exist.id}/`, {
          count: newVal,
          user: userInfo.id,
          plant: exist.plant,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const onAddTool = (product) => {
    const exist = toolCartItems.find((x) => x.id === product.id);
    const newVal = exist.count + 1;
    if (exist) {
      setToolCartItems(
        toolCartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count + 1 } : x
        )
      );
      axiosInstance
        .put(`v1/cart/tool-cart/${exist.id}/`, {
          count: newVal,
          user: userInfo.id,
          tool: exist.tool,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    const newVal = exist.count - 1;
    if (exist.count === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
      axiosInstance.delete(`v1/cart/plant-cart/${exist.id}/`).then(() => {
        updateCartCount(cartCount - 1);
      });
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count - 1 } : x
        )
      );
      axiosInstance
        .put(`v1/cart/plant-cart/${exist.id}/`, {
          count: newVal,
          user: userInfo.id,
          plant: exist.plant,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const onRemoveTool = (product) => {
    const exist = toolCartItems.find((x) => x.id === product.id);
    const newVal = exist.count - 1;
    if (exist.count === 1) {
      setToolCartItems(toolCartItems.filter((x) => x.id !== product.id));
      axiosInstance.delete(`v1/cart/tool-cart/${exist.id}/`).then(() => {
        updateCartCount(cartCount + 1);
      });
    } else {
      setToolCartItems(
        toolCartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count - 1 } : x
        )
      );
      axiosInstance
        .put(`v1/cart/tool-cart/${exist.id}/`, {
          count: newVal,
          user: userInfo.id,
          tool: exist.tool,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const Checkout = () => {
    axiosInstance.post(`cart/approve-all-cart/`, {}).then((res) => {
      axiosInstance.defaults.headers.Authorization = `JWT ${localStorage.getItem(
        "access_token"
      )}`;
      console.log(res);
      showToast("Implement Checkout!", "error");
    });
  };

  return (
    <div>
      {cartCount !== 0 && cartCount !== null && (
        <Grid>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mt: { xs: 8, sm: 0 } }}
            >
              <Grid item xs={12} md={8}>
                <Item>
                  <Main
                    plants={cartItems}
                    tools={toolCartItems}
                    onAddPlant={onAdd}
                    onAddTool={onAddTool}
                    onRemovePlant={onRemove}
                    onRemoveTool={onRemoveTool}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={4}>
                <Item>
                  <Basket
                    id="basket-part"
                    cartItems={cartItems}
                    toolCartItems={toolCartItems}
                    CheckoutCart={Checkout}
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
          <div className="row" />
        </Grid>
      )}
      {cartCount === 0 && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            height="400px"
            sx={{ pt: 5, pr: 10, pl: 10 }}
          >
            <img
              src="empty.png"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              alt="Background"
            />
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            direction="row"
            sx={{ mt: 3 }}
          >
            <Grid item justifyContent="center" alignItems="center">
              <Typography variant="h5" sx={{ flex: 1 }}>
                Cart is empty right now!
              </Typography>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Link to="/search/">
                <Button variant="contained" sx={{ mt: 1.5 }}>
                  Let{`&apos;`} shop
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default AddtoCart;
