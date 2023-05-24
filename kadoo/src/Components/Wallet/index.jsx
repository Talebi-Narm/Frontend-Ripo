// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Fade, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
// import Typed from "react-typed";

export default function Wallet() {
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

      transform: "translate(-50%, -50%) !important",
      top: "50%",
      left: "50%",
    },
  };
  return (
    <Fade in mountOnEnter unmountOnExit timeout={1000}>
      <Grid container sx={{ mb: { xs: 2, md: 0 } }}>
        <Grid container item alignItems="stretch">
          <Grid item xs={12} md={8}>
            <Grid container sx={styles.parentImage}>
              <Grid
                item
                sx={{ width: "100%", p: "20px", zIndex: -1 }}
                ref={ref}
              >
                <Player
                  src="https://assets9.lottiefiles.com/packages/lf20_zooicwxj.json"
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
                gkndfghm; gmd;f gkmd;fl fgk[l pkwfmsd;mfl dapfjskdf sdgjimks
                mgjsngfkdflm g]
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
}
