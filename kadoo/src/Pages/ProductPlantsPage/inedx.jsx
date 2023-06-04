import "./style.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NatureIcon from "@mui/icons-material/Nature";
import OpacityIcon from "@mui/icons-material/Opacity";
import RemoveIcon from "@mui/icons-material/Remove";
import TagIcon from "@mui/icons-material/Tag";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Comments from "../../Components/Comment";
// import showToast from "../../Components/Toast";
import axiosInstance from "../../Utils/axios";

function ProductPlantsPage() {
  const [product, setProduct] = useState([]);
  const [tags, setTags] = useState([]);
  const [numberOfBuy, setNumberOfBuy] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [album, setAlbum] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [imageName, setImageName] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`v1/store/plants/${id}/`)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
        setAlbum(Object.values(response.data.album));
        setImageName(response.data.main_image);
        setTags(response.data.tags);
        setTotalPrice(response.data.price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  // fetch("http://146.190.205.127:443/api/v1/store/plants" + id + "/")
  //   // .then((response) => response.json())
  //   .then((response) => console.log(response,"ghoooo"))
  //   .catch((error) => {console.error(error)
  //   });
  // .then((data) => setProduct(data))
  // .then(() => {
  //   setTotalPrice(product.price);
  // });
  // }, []);

  // fetch("http://127.0.0.1:8000/api/plantTags/" + id + "/")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setTags(data);
  //   });
  // fetch("http://127.0.0.1:8000/api/plantAlbumImages/" + id + "/")
  //   .then((response) => response.json())
  // .then((data) => {
  //   setAlbum(data);
  //   setImageName(data[0]);
  // });
  // }, []);

  function increaseBought() {
    if (numberOfBuy < 9) {
      setNumberOfBuy(numberOfBuy + 1);
      setTotalPrice((numberOfBuy + 1) * product.price);
    }
  }

  function decreaseBought() {
    if (numberOfBuy > 1) {
      setNumberOfBuy(numberOfBuy - 1);
      setTotalPrice((numberOfBuy - 1) * product.price);
    }
  }

  function backWardImageClick() {
    if (currentImage === 0) {
      setCurrentImage(album.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }

  function forWardImageClick() {
    if (currentImage === album.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  useEffect(() => {
    if (album && currentImage) {
      setImageName(album[currentImage]);
    }
  }, [currentImage]);

  // function addToBasket() {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: product.id,
  //       count: `${numberOfBuy}`,
  //     }),
  //   };
  //   fetch(
  //     "https://service.talebi-narm.ir/api/cart/add-plant-to-cart/",
  //     requestOptions
  //   ).then((response) => {
  //     if (response.status === 401) {
  //       alert("You are not login!");
  //     } else if (response.status === 400) {
  //       alert("This Plant is already in the Basket!");
  //     }
  //   });
  // }

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

  return product && imageName ? (
    <Grid container sx={{ pb: 2 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          pl: { xs: 2, md: 5 },
          pr: { xs: 2, nd: 5 },
          pt: { xs: 10, sm: 3, md: 0 },
        }}
        style={{ height: "100%" }}
      >
        <Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 0 }}
            className="ProductPageProductContainer"
          >
            <Grid
              item
              xs={12}
              md={5}
              lg={5}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                maxHeight: { xs: "auto", md: "60vh" },
              }}
            >
              <Card
                sx={{
                  boxShadow: 2,
                  maxHeight: { xs: "auto", md: "60vh" },
                }}
                className="ProductPageImageContainer"
              >
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    maxHeight: { xs: "auto", md: "60vh" },
                    pb: { xs: 0, md: 0 },
                    ml: { xs: 0, md: "-10px" },
                  }}
                >
                  <Grid
                    item
                    container
                    className="blurred"
                    sx={{
                      maxHeight: { xs: "auto", md: "60vh" },
                    }}
                  >
                    <Image
                      src={imageName}
                      width="100%"
                      height="100%"
                      fit="cover"
                    />
                  </Grid>
                  <Grid
                    className="front"
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid
                      container
                      item
                      justifyContent="center"
                      alignItems="center"
                      direction="row"
                      className="widthResize"
                      sx={{
                        mr: { md: 1.5, xs: 0 },
                        position: "absolute",
                        transform: "translate(-50%,-50%)",
                        left: "50%",
                        top: "50%",
                      }}
                    >
                      <Grid
                        item
                        sx={{ display: { xs: "none", md: "flex" } }}
                        md={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          size="small"
                          aria-label="show 4 new mails"
                          color="primary"
                          onClick={backWardImageClick}
                        >
                          <ArrowBackIosIcon />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={10}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          display: "flex",
                          height: { xs: "70%", md: "100%" },
                        }}
                      >
                        <Image
                          src={imageName}
                          className="mainImage"
                          shift="bottom"
                          shiftDuration={320}
                          fit="cover"
                        />
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "none", md: "flex" } }}
                        md={1}
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <IconButton
                          sx={{ m: 1 }}
                          size="small"
                          aria-label="show 4 new mails"
                          color="primary"
                          onClick={forWardImageClick}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "flex", md: "none" }, p: 1 }}
                        xs={6}
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        <IconButton
                          sx={{ display: { xs: "flex", md: "none" }, p: 1 }}
                          size="small"
                          aria-label="show 4 new mails"
                          color="primary"
                          onClick={backWardImageClick}
                        >
                          <ArrowBackIosIcon />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "flex", md: "none" }, p: 1 }}
                        xs={6}
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <IconButton
                          sx={{ m: 1 }}
                          size="small"
                          aria-label="show 4 new mails"
                          color="primary"
                          onClick={forWardImageClick}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              lg={7}
              sx={{ p: 2, ml: { xs: 0, md: -5 }, mt: { xs: -4.5, md: 0 } }}
              className="BringFront"
            >
              <Card sx={{ boxShadow: 3, widht: "100%" }}>
                <Accordion expanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Plant Detail</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      spacing={1}
                      style={{ minHeight: "75vh" }}
                      sx={{ p: 2 }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        className="ProductPageTitle"
                      >
                        <Typography
                          variant="h5"
                          sx={{ pb: 2 }}
                          className="productPageTitle"
                        >
                          {product.name}
                        </Typography>
                        <Divider />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        spacing={1}
                        className="ProductPageText"
                      >
                        <Box sx={{ p: 2, mt: 1, mb: 0.5 }} className="BgText">
                          <Typography className="ProductPageText">
                            {product.description}{" "}
                          </Typography>
                          <TableContainer
                            component={Box}
                            className="TableContainer"
                            sx={{
                              p: 1,
                              mt: 2,
                              backgroundColor: "white",
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
                                      product.environment
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
                                    {getTitleFromLevel("water", product.water)}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{
                                      borderBottom: "none",
                                      borderRight: 1,
                                      borderColor: "grey.300",
                                    }}
                                  >
                                    {getTitleFromLevel("light", product.light)}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{ borderBottom: "none" }}
                                  >
                                    {getTitleFromLevel(
                                      "growth_rate",
                                      product.growth_rate
                                    )}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                        <Grid container item alignItems="flex-start">
                          <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ display: { xs: "none", md: "flex" } }}
                          >
                            <Box sx={{ ml: 0, mt: 1, mb: 1.5 }}>
                              <Box
                                sx={{ display: "flex", flexDirection: "row" }}
                              >
                                <Box
                                  alignItems="center"
                                  sx={{ display: "flex" }}
                                >
                                  <TagIcon color="action" />
                                  <Typography>Tags:</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    ml: 0.5,
                                  }}
                                >
                                  {tags.length !== 0 && (
                                    <Grid>
                                      {tags.map((item) => (
                                        <Chip
                                          sx={{ mr: 0.5, mt: 0.5 }}
                                          label={
                                            <Typography>{item.name}</Typography>
                                          }
                                          variant="outlined"
                                        />
                                      ))}
                                    </Grid>
                                  )}
                                  {tags.length === 0 && (
                                    <Grid>
                                      <Typography sx={{ mr: 0.5, mt: 0.5 }}>
                                        NO TAGS
                                      </Typography>
                                    </Grid>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ mt: { xs: 0.25, md: 0 } }}
                          >
                            <Box className="BgButton">
                              <Grid item xs={12} md={12} lg={12}>
                                <Grid
                                  container
                                  spacing={0}
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Grid
                                    item
                                    container
                                    className="ProductPageTitle"
                                    justifyContent="center"
                                  >
                                    <Box
                                      className="BgChip"
                                      sx={{
                                        display: "flex",
                                        p: 1,
                                        mt: -2.75,
                                        boxShadow: 2,
                                      }}
                                    >
                                      <Chip
                                        label={
                                          <Typography variant="h6">
                                            {`${product.price}$`}
                                          </Typography>
                                        }
                                        color="success"
                                        variant="outlined"
                                        style={{ fontSize: "1.1rem" }}
                                        sx={{
                                          pt: 0.5,
                                          pb: 0.5,
                                          pr: 1.5,
                                          pl: 1.5,
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid
                                    item
                                    container
                                    xs={12}
                                    md={12}
                                    lg={12}
                                    className="ProductPageCounter"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    direction="row"
                                    sx={{
                                      flexWrap: "wrap",
                                      pl: 1,
                                      pr: 1.5,
                                      pb: 1,
                                      pt: 0.5,
                                    }}
                                  >
                                    <Grid
                                      item
                                      alignItems="center"
                                      justifyContent="space-between"
                                      direction="row"
                                      sx={{
                                        flexWrap: "nowrap",
                                        alignSelf: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <IconButton
                                          size="large"
                                          aria-label="show 4 new mails"
                                          color="inherit"
                                          sx={{ color: "error.main" }}
                                          onClick={decreaseBought}
                                        >
                                          <RemoveIcon />
                                        </IconButton>
                                        <Box
                                          className="ProductPageCounterNum"
                                          sx={{
                                            display: "flex",
                                            pr: 3,
                                            pl: 2,
                                            boxShadow: 1,
                                          }}
                                        >
                                          <Typography>{numberOfBuy}</Typography>
                                        </Box>
                                        <IconButton
                                          size="large"
                                          aria-label="show 4 new mails"
                                          color="inherit"
                                          sx={{ color: "success.main" }}
                                          onClick={increaseBought}
                                        >
                                          <AddIcon />
                                        </IconButton>
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      justifyContent="flex-end"
                                      sx={{
                                        pt: 1,
                                        pb: 1,
                                        Color: "#12824C",
                                        alignSelf: "center",
                                      }}
                                      className="ProductPageTitle"
                                    >
                                      <Link to="/cart/">
                                        <Button
                                          variant="contained"
                                          className="productsPageAdd"
                                          // onClick={addToBasket}
                                        >
                                          {`Add To Cart (${totalPrice}$)`}
                                        </Button>
                                      </Link>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ display: { xs: "flex", md: "none" }, mt: 1 }}
                          >
                            <Box sx={{ ml: 0, mt: 1, mb: 1.5 }}>
                              {tags.length !== 0 && (
                                <Box
                                  sx={{ display: "flex", flexDirection: "row" }}
                                >
                                  <Box
                                    alignItems="center"
                                    sx={{ display: "flex" }}
                                  >
                                    <TagIcon color="action" />
                                    <Typography>Tags:</Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      ml: 0.5,
                                    }}
                                  >
                                    {tags.length !== 0 && (
                                      <Grid>
                                        {tags.map((item) => (
                                          <Chip
                                            sx={{ mr: 0.5, mt: 0.5 }}
                                            label={
                                              <Typography>
                                                {item.name}
                                              </Typography>
                                            }
                                            variant="outlined"
                                          />
                                        ))}
                                      </Grid>
                                    )}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Comments</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Comments id={id} />
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
}
export default ProductPlantsPage;
