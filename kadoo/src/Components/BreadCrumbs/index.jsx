import {
  Breadcrumbs as MUIBreadcrumbs,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MainBreadcrumbs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(Boolean);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathnames.length ? (
        <Button
          onClick={() => navigate("/")}
          sx={{
            textDecoration: "none",
            fontFamily: "Comic Neue,sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          Home
        </Button>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography sx={{ color: "rgb(255, 255, 255)" }} key={name}>
            {name}
          </Typography>
        ) : (
          <Button
            sx={{
              textDecoration: "none",
              fontFamily: "Comic Neue,sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              lineHeight: 1.5,
              color: "rgba(255, 255, 255, 0.7)",
            }}
            key={name}
            onClick={() => navigate(routeTo)}
          >
            {name}
          </Button>
        );
      })}
    </MUIBreadcrumbs>
  );
}
