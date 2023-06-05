import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ForumIcon from "@mui/icons-material/Forum";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ParkIcon from "@mui/icons-material/Park";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import MainBreadcrumbs from "../../Components/BreadCrumbs";
import MainAppBar from "../../Components/NewAppBar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MainAppBar open={open} />
      <Drawer
        sx={{
          display: { xs: "none", sm: "inherit" },
        }}
        variant="permanent"
        open={open}
        drawerWidth={drawerWidth}
      >
        <DrawerHeader
          sx={{ justifyContent: open ? "flex-end" : "center", p: "0", mt: 3 }}
        >
          <IconButton
            onClick={() => (open ? handleDrawerClose() : handleDrawerOpen())}
          >
            {open === false ? <MenuOpenIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[`Let's Shop`, "Green House", "Dashboard", "Tickets"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  display: "block",
                  m: 1,
                  borderRadius: "12px",
                  width: "auto !important",
                  boxShadow:
                    selectedIndex === index
                      ? `0 8px 32px 0 ${theme.palette.primary.main}60 !important`
                      : 0,
                  backgroundColor:
                    selectedIndex === index
                      ? `${theme.palette.primary.main}90 !important`
                      : "transparent",
                }}
                selected={selectedIndex === index}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 && <ShoppingCartIcon fontSize="small" />}
                    {index === 1 && <ParkIcon fontSize="small" />}
                    {index === 2 && <DashboardIcon fontSize="small" />}
                    {index === 3 && <ForumIcon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 5 }}>
        <DrawerHeader />
        <MainBreadcrumbs />
        <Box sx={{ mt: 1 }}>{children}</Box>
      </Box>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, display: { xs: "inherite", sm: "none" } }}
      >
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            variant="fullWidth"
          >
            <Tab icon={<ShoppingCartIcon />} />
            <Tab icon={<ParkIcon />} />
            <Tab icon={<DashboardIcon />} />
            <Tab icon={<ForumIcon />} />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
