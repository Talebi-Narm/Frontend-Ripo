import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React from "react";

import "./OfferCard.scss";

function OfferCard({ description, endDate, startDate, discount, code, index }) {
  const colors = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#ecf0f1",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d",
  ];

  return (
    <div className="cardWrap">
      <div
        className="card cardLeft"
        style={{
          background: `linear-gradient(to bottom, ${colors[index]} 0%, ${colors[index]} 26%, #343434 26%, #343434 100%)`,
          boxShadow: `5px 5px 10px ${colors[index]}60`,
        }}
      >
        <h1>{code}</h1>
        <div className="title">
          <span>about</span>
          <h2>{description}</h2>
        </div>
        <div className="seat">
          <h2>{endDate}</h2>
          <span>end date</span>
        </div>
        <div className="time">
          <h2>{startDate}</h2>
          <span>start date</span>
        </div>
      </div>
      <div
        className="card cardRight"
        style={{
          background: `linear-gradient(to bottom, ${colors[index]} 0%, ${colors[index]} 26%, #343434 26%, #343434 100%)`,
          boxShadow: `5px 5px 10px ${colors[index]}60`,
        }}
      >
        <AttachMoneyIcon
          className="eye"
          fontSize="large"
          sx={{ color: "white" }}
        />
        <div className="number">
          <h3>{discount}</h3>
          <span>off</span>
        </div>
        <div className="barcode" />
      </div>
    </div>
  );
}

export default OfferCard;
