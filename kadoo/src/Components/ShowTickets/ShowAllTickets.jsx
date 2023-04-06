import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TicketCard from '../TicketCard'

function ShowAllTickets(props) {
  return (
    <Grid container sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom component='div'>
          All Tickets
        </Typography>
        <Grid container item rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {props.data.map((T) => (
            <Grid item xs={12} sm={6} md={4}>
              <TicketCard ticket={T} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  )
}

export default ShowAllTickets
