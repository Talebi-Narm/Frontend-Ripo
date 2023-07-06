import "./style.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";

import UserDropDown from "../UserDropDown";

function Navbar() {
  const [userNav, setUserNav] = useState(false);
  const [normalNav, setNav] = useState(true);

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
          setUserNav(true);
          setNav(false);
        } else {
          throw response;
        }
      }
    );
  }, []);

  return (
    <div className="navbar">
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          sm={1}
          md={0.75}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} sm={2} md={1}>
          <h1>Kadoo</h1>
        </Grid>
        <Grid
          item
          md={4}
          className="links"
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <a href="/HomePage">Home</a>
          <a href="/">About Us</a>
          <a href="/">Contact Us</a>
        </Grid>
        <Grid item xs={12} sm={5} md={3} display="flex" className="searchBox" />
        <Grid item xs={12} sm={4} md={3} display="flex" className="buttons">
          {normalNav && (
            <Button href="/signup" variant="contained">
              SIGN UP
            </Button>
          )}
          {normalNav && (
            <Button href="/signin" variant="contained">
              SIGN IN
            </Button>
          )}
          {userNav && <UserDropDown />}
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;
