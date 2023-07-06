import Box from "@mui/material/Box";
import React from "react";

import Product from "./Product";
import ToolProduct from "./ToolProduct";

export default function Main(props) {
  const { plants, tools, onAddPlant, onAddTool, onRemovePlant, onRemoveTool } =
    props;
  return (
    <Box align="left">
      <div>
        {plants.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddPlant={onAddPlant}
            onRemovePlant={onRemovePlant}
          />
        ))}
      </div>
      <div>
        {tools.map((product) => (
          <ToolProduct
            key={product.id}
            product={product}
            onAddTool={onAddTool}
            onRemoveTool={onRemoveTool}
          />
        ))}
      </div>
    </Box>
  );
}
