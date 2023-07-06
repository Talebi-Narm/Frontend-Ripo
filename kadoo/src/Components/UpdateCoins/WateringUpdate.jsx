import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";

import ShowCoins from "../ShowCoins";

export default function WateringUpdate() {
  const [watering, setWatering] = useState(false);
  const [handle, setHandle] = useState(false);
  const [load, setLoad] = useState(false);
  const [coins, setCoinsNumber] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    reload();
  }, [load]);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    };
    fetch("http://127.0.0.1:8000/api/coin/new-watering/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setWatering(!watering);
        console.log(data);
      });
  }, [handle]);

  useEffect(() => {
    if (watering) {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      };
      fetch(
        "http://127.0.0.1:8000/api/coin/daily-watering-update/",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setText(data);
          setLoad(!load);
        });
    }
  }, [watering]);

  const handleClick = () => {
    setHandle(!handle);
  };

  return (
    <div style={{ backgroundColor: "darkblue" }}>
      <Button
        variant="contained"
        onClick={() => {
          handleClick();
          handleClickOpen();
        }}
      >
        TEST
      </Button>
      <ShowCoins coins={coins} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Notification</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
