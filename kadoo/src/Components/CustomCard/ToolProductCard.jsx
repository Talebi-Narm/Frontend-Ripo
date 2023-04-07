import * as React from 'react'
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'


const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 500,
      margin: "auto",
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

const CustomToolCard = (props) => {
    const classes = useStyles();

  return (
    <Card className= {classes.card} sx={{ mb: 2, p: 2 }}>
      <Grid container sx={{ display: 'flex' }}>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          justifyContent='center'
          alignItems='center'
        >
          <Grid sx={{ p: 1 }}>
            <CardMedia>
              <img
                src={props.toolProduct.image}
              />
            </CardMedia>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CardContent align='Left'>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid item md={12}>
                <Box
                  xs={12}
                  sx={{
                    flex: 1,
                    display: {
                      md: 'flex',
                      sm: 'inline',
                      xs: 'inline',
                    },
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: {
                        md: 'left',
                        xs: 'center',
                      },
                    }}
                  >
                    <Typography component='div' variant='h5' sx={{ flex: 1 }}>
                      {props.toolProduct.name.trim()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: {
                        md: 'flex',
                        sm: 'inline',
                        xs: 'inline',
                      },
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconButton
                      size='large'
                      aria-label='show 4 new mails'
                      color='inherit'
                      sx={{
                        color: 'error.main',
                        mt: {
                          md: 0,
                          xs: 1,
                        },
                        mb: {
                          md: 0,
                          xs: 1,
                        },
                      }}
                      onClick={() => props.onRemoveTool(props.toolProduct)}
                    >
                      {props.toolProduct.count === 1 ? <DeleteIcon /> : <RemoveIcon />}
                    </IconButton>
                    <TextField
                      id='outlined-number'
                      size='small'
                      sx={{
                        width: 50,
                        mt: {
                          md: 0,
                          xs: 2,
                        },
                        mb: {
                          md: 0,
                          xs: 2,
                        },
                      }}
                      value={props.toolProduct.count < 100 ? props.toolProduct.count : 100}
                      inputProps={{
                        style: { textAlign: 'center' },
                        maxLength: 2,
                      }}
                    />
                    <IconButton
                      size='large'
                      color='inherit'
                      sx={{
                        color: 'success.main',
                        mt: {
                          md: 0,
                          xs: 1,
                        },
                        mb: {
                          md: 0,
                          xs: 1,
                        },
                      }}
                      onClick={() => {
                        if (props.toolProduct.count < 100) {
                          props.onAddTool(props.toolProduct)
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 1.5, mb: 1.5 }}></Divider>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid item justifyContent='space-between' md={12}>
                <Box
                  xs={12}
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Typography
                    component='div'
                    sx={{ flex: 1, mt: 1 }}
                    overflow='hidden'
                    whiteSpace='pre-line'
                    textOverflow='ellipsis'
                  >
                    {props.toolProduct.description.split('\n')[0] + '..'}
                  </Typography>
                </Box>
                <Grid
                  container
                  direction='row'
                  sx={{
                    justifyContent: {
                      sm: 'flex-end',
                      xs: 'center',
                    },
                    mt: 1,
                  }}
                >
                  <Chip
                    label={props.toolProduct.price + '$'}
                    color='success'
                    variant='outlined'
                    style={{ fontSize: '1.1rem' }}
                    sx={{
                      pt: 0.5,
                      pb: 0.5,
                      pr: 1.5,
                      pl: 1.5,
                      mr: {
                        sm: 3,
                        xs: 0,
                      },
                      mt: {
                        sm: 0.5,
                        xs: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Box sx={{ display: 'flex' }}></Box>
        </Grid>
      </Grid>
    </Card>
  )
}
export default CustomToolCard;
