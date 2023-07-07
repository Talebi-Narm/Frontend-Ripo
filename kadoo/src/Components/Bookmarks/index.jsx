import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../Utils/axios";
import PlantsCart from "../ProductsCart/PlantsCart";
import ToolsCart from "../ProductsCart/ToolsCart";

export default function BookmarksProducts() {
  const [plantBookmarks, setPlantBookmarks] = useState(null);
  const [toolBookmarks, setToolBookmarks] = useState(null);

  const fetchBookMarksPlants = async () => {
    try {
      const response = await axiosInstance.get(`v1/common/plant-bookmarks/`);
      console.log("bookmarks Info: ", response);

      const plantIds = response.data.results.map((bookmark) => bookmark.Plant);
      const plantDetailsPromises = plantIds.map((plantId) =>
        axiosInstance.get(`v1/store/admin/plants/${plantId}`)
      );

      const plantDetailsResponses = await Promise.all(plantDetailsPromises);
      const plantDetails = plantDetailsResponses.map((resp, i) => ({
        id: response.data.results[i].id,
        plant: resp.data,
      }));
      console.log(plantDetails);
      setPlantBookmarks(plantDetails);
    } catch (error) {
      console.error("Error User Info:", error);
    }
  };

  const fetchBookMarksTools = async () => {
    try {
      const response = await axiosInstance.get(`v1/common/tool-bookmarks/`);
      console.log("bookmarks Info tool: ", response);
      // Assuming `results` contains the array of tool bookmarks

      const toolIds = response.data.results.map((bookmark) => bookmark.Tool);
      const toolDetailsPromises = toolIds.map((toolId) =>
        axiosInstance.get(`v1/store/admin/tools/${toolId}`)
      );

      const toolDetailsResponses = await Promise.all(toolDetailsPromises);
      const toolDetails = toolDetailsResponses.map((resp, i) => ({
        id: response.data.results[i].id,
        tool: resp.data,
      }));
      console.log(toolDetails);
      setToolBookmarks(toolDetails);
      // Now you have the details of each plant bookmarked in `plantDetails`
    } catch (error) {
      console.error("Error User Info:", error);
    }
  };

  useEffect(() => {
    fetchBookMarksPlants();
    fetchBookMarksTools();
  }, []);

  return (
    <Grid sx={{ mt: 3 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {plantBookmarks &&
          plantBookmarks.map((p) => (
            <Grid item xs={12} sm={12} md={6}>
              <PlantsCart
                product={p.plant}
                fetchBookMarksPlants={fetchBookMarksPlants}
                bookmarkId={p.id}
              />
            </Grid>
          ))}
        {toolBookmarks &&
          toolBookmarks.map((p) => (
            <Grid item xs={12} sm={12} md={6}>
              <ToolsCart
                product={p.tool}
                fetchBookMarksTools={fetchBookMarksTools}
                bookmarkId={p.id}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
