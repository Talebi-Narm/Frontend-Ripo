import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";

import ShowCoins from "../ShowCoins";
import UserDropDown from "../UserDropDown";
import WriteTicket from "../WriteTicket";
import "./style.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
  },
}));

const StyledColorSerchIconButton = styled(IconButton)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    color: alpha(theme.palette.common.white, 0.75),
  },
}));

const KadooAppBar = forwardRef((props, ref) => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [coins, setCoinsNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [kind, setKind] = useState("");

  useImperativeHandle(ref, () => ({
    reloadAll() {
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
            setCoinsNumber(data.coin_value);
          });
      }
      async function RealodCountCart() {
        await fetch(
          "http://127.0.0.1:8000/api/cart/user-count-cart/",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setNumberOfItems(data);
          });
      }
      RealodCountCart();
      ReloadCoin();
    },
  }));

  function handleChange(e) {
    setSearchText(e.target.value.trim());
  }

  const reload = () => {
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
  };
  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch("http://127.0.0.1:8000/api/user/userinfo/", requestOptions).then(
      (response) => {
        if (response.status !== 401) {
          setAuthorized(true);
          response.json().then((data) => {
            setKind(data.type);
          });
        } else {
          throw response;
        }
      }
    );
  }, []);

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

  useEffect(() => {
    if (isAuthorized) {
      FetchCountCart();
    }
  }, [isAuthorized]);

  const handelDrawer = () => {
    if (props.isopen === false) {
      props.OpenMenu();
    } else {
      props.CloseMenu();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: { xs: "fixed", sm: "static" } }}>
        <Toolbar>
          <Grid display={{ xs: "flex", md: "none" }}>
            {props.DrawerOption && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handelDrawer}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Grid>
          {props.DrawerOption && (
            <Link to="/Homepage">
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
                className="Title"
              >
                Kadoo
              </Typography>
            </Link>
          )}
          {!props.DrawerOption && (
            <Link to="/Homepage">
              <Typography variant="h4" noWrap component="div" className="Title">
                Kadoo
              </Typography>
            </Link>
          )}
          {props.SearchOption && (
            <Search>
              <Grid wrap="nowrap" container direction="row" alignItems="center">
                <Grid item>
                  <StyledColorSerchIconButton
                    sx={{ ml: 2, p: 1 }}
                    size="small"
                    href={`/search/${searchText}`}
                  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </StyledColorSerchIconButton>
                </Grid>
                <Grid item>
                  <StyledInputBase
                    onChange={handleChange}
                    sx={{ ml: 0 }}
                    placeholder="Search for …"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Grid>
              </Grid>
            </Search>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {props.AuthorizationOption &&
              isAuthorized === true &&
              kind === "MEMBER" && <ShowCoins coins={coins} />}

            {/* props.AuthorizationOption &&
              isAuthorized === true &&
              props.TicketOption &&
              props.numberOfTicket !== 0 && (
                <IconButton size='large' color='inherit'>
                  <Badge badgeContent={numberOfTicket} color='secondary'>
                    <ForumIcon />
                  </Badge>
                </IconButton>
              ) */}

            {props.AuthorizationOption &&
              isAuthorized === true &&
              props.AddTicketOption && <WriteTicket />}

            {props.AuthorizationOption &&
              isAuthorized === true &&
              props.CartOption &&
              props.numberOfItems !== 0 && (
                <IconButton size="large" color="inherit" href="/cart">
                  <Badge badgeContent={numberOfItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              )}

            {props.AuthorizationOption && isAuthorized === true && (
              <UserDropDown kind={kind} />
            )}
            {props.AuthorizationOption && isAuthorized === false && (
              <Button
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                variant="outlined"
                startIcon={<AccountCircle />}
                sx={{ m: 1 }}
                href="/signin"
              >
                Sign in
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {props.AuthorizationOption && isAuthorized === true && (
              <UserDropDown />
            )}
            {props.AuthorizationOption && isAuthorized === false && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                sx={{ m: 1 }}
                href="/signin"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default KadooAppBar;
