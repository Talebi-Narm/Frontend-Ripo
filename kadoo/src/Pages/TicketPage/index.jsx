import React, { useEffect, useState } from 'react'
import AppBar from '../../Components/AppBar'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ShowAllTickets from '../../Components/ShowTickets/ShowAllTickets'
import ShowMyTickets from '../../Components/ShowTickets/ShowMyTickets'
import Alert from '@mui/material/Alert'

export default function TicketPage() {
  const [ticketsData, setTicketsData] = React.useState([])
  const [myTicketsData, setMyTicketsData] = React.useState([])

  const allTickets = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch(
      'http://127.0.0.1:8000/api/ticket/inprogress-tickets/',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setTicketsData(data)
      })
  }

  const myTickets = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch(
      'http://127.0.0.1:8000/api/ticket/specialist-accepted-tickets/',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setMyTicketsData(data)
      })
  }

  useEffect(() => {
    allTickets()
    myTickets()
  }, [])

  useEffect(() => {
  }, [myTicketsData])

  return (
    <div>
      <AppBar
        SearchOption={false}
        TicketOption={false}
        CartOption={false}
        AuthorizationOption={true}
        DrawerOption={true}
      />
      <Card
        style={{ backgroundColor: '#f5f4f4' }}
        sx={{
          mt: { xs: 3, sm: 5 },
          mb: { xs: 3, sm: 5 },
          ml: { xs: 3, sm: 20 },
          mr: { xs: 3, sm: 20 },
          pl: { xs: 1, sm: 2, md: 5 },
          pr: { xs: 1, sm: 2, md: 5 },
          pt: 2,
          pb: 2,
        }}
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Grid container item>
            <ShowMyTickets data={myTicketsData} />
            {myTicketsData.length == '0' && (
              <Alert sx={{ mt: 3 }} severity='info' color='warning'>
                No Tickets Yet
              </Alert>
            )}
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{ backgroundColor: '#f5f4f4' }}
        sx={{
          mt: { xs: 3, sm: 5 },
          mb: { xs: 3, sm: 5 },
          ml: { xs: 3, sm: 20 },
          mr: { xs: 3, sm: 20 },
          pl: { xs: 1, sm: 2, md: 5 },
          pr: { xs: 1, sm: 2, md: 5 },
          pt: 2,
          pb: 2,
        }}
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Grid container item>
            <ShowAllTickets data={ticketsData} />
            {ticketsData.length == '0' && (
              <Alert sx={{ mt: 3 }} severity='info' color='warning'>
                No Tickets Yet
              </Alert>
            )}
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
