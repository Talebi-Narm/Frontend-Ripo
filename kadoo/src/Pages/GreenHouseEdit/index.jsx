import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Image from "mui-image";
import React from "react";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function GreenHouseEdit(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.change(e);
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
                      src={
                        !props.imageChange
                          ? `http://127.0.0.1:8000${props.data.image}`
                          : props.preview
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
                            !props.imageChange
                              ? `http://127.0.0.1:8000${props.data.image}`
                              : props.preview
                          }
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
                          onChange={props.handleCapture}
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
                      Plants Information
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
                      defaultValue={props.data.name}
                      helperText={
                        props.errorData.name !== "" ? props.errorData.name : ""
                      }
                      onChange={handleChange}
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
                        maxRows={3}
                        defaultValue={props.data.description}
                        onChange={handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid
                    container
                    item
                    className="ProductPageText"
                    sx={{ m: 1 }}
                  >
                    <FormControl fullWidth sx={{ minWidth: "135px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="location"
                        name="location"
                        label="Location"
                        defaultValue={props.data.location}
                        onChange={handleChange}
                      >
                        <MenuItem value="Living room">Living room</MenuItem>
                        <MenuItem value="Kitchen">Kitchen</MenuItem>
                        <MenuItem value="bedroom">Bedroom</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
                        onClick={props.handleSubmit}
                        disabled={!props.newPlant && !props.enable}
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

export default GreenHouseEdit;
