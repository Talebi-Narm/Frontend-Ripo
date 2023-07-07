// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import "./PlantsCart.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Grid, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../../Utils/axios";
import { CartContext } from "../NewAppBar/CartContext";

// import { baseURL } from "../../Utils/axios";

export default function ToolsCart(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { cartCount, updateCartCount } = React.useContext(CartContext);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const bookmarkTool = () => {
    axiosInstance
      .get(`v1/user/me/`)
      .then((response) => {
        console.log("User Info: ", response);
        axiosInstance
          .post(
            "v1/common/tool-bookmarks/",
            JSON.stringify({
              Tool: props.product.id,
              user: response.data.user.id,
            })
          )
          .then((resp) => {
            console.log("Bookmark", resp);
            if (resp.status === 200 || resp.status === 201) {
              toast.success(`${props.product.name} added to bookmarks!`);
            }
          });
      })
      .catch((error) => {
        console.error("Error User Info:", error);
      });
  };

  const deleteBookmarkPlant = () => {
    axiosInstance
      .delete(`v1/common/tool-bookmarks/${props.bookmarkId}/`)
      .then((resp) => {
        console.log("Bookmark delete", resp);
        if (resp.status === 200 || resp.status === 204) {
          toast.success(`${props.product.name} removed from bookmarks!`);
          props.fetchBookMarksTools();
        }
      });
  };

  const AddToCartTool = () => {
    axiosInstance
      .post(
        "v1/cart/tool-cart",
        JSON.stringify({
          count: 1,
          user: props.userInfo.id,
          tool: props.product.id,
        })
      )
      .then((response) => {
        console.log("Bookmark", response);
        if (response.status === 200 || response.status === 201) {
          toast.success(`${props.product.name} added to Cart!`);
          updateCartCount(cartCount + 1);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(`${props.product.name} is already in the cart!`);
      });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        height: "100%",
        maxWidth: "300px",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* <CardActionArea sx={{ height: "100%" }}> */}
      <Link to={`/ProductToolsPage/${props.product.id}`}>
        <Grid className="productIconImageContainer" sx={{ p: 1 }}>
          <CardMedia
            component="img"
            height="200"
            image={`${
              props.product.main_image
                ? props.product.main_image
                : props.product.image
            }`}
            alt="picture"
            className="plantIconImage"
          />
        </Grid>
      </Link>
      <CardContent sx={{ position: "relative", zIndex: 10 }}>
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            zIndex: 2,
            width: "100%",
          }}
        >
          {isHovered ? (
            <Player
              src="https://assets7.lottiefiles.com/packages/lf20_hfi0tnw4.json"
              mode="bounce"
              background="transparent"
              speed="1"
              style={{
                width: "100%",
                filter: "opacity(0.4)",
              }}
              loop
              autoplay
            />
          ) : null}
        </Box>
        <Box
          sx={{
            position: "absolute",
            transform: isHovered
              ? "scale(-2,1) translate(0%, -100%)"
              : "scale(-1,1) translate(0%, -100%)",
            top: "6px",
            left: "0px",
            zIndex: 1,
            width: "100%",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L120,250.7C240,213,480,139,720,133.3C960,128,1200,192,1320,224L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            />
          </svg>
        </Box>

        {isHovered ? (
          <Fab
            sx={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
              top: "-12px",
              left: "50%",
              zIndex: 3,
            }}
            color="primary"
            aria-label="add"
            onClick={AddToCartTool}
          >
            <Player
              src="https://assets2.lottiefiles.com/packages/lf20_5zlgNU.json"
              mode="bounce"
              background="transparent"
              speed="1"
              style={{
                width: "32px",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "calc(50% + 2px)",
                left: "50%",
                zIndex: 4,
                "& svg": { fill: "invert(100%)" },
              }}
              loop
              autoplay
            />
          </Fab>
        ) : (
          ""
        )}

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
      </CardContent>
      {isHovered ? (
        <CardActions disableSpacing>
          {!props.fetchBookMarksTools && (
            <IconButton
              aria-label="add to favorites"
              sx={{ zIndex: 10 }}
              onClick={bookmarkTool}
            >
              <FavoriteIcon />
            </IconButton>
          )}
          {props.fetchBookMarksTools && (
            <IconButton
              aria-label="add to favorites"
              sx={{ zIndex: 10 }}
              onClick={deleteBookmarkPlant}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="share"
            sx={{ zIndex: 10 }}
            onClick={() => {
              navigator.clipboard
                .writeText(
                  `${window.location.origin}/store/${props.product.id}`
                )
                .then(() => {
                  toast.success("Copied to clipboard!");
                })
                .catch((error) => {
                  console.error("Error copying to clipboard:", error);
                });
            }}
          >
            <ShareIcon />
          </IconButton>
        </CardActions>
      ) : null}
      {/* </CardActionArea> */}
    </Card>
  );
}
