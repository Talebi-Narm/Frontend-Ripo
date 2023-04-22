import "./style.scss";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ForumIcon from "@mui/icons-material/Forum";
import ParkIcon from "@mui/icons-material/Park";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CoinsIcon from "../../assets/Images/Coins/coins.png";

function UserDropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [userData, setUserData] = React.useState([]);
  const open = Boolean(anchorEl);
  const [coins, setCoinsNumber] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    window.location.reload(true);
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch("http://127.0.0.1:8000/api/coin/get/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCoinsNumber(data.coin_value);
      });
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    async function FetchCountCart() {
      await fetch(
        "http://127.0.0.1:8000/api/cart/user-count-cart/",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setNumberOfItems(data);
        });
    }
    async function FetchUserData() {
      await fetch("http://127.0.0.1:8000/api/user/userinfo/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        });
    }
    FetchUserData();
    FetchCountCart();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem style={{ pointerEvents: "none" }}>
          <Avatar /> {userData.user_name}
        </MenuItem>
        <MenuItem sx={{ display: { xs: "flex", md: "none" } }}>
          <img className="coinIcon" src={CoinsIcon} width={30} alt="" />
          <Typography sx={{ pl: 1.2 }}>Coins: {coins}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ display: { xs: "flex", md: "none" } }}>
          <Box>
            <ListItemIcon>
              {numberOfItems !== 0 && (
                <Badge badgeContent={numberOfItems} color="secondary">
                  <ShoppingCartIcon fontSize="small" />
                </Badge>
              )}
              {numberOfItems === 0 && <ShoppingCartIcon fontSize="small" />}
            </ListItemIcon>
            Cart
          </Box>
        </MenuItem>
        {props.kind === "MEMBER" && (
          <Link to="/greenHouse" className="textDecoration">
            <MenuItem>
              <ListItemIcon>
                <ParkIcon fontSize="small" />
              </ListItemIcon>
              Green House
            </MenuItem>
          </Link>
        )}
        {props.kind === "MEMBER" && (
          <Link to="/TicketUser" className="textDecoration">
            <MenuItem>
              <ListItemIcon>
                <ForumIcon fontSize="small" />
              </ListItemIcon>
              My Tickets
            </MenuItem>
          </Link>
        )}
        {props.kind === "SPECIALIST" && (
          <Link to="/TicketPage" className="textDecoration">
            <MenuItem>
              <ListItemIcon>
                <ForumIcon fontSize="small" />
              </ListItemIcon>
              My Tickets
            </MenuItem>
          </Link>
        )}
        {props.kind === "ADMIN" && (
          <Link to="/AdminPage" className="textDecoration">
            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="small" />
              </ListItemIcon>
              ADMIN
            </MenuItem>
          </Link>
        )}

        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserDropDown;
