import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import ProductIcon2 from '../productIcon/productIcon2'
import PlantsCart from '../ProductsCart/PlantsCart'


function ShowPlantsOneRow(props) {
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          spacing={2}
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          {props.data.slice(0, 3).map((p) => (
            <Grid item xs={12}>
              <PlantsCart product={p} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}
        >
          {props.data.slice(0, 2).map((p) => (
            <Grid item xs={6}>
              <PlantsCart product={p} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          direction='row'
          spacing={2}
          sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
        >
          {props.data.slice(0, 3).map((p) => (
            <Grid item xs={4}>
               <PlantsCart key={p.id} product={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ShowPlantsOneRow
