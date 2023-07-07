// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from "@lottiefiles/react-lottie-player";
import { EmailRounded, VpnKey } from "@mui/icons-material";
import { Grid, TextField, InputAdornment, Box, Button } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
// import MuiAlert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
import { gapi } from "gapi-script";
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";

// import Background from "../../assets/Images/SignIn/signInBG.png";
// import { CustomButton } from "../../Components/CustomButton/Button";
import Text from "../../Components/Text";

import "./style.scss";
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { GoogleLogin } from "react-google-login";
import showToast from "../../Components/Toast";
import { baseURL } from "../../Utils/axios";

function SignIn() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        // eslint-disable-next-line no-use-before-define
        clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [flagData, setFlagData] = useState(false);
  const [errorData, updateErrorData] = useState(initialFormData);
  const [refresh, setRefresh] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");

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
  // eslint-disable-next-line react/no-unstable-nested-components
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  const postLoginGoogle = () => {
    fetch("http://localhost:8000/api/v1/user/google-login", {
      // fetch("https://service.talebi-narm.ir/api/v1/user/google-login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: '{\n  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NzBiMDg1YmY2NDliNzI2YjM1NzQ3NjQwMzBlMWJkZTlhMTBhZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzY2MzUzOTc1MzI3LWhkMHJrNnBodDRmdWxsNXByZWFwZWU1Z2FpbmJoN3BiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzY2MzUzOTc1MzI3LWhkMHJrNnBodDRmdWxsNXByZWFwZWU1Z2FpbmJoN3BiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1MzM2Nzc4NzEwODc5MDI5NTUxIiwiZW1haWwiOiJubWFzaGF5ZWtoaTMwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicUpIYmFVeF9YVnI3clRPZHV4YldCUSIsIm5hbWUiOiJuYXJnZXMgbWFzaGF5ZWtoaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhSldPSG9VeDIxeEJzSVF0c2dFZ1V1NkItMFdydzNLazZJQlREQzl3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Im5hcmdlcyIsImZhbWlseV9uYW1lIjoibWFzaGF5ZWtoaSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjgzMjA5NTkzLCJleHAiOjE2ODMyMTMxOTMsImp0aSI6ImI5NmJiMWUzZjc2YzkxNzA2ZDU1OWY2MmU3NzcwMTI0ZmVjMTNiYjQifQ.CH4_C5mk0_J_Snc50YQi5XyQXmuJm76DsslP-vMzotuoIrotp-nIij3xaFSHpfVSnUfOBTHJ2XtfmA_rOgkFRB4w9tn9pxJqCLhqMQb0j_3NZr8U_U6dGTCEAYXZ3HMTLgnvjLKwOxRB7ykWdn6EaZg6z4Erq-crjav_dH0p8B10fFnLx9NG-3MVVJ7uiPs86BbTbonw4DJOXVAaZ58r3iyfZOQG0LUBLg15yBEpENagFtsQ-2yfKyGX7DhA28OaYzaHM9vyLLtkMALWecXxSrlbBtohKwtaey0DGqfQTHoxWP994N3NvxwbGeUY-1o3c-ThqC9vKSrL9JDeehongQ",\n  "email": "nmashayekhsi30@gmail.com",\n  "first_name": "narges",\n  "last_name": "mashayekhi"\n}',
      body: JSON.stringify({
        id_token: token,
        email,
        first_name: name,
        last_name: lastName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            setFlagData(!flagData);
            showToast("User logined!", "success");
            setTimeout(() => {
              window.location.href = "/Homepage";
            }, 5000);
          });
        } else {
          throw response;
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          showToast("Something went wrong", "error");
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
  const clientId =
    "366353975327-hd0rk6pht4full5preapee5gainbh7pb.apps.googleusercontent.com";
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    console.log("Login Success: res:", res);
    setEmail(res.profileObj.email);
    setName(res.profileObj.givenName);
    setLastName(res.profileObj.familyName);
    setToken(res.tokenId);
    postLoginGoogle();
  };
  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (refresh) setRefresh(false);
    else setRefresh(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    };
    fetch(`${baseURL}v1/user/jwt/create/`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            showToast("User logined", "success");
            setTimeout(() => {
              window.location.href = "/Homepage";
            }, 5000);
            setFlagData(!flagData);
          });
        } else {
          throw response;
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          showToast("Your email or password is incorrect!", "error");
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
    <div className="signin-main">
      <Box
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        alt="Background"
      >
        <Grid
          container
          style={{ minHeight: "100vh" }}
          sx={{ pl: { sm: 20, xs: 0 }, pr: { sm: 20, xs: 0 } }}
        >
          <Grid item sx={{ width: "100%" }} xs={12} sm={6}>
            <Player
              src="https://assets1.lottiefiles.com/private_files/lf30_j4v2bg0q.json"
              mode="bounce"
              background="transparent"
              speed="1"
              style={{
                width: "100%",
                filter: "opacity(0.9)",
                zIndex: -1,
                // paddingTop: "20px",
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
                // color="black"
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
                sx={{ mb: 3 }}
              />
              <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                style={{ marginTop: "16px" }}
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
              <Button variant="contained" onClick={handleSubmit}>
                Sign In
              </Button>
              <div style={{ height: 10 }} />
              <div className="divSignUp">
                <Text
                  text="Creacte account now"
                  underline
                  link="signup"
                  fontSize={14}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} />
        </Grid>
      </Box>
    </div>
  );
}

export default SignIn;
