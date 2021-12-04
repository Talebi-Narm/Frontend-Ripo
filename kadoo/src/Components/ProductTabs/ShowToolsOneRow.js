import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import ProductIcon1 from '../productIcon/productIcon1'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

function ShowToolsOneRow(props) {
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
              <Item className='showProductsIcons'>
                <ProductIcon1 key={p.id} product={p} />
              </Item>
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
              <Item className='showProductsIcons'>
                <ProductIcon1 key={p.id} product={p} />
              </Item>
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
              <Item className='showProductsIcons'>
                <ProductIcon1 key={p.id} product={p} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ShowToolsOneRow
