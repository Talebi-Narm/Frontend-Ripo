// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import NatureIcon from "@mui/icons-material/Nature";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Grid, Slide, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Typed from "react-typed";

export default function LeadTools({ heightImage }) {
  const theme = useTheme();
  const [sizeImage, setSizeImage] = useState(0);
  const ref = useRef(null);

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
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Facilisis sed odio morbi quis commodo odio. Viverra nibh cras
                  pulvinar mattis nunc sed blandit libero volutpat. Sit amet
                  mattis vulputate enim nulla aliquet porttitor lacus luctus.
                  Purus sit amet volutpat consequat mauris nunc congue nisi
                  vitae. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Facilisis sed odio morbi quis commodo odio.
                  Viverra nibh cras pulvinar mattis nunc sed blandit libero
                  volutpat. Sit amet mattis vulputate enim nulla aliquet
                  porttitor lacus luctus. Purus sit amet volutpat consequat
                  mauris nunc congue nisi vitae.
                </Typography>
                <TableContainer
                  component={Box}
                  className="TableContainer"
                  sx={{ p: 1, mt: 2, backgroundColor: "white" }}
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
                          lorem
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderBottom: "none",
                            borderRight: 1,
                            borderColor: "grey.300",
                          }}
                        >
                          much
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderBottom: "none",
                            borderRight: 1,
                            borderColor: "grey.300",
                          }}
                        >
                          much
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: "none" }}>
                          much
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
        </Grid>
      </Grid>
    </Slide>
  );
}
