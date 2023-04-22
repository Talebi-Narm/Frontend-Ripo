import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "../../Components/AppBar";

function NotFound() {
  return (
    <div className="App">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <AppBar
          SearchOption
          TicketOption={false}
          CartOption={false}
          AuthorizationOption
          DrawerOption={false}
        />
        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          height="400px"
          sx={{ pt: 5, pr: 10, pl: 10 }}
        >
          <img
            src="404.png"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="Background"
          />
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          direction="row"
          sx={{ mt: 3 }}
        >
          <Grid item justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ flex: 1 }}>
              The page you{`'`}re looking for can{`'`}t be found!
            </Typography>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Link to="/Homepage/">
              <Button variant="contained" sx={{ mt: 1.5 }}>
                Go to home Page
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFound;
