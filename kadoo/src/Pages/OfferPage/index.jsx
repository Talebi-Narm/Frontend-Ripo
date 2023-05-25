import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

import OfferCard from "../../Components/CustomCard/OfferCard";
import axiosInstance from "../../Utils/axios";

export default function OfferPage() {
  const [coupons, setCoupons] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  React.useEffect(() => {
    axiosInstance.get(`/v1/order/coupons`).then((res) => {
      const couponsInRes = res.data;
      setCoupons(couponsInRes);
    });
  }, []);
  return (
    <>
      {coupons.length !== 0 && (
        <>
          <Timeline position="alternate">
            {coupons.map((x, i) => (
              <TimelineItem id={x.id} onClick={() => handleCopy(x.code)}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ textAlign: "left !important" }}>
                  <OfferCard
                    index={i}
                    description={x.title}
                    endDate={new Date(x.end_date).toISOString().split("T")[0]}
                    startDate={
                      new Date(x.start_date).toISOString().split("T")[0]
                    }
                    discount={x.discount}
                    code={x.code}
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Code copied to clipboard.
            </Alert>
          </Snackbar>
        </>
      )}
      {coupons.length === 0 && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
