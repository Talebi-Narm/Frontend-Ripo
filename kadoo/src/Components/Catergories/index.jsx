import Box from "@mui/material/Box";
import "./style.scss";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const BoxItem = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Categorieslist(props) {
  const [plantSelectedId, setPlantSelectedId] = React.useState(0);
  const [toolSelectedId, setToolSelectedId] = React.useState(0);

  const [plantTagsData, setPlantTagsData] = useState([]);
  const [toolTagsData, setToolTagsData] = useState([]);

  const fetchPlantsPagination = (name) => {
    fetch("http://127.0.0.1:8000/api/plantsAdvanceSearch/", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: null,
        price: { lower: null, higher: null },
        tags: [`${name}`],
        pagination: { count: "6", page: "1" },
        sort: { kind: null, order: null },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.bindplants(data.data);
        props.setpageall(data.pageCount);
        props.settext(name);
        props.setgivenpage(1);
      });
  };
  const fetchToolsPagination = (name) => {
    fetch("http://127.0.0.1:8000/api/toolsAdvanceSearch/", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: null,
        price: { lower: null, higher: null },
        tags: [`${name}`],
        pagination: { count: "6", page: "1" },
        sort: { kind: null, order: null },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.bindtools(data.data);
        props.setpageall(data.pageCount);
        props.settext(name);
        props.setgivenpage(1);
      });
  };

  const handleReset = () => {
    props.bindall();
    if (props.hasClose) {
      props.CloseScroll();
    }
    setPlantSelectedId(0);
    setToolSelectedId(0);
    props.ChangeBg(0);
  };

  const handlePlantListItemClick = (event, Id, name) => {
    setToolSelectedId(0);
    setPlantSelectedId(Id);
    if (props.hasClose) {
      props.CloseScroll();
    }
    setTimeout(async () => {
      fetchPlantsPagination(name);
      props.ChangeBg(1);
    }, 0);
  };
  const handleToolListItemClick = (event, Id, name) => {
    setPlantSelectedId(0);
    setToolSelectedId(Id);
    if (props.hasClose) {
      props.CloseScroll();
    }
    setTimeout(async () => {
      fetchToolsPagination(name);
      props.ChangeBg(2);
    }, 0);
  };

  const handlePlantListItemClickAll = () => {
    setToolSelectedId(0);
    setPlantSelectedId(1);
    if (props.hasClose) {
      props.CloseScroll();
    }
    setTimeout(async () => {
      const res = await fetch(
        "http://127.0.0.1:8000/api/plantsAdvanceSearch/",
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: null,
            price: { lower: null, higher: null },
            pagination: { count: "6", page: "1" },
            sort: { kind: null, order: null },
          }),
        }
      );

      const data = await res.json();
      props.bindplants(data.data);
      props.setpageall(data.pageCount);
      props.settext("All plants");
      props.setgivenpage(1);
      props.ChangeBg(1);
    }, 0);
  };

  const handleToolListItemClickAll = () => {
    setPlantSelectedId(0);
    setToolSelectedId(1);
    if (props.hasClose) {
      props.CloseScroll();
    }
    setTimeout(async () => {
      const res = await fetch("http://127.0.0.1:8000/api/toolsAdvanceSearch/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: "6", page: "1" },
          sort: { kind: null, order: null },
        }),
      });

      const data = await res.json();
      props.bindtools(data.data);
      props.setpageall(data.pageCount);
      props.settext("All tools");
      props.setgivenpage(1);
      props.ChangeBg(2);
    }, 0);
  };

  useEffect(() => {
    async function fetchPlantTagsData() {
      await fetch("http://127.0.0.1:8000/api/plantsTags/")
        .then((response) => response.json())
        .then((data) => {
          setPlantTagsData(data);
        });
    }

    async function fetchToolTagsData() {
      await fetch("http://127.0.0.1:8000/api/toolsTags/")
        .then((response) => response.json())
        .then((data) => {
          setToolTagsData(data);
        });
    }

    fetchPlantTagsData();
    fetchToolTagsData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, m: 0 }}>
      <Grid container spacing={0} justifyContent="center" alignItems="flex-end">
        <Grid item xs={12} md={12} sx={{ mr: 2 }}>
          <BoxItem>
            <Box sx={{ width: "100%", mt: 0 }}>
              <List component="nav" className="NavOver">
                <ListItemButton
                  selected={plantSelectedId === 0 && toolSelectedId === 0}
                  onClick={handleReset}
                >
                  <ListItemText primary="All Products" />
                </ListItemButton>
              </List>
              <Typography
                variant="h6"
                align="left"
                sx={{ width: "100%", pl: 1, pb: 1, mt: 1, opacity: 0.5 }}
              >
                Plant Categories
              </Typography>
              <Divider />
              <List component="nav">
                <ListItemButton
                  selected={plantSelectedId === 1}
                  onClick={() => handlePlantListItemClickAll()}
                >
                  <ListItemText primary="Only plants" />
                </ListItemButton>
                {plantTagsData.map((item) => (
                  <ListItemButton
                    selected={plantSelectedId === item.id}
                    onClick={(event) =>
                      handlePlantListItemClick(event, item.id, item.name)
                    }
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
              <Typography
                variant="h6"
                align="left"
                sx={{
                  width: "100%",
                  flexShrink: 0,
                  pl: 1,
                  pb: 1,
                  mt: 1,
                  opacity: 0.5,
                }}
              >
                Tool Categories
              </Typography>
              <Divider />
              <List component="nav">
                <ListItemButton
                  selected={toolSelectedId === 1}
                  onClick={() => handleToolListItemClickAll()}
                >
                  <ListItemText primary="Only tools" />
                </ListItemButton>
                {toolTagsData.map((item) => (
                  <ListItemButton
                    selected={toolSelectedId === item.id}
                    onClick={(event) =>
                      handleToolListItemClick(event, item.id, item.name)
                    }
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </BoxItem>
        </Grid>
      </Grid>
    </Box>
  );
}
