import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import LightModeIcon from "@mui/icons-material/LightMode";
import NatureIcon from "@mui/icons-material/Nature";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 650,
    margin: "auto",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const CustomProductCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} sx={{ mb: 2, p: 2 }}>
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
          <Grid sx={{ p: 1 }}>
            <CardMedia>
              <img
                src={props.product.image}
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
                      {props.product.name.trim()}
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
                      onClick={() => props.onRemovePlant(props.product)}
                    >
                      {props.product.count === 1 ? (
                        <DeleteIcon />
                      ) : (
                        <RemoveIcon />
                      )}
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
                      value={
                        props.product.count < 100 ? props.product.count : 100
                      }
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
                        if (props.product.count < 100) {
                          props.onAddPlant(props.product);
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
                        primary={props.product.water}
                      />
                    </ListItem>
                    <ListItem sx={{ color: "#ed6c02" }}>
                      <ListItemIcon>
                        <LightModeIcon style={{ fill: "#ed6c02" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ m: -3 }}
                        primary={props.product.light}
                      />
                    </ListItem>
                    <ListItem sx={{ color: "#4caf50" }}>
                      <ListItemIcon>
                        <NatureIcon style={{ fill: "#4caf50" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ m: -3 }}
                        primary={props.product.growthRate}
                      />
                    </ListItem>
                    <ListItem>
                      <Chip
                        label={props.product.price + "$"}
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
};

export default CustomProductCard;
