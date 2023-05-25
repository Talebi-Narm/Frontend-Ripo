import { EmailRounded, VpnKey } from "@mui/icons-material";
import { Grid, TextField, InputAdornment } from "@mui/material";
import React, { useState } from "react";

import Background from "../../assets/Images/SignIn/signInBG.png";
import AppBar from "../../Components/AppBar";
import { CustomButton } from "../../Components/CustomButton/Button";
import Text from "../../Components/Text";
import "./style.scss";

function SignIn() {
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [flagData, setFlagData] = useState(false);
  const [errorData, updateErrorData] = useState(initialFormData);
  const [refresh, setRefresh] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    updateErrorData({
      ...errorData,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (refresh) setRefresh(false);
    else setRefresh(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    };
    fetch("http://0.0.0.0:8000/api/v1/user/jwt/create/", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            setFlagData(!flagData);
          });
          alert("User logined!");
          // history.push("/Homepage");
        } else {
          throw response;
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          alert("Your email or password is incorrect!");
        }
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage);
          if (errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              email: errors.email,
            });
            return;
          }

          if (errors.password !== undefined) {
            updateErrorData({
              ...errorData,
              password: errors.password,
            });
          }
        });
      });
  };
  return (
    <div>
      <AppBar
        SearchOption
        TicketOption={false}
        CartOption={false}
        DrawerOption={false}
        AuthorizationOption={false}
      />
      <Grid
        container
        style={{ minHeight: "100vh" }}
        sx={{ pl: { sm: 20, xs: 0 }, pr: { sm: 20, xs: 0 } }}
      >
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          className="centerElement"
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <TextField
              variant="standard"
              name="email"
              label="Email"
              margin="normal"
              helperText={errorData.email !== "" ? errorData.email : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <EmailRounded />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              id="password"
              variant="standard"
              type="password"
              name="password"
              label="Password"
              margin="normal"
              helperText={errorData.password !== "" ? errorData.password : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <VpnKey />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <div
              style={{
                height: 20,
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            />
            <CustomButton onClick={handleSubmit}>Sign In</CustomButton>
            <div style={{ height: 30 }} />
            <div className="divSignUp">
              <Text
                text="Creacte account now"
                underline
                link="signup"
                fontSize={16}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={Background}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="Background"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
