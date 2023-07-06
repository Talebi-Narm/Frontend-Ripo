import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

import TicketCard from "../TicketCard";

export default function ShowInProgress(props) {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom component="div">
          In Progress Tickets
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {props.data.map((T) => (
            <Grid item xs={12} sm={6} md={4}>
              <TicketCard ticket={T} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
