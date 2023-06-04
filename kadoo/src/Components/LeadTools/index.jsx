// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { Fade, Grid, Slide, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Typed from "react-typed";

import axiosInstance from "../../Utils/axios";

export default function LeadTools({ heightImage }) {
  const theme = useTheme();
  const [sizeImage, setSizeImage] = useState(0);
  const [products, setProducts] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    axiosInstance.get("v1/store/tools/").then((res) => {
      if (res.data.results && res.data.results.length >= 5)
        setProducts(res.data.results.slice(0, 5));
    });
  }, []);

  useEffect(() => {
    if (products) {
      setCurrentIndex(0);
    }
  }, [products]);

  useEffect(() => {
    if (currentIndex < products.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 7000);
    } else {
      setTimeout(() => setCurrentIndex(0), 7000);
    }
    console.log("currentIndex", currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setTimeout(() => setSizeImage(ref.current.clientHeight), 1000);
  });
  const styles = {
    titleBar: {
      p: 2,
      mt: 2,
      backgroundColor: `${theme.palette.secondary.main}90`,
      justifyContent: "center",
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.text.primary,
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
      <Grid container>
        <Grid container item sx={styles.titleBar}>
          <Grid item>
            <Typography component="span" variant="h5">
              <Typed
                component="span"
                variant="h3"
                strings={["Watering?", "Caring?", "Growing?"]}
                typeSpeed={50}
                backSpeed={50}
                loop
              />{" "}
              <Typography component="span" variant="h5">
                We Provide the proper T00L
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="stretch">
          <Grid item xs={12} md={4}>
            <Grid
              container
              alignItems="flex-end"
              justifyContent="flex-end"
              sx={{ height: "100%", position: "relative" }}
            >
              <Grid
                item
                sx={{
                  backgroundColor: `${theme.palette.text.primary}10`,
                  p: 2,
                  borderRadius: "24px",
                  zIndex: 1,
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                  width: "100%",
                  top: "50%",
                  left: "50%",
                }}
              >
                {products &&
                  currentIndex !== null &&
                  products.map((x, index) => (
                    <Fade in={index === currentIndex} timeout={900}>
                      <Typography
                        variant="h5"
                        sx={{
                          display: index === currentIndex ? "flex" : "none",
                        }}
                      >
                        {x.name}
                      </Typography>
                    </Fade>
                  ))}

                {products &&
                  currentIndex !== null &&
                  products.map((x, index) => (
                    <Fade in={index === currentIndex} timeout={900}>
                      <Typography
                        variant="h6"
                        sx={{
                          display: index === currentIndex ? "flex" : "none",
                        }}
                      >
                        {x.description}
                      </Typography>
                    </Fade>
                  ))}
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Player
                  src="https://assets10.lottiefiles.com/private_files/lf30_0SbB7s.json"
                  mode="bounce"
                  background="transparent"
                  speed="2"
                  style={{
                    width: "300%",
                    filter: "saturate(1.5) opacity(0.6)",
                    transform: "translate(-30px, 0px)",
                  }}
                  loop
                  autoplay
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container sx={styles.parentImage}>
              <Grid item sx={{ width: "100%" }} ref={ref}>
                <Player
                  src="https://assets2.lottiefiles.com/packages/lf20_bq485nmk.json"
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
              </Grid>
              <Slide direction="up" in={sizeImage} mountOnEnter unmountOnExit>
                <Grid item sx={styles.imagePlant}>
                  {products &&
                    currentIndex !== null &&
                    products.map((x, index) => (
                      <Slide
                        direction="left"
                        in={index === currentIndex}
                        timeout={900}
                      >
                        <img
                          alt="plant"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                            backdropFilter: "blur(100px) grayscale(100%)",
                            display:
                              index === currentIndex ? "inherit" : "none",
                          }}
                          src={x.main_image}
                        />
                      </Slide>
                    ))}
                </Grid>
              </Slide>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
}
