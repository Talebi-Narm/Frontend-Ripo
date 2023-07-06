/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { TalebiButton } from "../../Components/CustomButton/Button";
import { Box, style, ThemeProvider } from "@mui/system";
import React, { useRef, useState } from "react";
// import { toast } from "react-toastify";

import SampleAvatar from "../../assets/Images/SampleProfile/sample-profile-pic.jfif";
import AppBar from "../../Components/AppBar";
import "./style.scss";
import Theme from "../../Theme/ThemeGenerator";

function UserProfilePage() {
  const [name] = useState("");
  const [username] = useState("");
  const [userId] = useState("");
  const [birthdate] = useState(null);
  const [gender] = useState("");
  const [address] = useState("");
  const [email] = useState("");
  const [phoneNumber] = useState("");
  const [password] = useState("");
  const [changePassword] = useState("");
  const [imageSizeErr, setImageSizeErr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageCode] = useState("");
  const [openDrawer, setOpenDrawer] = React.useState([false]);
  const childRef = useRef();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
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
  const setAvatar = async (e) => {
    const file = e.target.files[0];
    const SizeMb = e.target.files[0].size / 1024 ** 2;
    const SizeKb = SizeMb * 1000;
    if (SizeKb <= 300) {
      const base64Avatar = await convertFileToBase64(file);
      setImageSizeErr(false);
      useState((prevState) => ({
        ...prevState,
        image_code: base64Avatar || "",
      }));
    } else {
      setImageSizeErr(true);
      // toast.warning("حجم تصویر حداکثر باید 300 کیلوبایت باشد.");
    }
  };

  const handelEdit = () => {
    // if(isEditing) {
    //   // send data to server
    // }
    setIsEditing(!isEditing);
  };

  return (
    <ThemeProvider theme={Theme}>
      <AppBar
        TicketOption
        CartOption
        DrawerOption={false}
        isopen={openDrawer}
        OpenMenu={handleDrawerOpen}
        CloseMenu={handleDrawerClose}
        ref={childRef}
      />
      <Grid container className="profile-detail-header">
        <Grid container item alignItems="center">
          <Grid container justifyContent="center">
            <Box sx={style}>
              <Grid container justifyContent="space-evenly" sx={{ pt: 3 }}>
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
                        <span>* The maximum acceptable size is 300 KB.</span>
                      </div>
                    )}

                    <Box className="add-user-center-element">
                      <TalebiButton
                        text="ChoosePicture"
                        sx={{ width: "100%" }}
                        variant="contained"
                        component="label"
                      >
                        <input
                          onChange={(e) => setAvatar(e)}
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                        />
                      </TalebiButton>
                    </Box>
                    <Box className="add-user-center-element">
                      <Button
                        sx={{ mt: 1, width: "100%" }}
                        variant="text"
                        color="error"
                        onClick={() => {
                          useState((prevState) => ({
                            ...prevState,
                            imageCode: "",
                          }));
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
                          label="Change Password"
                          defaultValue={changePassword}
                          size="small"
                          disabled={!isEditing}
                        />
                      </Grid>
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
                          label="Birthdate"
                          defaultValue={birthdate}
                          size="small"
                          disabled={!isEditing}
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
                          label="Gender"
                          defaultValue={gender}
                          size="small"
                          disabled={!isEditing}
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
                          label="Password"
                          defaultValue={password}
                          size="small"
                          disabled={!isEditing}
                        />
                      </Grid>
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
    </ThemeProvider>
  );
}
export default UserProfilePage;
