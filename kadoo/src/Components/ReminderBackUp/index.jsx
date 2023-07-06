/* eslint-disable no-console */
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import StaticTimePicker from "@mui/lab/StaticTimePicker";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";

import showToast from "../Toast";

const steps = ["Information", "Date", "Time"];

export default function Reminder() {
  const xsScreen = useMediaQuery("(min-width: 900px)");

  const [value, setValue] = React.useState([null, null]);
  const [clockValue, setClockValue] = React.useState(new Date());
  const [freq, setFreq] = React.useState("DAILY");
  const [count, setCount] = React.useState(1);
  const [summaryText, setSummeryText] = React.useState("");
  const [des, setDes] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [finish, setFinish] = React.useState(false);

  const handleChange = (event) => {
    setFreq(event.target.value);
  };

  const handleChangeAdd = () => {
    if (count < 7) {
      setCount(count + 1);
    }
  };

  const handleChangeReduce = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleChangeSummary = (e) => {
    setSummeryText(e.target.value.trim());
  };

  const handleChangeDes = (e) => {
    setDes(e.target.value.trim());
  };

  const isStepOptional = () => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function SetReminder() {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: summaryText,
        location: "800 Howard St., San Francisco, CA 94103",
        description: des,
        start: {
          dateTime: startDate,
        },
        end: {
          dateTime: endDate,
        },
        recurrence: [`RRULE:FREQ=${freq};COUNT=${count}`],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      }),
    };
    setTimeout(async () => {
      fetch("http://127.0.0.1:8000/api/reminder/", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            .includes("application/json");
          const data = isJson ? await response.json() : null;
          if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
          }
          return data;
        })
        .catch((error) => {
          if (error === 401) {
            showToast("You should login first!", "error");
          }
          console.error("There was an error!", error);
        });
    }, 0);
  }

  useEffect(() => {
    if (finish && startDate !== null && endDate !== null) {
      SetReminder();
    }
  }, [startDate, endDate, finish]);

  const consoleData = () => {
    if (summaryText === "") {
      showToast("Set an event summary!", "error");
    } else if (value[0] === null || value[1] === null) {
      showToast("Choose a date range!", "error");
    } else {
      setStartDate(
        `${
          `${value[0].toISOString().split("T")[0]}T${
            clockValue.toISOString().split("T")[1]
          }`.split(".")[0]
        }-07:00`
      );
      setEndDate(
        `${
          `${value[1].toISOString().split("T")[0]}T${
            clockValue.toISOString().split("T")[1]
          }`.split(".")[0]
        }-07:00`
      );
      setFinish(true);
    }
  };

  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          pl: { xs: 2, sm: 5 },
          pr: { xs: 2, sm: 5 },
          pt: 3,
        }}
      >
        <Box>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ pl: { xs: 2, sm: 10 }, pr: { xs: 2, sm: 10 } }}
              >
                {activeStep === 0 && (
                  <Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1 },
                        width: "100%",
                        pr: 5,
                        pl: 5,
                        pt: 3,
                        pb: 3,
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Summary"
                          sx={{ width: "100%" }}
                          value={summaryText}
                          onChange={handleChangeSummary}
                        />
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <TextField
                          id="outlined-textarea"
                          label="Description"
                          placeholder="Remember to ..."
                          multiline
                          value={des}
                          sx={{ width: "100%" }}
                          onChange={handleChangeDes}
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        sx={{ width: "100%" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Frequency
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={freq}
                            onChange={handleChange}
                            autoWidth
                            label="Frequency"
                          >
                            <MenuItem value="DAILY">Daily</MenuItem>
                            <MenuItem value="WEEKLY">Weekly</MenuItem>
                          </Select>
                        </FormControl>
                        <Box
                          sx={{
                            display: {
                              md: "flex",
                              sm: "inline",
                              xs: "inline",
                            },
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                            sx={{
                              color: "error.main",
                              mt: {
                                md: 0,
                                xs: 1,
                              },
                              mb: {
                                md: 0,
                                xs: 1,
                              },
                            }}
                            onClick={handleChangeReduce}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            id="outlined-number"
                            size="small"
                            sx={{
                              width: 50,
                              mt: {
                                md: 0,
                                xs: 2,
                              },
                              mb: {
                                md: 0,
                                xs: 2,
                              },
                            }}
                            value={count}
                            inputProps={{
                              style: { textAlign: "center" },
                              maxLength: 2,
                            }}
                          />
                          <IconButton
                            size="large"
                            color="inherit"
                            sx={{
                              color: "success.main",
                              mt: {
                                md: 0,
                                xs: 1,
                              },
                              mb: {
                                md: 0,
                                xs: 1,
                              },
                            }}
                            onClick={handleChangeAdd}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {activeStep === 1 && (
                  <Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDateRangePicker
                          format="yyyy-MM-dd HH:mm:ss"
                          displayStaticWrapperAs={
                            xsScreen ? "desktop" : "mobile"
                          }
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          sx={{ width: "100%" }}
                          renderInput={(startProps, endProps) => (
                            <>
                              <TextField {...startProps} />
                              <Box sx={{ mx: 2 }}> to </Box>
                              <TextField {...endProps} />
                            </>
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                )}
                {activeStep === 2 && (
                  <Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticTimePicker
                          displayStaticWrapperAs="mobile"
                          value={clockValue}
                          onChange={(newValue) => {
                            setClockValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                )}
                {activeStep === 3 && <Grid />}
              </Grid>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button
                    variant="contained"
                    container
                    item
                    justifyContent="flex-end"
                    sx={{ p: 1, Color: "#12824C" }}
                    className="ProductPageTitle"
                    onClick={consoleData}
                  >
                    Set Event Calendar
                  </Button>
                )}
                {activeStep !== steps.length - 1 && (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
