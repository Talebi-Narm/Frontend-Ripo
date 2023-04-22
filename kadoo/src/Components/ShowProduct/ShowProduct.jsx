import "./ShowProduct.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

import PlantsCart from "../ProductsCart/PlantsCart";
import ToolsCart from "../ProductsCart/ToolsCart";

function ShowProduct(props) {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom component="div">
          Products
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {props.data.map((p) => (
            <Grid item xs={12} sm={6} md={4}>
              {p.kind === "Plant" && <PlantsCart product={p} />}
              {p.kind === "Tool" && <ToolsCart product={p} />}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}

export default ShowProduct;
