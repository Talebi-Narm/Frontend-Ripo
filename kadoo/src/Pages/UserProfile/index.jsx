import {
  AccountCircle,
  Bookmarks,
  AccountBalanceWallet,
  History,
} from "@mui/icons-material";
// import AddIcon from "@mui/icons-material/Add";
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
  // Dialog,
  // DialogTitle,
  // ListItemButton,
  // ListItemAvatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, style } from "@mui/system";
// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import SampleAvatar from "../../assets/Images/SampleProfile/sample-profile-pic.jfif";
import BookmarksProducts from "../../Components/Bookmarks";
import Orders from "../../Components/Orders";
import Wallet from "../../Components/Wallet";
import axiosInstance from "../../Utils/axios";

function UserProfile() {
  const [selectedMenu, setSelectedMenu] = useState("main");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  // const [address] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    about,
  });
  const [imageSizeErr, setImageSizeErr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageCode, setImageCode] = useState("");
  const uploadInputRef = React.useRef(null);
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const isValidEmail = (mail) => {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(mail);
  };

  const isValidPhoneNumber = (phoneNum) => {
    return /^(\+98|0)9\d{9}$/.test(phoneNum);
  };
  const handleSelectChange = (event) => {
    const selectedGender = event.target.value;

    let genderValue;
    if (selectedGender === "Woman") {
      genderValue = 1;
    } else if (selectedGender === "Man") {
      genderValue = 2;
    } else if (selectedGender === "Other") {
      genderValue = 3;
    }

    setGender(selectedGender);
    axiosInstance
      .put("v1/user/me/", { gender: genderValue })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   const updateUser = async () => {
  //     console.log("PUT request response");
  //     try {
  //       await axiosInstance.put("v1/user/me/", {
  //         first_name: "ded",
  //         last_name: "eef",
  //         phone_number: "+980123456789",
  //         email: "jkkjkl@gmail.com",
  //         gender: "2",
  //         about: "sdbxjash",
  //       });
  //       console.log("User updated successfully.");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   updateUser();
  // }, [name, lastName, phoneNumber, email, gender]);
  // Get
  useEffect(() => {
    axiosInstance.get(`v1/user/me/`).then((res) => {
      console.log(res.data.user);
      setName(res.data.user.first_name);
      setLastName(res.data.user.last_name);
      setPhoneNumber(res.data.user.phoneNumber);
      const receivedGender = res.data.user.gender;
      if (receivedGender === 1) {
        setGender("Woman");
      } else if (receivedGender === 2) {
        setGender("Man");
      } else if (receivedGender === 3) {
        setGender("Other");
      }
      setEmail(res.data.user.email);
    });
  }, []);
  // Get Address
  // useEffect(() => {
  //   axiosInstance.get(`v1/user/addresses`).then((res) => {
  //     console.log(res);
  //   });
  // }, [address]);
  // Put
  const handleSave = async () => {
    // Validate form fields
    if (!name || !lastName || !phoneNumber || !email || !about) {
      setErrors({
        name: !name,
        lastName: !lastName,
        phoneNumber: !phoneNumber || !isValidPhoneNumber(phoneNumber),
        email: !email || !isValidEmail(email),
        about: !about,
      });
      return;
    }

    try {
      console.log(name);
      await axiosInstance.put("v1/user/me/", {
        first_name: name,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        gender,
        about,
      });

      console.log("User updated successfully.");

      // Update state and disable form fields
      setErrors({
        name: false,
        lastName: false,
        phoneNumber: false,
        email: false,
        about: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // const handleSave = async () => {
  //   const formData = new FormData();
  //   formData.append("first_name", "daDK");
  //   formData.append("last_name", "daDK");
  //   formData.append("phone_number", "09022147444");
  //   formData.append("email", "daDK@gmail.com");
  //   formData.append("gender", 0);
  //   formData.append("about", "hugfsd");
  //   console.log("save");
  //   axiosInstance
  //     .put(`v1/user/me/`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       console.log("new item is : ", res);
  //     });
  // };

  const handleEdit = () => {
    setErrors({
      first_name: false,
      last_name: false,
      email: false,
      phone_number: false,
      about: false,
    });
    setIsEditing(true);
  };
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
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
    const file = e.target.files[0] || uploadInputRef.current.files[0];
    const SizeMb = e.target.files[0].size / 1024 ** 2;
    const SizeKb = SizeMb * 1000;
    if (SizeKb <= 300) {
      const base64Avatar = await convertFileToBase64(file);
      setImageSizeErr(false);
      setImageCode(base64Avatar || "");
    } else {
      setImageSizeErr(true);
    }
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
                          spacing={2}
                          columns={16}
                          sx={{ justifyContent: "center", my: 1 }}
                        >
                          <Grid item>
                            <TextField
                              required
                              id="outlined-required"
                              label="First Name"
                              value={name}
                              size="small"
                              disabled={!isEditing}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) {
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    name: false,
                                  }));
                                }
                              }}
                              error={errors.name}
                              helperText={
                                errors.name ? "Name is required." : ""
                              }
                              inputProps={{
                                maxLength: 25,
                                style: {
                                  height: "35px",
                                  width: "210px",
                                },
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              required
                              id="outlined-required"
                              label="Last Name"
                              value={lastName}
                              size="small"
                              disabled={!isEditing}
                              onChange={(e) => {
                                setLastName(e.target.value);
                                if (errors.lastName) {
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    lastName: false,
                                  }));
                                }
                              }}
                              error={errors.lastName}
                              helperText={
                                errors.lastName ? "Last Name is required." : ""
                              }
                              inputProps={{
                                maxLength: 25,
                                style: {
                                  height: "35px",
                                  width: "210px",
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          spacing={2}
                          columns={16}
                          sx={{ justifyContent: "center", my: 1 }}
                        >
                          <Grid item>
                            <TextField
                              required
                              id="outlined-required"
                              label="Email"
                              value={email}
                              size="small"
                              disabled={!isEditing}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) {
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    email: false,
                                  }));
                                }
                              }}
                              error={errors.email}
                              helperText={
                                errors.email ? "Invalid email address." : ""
                              }
                              inputProps={{
                                maxLength: 25,
                                style: {
                                  height: "35px",
                                  width: "210px",
                                },
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              required
                              id="outlined-required"
                              label="Phone Number"
                              value={phoneNumber}
                              size="small"
                              disabled={!isEditing}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                if (errors.phoneNumber) {
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    phoneNumber: false,
                                  }));
                                }
                              }}
                              error={errors.phoneNumber}
                              helperText={
                                errors.phoneNumber
                                  ? "Invalid phone number."
                                  : ""
                              }
                              inputProps={{
                                style: {
                                  height: "35px",
                                  width: "210px",
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          spacing={2}
                          columns={16}
                          sx={{ justifyContent: "center", my: 1 }}
                        >
                          <Grid item>
                            <FormControl>
                              <InputLabel id="demo-simple-select-label">
                                Gender
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleSelectChange}
                                disabled={!isEditing}
                                style={{ height: "52px", width: "242px" }}
                              >
                                <MenuItem value="Woman">Woman</MenuItem>
                                <MenuItem value="Man">Man</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item>
                            <TextField
                              required
                              id="outlined-required"
                              label="About"
                              value={about}
                              size="small"
                              disabled={!isEditing}
                              onChange={(e) => {
                                setAbout(e.target.value);
                                if (errors.about) {
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    about: false,
                                  }));
                                }
                              }}
                              error={errors.about}
                              helperText={
                                errors.about ? "About is required." : ""
                              }
                              inputProps={{
                                maxLength: 25,
                                style: {
                                  height: "35px",
                                  width: "210px",
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                        {/* <Grid
                          container
                          flexDirection="row-reverse"
                          sx={{ pb: 2, justifyContent: "center" }}
                        >
                          <Button
                            variant="text"
                            color="success"
                            sx={{ width: "50%" }}
                            component="label"
                            onClick={handleClickOpen}
                          >
                            YourAddress
                          </Button>
                          <SimpleDialog open={open} onClose={handleClose} />
                        </Grid> */}
                        <Grid container justifyContent="center">
                          <Grid item>
                            {isEditing ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEdit}
                              >
                                Edit
                              </Button>
                            )}
                          </Grid>
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
            <BookmarksProducts />
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
            <Orders />
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
// function SimpleDialog(props) {
//   const { onClose, selectedValue, open } = props;
//   const [isEditing, setIsEditing] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [me, setMe] = useState("");
//   useEffect(() => {
//     axiosInstance.get(`v1/user/me/`).then((res) => {
//       setMe(res.data.user.id);
//     });
//     axiosInstance.get(`v1/user/addresses`).then((res) => {
//       setAddresses(res.data);
//     });
//   }, []);
// useEffect(() => {
//   axiosInstance
//     .post(`v1/user/addresses`, {
//       address: "djfhbvd d",
//       label: "Your label value",
//       owner: me,
//       is_active: true,
//     })
//     .then((res) => {
//       console.log("POST request successful:", res.data);
//     });
// }, [me]);
// const handleClose = () => {
//   onClose(selectedValue);
//   setIsEditing(!isEditing);
// };

// const handleListItemClick = (value) => {
//   if (value === "addAddress") {
//     setAddresses([...addresses, ""]);
//   } else {
//     onClose(value);
//   }
// };

// const handleChangeAddress = (index, value) => {
//   const updatedAddresses = [...addresses];
//   updatedAddresses[index] = value;
//   setAddresses(updatedAddresses);
// };

// return (
//   <Dialog onClose={handleClose} open={open}>
//     <DialogTitle>
//       <List sx={{ pt: 0 }}>
//         {Object.entries(addresses).map(([id, address]) => (
//           <ListItem key={id} disableGutters>
//             <TextField
//               required
//               id={`outlined-required-${id}`}
//               label="Address"
//               value={typeof address === "object" ? "" : address}
//               size="small"
//               disabled={isEditing}
//               inputProps={{
//                 style: {
//                   height: "37px",
//                   width: "209px",
//                 },
//               }}
//               onChange={(e) => handleChangeAddress(id, e.target.value)}
//             />
//           </ListItem>
//         ))}

//         <ListItem disableGutters>
//           <ListItemButton
//             autoFocus
//             onClick={() => handleListItemClick("addAddress")}
//           >
//             <ListItemAvatar>
//               <Avatar>
//                 <AddIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Add address" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </DialogTitle>
//   </Dialog>
// );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

export default UserProfile;
