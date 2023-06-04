import "../ProductPlantsPage/style.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveIcon from "@mui/icons-material/Remove";
import TagIcon from "@mui/icons-material/Tag";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { useState, useEffect } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "../../Components/AppBar";
import showToast from "../../Components/Toast";
import axiosInstance from "../../Utils/axios";

function ProductToolsPage() {
  const [product, setProduct] = useState([]);
  const [toolTags, setToolTags] = useState("");
  const [numberOfBuy, setNumberOfBuy] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [album, setAlbum] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [imageName, setImageName] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/v1/store/tools/", {
        params: {
          count: 0,
          name: "toolTest",
          page: 2,
          page_size: 1,
          price: 5,
          tags: "7&tags=3fa85f64-5717-4562-b3fc-2c963f66afa6",
          water: 1,
        },
      })
      .then((response) => {
        console.log("ghoo", response);
        setProduct(response.data);
      })
      .then(() => {
        setTotalPrice(product.price);
      })
      .then((data) => {
        setToolTags(data);
      })
      .then((data) => {
        setAlbum(data);
        setImageName(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    setImageName(album[currentImage]);
  }
  function forWardImageClick() {
    if (currentImage === album.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
    setImageName(album[currentImage]);
  }
  function addToBasket() {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
        count: `${numberOfBuy}`,
      }),
    };
    fetch(
      "http://127.0.0.1:8000/api/cart/add-tool-to-cart/",
      requestOptions
    ).then((response) => {
      if (response.status === 401) {
        showToast("You are not login!", "error");
      } else if (response.status === 400) {
        showToast("This Plant is already in the Basket!", "error");
      }
    });
  }

  // class ProductToolsPage extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       product: [],
  //       toolTags: "",
  //       id: this.props.match.params.id,
  //       numberOfBuy: 1,
  //       totalPrice: 0,
  //       album: [],
  //       currentImage: 0,
  //       imageName: [],
  //     };
  //   }

  //   componentDidMount() {
  //     fetch("http://127.0.0.1:8000/api/toolsRUD/" + this.state.id + "/")
  //       .then((response) => response.json())
  //       .then((data) => this.setState({ product: data }))
  //       .then(() => {
  //         this.setState({
  //           totalPrice: this.state.product.price,
  //         });
  //       });

  //     fetch("http://127.0.0.1:8000/api/toolTags/" + this.state.id + "/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         this.setState({ toolTags: data });
  //       });
  //     fetch("http://127.0.0.1:8000/api/toolAlbumImages/" + this.state.id + "/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         this.setState({ album: data });
  //         this.setState({ imageName: data[0] });
  //       });
  //   }

  // render() {
  // var increaseBought = () => {
  //   var nob = this.state.numberOfBuy;
  //   if (nob < 9) {
  //     this.setState({
  //       numberOfBuy: nob + 1,
  //       totalPrice: (nob + 1) * this.state.product.price,
  //     });
  //   }
  // };
  // var decreaseBought = () => {
  //   var nob = this.state.numberOfBuy;
  //   if (nob > 1) {
  //     this.setState({
  //       numberOfBuy: nob - 1,
  //       totalPrice: (nob - 1) * this.state.product.price,
  //     });
  //   }
  // };
  // var backWardImageClick = () => {
  //   if (this.state.currentImage === 0) {
  //     this.setState({ currentImage: this.state.album.length - 1 });
  //   } else {
  //     this.setState({ currentImage: this.state.currentImage - 1 });
  //   }
  //   this.setState({ imageName: this.state.album[this.state.currentImage] });
  // };
  // var forWardImageClick = () => {
  //   if (this.state.currentImage === this.state.album.length - 1) {
  //     this.setState({ currentImage: 0 });
  //   } else {
  //     this.setState({ currentImage: this.state.currentImage + 1 });
  //   }
  //   this.setState({ imageName: this.state.album[this.state.currentImage] });
  // };
  // var addToBasket = () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Authorization: "JWT " + localStorage.getItem("access_token"),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: this.state.product.id,
  //       count: `${this.state.numberOfBuy}`,
  //     }),
  //   };
  //   fetch(
  //     "http://127.0.0.1:8000/api/cart/add-tool-to-cart/",
  //     requestOptions
  //   ).then((response) => {
  //     if (response.status === 401) {
  //       alert("You are not login!");
  //     } else if (response.status === 400) {
  //       alert("This Plant is already in the Basket!");
  //     }
  //   });
  // };

  return (
    <Grid container style={{ minHeight: "100vh" }} sx={{ pb: 2 }}>
      <Box style={{ width: "100%" }}>
        <AppBar
          SearchOption
          TicketOption
          CartOption
          AuthorizationOption
          DrawerOption={false}
        />
      </Box>

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
                height: { xs: "auto", md: "70vh" },
              }}
            >
              <Card
                sx={{
                  boxShadow: 2,
                  height: { xs: "auto", md: "70vh" },
                }}
                className="ProductPageImageContainer"
              >
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: { xs: "auto", md: "70vh" },
                    pb: { xs: 0, md: 0 },
                  }}
                >
                  <Grid item container className="blurred-tool">
                    <Image
                      src={
                        imageName === undefined
                          ? `http://127.0.0.1:8000${product.image}`
                          : `http://127.0.0.1:8000${imageName.image}`
                      }
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
                      sx={{ mr: { md: 1.5, xs: 0 } }}
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
                          src={
                            imageName === undefined
                              ? `http://127.0.0.1:8000${product.image}`
                              : `http://127.0.0.1:8000${imageName.image}`
                          }
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
              <Card sx={{ boxShadow: 3 }}>
                <Grid container spacing={1} sx={{ p: 2 }}>
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
                    </Box>
                    <Grid container item alignItems="flex-start">
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: { xs: "none", md: "flex" } }}
                      >
                        <Box sx={{ ml: 0, mt: 1, mb: 1.5 }}>
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box alignItems="center" sx={{ display: "flex" }}>
                              <TagIcon color="action" />
                              <Typography>Tags:</Typography>
                            </Box>
                            {toolTags.length !== 0 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  ml: 0.5,
                                }}
                              >
                                {toolTags.map((item) => (
                                  <Chip
                                    sx={{ mr: 0.5, mt: 0.5 }}
                                    label={<Typography>{item.name}</Typography>}
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            )}
                            {toolTags.length === 0 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  ml: 0.5,
                                }}
                              >
                                <Typography sx={{ mr: 0.5, mt: 0.5 }}>
                                  NO TAGS!
                                </Typography>
                              </Box>
                            )}
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
                                    p: 1,
                                    mt: -2.75,
                                    boxShadow: 2,
                                    display: "flex",
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
                                      onClick={addToBasket}
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
                          {toolTags.length !== 0 && (
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                              <Box alignItems="center" sx={{ display: "flex" }}>
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
                                {toolTags.map((item) => (
                                  <Chip
                                    sx={{ mr: 0.5, mt: 0.5 }}
                                    label={<Typography>{item.name}</Typography>}
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductToolsPage;
