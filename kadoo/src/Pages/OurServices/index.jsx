// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Grid, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";

import Services from "../../Components/Services";
// eslint-disable-next-line import/no-extraneous-dependencies
// import Typed from "react-typed";

export default function OurServices({ heightImage }) {
  const theme = useTheme();
  const ref = useRef(null);

  const styles = {
    titleBar: {
      p: 2,
      backgroundColor: `${theme.palette.primary.main}90`,
      justifyContent: "center",
      borderRadius: theme.shape.borderRadius,
      color: "white",
    },
    parentImage: {
      display: "inline-block",
      position: "relative",
    },
    imagePlant: {
      position: "absolute",
      width: {
        xs: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
        md: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
        lg: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
        xl: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
      },
      height: {
        xs: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
        md: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
        lg: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
        xl: `calc(${heightImage}px - ${heightImage / 2.5}px)`,
      },
      transform: "translate(-50%, -50%) !important",
      top: "50%",
      left: "50%",
    },
  };
  return (
    <Slide direction="up" in={heightImage} mountOnEnter unmountOnExit>
      <Grid container sx={{ mt: "-25px", mb: { xs: 2, md: 0 } }}>
        <Grid container item alignItems="stretch">
          <Grid item xs={12} md={8}>
            <Grid container sx={styles.parentImage}>
              <Grid
                item
                sx={{ width: "100%", p: "20px", zIndex: -1 }}
                ref={ref}
              >
                <Player
                  src="https://assets3.lottiefiles.com/packages/lf20_prkjnzba.json"
                  mode="bounce"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "60%",
                    filter: "opacity(0.9)",
                  }}
                  loop
                  autoplay
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%", position: "relative" }}
            >
              <Grid
                item
                sx={{
                  backgroundColor: `${theme.palette.text.primary}10`,
                  p: 2,
                  borderRadius: "24px",
                }}
              >
                <Services />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
}
