// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import NatureIcon from "@mui/icons-material/Nature";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Fade, Grid, Slide, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from "react-router-dom";
import Typed from "react-typed";

import axiosInstance from "../../Utils/axios";

export default function LeadProducts({ heightImage }) {
  const theme = useTheme();
  const [sizeImage, setSizeImage] = useState(0);
  const [products, setProducts] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    axiosInstance.get("v1/store/plants/").then((res) => {
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

  const getTitleFromLevel = (fieldName, level) => {
    if (fieldName === "environment") {
      if (level === 0) {
        return "tropical";
      }
      if (level === 1) {
        return "cold";
      }
      if (level === 2) {
        return "none";
      }
      return level;
    }
    if (level === 0) {
      return "low";
    }
    if (level === 1) {
      return "medium";
    }
    if (level === 2) {
      return "much";
    }
    return level;
  };

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
                        direction="right"
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
                {products &&
                  currentIndex !== null &&
                  products.map((x, index) => (
                    <Fade in={index === currentIndex} timeout={900}>
                      <TableContainer
                        component={Box}
                        className="TableContainer"
                        sx={{
                          p: 1,
                          mt: 2,
                          backgroundColor: "white",
                          display: index === currentIndex ? "inherit" : "none",
                        }}
                      >
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">
                                <ThermostatIcon className="tempButton1" />
                              </TableCell>
                              <TableCell align="center">
                                <OpacityIcon className="waterButton1" />
                              </TableCell>
                              <TableCell align="center">
                                <WbSunnyIcon className="lightButton1" />
                              </TableCell>
                              <TableCell align="center">
                                <NatureIcon className="growButton1" />
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow sx={{ borderColor: "grey.300" }}>
                              <TableCell
                                align="center"
                                sx={{
                                  borderBottom: "none",
                                  borderRight: 1,
                                  borderColor: "grey.300",
                                }}
                              >
                                {getTitleFromLevel(
                                  "environment",
                                  x.environment
                                )}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  borderBottom: "none",
                                  borderRight: 1,
                                  borderColor: "grey.300",
                                }}
                              >
                                {getTitleFromLevel("water", x.water)}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  borderBottom: "none",
                                  borderRight: 1,
                                  borderColor: "grey.300",
                                }}
                              >
                                {getTitleFromLevel("light", x.light)}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ borderBottom: "none" }}
                              >
                                {getTitleFromLevel(
                                  "growth_rate",
                                  x.growth_rate
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Fade>
                  ))}
                {products && currentIndex !== null && (
                  <Link to={`/ProductPlantsPage/${products[currentIndex].id}`}>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Buy now!
                    </Button>
                  </Link>
                )}
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
                    transform: "scale(-1, 1) translate(60%, 0px)",
                  }}
                  loop
                  autoplay
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
}
