// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Grid, Slide, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Typed from "react-typed";

export default function LeadProducts({ heightImage }) {
  const theme = useTheme();
  const [sizeImage, setSizeImage] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => setSizeImage(ref.current.clientHeight), 1000);
  });
  const styles = {
    titleBar: {
      p: 3,
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
        xs: `calc(${sizeImage}px - 110px)`,
        md: `calc(${sizeImage}px - 150px)`,
      },
      height: {
        xs: `calc(${sizeImage}px - 110px)`,
        md: `calc(${sizeImage}px - 150px)`,
      },
      transform: "translate(-50%, -50%) !important",
      top: "50%",
      left: "50%",
    },
  };
  return (
    <Slide direction="up" in={heightImage} mountOnEnter unmountOnExit>
      <Grid container>
        <Grid container item sx={styles.titleBar}>
          <Grid item>
            <Typography component="span" variant="h5">
              <Typed
                component="span"
                variant="h3"
                strings={["Explore our Newest plants"]}
                typeSpeed={50}
                backSpeed={50}
                loop
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="stretch">
          <Grid item xs={12} md={8}>
            <Grid container sx={styles.parentImage}>
              <Grid item sx={{ width: "100%" }} ref={ref}>
                <Player
                  src="https://assets10.lottiefiles.com/packages/lf20_ognnrd5w.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "100%",
                    filter: "opacity(0.3)",
                  }}
                  autoplay
                  loop
                />
              </Grid>
              <Slide direction="up" in={sizeImage} mountOnEnter unmountOnExit>
                <Grid item sx={styles.imagePlant}>
                  <img
                    alt="plant"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                      backdropFilter: "blur(100px) grayscale(100%)",
                    }}
                    src="https://static.scientificamerican.com/sciam/cache/file/D1E779C2-5585-48B9-B5B8CA83481D212C_source.jpg?w=590&h=800&7D7C3BD8-AAD4-4306-AC19D3D75FA6F8ED"
                  />
                </Grid>
              </Slide>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              ml: { xs: 0, md: -8 },
            }}
          >
            <Grid container alignItems="center" sx={{ height: "100%" }}>
              <Grid
                item
                sx={{
                  backgroundColor: `${theme.palette.text.primary}10`,
                  p: 2,
                  borderRadius: "12px",
                }}
              >
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Facilisis sed odio morbi quis commodo odio. Viverra nibh cras
                  pulvinar mattis nunc sed blandit libero volutpat. Sit amet
                  mattis vulputate enim nulla aliquet porttitor lacus luctus.
                  Purus sit amet volutpat consequat mauris nunc congue nisi
                  vitae.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
}
