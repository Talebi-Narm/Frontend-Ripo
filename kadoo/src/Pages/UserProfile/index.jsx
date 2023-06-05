import {
  AccountCircle,
  Bookmarks,
  AccountBalanceWallet,
  History,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
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
  Dialog,
  DialogTitle,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";
import { Box, style } from "@mui/system";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import dayjs from "dayjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import SampleAvatar from "../../assets/Images/SampleProfile/sample-profile-pic.jfif";
import { TalebiButton } from "../../Components/CustomButton/Button";
import Wallet from "../../Components/Wallet";
import axiosInstance from "../../Utils/axios";

function UserProfile() {
  const [selectedMenu, setSelectedMenu] = useState("main");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  // const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState("");
  const [address] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber] = useState("");
  // const [password] = useState("");
  // const [changePassword] = useState("");
  const [imageSizeErr, setImageSizeErr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageCode, setImageCode] = useState("");
  const uploadInputRef = React.useRef(null);
  // const [value, setValue] = React.useState(dayjs("2022-06-"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axiosInstance.get(`v1/user/me/`).then((res) => {
      console.log(res.data.user);
      setName(res.data.user.first_name);
      setLastName(res.data.user.last_name);
      setUsername(res.data.user.username);
      setGender(res.data.user.gender);
      setEmail(res.data.user.email);
      setUserId(res.data.user.userId);
    });
  }, [name, username, gender, userId, email]);

  useEffect(() => {
    axiosInstance.get(`v1/user/addresses`).then((res) => {
      // setAddress(res);
      console.log(res);
    });
  }, [address]);
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
    // if (isEditing) {
    //   axiosInstance.get(`v1/user/me/`).then((res) => {
    //     res;
    //   });
    // }
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
                                label="Last Name"
                                value={lastName}
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
                                label="Email"
                                value={email}
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
                              <TextField
                                required
                                id="outlined-required"
                                label="Phone Number"
                                value={phoneNumber}
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
                                value={changePassword}
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
                                label="First Name"
                                value={name}
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
                                label="User Name"
                                value={username}
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
                              {/* <TextField
                                required
                                id="outlined-required"
                                label="Birthdate"
                                value={birthdate}
                                size="small"
                                disabled={!isEditing}
                              /> */}
                              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}> */}
                              {/* <DatePicker
                                label="Birthdate"
                                value={birthdate}
                                onChange={(newValue) => setBirthdate(newValue)}
                                disabled={!isEditing}
                              /> */}
                              {/* </DemoContainer>
                              </LocalizationProvider> */}
                              <TextField
                                required
                                id="outlined-required"
                                label="Gender"
                                value={gender}
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
                                value={password}
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
                        <Grid
                          container
                          flexDirection="row-reverse"
                          sx={{ pb: 2, justifyContent: "center" }}
                        >
                          {/* <TalebiButton
                            text="YourAdrress"
                            sx={{ width: "50%" }}
                            variant="contained"
                            component="label"
                            // onClick={() => setAvatarRef()}
                          /> */}
                          <Button
                            variant="text"
                            color="success"
                            sx={{ width: "50%" }}
                            // variant="contained"
                            component="label"
                            onClick={handleClickOpen}
                          >
                            YourAddress
                          </Button>
                          <SimpleDialog open={open} onClose={handleClose} />
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
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState({});
  const [me, setMe] = useState("");

  // const payload = Object.entries(addresses).map(([]) => ({
  //   address: "djfhbvd d",
  //   label: "Your label value",
  //   owner: me,
  //   is_active: true,
  // }));

  // const requestData = Object.values(payload);
  useEffect(() => {
    axiosInstance.get(`v1/user/me/`).then((res) => {
      // console.log("me", res.data.user.id);
      setMe(res.data.user.id);
    });
    axiosInstance.get(`v1/user/addresses`).then((res) => {
      setAddresses(res.data);
      // console.log("sdghj", res.data);
    });
  }, []);
  useEffect(() => {
    axiosInstance
      .post(`v1/user/addresses`, {
        address: "djfhbvd d",
        label: "Your label value",
        owner: me,
        is_active: true,
      })
      .then((res) => {
        console.log("POST request successful:", res.data);
        // console.log("sdghj", res.data);
      });
  }, [me]);
  const handleClose = () => {
    onClose(selectedValue);
    setIsEditing(!isEditing);
  };

  const handleListItemClick = (value) => {
    if (value === "addAddress") {
      setAddresses([...addresses, ""]);
    } else {
      onClose(value);
    }
  };

  const handleChangeAddress = (id, value) => {
    const updatedAddresses = { ...addresses, [id]: value };
    setAddresses(updatedAddresses);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <List sx={{ pt: 0 }}>
          {Object.entries(addresses).map(([id, address]) => (
            <ListItem key={id} disableGutters>
              <TextField
                required
                id={`outlined-required-${id}`}
                label="Address"
                value={address}
                size="small"
                disabled={!isEditing}
                inputProps={{
                  style: {
                    height: "37px",
                    width: "209px",
                  },
                }}
                onChange={(e) => handleChangeAddress(id, e.target.value)}
              />
            </ListItem>
          ))}

          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => handleListItemClick("addAddress")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add address" />
            </ListItemButton>
          </ListItem>
        </List>
      </DialogTitle>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default UserProfile;
