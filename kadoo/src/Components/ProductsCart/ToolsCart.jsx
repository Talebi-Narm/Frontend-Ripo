import "./ToolsCart.scss";
import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export default function ToolsCart(props) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea sx={{ height: "100%" }}>
        <Link to={`/ProductToolsPage/${props.product.id}`}>
          <Grid className="productIconImageContainer" sx={{ p: 1 }}>
            <CardMedia
              component="img"
              height="200"
              image={`http://127.0.0.1:8000${props.product.image}`}
              alt="picture"
              className="toolIconImage"
            />
          </Grid>
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="textClass"
          >
            {props.product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            $ {props.product.price}
          </Typography>
          <div className="featButton">
            {/* <SettingsIcon className="toolIcon" /> */}
            <p className="Message">Tools</p>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
