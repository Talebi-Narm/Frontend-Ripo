// eslint-disable-next-line prettier/prettier
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import HandymanIcon from "@mui/icons-material/Handyman";
// import { tableContainerClasses } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
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

  // function
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

  // API
  useEffect(async () => {
    axiosInstance.get(`v1/store/plants/`).then((res) => {
      setPlants(res.data.results);
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
    reqOption = updateRequestOption(reqOption, "max_price", price[1]);
    reqOption = updateRequestOption(reqOption, "min_price", price[0]);
    axiosInstance.get(`v1/store/plants/`, { params: reqOption }).then((res) => {
      setPlants(res.data.results);
    });
  }, [environment, water, light, growthRate, price]);

  // *************************** TOOLS ***************************

  // const
  const [tools, setTools] = useState([]);
  // API
  useEffect(async () => {
    axiosInstance.get(`v1/store/tools/`).then((res) => {
      setTools(res.data.results);
      // console.log(res.data.results);
    });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab icon={<ForestOutlinedIcon />} label="PLANTS" {...a11yProps(0)} />
          <Tab icon={<HandymanIcon />} label="TOOLS" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* Plants */}
      <TabPanel value={tab} index={0}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <FormControl>
            <FormLabel>environment</FormLabel>
            <RadioGroup defaultValue="all" onChange={handleChangeEnviroment}>
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="tropical"
              />
              <FormControlLabel value="1" control={<Radio />} label="cold" />
              <FormControlLabel value="2" control={<Radio />} label="none" />
              <FormControlLabel value="all" control={<Radio />} label="all" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>growth rate</FormLabel>
            <RadioGroup defaultValue="all" onChange={handleChangeGrowthRate}>
              <FormControlLabel value="0" control={<Radio />} label="low" />
              <FormControlLabel value="1" control={<Radio />} label="medium" />
              <FormControlLabel value="2" control={<Radio />} label="much" />
              <FormControlLabel value="all" control={<Radio />} label="all" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>light</FormLabel>
            <RadioGroup defaultValue="all" onChange={handleChangeLight}>
              <FormControlLabel value="0" control={<Radio />} label="low" />
              <FormControlLabel value="1" control={<Radio />} label="medium" />
              <FormControlLabel value="2" control={<Radio />} label="much" />
              <FormControlLabel value="all" control={<Radio />} label="all" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>water</FormLabel>
            <RadioGroup defaultValue="all" onChange={handleChangeWater}>
              <FormControlLabel value="0" control={<Radio />} label="low" />
              <FormControlLabel value="1" control={<Radio />} label="medium" />
              <FormControlLabel value="2" control={<Radio />} label="much" />
              <FormControlLabel value="all" control={<Radio />} label="all" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>price</FormLabel>
            <Box sx={{ width: 300 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <AttachMoneyIcon fontSize="small" />
                <Slider
                  value={price}
                  onChange={handleChangePriceSlider}
                  valueLabelDisplay="auto"
                />
                <AttachMoneyIcon fontSize="large" />
              </Stack>
            </Box>
          </FormControl>
        </div>

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
      </TabPanel>
      {/* Tools */}
      <TabPanel value={tab} index={1}>
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
      </TabPanel>
    </Box>
  );
}
export default Store;
