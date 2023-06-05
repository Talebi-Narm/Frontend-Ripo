// eslint-disable-next-line prettier/prettier
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import HandymanIcon from "@mui/icons-material/Handyman";
// import { tableContainerClasses } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
// import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";

// eslint-disable-next-line import/order
import PlantsCart from "../../Components/ProductsCart/PlantsCart";

// import axiosInstancefrom "../../Utils/axios";
import "./style.scss";
import axiosInstance from "../../Utils/axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Store() {
  // *************************** PLANTS ***************************
  // const
  const [plants, setPlants] = useState([]);
  const [price, setPrice] = useState([0, 100]);
  const [environment, setEnviroment] = useState("all");
  const [water, setWater] = useState("all");
  const [light, setLight] = useState("all");
  const [growthRate, setGrowthRate] = useState("all");
  const [tab, setTab] = useState(0);
  const [selectedPricePlants, setSelectedPricePlants] = useState(null);
  const [selectedDatePlants, setSelectedDatePlants] = useState(null);
  const [selectedNamePlants, setSelectedNamePlants] = useState(null);
  const [tags, setTags] = useState([]);
  const [setTagResult] = useState([]);
  // chip
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(value === null ? [] : [value]);
  };
  useEffect(() => {
    const selectedTagIds = personName.map((tag) => tag.id);
    // this give us the id of tag
    console.log(selectedTagIds[0]);
    axiosInstance.get(`v1/common/tags/${selectedTagIds[0]}/`).then((res) => {
      setTagResult(res.data);
    });
  }, [personName]);
  // ----------------------------------------- end chip
  const handleChangePriceSlider = (event, newValue) => {
    setPrice(newValue);
  };
  const handleChangeEnviroment = (event) => {
    setEnviroment(event.target.value);
  };
  const handleChangeWater = (event) => {
    setWater(event.target.value);
  };
  const handleChangeLight = (event) => {
    setLight(event.target.value);
  };
  const handleChangeGrowthRate = (event) => {
    setGrowthRate(event.target.value);
  };
  function updateRequestOption(obj, key, value) {
    return {
      ...obj,
      [key]: value,
    };
  }
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const handleButtonPricePlants = (buttonValue) => {
    if (selectedPricePlants === buttonValue) {
      setSelectedPricePlants(null);
    } else {
      setSelectedPricePlants(buttonValue);
    }
  };
  const handleButtonDatePlants = (buttonValue) => {
    if (selectedDatePlants === buttonValue) {
      setSelectedDatePlants(null);
    } else {
      setSelectedDatePlants(buttonValue);
    }
  };
  const handleButtonNamePlants = (buttonValue) => {
    if (selectedNamePlants === buttonValue) {
      setSelectedNamePlants(null);
    } else {
      setSelectedNamePlants(buttonValue);
    }
  };

  // API
  useEffect(async () => {
    axiosInstance.get(`v1/store/plants/`).then((res) => {
      setPlants(res.data.results);
      console.log("res plant : ", res.data.results);
    });
    axiosInstance.get(`v1/common/tags/`).then((res) => {
      setTags(res.data.results);
    });
  }, []);

  useEffect(() => {
    let reqOption = {};
    if (environment !== "all") {
      reqOption = updateRequestOption(reqOption, "environment", environment);
    }
    if (water !== "all") {
      reqOption = updateRequestOption(reqOption, "water", water);
    }
    if (light !== "all") {
      reqOption = updateRequestOption(reqOption, "light", light);
    }
    if (growthRate !== "all") {
      reqOption = updateRequestOption(reqOption, "growth_rate", growthRate);
    }
    if (selectedPricePlants === "cheapest") {
      reqOption = updateRequestOption(reqOption, "ordering", "price");
    }
    if (selectedPricePlants === "mostExpensive") {
      reqOption = updateRequestOption(reqOption, "ordering", "-price");
    }
    if (selectedDatePlants === "oldest") {
      reqOption = updateRequestOption(reqOption, "ordering", "created_at");
    }
    if (selectedDatePlants === "newest") {
      reqOption = updateRequestOption(reqOption, "ordering", "-created_at");
    }
    if (selectedNamePlants === "ascending") {
      reqOption = updateRequestOption(reqOption, "ordering", "name");
    }
    if (selectedNamePlants === "descending") {
      reqOption = updateRequestOption(reqOption, "ordering", "-name");
    }
    reqOption = updateRequestOption(reqOption, "max_price", price[1]);
    reqOption = updateRequestOption(reqOption, "min_price", price[0]);
    axiosInstance.get(`v1/store/plants/`, { params: reqOption }).then((res) => {
      setPlants(res.data.results);
    });
  }, [
    environment,
    water,
    light,
    growthRate,
    price,
    selectedPricePlants,
    selectedDatePlants,
    selectedNamePlants,
  ]);

  // eslint-disable-next-line no-shadow
  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: "#e2f7e7",
  //   borderColor: "#00c853",
  //   "&:hover": {
  //     backgroundColor: "#e2f7e7",
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginTop: "30px",
  //     width: "250px",
  //   },
  // }));

  // eslint-disable-next-line no-shadow
  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  // // eslint-disable-next-line no-shadow
  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("md")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //       },
  //     },
  //   },
  // }));

  // useEffect(async () => {
  //   console.log(searchPlants);
  // }, [searchPlants]);

  // *************************** TOOLS ***************************

  // const
  const [tools, setTools] = useState([]);
  const [priceTools, setPriceTools] = useState([0, 100]);
  const [selectedPriceTools, setSelectedPriceTools] = useState(null);
  const [selectedDateTools, setSelectedDateTools] = useState(null);
  const [selectedNameTools, setSelectedNameTools] = useState(null);

  // Function
  const handleChangePriceSliderTools = (event, newValue) => {
    setPriceTools(newValue);
  };
  const handleButtonPriceTools = (buttonValue) => {
    if (selectedPriceTools === buttonValue) {
      setSelectedPriceTools(null);
    } else {
      setSelectedPriceTools(buttonValue);
    }
  };
  const handleButtonDateTools = (buttonValue) => {
    if (selectedDateTools === buttonValue) {
      setSelectedDateTools(null);
    } else {
      setSelectedDateTools(buttonValue);
    }
  };
  const handleButtonNameTools = (buttonValue) => {
    if (selectedNameTools === buttonValue) {
      setSelectedNameTools(null);
    } else {
      setSelectedNameTools(buttonValue);
    }
  };
  // API
  useEffect(async () => {
    axiosInstance.get(`v1/store/tools/`).then((res) => {
      setTools(res.data.results);
    });
  }, []);
  useEffect(() => {
    let reqOption = {};
    if (selectedPriceTools === "cheapest") {
      reqOption = updateRequestOption(reqOption, "ordering", "price");
    }
    if (selectedPriceTools === "mostExpensive") {
      reqOption = updateRequestOption(reqOption, "ordering", "-price");
    }
    if (selectedDateTools === "oldest") {
      reqOption = updateRequestOption(reqOption, "ordering", "created_at");
    }
    if (selectedDateTools === "newest") {
      reqOption = updateRequestOption(reqOption, "ordering", "-created_at");
    }
    if (selectedNameTools === "ascending") {
      reqOption = updateRequestOption(reqOption, "ordering", "name");
    }
    if (selectedNameTools === "descending") {
      reqOption = updateRequestOption(reqOption, "ordering", "-name");
    }
    reqOption = updateRequestOption(reqOption, "max_price", priceTools[1]);
    reqOption = updateRequestOption(reqOption, "min_price", priceTools[0]);
    axiosInstance.get(`v1/store/tools/`, { params: reqOption }).then((res) => {
      setTools(res.data.results);
    });
  }, [priceTools, selectedPriceTools, selectedDateTools, selectedNameTools]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab} centered>
          <Tab icon={<ForestOutlinedIcon />} label="PLANTS" {...a11yProps(0)} />
          <Tab icon={<HandymanIcon />} label="TOOLS" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* Plants */}
      <TabPanel value={tab} index={0}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* sort */}
            <Grid item xs={8}>
              <FormLabel style={{ fontSize: 30, color: "black" }}>
                SORT:
              </FormLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Price</FormLabel>
                  <ButtonGroup variant="outlined">
                    <Button
                      onClick={() => handleButtonPricePlants("cheapest")}
                      variant={
                        selectedPricePlants === "cheapest"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Cheapest
                    </Button>
                    <Button
                      onClick={() => handleButtonPricePlants("mostExpensive")}
                      variant={
                        selectedPricePlants === "mostExpensive"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      The Most Expensive
                    </Button>
                  </ButtonGroup>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Date Added</FormLabel>
                  <ButtonGroup variant="outlined">
                    <Button
                      onClick={() => handleButtonDatePlants("oldest")}
                      variant={
                        selectedDatePlants === "oldest"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Oldest
                    </Button>
                    <Button
                      onClick={() => handleButtonDatePlants("newest")}
                      variant={
                        selectedDatePlants === "newest"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Newest
                    </Button>
                  </ButtonGroup>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Name</FormLabel>
                  <ButtonGroup variant="outlined">
                    <Button
                      onClick={() => handleButtonNamePlants("ascending")}
                      variant={
                        selectedNamePlants === "ascending"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Ascending
                    </Button>
                    <Button
                      onClick={() => handleButtonNamePlants("descending")}
                      variant={
                        selectedNamePlants === "descending"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Descending
                    </Button>
                  </ButtonGroup>
                </div>
              </Box>
            </Grid>
            {/* search */}
            <Grid item xs={4}>
              <FormLabel style={{ fontSize: 30, color: "black" }}>
                SEARCH:
              </FormLabel>
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="search"
                  inputProps={{ "aria-label": "search" }}
                  // onChange={handleSearchChange}
                />
              </Search> */}
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple={false}
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {personName.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag.id}
                      value={tag}
                      style={getStyles(tag.name, personName, theme)}
                    >
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* filter */}
            <Grid item xs={2}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <FormControl>
                  <FormLabel style={{ fontSize: 30, color: "black" }}>
                    FILTERS:
                  </FormLabel>
                  <FormLabel>environment</FormLabel>
                  <RadioGroup
                    defaultValue="all"
                    onChange={handleChangeEnviroment}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="tropical"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="cold"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="none"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="all"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>growth rate</FormLabel>
                  <RadioGroup
                    defaultValue="all"
                    onChange={handleChangeGrowthRate}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="much"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="all"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>light</FormLabel>
                  <RadioGroup defaultValue="all" onChange={handleChangeLight}>
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="much"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="all"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>water</FormLabel>
                  <RadioGroup defaultValue="all" onChange={handleChangeWater}>
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="low"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="medium"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="much"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="all"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel style={{ paddingBottom: "20px" }}>price</FormLabel>
                  <Box sx={{ width: 300 }}>
                    <Stack sx={{ height: 200, spacing: 2, direction: "row" }}>
                      <Slider
                        value={price}
                        onChange={handleChangePriceSlider}
                        valueLabelDisplay="auto"
                        orientation="vertical"
                        sx={{
                          '& input[type="range"]': {
                            WebkitAppearance: "slider-vertical",
                            height: 200,
                          },
                        }}
                      />
                    </Stack>
                  </Box>
                </FormControl>
              </div>
            </Grid>
            {/* cards */}
            <Grid item xs={10}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {plants.map((item, index) => (
                  <PlantsCart
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    product={{
                      image: item.main_image,
                      name: item.name,
                      price: item.price,
                      light: item.light,
                      water: item.water,
                      growthRate: item.growth_rate,
                    }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      {/* Tools */}
      <TabPanel value={tab} index={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* sort */}
            <Grid item xs={8}>
              <FormLabel style={{ fontSize: 30, color: "black" }}>
                SORT:
              </FormLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Price</FormLabel>
                  <ButtonGroup variant="outlined">
                    <Button
                      onClick={() => handleButtonPriceTools("cheapest")}
                      variant={
                        selectedPriceTools === "cheapest"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Cheapest
                    </Button>
                    <Button
                      onClick={() => handleButtonPriceTools("mostExpensive")}
                      variant={
                        selectedPriceTools === "mostExpensive"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      The Most Expensive
                    </Button>
                  </ButtonGroup>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Date Added</FormLabel>
                  <ButtonGroup variant="outlined">
                    <Button
                      onClick={() => handleButtonDateTools("oldest")}
                      variant={
                        selectedDateTools === "oldest"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Oldest
                    </Button>
                    <Button
                      onClick={() => handleButtonDateTools("newest")}
                      variant={
                        selectedDateTools === "newest"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Newest
                    </Button>
                  </ButtonGroup>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Name</FormLabel>
                  <ButtonGroup variant="outlined">
                    <Button
                      onClick={() => handleButtonNameTools("ascending")}
                      variant={
                        selectedNameTools === "ascending"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Ascending
                    </Button>
                    <Button
                      onClick={() => handleButtonNameTools("descending")}
                      variant={
                        selectedNameTools === "descending"
                          ? "contained"
                          : "outlined"
                      }
                    >
                      Descending
                    </Button>
                  </ButtonGroup>
                </div>
              </Box>
            </Grid>
            {/* search */}
            <Grid item xs={4}>
              <FormLabel style={{ fontSize: 30, color: "black" }}>
                SEARCH:
              </FormLabel>
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="search"
                  inputProps={{ "aria-label": "search" }}
                  // onChange={handleSearchChange}
                />
              </Search> */}
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple={false}
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {personName.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag.id}
                      value={tag}
                      style={getStyles(tag.name, personName, theme)}
                    >
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* filter */}
            <Grid item xs={2}>
              <FormLabel style={{ fontSize: 30, color: "black" }}>
                FILTERS:
              </FormLabel>
              <FormControl>
                <FormLabel style={{ paddingBottom: "20px" }}>price</FormLabel>
                <Box sx={{ width: 300 }}>
                  <Stack sx={{ height: 200, spacing: 2, direction: "row" }}>
                    <Slider
                      value={priceTools}
                      onChange={handleChangePriceSliderTools}
                      valueLabelDisplay="auto"
                      orientation="vertical"
                      sx={{
                        '& input[type="range"]': {
                          WebkitAppearance: "slider-vertical",
                          height: 200,
                        },
                      }}
                    />
                  </Stack>
                </Box>
              </FormControl>
            </Grid>
            {/* cards */}
            <Grid item xs={10}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {tools.map((item, index) => (
                  <PlantsCart
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    product={{
                      image: item.main_image,
                      name: item.name,
                      price: item.price,
                    }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
}
export default Store;
