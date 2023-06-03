import {
  AccountCircle,
  Bookmarks,
  AccountBalanceWallet,
  History,
} from "@mui/icons-material";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  List,
  Button,
  ListItem,
  TextField,
  IconButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Box, style } from "@mui/system";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";

import SampleAvatar from "../../assets/Images/SampleProfile/sample-profile-pic.jfif";
import { TalebiButton } from "../../Components/CustomButton/Button";
import Wallet from "../../Components/Wallet";
import "./style.scss";
import axiosInstance from "../../Utils/axios";

async function UserProfile() {
  const [selectedMenu, setSelectedMenu] = useState("main");
  const [name] = useState("");
  const [username] = useState("");
  const [userId] = useState("");
  // const [birthdate] = useState(null);
  const [gender] = useState("");
  const [address] = useState("");
  const [email] = useState("");
  const [phoneNumber] = useState("");
  // const [password] = useState("");
  // const [changePassword] = useState("");
  const [imageSizeErr, setImageSizeErr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageCode, setImageCode] = useState("");
  const uploadInputRef = React.useRef(null);
  const [value, setValue] = React.useState(dayjs("2022-06-"));

  // const handleUpload = () => {
  //   const file = uploadInputRef.current.files[0];
  // };
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  // const save = () => {
  //   axiosInstance.get(`v1/user/me/`).then((res) => {
  //     const requestOptions = res;
  //   });
  // };
  // const response = await axios.get("https://talebi-narm.ir/api/v1/user/me/", {
  //   headers: {
  //     accept: "application/json",
  //   },
  // });
  // const setImageCode = () => {
  //   imageCode: base64Avatar
  // }
  // const setAvatarRef = async () => {
  //   const file = uploadInputRef.current.files[0];
  //   const SizeMb = uploadInputRef.current.files[0].size / 1024 ** 2;
  //   const SizeKb = SizeMb * 1000;
  //   if (SizeKb <= 300) {
  //     const base64Avatar = await convertFileToBase64(file);
  //     setImageSizeErr(false);
  //     setImageCode(base64Avatar || "");
  //   } else {
  //     setImageSizeErr(true);
  //     // toast.warning("حجم تصویر حداکثر باید 300 کیلوبایت باشد.");
  //   }
  // };
  const setAvatar = async (e) => {
    const file = e.target.files[0] || uploadInputRef.current.files[0];
    const SizeMb = e.target.files[0].size / 1024 ** 2;
    const SizeKb = SizeMb * 1000;
    if (SizeKb <= 300) {
      const base64Avatar = await convertFileToBase64(file);
      setImageSizeErr(false);
      setImageCode(base64Avatar || "");
    } else {
      setImageSizeErr(true);
      // toast.warning("حجم تصویر حداکثر باید 300 کیلوبایت باشد.");
    }
  };

  const handelEdit = async () => {
    if (isEditing) {
      axiosInstance.get(`v1/user/me/`).then((res) => {
         = res;
      });
    }
    setIsEditing(!isEditing);
  };
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "main":
        return (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Grid container className="profile-detail-header">
              <Grid container item alignItems="center">
                <Grid container justifyContent="center">
                  <Box sx={style}>
                    <Grid
                      container
                      justifyContent="space-evenly"
                      sx={{ pt: 3 }}
                    >
                      <Grid item>
                        <Typography
                          id="spring-modal-title"
                          variant="h5"
                          component="h2"
                        >
                          Edit/Save
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container className="profile-detail-header">
                      <Grid
                        container
                        item
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <IconButton component="label">
                            <input
                              onChange={(e) => setAvatar(e)}
                              hidden
                              accept="image/*"
                              multiple
                              type="file"
                              max={20}
                              ref={uploadInputRef}
                            />
                            <Avatar
                              className="new-user-avatar"
                              sx={{ width: 150, height: 150 }}
                              alt="avatar"
                              src={imageCode || SampleAvatar}
                            />
                          </IconButton>
                          {imageSizeErr && (
                            <div className="add-user-center-element image-size-err">
                              <span>
                                * The maximum acceptable size is 300 KB.
                              </span>
                            </div>
                          )}

                          {/* <Box className="add-user-center-element">
                            <TalebiButton
                              text="ChoosePicture"
                              sx={{ width: "100%" }}
                              variant="contained"
                              component="label"
                              onClick={() => setAvatarRef()}
                            />
                          </Box> */}
                          <Box className="add-user-center-element">
                            <Button
                              sx={{ mt: 1, width: "100%" }}
                              variant="text"
                              color="error"
                              onClick={() => {
                                setImageCode("");
                                setImageSizeErr(false);
                              }}
                            >
                              DeletePicture
                            </Button>
                          </Box>
                        </Grid>
                        <Grid
                          container
                          item
                          flexDirection="row-reverse"
                          flexWrap="nowrap"
                          sx={{
                            pl: 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                          spacing={3}
                        >
                          <Grid item>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="User Name"
                                defaultValue={username}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "36px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="User Id"
                                defaultValue={userId}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "36px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Address"
                                defaultValue={address}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "37px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Phone Number"
                                defaultValue={phoneNumber}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "35px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            {/* <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Change Password"
                                defaultValue={changePassword}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "35px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid> */}
                          </Grid>
                          <Grid item sx={{ pl: 2 }}>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                defaultValue={name}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "35px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                defaultValue={email}
                                size="small"
                                disabled={!isEditing}
                                // sx={{ height: "300px" }}
                                inputProps={{
                                  style: {
                                    height: "35px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              {/* <TextField
                                required
                                id="outlined-required"
                                label="Birthdate"
                                defaultValue={birthdate}
                                size="small"
                                disabled={!isEditing}
                              /> */}
                              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}> */}
                              <DatePicker
                                label="Birthdate"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                disabled={!isEditing}
                              />
                              {/* </DemoContainer>
                              </LocalizationProvider> */}
                            </Grid>
                            <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Gender"
                                defaultValue={gender}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "35px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid>
                            {/* <Grid
                              container
                              flexDirection="row-reverse"
                              sx={{ pb: 2 }}
                            >
                              <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                defaultValue={password}
                                size="small"
                                disabled={!isEditing}
                                inputProps={{
                                  style: {
                                    height: "35px",
                                    width: "209px",
                                  },
                                }}
                              />
                            </Grid> */}
                          </Grid>
                        </Grid>
                        <Grid>
                          <TalebiButton
                            variant="contained"
                            onClick={handelEdit}
                            text={isEditing ? "Save" : "Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        );
      case "bookmarks":
        return (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Bookmarked Products
            </Typography>
            {/* Render bookmarked products */}
          </Paper>
        );
      case "wallet":
        return (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Wallet
            </Typography>
            <Wallet />
          </Paper>
        );
      case "history":
        return (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Order History
            </Typography>
            {/* Render order history */}
          </Paper>
        );
      default:
        return null;
    }
  };
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={9}>
        {renderContent()}
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <List component="nav">
            <ListItem
              button
              selected={selectedMenu === "main"}
              sx={{
                borderRadius: "12px",
                width: "auto !important",
                boxShadow:
                  selectedMenu === "main"
                    ? `0 8px 32px 0 ${theme.palette.primary.main}60 !important`
                    : 0,
                backgroundColor:
                  selectedMenu === "main"
                    ? `${theme.palette.primary.main}90 !important`
                    : "transparent",
              }}
              onClick={() => handleMenuClick("main")}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Main" />
            </ListItem>
            <ListItem
              button
              selected={selectedMenu === "bookmarks"}
              onClick={() => handleMenuClick("bookmarks")}
              sx={{
                borderRadius: "12px",
                width: "auto !important",
                boxShadow:
                  selectedMenu === "bookmarks"
                    ? `0 8px 32px 0 ${theme.palette.primary.main}60 !important`
                    : 0,
                backgroundColor:
                  selectedMenu === "bookmarks"
                    ? `${theme.palette.primary.main}90 !important`
                    : "transparent",
              }}
            >
              <ListItemIcon>
                <Bookmarks />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItem>
            <ListItem
              button
              selected={selectedMenu === "wallet"}
              sx={{
                borderRadius: "12px",
                width: "auto !important",
                boxShadow:
                  selectedMenu === "wallet"
                    ? `0 8px 32px 0 ${theme.palette.primary.main}60 !important`
                    : 0,
                backgroundColor:
                  selectedMenu === "wallet"
                    ? `${theme.palette.primary.main}90 !important`
                    : "transparent",
              }}
              onClick={() => handleMenuClick("wallet")}
            >
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItem>
            <ListItem
              button
              selected={selectedMenu === "history"}
              sx={{
                borderRadius: "12px",
                width: "auto !important",
                boxShadow:
                  selectedMenu === "history"
                    ? `0 8px 32px 0 ${theme.palette.primary.main}60 !important`
                    : 0,
                backgroundColor:
                  selectedMenu === "history"
                    ? `${theme.palette.primary.main}90 !important`
                    : "transparent",
              }}
              onClick={() => handleMenuClick("history")}
            >
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText primary="Order History" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
