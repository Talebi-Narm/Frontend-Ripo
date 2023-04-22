import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Image from "mui-image";
import React, { useEffect } from "react";

import "./style.scss";

const useStyles1 = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function NewUser(props) {
  const initialFormData = Object.freeze({
    kind: "",
    id: "",
    name: "",
    description: "",
    count: "",
    image: "",
    price: "",
    environment: "",
    water: "",
    light: "",
    growthRate: "",
  });
  const [numberOfBuy, setNumberOfBuy] = React.useState(0);
  const [productId, setProductId] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [formData, updateFormData] = React.useState(initialFormData);
  const classes = useStyles1();
  const [preview, setPreview] = React.useState(null);

  const handleCapture = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    // create the preview
    if (selectedFile != null) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    return null;
  }, [selectedFile]);

  useEffect(() => {
    // create the preview
    if (formData !== initialFormData) {
      if (selectedFile === null) {
        setPreview(formData.image);
        setNumberOfBuy(formData.count);
      }
    }
  }, [formData]);

  useEffect(() => {
    setProductId(props.match.params.productId);
  }, []);

  function srcToFile(src, fileName, mimeType) {
    return fetch(src)
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((buf) => {
        return new File([buf], fileName, { type: mimeType });
      });
  }

  useEffect(() => {
    if (formData !== initialFormData) {
      srcToFile(
        `http://127.0.0.1:8000${formData.image}`,
        "file.jpg",
        "image/jpg"
      ).then((file) => {
        setSelectedFile(file);
      });
    }
  }, [formData]);

  useEffect(() => {
    if (productId !== "") {
      fetch(
        `http://127.0.0.1:8000/api/plantsRUD/${props.match.params.productId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              updateFormData(data);
            });
          } else {
            throw res;
          }
        })
        .catch((err) => {
          if (err.status === 404) {
            fetch(
              `http://127.0.0.1:8000/api/toolsRUD/${props.match.params.productId}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `JWT ${localStorage.getItem("access_token")}`,
                },
              }
            ).then((res) => {
              if (res.status === 200) {
                res.json().then((data) => {
                  console.log(data);
                });
              }
            });
          }
        });
    }
  }, [productId]);

  const handleSubmit = () => {
    const Data = new FormData();
    Data.append("id", formData.id);
    Data.append("name", formData.name);
    Data.append("description", formData.description);
    Data.append("count", numberOfBuy);
    Data.append("price", formData.price);
    Data.append("kind", formData.kind);
    Data.append("environment", formData.environment);
    Data.append("water", formData.water);
    Data.append("light", formData.light);
    Data.append("growthRate", formData.growthRate);
    Data.append("image", selectedFile, selectedFile.name);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
      body: Data,
    };

    fetch(
      `http://127.0.0.1:8000/api/plantsRUD/${props.match.params.productId}/`,
      requestOptions
    )
      .then(async (response) => {
        if (response.status === 200) {
          const isJson = response.headers
            .get("content-type")
            .includes("application/json");
          const data = isJson ? await response.json() : null;
          if (data) alert("Updated Successfully");
        } else {
          throw response;
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          fetch(
            `http://127.0.0.1:8000/api/toolsRUD/${props.match.params.productId}/`,
            requestOptions
          ).then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                if (data) alert("Updated Successfully");
              });
            }
          });
        }
      });
  };
  const increaseBought = () => {
    const nob = numberOfBuy;
    setNumberOfBuy(nob + 1);
  };
  const decreaseBought = () => {
    const nob = numberOfBuy;
    if (nob > 0) {
      setNumberOfBuy(nob - 1);
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
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
        <Grid item container>
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
                  width: "100%",
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
                  <Grid item container className="blurred">
                    <Image
                      src={preview}
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
                          src={preview}
                          className="mainImage"
                          shift="bottom"
                          shiftDuration={320}
                          fit="cover"
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="center"
                        sx={{ mt: 1 }}
                      >
                        <input
                          accept="image/jpeg"
                          className={classes.input}
                          id="faceImage"
                          type="file"
                          onChange={handleCapture}
                        />
                        <Tooltip title="Select Image">
                          <Button
                            variant="contained"
                            component="span"
                            startIcon={<UploadIcon />}
                          >
                            Upload
                          </Button>
                        </Tooltip>
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
                <Grid container spacing={1} sx={{ p: 3 }}>
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
                      className="PlantPageTitle"
                    >
                      Product Information
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className="ProductPageTitle"
                    sx={{ m: 1 }}
                  >
                    <TextField
                      fullWidth
                      label="Name"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                    <Divider sx={{ mt: 1 }} />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    spacing={1}
                    className="ProductPageText"
                    sx={{ m: 1 }}
                  >
                    <div className="ProductPageText">
                      <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        maxRows={6}
                        onChange={handleChange}
                        value={formData.description}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className="ProductPageTitle"
                    sx={{ m: 1 }}
                  >
                    <TextField
                      fullWidth
                      label="Price"
                      id="price"
                      name="price"
                      onChange={handleChange}
                      value={formData.price}
                    />
                  </Grid>
                  <Grid item container alignItems="center" direction="row">
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                      sx={{ color: "error.main" }}
                      onClick={decreaseBought}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <div className="ProductPageCounterNum">{numberOfBuy}</div>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                      sx={{ color: "success.main" }}
                      onClick={increaseBought}
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  {formData.kind === "Plant" && (
                    <Grid container>
                      <Grid
                        container
                        item
                        className="ProductPageText"
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: "135px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Water
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="water"
                            name="water"
                            label="Water"
                            onChange={handleChange}
                            value={formData.water}
                          >
                            <MenuItem value="much">Much</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        item
                        className="ProductPageText"
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: "135px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Light
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="light"
                            name="light"
                            label="Light"
                            onChange={handleChange}
                            value={formData.light}
                          >
                            <MenuItem value="much">Much</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        item
                        className="ProductPageText"
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: "135px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Growth rate
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="growthRate"
                            name="growthRate"
                            label="Growth rate"
                            onChange={handleChange}
                            value={formData.growthRate}
                          >
                            <MenuItem value="much">Much</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        item
                        className="ProductPageText"
                        sx={{ m: 1 }}
                      >
                        <FormControl fullWidth sx={{ minWidth: "135px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Environment
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="environment"
                            name="environment"
                            label="Environment"
                            onChange={handleChange}
                            value={formData.environment}
                          >
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="tropical">Tropical</MenuItem>
                            <MenuItem value="cold">Cold</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className="ProductPageBuyContainer"
                  >
                    <Grid
                      container
                      item
                      justifyContent="flex-end"
                      sx={{ p: 0.5, Color: "#12824C" }}
                      className="ProductPageTitle"
                    >
                      <Button
                        variant="contained"
                        className="productsPageAdd"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
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
