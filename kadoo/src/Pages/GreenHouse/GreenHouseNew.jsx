/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
// import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../Utils/axios";

export default function GreenHouseNew() {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  // const [selectedImage, setselectedImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [me, setMe] = useState("");
  const navigate = useNavigate();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file is :", file);
    // setSelectedImage(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  const handleSave = () => {
    console.log("hamed is:", selectedImage);
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("image_url", selectedImage);
    formData.append("address", address);
    formData.append("has_calendar", true);
    formData.append("user", me);
    console.log("save");
    axiosInstance
      .post(`v1/green_house/user-plants/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("new item is : ", res);
        navigate("/greenHouse");
      });
  };
  // get current user id
  useEffect(async () => {
    axiosInstance.get(`v1/user/me`).then((res) => {
      setMe(res.data.user.id);
    });
  }, []);

  return (
    <Box textAlign="center">
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          margin: "auto",
        }}
      >
        <label htmlFor="avatar-input">
          <Avatar
            alt="Blurred Plant Image"
            // test1
            // src={selectedImage}
            src={selectedImage && URL.createObjectURL(selectedImage)}
            sx={{
              width: "240px",
              height: "240px",
              filter: "blur(8px)",
              position: "absolute",
              top: "-20px",
              left: "-20px",
            }}
          />
          <Avatar
            alt="Plant Image"
            src={selectedImage && URL.createObjectURL(selectedImage)}
            sx={{ width: "200px", height: "200px", margin: "auto" }}
          />
        </label>
        <input
          type="file"
          id="avatar-input"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <Box mt={2}>
        <Typography variant="h5" component="div">
          <label htmlFor="nickname-input">{nickname}</label>
        </Typography>
        <TextField
          id="nickname-input"
          label="name"
          value={nickname}
          onChange={handleNicknameChange}
          sx={{ width: "400px", marginTop: "16px" }}
        />
      </Box>
      <Box mt={2}>
        <TextField
          label="Address"
          value={address}
          onChange={handleAddressChange}
          sx={{ width: "400px", marginTop: "16px" }}
        />
      </Box>
      <Box mt={2}>
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          sx={{ width: "400px", marginTop: "16px" }}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
