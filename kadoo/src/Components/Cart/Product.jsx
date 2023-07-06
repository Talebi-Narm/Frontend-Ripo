import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import LightModeIcon from "@mui/icons-material/LightMode";
import NatureIcon from "@mui/icons-material/Nature";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./Product.scss";

export default function Product(props) {
  const { product, onAddPlant, onRemovePlant } = props;

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

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Grid container sx={{ display: "flex" }}>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          justifyContent="center"
          alignItems="center"
        >
          <Grid className="productIconImageContainer1" sx={{ p: 1 }}>
            <CardMedia className="productContainerImage">
              <img
                src={product.plant_detail.main_image}
                className="productIconImage1"
                alt=""
              />
            </CardMedia>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CardContent align="Left">
            <Grid container justifyContent="center" alignItems="center">
              <Grid item md={12}>
                <Box
                  xs={12}
                  sx={{
                    flex: 1,
                    display: {
                      md: "flex",
                      sm: "inline",
                      xs: "inline",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: {
                        md: "left",
                        xs: "center",
                      },
                    }}
                  >
                    <Typography component="div" variant="h5" sx={{ flex: 1 }}>
                      {product.plant_detail.name.trim()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: {
                        md: "flex",
                        sm: "inline",
                        xs: "inline",
                      },
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                      sx={{
                        color: "error.main",
                        mt: {
                          md: 0,
                          xs: 1,
                        },
                        mb: {
                          md: 0,
                          xs: 1,
                        },
                      }}
                      onClick={() => onRemovePlant(product)}
                    >
                      {product.count === 1 ? <DeleteIcon /> : <RemoveIcon />}
                    </IconButton>
                    <TextField
                      id="outlined-number"
                      size="small"
                      sx={{
                        width: 50,
                        mt: {
                          md: 0,
                          xs: 2,
                        },
                        mb: {
                          md: 0,
                          xs: 2,
                        },
                      }}
                      value={product.count < 100 ? product.count : 100}
                      inputProps={{
                        style: { textAlign: "center" },
                        maxLength: 2,
                      }}
                    />
                    <IconButton
                      size="large"
                      color="inherit"
                      sx={{
                        color: "success.main",
                        mt: {
                          md: 0,
                          xs: 1,
                        },
                        mb: {
                          md: 0,
                          xs: 1,
                        },
                      }}
                      onClick={() => {
                        if (product.count < 100) {
                          onAddPlant(product);
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
            <Grid container justifyContent="center" alignItems="center">
              <Grid item justifyContent="space-between" md={12}>
                <Box
                  xs={12}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <List
                    md={12}
                    sx={{
                      display: {
                        md: "flex",
                        sm: "inline",
                        xs: "inline",
                      },
                      flexDirection: {
                        md: "row",
                      },
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                      mt: 2,
                    }}
                  >
                    <ListItem sx={{ color: "#1976d2" }}>
                      <ListItemIcon>
                        <InvertColorsIcon style={{ fill: "#1976d2" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ m: -3 }}
                        primary={getTitleFromLevel(
                          "water",
                          product.plant_detail.water
                        )}
                      />
                    </ListItem>
                    <ListItem sx={{ color: "#ed6c02" }}>
                      <ListItemIcon>
                        <LightModeIcon style={{ fill: "#ed6c02" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ m: -3 }}
                        primary={getTitleFromLevel(
                          "light",
                          product.plant_detail.light
                        )}
                      />
                    </ListItem>
                    <ListItem sx={{ color: "#4caf50" }}>
                      <ListItemIcon>
                        <NatureIcon style={{ fill: "#4caf50" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ m: -3 }}
                        primary={getTitleFromLevel(
                          "growth_rate",
                          product.plant_detail.growth_rate
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <Chip
                        label={`${product.plant_detail.price}$`}
                        color="success"
                        variant="outlined"
                        style={{ fontSize: "1.1rem" }}
                        sx={{ pt: 0.5, pb: 0.5, pr: 1.5, pl: 1.5 }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <Box sx={{ display: "flex" }} />
        </Grid>
      </Grid>
    </Card>
  );
}
