import { Player } from "@lottiefiles/react-lottie-player";
import { Grid, useTheme } from "@mui/material";
import React from "react";

import CustomerCarousel from "../CommentsCarousel";

export default function CommentsBar() {
  const theme = useTheme();
  const styles = {
    container: {
      width: "100%",
      borderRadius: "16px",
      mt: "50px",
      p: 3,
      backgroundColor: `${theme.palette.primary.main}90`,
      position: "relative",
    },
  };
  return (
    <Grid sx={styles.container}>
      <Grid
        sx={{
          height: "150px",
          position: "absolute",
          top: "-108px",
          left: "0px",
        }}
      >
        <Player
          src="https://assets9.lottiefiles.com/packages/lf20_xtzoykx4.json"
          background="transparent"
          speed="1"
          style={{
            height: "150px",
          }}
          autoplay
          loop
        />
      </Grid>
      <CustomerCarousel />
    </Grid>
  );
}
