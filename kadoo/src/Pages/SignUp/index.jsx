import { Player } from "@lottiefiles/react-lottie-player";
import { AccountCircle, VpnKey, EmailSharp, Create } from "@mui/icons-material";
import { Grid, TextField, InputAdornment, Button } from "@mui/material";
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";

import Text from "../../Components/Text";
import "./style.scss";
import { baseURL } from "../../Utils/axios";

function SignUp() {
  const initialFormData = Object.freeze({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    about: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [errorData, updateErrorData] = useState(initialFormData);
  const navigate = useNavigate();

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
    updateErrorData({
      ...errorData,
      name: "",
    });
    updateErrorData({
      ...errorData,
      lastName: "",
    });
    updateErrorData({
      ...errorData,
      userName: "",
    });
    updateErrorData({
      ...errorData,
      email: "",
    });
    updateErrorData({
      ...errorData,
      password: "",
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: formData.password,
        username: formData.userName,
        first_name: formData.name,
        last_name: formData.lastName,
        email: formData.email,
        about: formData.about,
      }),
    };
    fetch(`${baseURL}v1/user/register`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          alert("User registered!");
          navigate("/signin");
          window.location.reload(true);
        } else {
          throw response;
        }
      })
      .catch((err) => {
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage);
          console.log(errors);
          console.log(`last name : ${formData.last_name}`);
          if (errors.first_name !== undefined) {
            updateErrorData({
              ...errorData,
              name: errors.first_name,
            });
            return;
          }

          if (errors.last_name !== undefined) {
            updateErrorData({
              ...errorData,
              lastName: errors.last_name,
            });
            return;
          }

          if (errors.username !== undefined) {
            updateErrorData({
              ...errorData,
              userName: errors.username,
            });
            return;
          }

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
      <Grid
        container
        style={{ minHeight: "100vh" }}
        sx={{ pl: { sm: 20, xs: 0 }, pr: { sm: 20, xs: 0 } }}
      >
        <Grid item xs={12} sm={6}>
          <Player
            src="https://assets10.lottiefiles.com/packages/lf20_xd9ypluc.json"
            mode="bounce"
            background="transparent"
            speed="1"
            style={{
              width: "100%",
              filter: "opacity(0.9)",
              zIndex: -1,
              paddingTop: "80px",
            }}
            loop
            autoplay
          />
        </Grid>
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
              margin: 0,
            }}
          >
            <TextField
              id="name"
              name="name"
              variant="standard"
              label="Name"
              margin="normal"
              helperText={errorData.name !== "" ? errorData.name : ""}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <Create />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              id="lastName"
              name="lastName"
              variant="standard"
              label="Last name"
              margin="normal"
              required
              helperText={errorData.lastName !== "" ? errorData.lastName : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <AccountCircle />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              id="userName"
              name="userName"
              variant="standard"
              label="Username"
              margin="normal"
              required
              helperText={errorData.userName !== "" ? errorData.userName : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <AccountCircle />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              id="email"
              name="email"
              variant="standard"
              label="Email"
              margin="normal"
              required
              helperText={errorData.email !== "" ? errorData.email : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <EmailSharp />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              id="password"
              name="password"
              variant="standard"
              type="password"
              label="Password"
              margin="normal"
              required
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
            <div style={{ height: 20 }} />
            <Button variant="contained" onClick={handleSubmit}>
              Sign Up
            </Button>
            <div style={{ height: 30 }} className="Buttons" />
            <div className="divSignUp">
              <Text
                text="Have an account?"
                underline
                link="signin"
                fontSize={16}
              />
            </div>
          </div>
          <div style={{ height: 40 }} />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
