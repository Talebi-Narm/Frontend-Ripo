import React from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import OpacityIcon from "@mui/icons-material/Opacity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NatureIcon from "@mui/icons-material/Nature";

function ProductIcon2(props) {
  return (
    <Box className="productIconLink" sx={{ width: "100%" }}>
      <Grid container rowSpacing={1}>
        <Grid className="container" item xs={12}>
          <Link to={"/ProductPlantsPage/" + props.product.id}>
            <div className="productIconImageContainer">
              <img
                className="productIconImage"
                src={props.product.image}
                alt="Product"
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
          <div
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            className="productIconName"
          >
            {props.product.name}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="productIconPrice">$ {props.product.price}</div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            className="featButton"
          >
            <WbSunnyIcon className="lightButton" />
            {props.product.light}
            <OpacityIcon className="waterButton" />
            {props.product.water}
            <NatureIcon className="growButton" />
            {props.product.growthRate}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductIcon2;
