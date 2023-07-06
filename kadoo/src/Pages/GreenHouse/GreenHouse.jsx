import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { React, useEffect, useState } from "react";

import GreenHouseCard from "../../Components/GreenHouse/GreenHouseCard";
import axiosInstance from "../../Utils/axios";

export default function GreenHouse() {
  const [plants, setPlants] = useState([]);
  // const [me, setMe] = useState("");
  // get plants
  useEffect(async () => {
    axiosInstance.get(`v1/green_house/user-plants/`).then((res) => {
      setPlants(res.data);
      console.log("sher ");
      console.log(res);
    });
  }, []);

  // post plants
  // useEffect(async () => {
  //   axiosInstance.get(`v1/user/me`).then((res) => {
  //     setMe(res.data.user.id);
  //   });
  // }, []);
  // useEffect(() => {
  //   axiosInstance.post(`v1/green_house/user-plants/`, {
  //     is_active: true,
  //     nickname: "narges",
  //     description: "kjfbvjkndf",
  //     image_url: "https://picsum.photos/200/300",
  //     address: "homeeee",
  //     has_calendar: true,
  //     user: me,
  //   });
  //   // .then((res) => {
  //   //   console.log(res);
  //   // });
  // }, [me]);

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
          sx={{ borderRadius: "50%" }}
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Box>
    </Box>
  );
}
