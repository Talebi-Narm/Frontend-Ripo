import React from 'react'
import Product from './Product'
import ToolProduct from './ToolProduct'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

export default function Main(props) {
  const { plants, tools, onAddPlant, onAddTool, onRemovePlant, onRemoveTool } =
    props
  return (
    <Box align='left'>
      <div>
        {plants.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddPlant={onAddPlant}
            onRemovePlant={onRemovePlant}
          ></Product>
        ))}
      </div>
      <div>
        {tools.map((product) => (
          <ToolProduct
            key={product.id}
            product={product}
            onAddTool={onAddTool}
            onRemoveTool={onRemoveTool}
          ></ToolProduct>
        ))}
      </div>
    </Box>
  )
}
