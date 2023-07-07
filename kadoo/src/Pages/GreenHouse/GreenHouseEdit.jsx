/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import * as fs from "fs";

import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
// import axios from "axios";
import axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import FormData from "form-data";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../Utils/axios";

export default function GreenHouseEdit() {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file is :", file);
    // setSelectedImage(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  // eslint-disable-next-line no-shadow, consistent-return
  async function convertURLToBlob(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = await new File([blob], "image.jpg", { type: "image/jpeg" });
      return file;
    } catch (error) {
      console.log("Error converting URL to File:", error);
    }
  }
  // API
  useEffect(() => {
    axiosInstance.get(`v1/green_house/user-plants/${id}/`).then(async (res) => {
      console.log(res);
      setAddress(res.data.address);
      setNickname(res.data.nickname);
      setDescription(res.data.description);
      console.log(await convertURLToBlob(res.data.image_url));
      setSelectedImage(await convertURLToBlob(res.data.image_url));
    });
  }, [id]);
  // PUT
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("image_url", selectedImage);
    formData.append("address", address);
    formData.append("has_calendar", true);
    formData.append("user", me);
    console.log("save");
    axiosInstance
      .patch(`v1/green_house/user-plants/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("new item is : ", res);
        navigate("/greenHouse");
      });
  };

  // post plants
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
          onChange={handleImageChange}
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
