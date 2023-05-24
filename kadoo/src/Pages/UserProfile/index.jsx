import {
  AccountCircle,
  Bookmarks,
  AccountBalanceWallet,
  History,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import Wallet from "../../Components/Wallet";

function UserProfile() {
  const [selectedMenu, setSelectedMenu] = useState("main");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "main":
        return (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar
                alt="User Avatar"
                src="/path-to-avatar-image.png"
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
              John Doe
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Email: johndoe@example.com
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Birthdate: 01/01/1990
            </Typography>
            {/* Other user information */}
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
