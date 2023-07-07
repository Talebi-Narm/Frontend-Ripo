import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GreenHouseCard from "../../Components/GreenHouse/GreenHouseCard";
import axiosInstance from "../../Utils/axios";

export default function GreenHouse() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();
  // const [me, setMe] = useState("");
  // get plants
  useEffect(async () => {
    axiosInstance.get(`v1/green_house/user-plants/`).then((res) => {
      setPlants(res.data);
      console.log(res);
    });
  }, []);
  const handleAddNewPlant = () => {
    navigate("/GreenHouseNew");
  };

  return (
    <Box display="flex" flexWrap="wrap" gap="20px">
      {plants.map((item, index) => (
        <GreenHouseCard
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          product={{
            image: item.image_url,
            name: item.nickname,
            price: item.address,
            id: item.id,
          }}
        />
      ))}
      <Box position="fixed" bottom="20px" right="20px">
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            minWidth: "unset",
            minHeight: "unset",
            padding: "0",
          }}
          onClick={handleAddNewPlant}
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Box>
    </Box>
  );
}
