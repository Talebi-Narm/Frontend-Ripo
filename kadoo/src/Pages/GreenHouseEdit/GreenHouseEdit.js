import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import AppBar from '../../Components/AppBar/AppBar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function GreenHouseEdit(props) {
  ///const containerRef = React.useRef(null)
  const [openDrawer, setOpenDrawer] = React.useState([false])
  const [plantData, setPlantData] = React.useState([])
  const [plantId, setPlantId] = React.useState([])
  const [plantDataLoaded, setPlantDataLoaded] = React.useState(false)
  const [value, setValue] = React.useState(0)

  return (
    <div>
      <AppBar
        SearchOption={true}
        TicketOption={true}
        CartOption={true}
        DrawerOption={false}
        AuthorizationOption={true}
      />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ pl: { xs: 2, sm: 10 }, pr: { xs: 2, sm: 10 } }}
      >
        <Grid
          container
          item
          justifyContent='center'
          sx={{ mt: { xs: 9, sm: 2, md: 3, lg: 5 } }}
          className='ProductPageProductContainer'
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            container
            justifyContent='center'
            alignItems='center'
            className='ProductPageImageContainer'
          >
            <Grid
              item
              container
              justifyContent='center'
              alignItems='center'
              sx={{ m: 2 }}
            >
              <Grid
                container
                item
                justifyContent='center'
                alignItems='center'
                direction='row'
              >
                <img
                  className='ProductPageImage'
                  alt={'alt'}
                  sx={{
                    width: { xs: '300px', sm: '400px' },
                    height: { xs: '300px', sm: '400px' },
                  }}
                ></img>
                <Grid
                  container
                  item
                  justifyContent='center'
                  sx={{ p: 0.5, Color: '#12824C' }}
                  className='ProductPageTitle'
                >
                  <Button variant='contained' className='productsPageAdd'>
                    Add Image
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ p: 2 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                className='ProductPageTitle'
                sx={{ m: 1 }}
              >
                <TextField fullWidth label='Name' id='Name' />
                <Divider sx={{ mt: 1 }} />
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                spacing={1}
                className='ProductPageText'
                sx={{ m: 1 }}
              >
                <div className='ProductPageText'>
                  <TextField
                    fullWidth
                    id='description'
                    label='Description'
                    multiline
                    maxRows={3}
                  />
                </div>
              </Grid>

              <Grid
                container
                item
                xs={12}
                className='ProductPageText'
                justifyContent='space-between'
                sx={{ m: 1, mt: 0 }}
              >
                <Grid item className='ProductPageText'>
                  <FormControl
                    fullWidth
                    sx={{ mt: 1, mb: 1, minWidth: '135px' }}
                  >
                    <InputLabel id='demo-simple-select-label'>Light</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Light'
                    >
                      <MenuItem value={'low'}>Low</MenuItem>
                      <MenuItem value={'medium'}>Medium</MenuItem>
                      <MenuItem value={'much'}>Much</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item className='ProductPageText'>
                  <FormControl
                    fullWidth
                    sx={{ mt: 1, mb: 1, minWidth: '135px' }}
                  >
                    <InputLabel id='demo-simple-select-label'>Water</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Light'
                    >
                      <MenuItem value={'low'}>Low</MenuItem>
                      <MenuItem value={'medium'}>Medium</MenuItem>
                      <MenuItem value={'much'}>Much</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item className='ProductPageText'>
                  <FormControl
                    fullWidth
                    sx={{ mt: 1, mb: 1, minWidth: '135px' }}
                  >
                    <InputLabel id='demo-simple-select-label'>
                      Growth
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Light'
                    >
                      <MenuItem value={'low'}>Low</MenuItem>
                      <MenuItem value={'medium'}>Medium</MenuItem>
                      <MenuItem value={'much'}>Much</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item className='ProductPageText'>
                <FormControl fullWidth sx={{ mt: 1, mb: 1, minWidth: '135px' }}>
                  <InputLabel
                    id='demo-simple-select-label'
                    sx={{ Width: '100px' }}
                  >
                    Location
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Light'
                  >
                    <MenuItem value={'Living room'}>Living room</MenuItem>
                    <MenuItem value={'Kitchen'}>Kitchen</MenuItem>
                    <MenuItem value={'bedroom'}>Bedroom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                className='ProductPageBuyContainer'
              >
                <Grid
                  container
                  item
                  justifyContent='flex-end'
                  sx={{ p: 0.5, Color: '#12824C' }}
                  className='ProductPageTitle'
                >
                  <Button variant='contained' className='productsPageAdd'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default GreenHouseEdit