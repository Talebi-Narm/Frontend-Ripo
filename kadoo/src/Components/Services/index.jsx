// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";

export default function Services() {
  return (
    <Grid container>
      <Grid container item>
        <Typography>
          Step right into our plant emporium, where green friends await! Join
          the botanical party and bring home a leafy companion that is ready to
          make your space bloom with joy. Get ready to add some laughter and
          life to your home with our vibrant plants!
        </Typography>
      </Grid>
      <Grid container item justifyContent="center" sx={{ m: 1 }}>
        <Button>
          <Player
            src="https://assets4.lottiefiles.com/private_files/lf30_gnkqx2xe.json"
            mode="bounce"
            background="transparent"
            speed="1"
            style={{
              width: "100%",
              filter: "opacity(0.9)",
            }}
            loop
            autoplay
          />
          Explore Our Plants
        </Button>
      </Grid>
      <Grid container item>
        <Typography>
          Equip your green thumb with our top-notch plant tools. From soil
          scoops to watering cans, we have what you need for gardening success.
          Say hello to effortless plant care and watch your green babies
          flourish!
        </Typography>
      </Grid>
      <Grid container item justifyContent="center" sx={{ m: 1 }}>
        <Button>
          <Player
            src="https://assets8.lottiefiles.com/packages/lf20_uyk1evya.json"
            mode="bounce"
            background="transparent"
            speed="1"
            style={{
              width: "80%",
              filter: "opacity(0.9)",
            }}
            loop
            autoplay
          />
          Explore Our Tools
        </Button>
      </Grid>
    </Grid>
  );
}
