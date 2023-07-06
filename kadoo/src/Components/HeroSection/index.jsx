// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Grid, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Typed from "react-typed";

import SearchBar from "../SearchBar";

// eslint-disable-next-line func-names
const HeroSection = forwardRef(function ({ heightImage }, ref) {
  const theme = useTheme();

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
          sx={{
            height: `calc(${heightImage}px - 400px)`,
            mt: { xs: `calc(${heightImage}px - 120px)`, md: 0 },
          }}
        >
          <Grid container item>
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
            <Grid container item>
              <SearchBar />
            </Grid>
          </Grid>
        </Grid>
      </Slide>
    </div>
  );
});

export default HeroSection;
