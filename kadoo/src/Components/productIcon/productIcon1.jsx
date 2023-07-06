import "./style.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { Link } from "react-router-dom";

function ProductIcon1(props) {
  return (
    <Box className="productIconLink" sx={{ width: "100%" }}>
      <Grid container rowSpacing={1}>
        <Grid className="container" item xs={12}>
          <Link to={`/ProductToolsPage/${props.product.id}`}>
            <div className="productIconImageContainer">
              <img
                className="productIconImage"
                src={props.product.image}
                alt=""
              />
            </div>
            <div className="overlay">
              <div className="text">{`${props.product.description.substring(
                0,
                200
              )}...`}</div>
            </div>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <div className="productIconName">
            <p>{props.product.name}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="productIconPrice">${props.product.price}</div>
        </Grid>
        <Grid item xs={12}>
          <div className="productIconPrice" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductIcon1;
