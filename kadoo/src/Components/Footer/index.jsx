// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Grid } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Grid container>
      <Player
        src="https://assets5.lottiefiles.com/packages/lf20_ntrhqntu.json"
        mode="bounce"
        background="transparent"
        speed="2"
        style={{
          width: "120%",
          //   filter: "saturate(1.5) opacity(0.6)",
          transform: "translate(-10%, 0px)",
        }}
        loop
        autoplay
      />
    </Grid>
  );
}
