import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import ProductIcon2 from '../productIcon/productIcon2'

function ContentHeader(props) {
  const containerRef = React.useRef(null)
  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={{ pt: 15, pb: 15, pl: 2, pr: 2 }}
        ref={containerRef}
      >
        <Grid item>
          <Slide
            direction='right'
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={700}
          >
            <Typography
              variant='h3'
              gutterBottom
              component='div'
              align='center'
              noWra
            >
              What do you need ...?
            </Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide
            direction='right'
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={900}
          >
            <Typography
              variant='h5'
              gutterBottom
              component='div'
              sx={{ mt: 1 }}
              align='center'
            >
              For every need there is a solution ... Find yours easly in our
              categorized products
            </Typography>
          </Slide>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContentHeader
