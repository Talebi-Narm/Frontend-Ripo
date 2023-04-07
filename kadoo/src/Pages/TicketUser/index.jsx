import React, { useEffect } from 'react'
import './style.scss'
import AppBar from '../../Components/AppBar'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CachedIcon from '@mui/icons-material/Cached'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Rate from '../../Components/Rate'

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export default function TicketUser() {
  const [InProgress, setInProgress] = React.useState([])
  const [Accepted, setAccepted] = React.useState([])
  const [Done, setDone] = React.useState([])

  const InProgressTickets = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch(
      'http://127.0.0.1:8000/api/ticket/member-inprogress-tickets/',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setInProgress(data)
      })
  }

  const AcceptedTickets = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch(
      'http://127.0.0.1:8000/api/ticket/member-accepted-tickets/',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAccepted(data)
      })
  }

  const DoneTickets = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch(
      'http://127.0.0.1:8000/api/ticket/member-done-tickets/',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setDone(data)
      })
  }

  useEffect(() => {
    InProgressTickets()
    AcceptedTickets()
    DoneTickets()
  }, [])

  return (
    <div>
      <AppBar
        SearchOption={false}
        TicketOption={false}
        CartOption={false}
        AuthorizationOption={true}
        DrawerOption={true}
        AddTicketOption={true}
      />
      <Grid display='flex' flex-flexDirection='row'>
        <Card
          xs='12'
          sm='6'
          md='4'
          sx={{
            width: { xs: '100%', sm: '100%', md: '30%' },
            mt: { xs: 10, sm: 5 },
            mb: { xs: 3, sm: 5 },
            ml: { xs: 3, sm: 10 },
            mr: { xs: 3, sm: 3 },
            pl: { xs: 1, sm: 2, md: 5 },
            pr: { xs: 1, sm: 2, md: 5 },
            pt: 2,
            pb: 2,
          }}
        >
          <Grid
            container
            direction='row'
            justifyContent='left'
            alignItems='flex-start'
          >
            <Grid container sx={{ width: '100%' }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant='h4' gutterBottom component='div'>
                  InProgress
                </Typography>
                <Demo>
                  <List>
                    {InProgress.map((T) => (
                      <Grid container>
                        <ListItem>
                          <ListItemIcon>
                            <CachedIcon />
                          </ListItemIcon>
                          <ListItemText primary={T.body} />
                        </ListItem>
                        <Divider sx={{ width: '100%' }} />
                      </Grid>
                    ))}
                  </List>
                </Demo>
              </Box>
              {InProgress.length === '0' && (
                <Alert
                  sx={{ mt: 3 ,width: '100%' }}
                  severity='info'
                  color='warning'
                >
                  No Tickets Yet
                </Alert>
              )}
            </Grid>
          </Grid>
        </Card>

        <Card
          xs='12'
          sm='6'
          md='4'
          sx={{
            width: { xs: '100%', sm: '50%', md: '30%' },
            mt: { xs: 10, sm: 5 },
            mb: { xs: 3, sm: 5 },
            ml: { xs: 3, sm: 3 },
            mr: { xs: 3, sm: 3 },
            pl: { xs: 1, sm: 2, md: 5 },
            pr: { xs: 1, sm: 2, md: 5 },
            pt: 2,
            pb: 2,
          }}
        >
          <Grid
            container
            direction='row'
            justifyContent='left'
            alignItems='flex-start'
          >
            <Grid container sx={{ width: '100%' }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant='h4' gutterBottom component='div'>
                  Accepted
                </Typography>
                {Accepted.length !== '0' && (
                  <Demo>
                    <List>
                      {Accepted.map((T) => (
                        <Grid container>
                          <ListItem>
                            <ListItemIcon>
                              <PublishedWithChangesIcon />
                            </ListItemIcon>
                            <ListItemText primary={T.body} />
                          </ListItem>
                          <Divider sx={{ width: '100%' }} />
                        </Grid>
                      ))}
                    </List>
                  </Demo>
                )}
              </Box>
              {Accepted.length === '0' && (
                <Alert
                  sx={{ mt: 3 ,width: '100%'}}
                  severity='info'
                  color='warning'
                >
                  No Tickets Yet
                </Alert>
              )}
            </Grid>
          </Grid>
        </Card>

        <Card
          xs='12'
          sm='6'
          md='4'
          sx={{
            width: { xs: '100%', sm: '50%', md: '30%' },
            mt: { xs: 10, sm: 5 },
            mb: { xs: 3, sm: 5 },
            ml: { xs: 3, sm: 3 },
            mr: { xs: 3, sm: 10 },
            pl: { xs: 1, sm: 2, md: 5 },
            pr: { xs: 1, sm: 2, md: 5 },
            pt: 2,
            pb: 2,
          }}
        >
          <Grid
            container
            direction='row'
            justifyContent='left'
            alignItems='flex-start'
          >
            <Grid container sx={{ width: '100%' }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant='h4' gutterBottom component='div'>
                  Done
                </Typography>
                {Done.length !== '0' && (
                  <Demo>
                    <List>
                      {Done.map((T) => (
                        <Grid container>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={<Rate rate={T.rate} id={T.id} />}
                              secondary={T.body}
                            />
                          </ListItem>
                          <Divider sx={{ width: '100%' }} />
                        </Grid>
                      ))}
                    </List>
                  </Demo>
                )}
              </Box>
              {Done.length === '0' && (
                <Alert
                  sx={{ mt: 3 ,width: '100%' }}
                  severity='info'
                  color='warning'
                >
                  No Tickets Yet
                </Alert>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  )
}
