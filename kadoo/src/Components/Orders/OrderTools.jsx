import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./Product.scss";

export default function OrderTool(props) {
  const { product } = props;

  return (
    <Card sx={{ mb: 2, p: 2, width: "100%" }}>
      <Grid container sx={{ display: "flex" }}>
        <Grid
          item
          containertool_detail
          xs={12}
          sm={6}
          md={4}
          justifyContent="center"
          alignItems="center"
        >
          <Grid className="productIconImageContainer1" sx={{ p: 1 }}>
            <CardMedia className="productContainerImage">
              <img
                src={product.main_image}
                className="ToolProductIconImage1"
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
                      {product.name.trim()}
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
                    <TextField
                      id="outlined-number"
                      disabled
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
                        product.cart_count < 100 ? product.cart_count : 100
                      }
                      inputProps={{
                        style: { textAlign: "center" },
                        maxLength: 2,
                      }}
                    />
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
                  <Typography
                    component="div"
                    sx={{ flex: 1, mt: 1 }}
                    overflow="hidden"
                    whiteSpace="pre-line"
                    textOverflow="ellipsis"
                  >
                    {`${product.description.split("\n")[0]}..`}
                  </Typography>
                </Box>
                <Grid
                  container
                  direction="row"
                  sx={{
                    justifyContent: {
                      sm: "flex-end",
                      xs: "center",
                    },
                    mt: 1,
                  }}
                >
                  <Chip
                    label={`${product.price}$`}
                    color="success"
                    variant="outlined"
                    style={{ fontSize: "1.1rem" }}
                    sx={{
                      pt: 0.5,
                      pb: 0.5,
                      pr: 1.5,
                      pl: 1.5,
                      mr: {
                        sm: 3,
                        xs: 0,
                      },
                      mt: {
                        sm: 0.5,
                        xs: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Box sx={{ display: "flex" }} />
        </Grid>
      </Grid>
    </Card>
  );
}
