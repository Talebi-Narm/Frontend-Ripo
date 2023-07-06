import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

function SortNavBar(props) {
  const [sortSelectMenu, setSortSelectMenu] = useState(1);
  const {
    handleSortKindPlants,
    handleSortOrderPlants,
    handleSortKindTools,
    handleSortOrderTools,
    handleSortKindProducts,
    handleSortOrderProducts,
  } = props;

  /// /////////////////// Sort Functions //////////////////////
  // 1) Sort By Name Plants
  const handlePlantsSortByNameASC = () => {
    handleSortKindPlants("name");
    handleSortOrderPlants("ASC");
  };
  const handlePlantsSortByNameDES = () => {
    handleSortKindPlants("name");
    handleSortOrderPlants("DES");
  };
  // 2) Sort By Price Plants
  const handlePlantsSortByPriceASC = () => {
    handleSortKindPlants("price");
    handleSortOrderPlants("ASC");
  };
  const handlePlantsSortByPriceDES = () => {
    handleSortKindPlants("price");
    handleSortOrderPlants("DES");
  };
  // 3) Sort By Time Plants
  const handlePlantsSortByTimeASC = () => {
    handleSortKindPlants("time");
    handleSortOrderPlants("ASC");
  };
  const handlePlantsSortByTimeDES = () => {
    handleSortKindPlants("time");
    handleSortOrderPlants("DES");
  };
  // 4) Sort By Name Tools
  const handleToolsSortByNameASC = () => {
    handleSortKindTools("name");
    handleSortOrderTools("ASC");
  };
  const handleToolsSortByNameDES = () => {
    handleSortKindTools("name");
    handleSortOrderTools("DES");
  };
  // 5) Sort By Price Tools
  const handleToolsSortByPriceASC = () => {
    handleSortKindTools("price");
    handleSortOrderTools("ASC");
  };
  const handleToolsSortByPriceDES = () => {
    handleSortKindTools("price");
    handleSortOrderTools("DES");
  };
  // 6) Sort By Time Tools
  const handleToolsSortByTimeASC = () => {
    handleSortKindTools("time");
    handleSortOrderTools("ASC");
  };
  const handleToolsSortByTimeDES = () => {
    handleSortKindTools("time");
    handleSortOrderTools("DES");
  };

  const handleProductsSortByNameASC = () => {
    handleSortKindProducts("name");
    handleSortOrderProducts("ASC");
  };
  const handleProductsSortByNameDES = () => {
    handleSortKindProducts("name");
    handleSortOrderProducts("DES");
  };
  // 5) Sort By Price Products
  const handleProductsSortByPriceASC = () => {
    handleSortKindProducts("price");
    handleSortOrderProducts("ASC");
  };
  const handleProductsSortByPriceDES = () => {
    handleSortKindProducts("price");
    handleSortOrderProducts("DES");
  };
  // 6) Sort By Time Products
  const handleProductsSortByTimeASC = () => {
    handleSortKindProducts("time");
    handleSortOrderProducts("ASC");
  };
  const handleProductsSortByTimeDES = () => {
    handleSortKindProducts("time");
    handleSortOrderProducts("DES");
  };

  useEffect(() => {
    switch (sortSelectMenu) {
      case 1:
        handlePlantsSortByNameASC();
        handleToolsSortByNameASC();
        handleProductsSortByNameASC();
        break;
      case 2:
        handlePlantsSortByNameDES();
        handleToolsSortByNameDES();
        handleProductsSortByNameDES();
        break;
      case 3:
        handlePlantsSortByPriceASC();
        handleToolsSortByPriceASC();
        handleProductsSortByPriceASC();
        break;
      case 4:
        handlePlantsSortByPriceDES();
        handleToolsSortByPriceDES();
        handleProductsSortByPriceDES();
        break;
      case 5:
        handlePlantsSortByTimeASC();
        handleToolsSortByTimeASC();
        handleProductsSortByTimeASC();
        break;
      case 6:
        handlePlantsSortByTimeDES();
        handleToolsSortByTimeDES();
        handleProductsSortByTimeDES();
        break;
      default:
        break;
    }
  }, [sortSelectMenu]);
  const handleChangeSelect = (event) => {
    setSortSelectMenu(event.target.value);
  };
  const handleChangeButtonMenu = (value) => {
    setSortSelectMenu(value);
  };

  return (
    <Grid container xs={12}>
      <Grid container item xs={12}>
        <Grid
          item
          container
          direction="row"
          alignContent="center"
          justifyContent="center"
          sx={{
            display: { xs: "block", sm: "none" },
            mt: 2,
            mb: 2,
            minWidth: 240,
          }}
          xs={12}
        >
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <FormControl
                component="div"
                display="flex"
                sx={{ width: "100%" }}
              >
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sort by"
                  value={sortSelectMenu}
                  onChange={handleChangeSelect}
                  xs={12}
                >
                  <MenuItem value={1}>A to Z</MenuItem>
                  <MenuItem value={2}>Z to A</MenuItem>
                  <MenuItem value={3}>ACS Price</MenuItem>
                  <MenuItem value={4}>DES Price</MenuItem>
                  <MenuItem value={5}>ACS time</MenuItem>
                  <MenuItem value={6}>DES time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Box
          block
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            display: { xs: "none", sm: "block" },
            mt: 2,
            mb: 2,
          }}
        >
          <Typography variant="body" gutterBottom sx={{ mr: 2 }}>
            Sort By:
          </Typography>
          <Button
            sx={{ mr: 1 }}
            variant={sortSelectMenu === 1 ? "contained" : "text"}
            onClick={() => {
              handleChangeButtonMenu(1);
            }}
            size="small"
            startIcon={<ArrowUpwardIcon />}
          >
            {" "}
            A to Z{" "}
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant={sortSelectMenu === 2 ? "contained" : "text"}
            onClick={() => {
              handleChangeButtonMenu(2);
            }}
            size="small"
            startIcon={<ArrowDownwardIcon />}
          >
            {" "}
            Z to A{" "}
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant={sortSelectMenu === 3 ? "contained" : "text"}
            onClick={() => {
              handleChangeButtonMenu(3);
            }}
            size="small"
            startIcon={<ArrowUpwardIcon />}
          >
            {" "}
            ACS Price{" "}
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant={sortSelectMenu === 4 ? "contained" : "text"}
            onClick={() => {
              handleChangeButtonMenu(4);
            }}
            size="small"
            startIcon={<ArrowDownwardIcon />}
          >
            {" "}
            DES Price{" "}
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant={sortSelectMenu === 5 ? "contained" : "text"}
            onClick={() => {
              handleChangeButtonMenu(5);
            }}
            size="small"
            startIcon={<ArrowUpwardIcon />}
          >
            {" "}
            ACS time{" "}
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant={sortSelectMenu === 6 ? "contained" : "text"}
            onClick={() => {
              handleChangeButtonMenu(6);
            }}
            size="small"
            startIcon={<ArrowDownwardIcon />}
          >
            {" "}
            DES time{" "}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SortNavBar;
