// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Grid, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Typed from "react-typed";

export default function HeroSection() {
  const theme = useTheme();
  const [heightImage, setHeightImage] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => setHeightImage(ref.current.clientHeight), 1000);
  });

  return (
    <div>
      <Grid
        sx={{
          width: "100%",
          position: "absolute",
          top: "-10px",
          left: "0px",
          zIndex: -1,
        }}
        ref={ref}
      >
        <Player
          src="https://assets6.lottiefiles.com/packages/lf20_nkwmg07i.json"
          background="transparent"
          speed="1"
          style={{
            width: "100%",
          }}
          autoplay
          loop
        />
      </Grid>
      <Slide direction="up" in={heightImage} mountOnEnter unmountOnExit>
        <Grid
          container
          alignItems="center"
          sx={{ height: `calc(${heightImage}px - 400px)` }}
        >
          <Grid item>
            <Typography variant="h3">
              You Wanna <br /> feel the{" "}
              <Typed
                component="span"
                variant="h3"
                style={{
                  color: theme.palette.primary.main,
                }}
                strings={["Nature", "Joy", "Life", "Oxygen"]}
                typeSpeed={150}
                backSpeed={100}
                loop
              />
              ?
            </Typography>
          </Grid>
        </Grid>
      </Slide>
    </div>
  );
}
