// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
// eslint-disable-next-line import/no-unresolved
import "./GreenHouseCard.scss";
import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../../Utils/axios";

export default function GreenHouseCard(props) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleRemove = () => {
    axiosInstance
      .delete(`v1/green_house/user-plants/${props.product.id}/`)
      .then(async (res) => {
        console.log(res);
        window.location.reload();
      });
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed-card-size"
      sx={{
        height: "100%",
        maxWidth: "300px",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Link to={`/greenHouseEdit/${props.product.id}`}>
        <Grid className="productIconImageContainer" sx={{ p: 1 }}>
          <CardMedia
            component="img"
            height="200"
            image={`${props.product.image}`}
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
            onClick={handleRemove}
          >
            <Player
              src="https://assets6.lottiefiles.com/packages/lf20_0357PmQMHO.json"
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
          {props.product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
