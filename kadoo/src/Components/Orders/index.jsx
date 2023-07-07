import { Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../Utils/axios";

import OrderPlant from "./OrderPlant";
import OrderTool from "./OrderTools";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  const getStatus = (level) => {
    if (level === 0) {
      return "Pending";
    }
    if (level === 1) {
      return "Delivery";
    }
    if (level === 2) {
      return "Completed";
    }
    return null;
  };

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(`v1/order/order`);
      console.log("orders Info: ", response);
      setOrders(response.data.results);
    } catch (error) {
      console.error("Error User Info:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Grid sx={{ mt: 3 }}>
      {orders &&
        orders.map((order, i) => (
          <Grid container direction="column">
            <Grid item sx={{ pb: 3 }}>
              <Typography variant="h5">{`Order ${i + 1}`}</Typography>
            </Grid>
            <Grid container item>
              {order.plants_detail.map((plant) => (
                <OrderPlant product={plant} />
              ))}
            </Grid>
            <Grid container item>
              {order.tools_detail.map((tool) => (
                <OrderTool product={tool} />
              ))}
            </Grid>
            <Grid
              item
              sx={{
                alignSelf: "flex-end",
                mt: 2,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#355E3B" }} variant="h5">
                {getStatus(order.status)}
              </Typography>
              <Typography
                sx={{ color: "#355E3B" }}
                variant="h5"
              >{`${order.price_after} $`}</Typography>
            </Grid>
            <Divider sx={{ width: "100%", mt: 1 }} />
          </Grid>
        ))}
    </Grid>
  );
}
