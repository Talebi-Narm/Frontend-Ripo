import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import DefAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import React, { useEffect, useState, useRef } from "react";

import AppBar from "../../Components/AppBar";
import SkeletonArticle from "../../Components/Cart/SkeletonArticle";
import ShowGreenHouse from "../../Components/ShowProduct/ShowGreenHouse";
import showToast from "../../Components/Toast";
import Theme from "../../Theme/ThemeGenerator";
import GreenHouseEdit from "../GreenHouseEdit";

import "./style.scss";
// Import Theme Files

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Plantmanagment() {
  const theme = useTheme();
  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
  ];
  /// const containerRef = React.useRef(null)
  const initialData = Object.freeze({
    id: "",
    name: "",
    description: "",
    image: "",
    location: "",
    isArchived: false,
    created: "",
    modified: "",
    user: 0,
  });
  const value = 0;
  const reload = false;
  const [openDrawer, setOpenDrawer] = React.useState([false]);
  const [plantData, setPlantData] = React.useState([]);
  const [plantId, setPlantId] = React.useState([]);
  const [plantDataLoaded, setPlantDataLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [enable, setEnable] = React.useState(false);
  const [newPlant, setNewPlant] = React.useState(true);
  const [plantInfo, setPlantInfo] = React.useState(initialData);
  const [newPlantInfo, setNewPlantInfo] = React.useState(initialData);
  const [errorData, updateErrorData] = useState(initialData);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [imageChange, setImageChange] = React.useState(false);

  const childRef = useRef();

  const handleReload = () => {
    window.location.reload(true);
  };

  const handleCapture = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageChange(true);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImageChange(false);
    setPreview(null);
    setPlantInfo(initialData);
    setNewPlantInfo(initialData);
  };

  const handleClose = () => {
    handleReset();
    setNewPlant(true);
    setOpen(false);
  };

  const handleCreate = () => {
    updateErrorData({
      ...errorData,
      name: "",
    });
    updateErrorData({
      ...errorData,
      description: "",
    });
    updateErrorData({
      ...errorData,
      location: "",
    });
    updateErrorData({
      ...errorData,
      image: "",
    });
    const formData = new FormData();
    if (newPlantInfo.name !== "") {
      formData.append("name", newPlantInfo.name);
    } else {
      showToast("Enter the name of plant!", "info");
      return;
    }
    if (selectedFile !== null) {
      formData.append("image", selectedFile, selectedFile.name);
    } else {
      showToast("Select Image for the plant!", "info");
      return;
    }
    formData.append("description", newPlantInfo.description);
    formData.append("location", newPlantInfo.location);

    const requestOptions = {
      method: "POST",
      headers: { Authorization: `JWT ${localStorage.getItem("access_token")}` },
      body: formData,
    };
    fetch("http://127.0.0.1:8000/api/myPlants/", requestOptions)
      .then((response) => {
        if (response.status === 401 || response.status === 400) {
          throw response;
        } else {
          showToast("Plant Added!", "success");
          handleReload();
          handleClose();
        }
      })
      .catch((err) => {
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage);

          if (errors.first_name !== undefined) {
            updateErrorData({
              ...errorData,
              name: errors.name,
            });
            return;
          }

          if (errors.last_name !== undefined) {
            updateErrorData({
              ...errorData,
              description: errors.description,
            });
            return;
          }

          if (errors.user_name !== undefined) {
            updateErrorData({
              ...errorData,
              location: errors.location,
            });
            return;
          }

          if (errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              image: errors.image,
            });
          }
        });
      });
  };

  const handleUpdate = () => {
    updateErrorData({
      ...errorData,
      name: "",
    });
    updateErrorData({
      ...errorData,
      description: "",
    });
    updateErrorData({
      ...errorData,
      location: "",
    });
    updateErrorData({
      ...errorData,
      image: "",
    });
    const formData = new FormData();
    if (newPlantInfo.name !== "") {
      formData.append("name", newPlantInfo.name);
    } else {
      showToast("Enter the name of plant!", "info");
      return;
    }
    formData.append("description", newPlantInfo.description);
    formData.append("location", newPlantInfo.location);
    if (selectedFile !== null) {
      formData.append("image", selectedFile, selectedFile.name);
    } else {
      formData.append("image", "");
    }

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `JWT ${localStorage.getItem("access_token")}` },
      body: formData,
    };
    fetch(
      `http://127.0.0.1:8000/api/myPlantsRUD/${plantInfo.id}/`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 401 || response.status === 400) {
          throw response;
        } else {
          showToast("Plant Updated!", "success");
          handleReload();
          handleClose();
        }
      })
      .catch((err) => {
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage);

          if (errors.first_name !== undefined) {
            updateErrorData({
              ...errorData,
              name: errors.name,
            });
            return;
          }

          if (errors.last_name !== undefined) {
            updateErrorData({
              ...errorData,
              description: errors.description,
            });
            return;
          }

          if (errors.user_name !== undefined) {
            updateErrorData({
              ...errorData,
              location: errors.location,
            });
            return;
          }

          if (errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              image: errors.image,
            });
          }
        });
      });
  };

  const handleSubmit = () => {
    if (newPlant) {
      handleCreate();
    } else {
      handleUpdate();
    }
    childRef.current.reloadAll();
  };

  const handleClickOpen = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    async function ReloadCoin() {
      await fetch("http://127.0.0.1:8000/api/coin/get/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.coin_value >= 50) {
            setPlantInfo(initialData);
            setNewPlant(true);
            setOpen(true);
          } else {
            showToast("You dont have enough coin!", "error");
          }
        });
    }
    ReloadCoin();
  };

  const handleClickOpenEdit = (data) => {
    setPlantInfo(data);
    setNewPlantInfo(data);
    setNewPlant(false);
    setOpen(true);
  };

  function srcToFile(src, fileName, mimeType) {
    return fetch(src)
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((buf) => {
        return new File([buf], fileName, { type: mimeType });
      });
  }

  useEffect(() => {
    // create the preview
    if (selectedFile != null) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    return null;
  }, [selectedFile]);

  useEffect(() => {
    if (plantInfo !== initialData) {
      if (selectedFile === null) {
        if (!newPlant) {
          srcToFile(
            `http://127.0.0.1:8000${plantInfo.image}`,
            "file.jpg",
            "image/jpg"
          ).then((file) => {
            setSelectedFile(file);
          });
        }
      }
    }
  }, [plantInfo]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (JSON.stringify(plantInfo) === JSON.stringify(newPlantInfo)) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [newPlantInfo]);

  const handleChangeInfo = (e) => {
    setNewPlantInfo({
      ...newPlantInfo,
      [e.target.name]: e.target.value.trim(),
    });
    updateErrorData({
      ...errorData,
      [e.target.name]: "",
    });
  };

  useEffect(() => {
    if (plantData.length === plantId.length) {
      setPlantDataLoaded(true);
    } else {
      setPlantDataLoaded(false);
    }
  }, [plantData]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };

    setPlantDataLoaded(false);
    setTimeout(async () => {
      setPlantData([]);
      plantId.map((p) => {
        fetch(
          `http://127.0.0.1:8000/api/myPlantsRUD/${p.id}/`,
          requestOptions
        ).then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            .includes("application/json");
          const data = isJson ? await response.json() : null;

          setPlantData((prestate) => [...prestate, data]);
        });
        return null;
      });
    }, 3000);
  }, [plantId]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    setTimeout(async () => {
      setPlantDataLoaded(false);
      fetch("http://127.0.0.1:8000/api/myPlants/", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            .includes("application/json");
          const data = isJson ? await response.json() : null;
          if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
          }

          if (data === null) {
            setPlantDataLoaded(true);
          } else {
            setPlantId(data);
          }
          return null;
        })
        .catch((error) => {
          if (error === 401) {
            showToast("You should login first!", "error");
          }
          console.error("There was an error!", error);
          setPlantDataLoaded(true);
        });
    }, 0);
  }, [reload]);
  return (
    <div className="FontRight">
      <ThemeProvider theme={Theme}>
        <AppBar
          SearchOption
          TicketOption
          CartOption
          DrawerOption={false}
          AuthorizationOption
          isopen={openDrawer}
          OpenMenu={handleDrawerOpen}
          CloseMenu={handleDrawerClose}
          ref={childRef}
        />
        <Grid
          container
          item
          xs={24}
          alignItems="center"
          justify="center"
          direction="column"
          sx={{ p: 3.5, pt: 4 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              {plantData.length !== 0 && (
                <Grid
                  container
                  spacing={2}
                  xs={12}
                  sx={{ mt: 2, width: "100%" }}
                >
                  <Grid item sx={{ width: "100%" }}>
                    <ShowGreenHouse
                      data={plantData}
                      reloadFunc={handleReload}
                      OpenDialog={handleClickOpenEdit}
                    />
                  </Grid>
                </Grid>
              )}
              {plantData.length === 0 && (
                <div>
                  {plantDataLoaded === true && (
                    <Grid container spacing={2} xs={12} sx={{ p: 3 }}>
                      <Alert severity="error" sx={{ width: "100%" }}>
                        There is NO plant right now! Come Back soon ...
                      </Alert>
                    </Grid>
                  )}
                  {plantDataLoaded === false && (
                    <Stack sx={{ m: 2 }}>
                      <SkeletonArticle />
                    </Stack>
                  )}
                </div>
              )}
            </Box>
          </Grid>
          {fabs.map((fab, index) => (
            <Zoom
              key={fab.color}
              in={value === index}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${
                  value === index ? transitionDuration.exit : 0
                }ms`,
              }}
              unmountOnExit
            >
              <Fab
                sx={fab.sx}
                aria-label={fab.label}
                color={fab.color}
                onClick={handleClickOpen}
              >
                {fab.icon}
              </Fab>
            </Zoom>
          ))}
        </Grid>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DefAppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{ mr: 1 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {newPlant ? "New plant" : "Edit"}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  handleSubmit();
                }}
                disabled={!newPlant && !enable}
              >
                {newPlant ? "Add" : "Edit"}
              </Button>
            </Toolbar>
          </DefAppBar>
          <GreenHouseEdit
            data={plantInfo}
            change={handleChangeInfo}
            selectedFile={selectedFile}
            handleCapture={handleCapture}
            preview={preview}
            imageChange={imageChange}
            errorData={errorData}
            handleSubmit={handleSubmit}
            newPlant={newPlant}
            enable={enable}
          />
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default Plantmanagment;
