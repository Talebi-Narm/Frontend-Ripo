/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
// import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../Utils/axios";

export default function GreenHouseNew() {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    axiosInstance
      .post(`v1/green_house/user-plants/`, {
        is_active: true,
        nickname,
        description,
        image_url: imageUrl,
        address,
        has_calendar: true,
        user: me,
      })
      .then((res) => {
        console.log(res);
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
            src={imageUrl}
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
            src={imageUrl}
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
