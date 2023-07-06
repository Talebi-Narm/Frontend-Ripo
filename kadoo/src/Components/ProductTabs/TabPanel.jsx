import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import "./TabPanel.scss";

import ShowPlantsOneRow from "./ShowPlantsOneRow";
import ShowToolsOneRow from "./ShowToolsOneRow";

const BgAnimation = styled(Card)`
  ${({ theme }) => `
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.Long,
  })};
  `}
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [bgColor, setBgColor] = React.useState("#e1fde6");

  const [plantsData, setPlnatsData] = useState([]);
  const [toolsData, setToolsData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("http://127.0.0.1:8000/api/plants/");
      const data = await res.json();
      setPlnatsData(data);
      // setPlnatsDataLoaded(true);
    }, 0);

    setTimeout(async () => {
      const res = await fetch("http://127.0.0.1:8000/api/tools/");
      const data = await res.json();
      setToolsData(data);
      // setToolsDataLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    setBgColor(value === 0 ? "#e1fde6" : "#fcf6d7");
  }, [value]);

  return (
    <BgAnimation
      style={{ backgroundColor: bgColor }}
      sx={{
        boxShadow: 3,
        mt: { xs: 3, sm: 5 },
        mr: { xs: 3, sm: 5 },
        ml: { xs: 3, sm: 5 },
        mb: 2,
        pl: { xs: 2, sm: 2, md: 3.25 },
        pr: { xs: 2, sm: 2, md: 3.25 },
        pt: 2,
        pb: 2,
      }}
    >
      <Typography variant="h4" sx={{ mt: 0 }}>
        Explore our New products
      </Typography>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Plants" {...a11yProps(0)} />
            <Tab label="Tools" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ShowPlantsOneRow data={plantsData} />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid item>
              <Button
                variant="outlined"
                href="/search"
                endIcon={<ChevronRightIcon />}
              >
                See more
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowToolsOneRow data={toolsData} />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid item>
              <Button
                variant="outlined"
                href="/search"
                endIcon={<ChevronRightIcon />}
              >
                See more
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </BgAnimation>
  );
}
