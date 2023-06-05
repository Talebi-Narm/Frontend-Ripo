// eslint-disable-next-line prettier/prettier
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
// import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";

// eslint-disable-next-line import/order
import PlantsCart from "../../Components/ProductsCart/PlantsCart";

// import axiosInstancefrom "../../Utils/axios";
import "./style.scss";
import axiosInstance from "../../Utils/axios";

function valuetext(value) {
  return `${value}°C`;
}
function Store() {
  // const
  const [plants, setPlants] = useState([]);
  const [price, setPrice] = useState([20, 37]);
  const [environment, setEnviroment] = useState("all");
  const [water, setWater] = useState("all");
  const [light, setLight] = useState("all");
  const [growthRate, setGrowthRate] = useState("all");
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    axiosInstance
      .get(`v1/user/me/`)
      .then((response) => {
        console.log("User Info: ", response);
        setUserInfo(response.data.user);
      })
      .catch((error) => {
        console.error("Error User Info:", error);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
    axiosInstance.get(`v1/store/plants/`, { params: reqOption }).then((res) => {
      console.log("final", res);
      setPlants(res.data.results);
    });
  }, [environment, water, light, growthRate]);

  return (
    <div>
      {/* Filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <FormControl>
          <FormLabel>environment</FormLabel>
          <RadioGroup defaultValue="all" onChange={handleChangeEnviroment}>
            <FormControlLabel value="0" control={<Radio />} label="tropical" />
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
                getAriaLabel={() => "Temperature range"}
                value={price}
                onChange={handleChangePriceSlider}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
              <AttachMoneyIcon fontSize="large" />
            </Stack>
          </Box>
        </FormControl>
      </div>
      {/* results */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {plants.map((item, index) => (
          <PlantsCart
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            product={{
              id: item.id,
              image: item.main_image,
              name: item.name,
              price: item.price,
              light: item.light,
              water: item.water,
              growthRate: item.growth_rate,
            }}
            userInfo={userInfo}
          />
        ))}
      </div>
    </div>
  );
}
export default Store;
