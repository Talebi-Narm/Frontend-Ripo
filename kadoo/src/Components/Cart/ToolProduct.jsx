import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./Product.scss";

export default function Product(props) {
  const { product, onAddTool, onRemoveTool } = props;

  return (
    <Card sx={{ mb: 2, p: 2 }}>
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
                src={product.tool_detail.main_image}
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
                      {product.tool_detail.name.trim()}
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
                      onClick={() => onRemoveTool(product)}
                    >
                      {product.tool_detail.count === 1 ? (
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
                        product.tool_detail.count < 100
                          ? product.tool_detail.count
                          : 100
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
                        if (product.tool_detail.count < 100) {
                          onAddTool(product);
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
                  <Typography
                    component="div"
                    sx={{ flex: 1, mt: 1 }}
                    overflow="hidden"
                    whiteSpace="pre-line"
                    textOverflow="ellipsis"
                  >
                    {`${product.tool_detail.description.split("\n")[0]}..`}
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
                    label={`${product.tool_detail.price}$`}
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
