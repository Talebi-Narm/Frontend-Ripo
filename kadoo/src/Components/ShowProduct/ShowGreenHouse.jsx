import React, { useEffect, useState } from 'react'
import './ShowProduct.scss'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import PlantsCart from '../ProductsCart/PlantsCart'
import ToolsCart from '../ProductsCart/ToolsCart'
import GreenHouseCard from '../ProductsCart/GreenHouseCard'

function ShowGreenHouse(props) {
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom component='div'>
          My Plants
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mt: 2 }}
        >
          {props.data.map((p) => (
            <Grid item xs={12} sm={6} md={4}>
              <GreenHouseCard
                data={p}
                reloadFunc={props.reloadFunc}
                OpenDialog={props.OpenDialog}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ShowGreenHouse
