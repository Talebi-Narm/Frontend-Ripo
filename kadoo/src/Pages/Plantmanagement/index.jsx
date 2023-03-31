import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import ProductIcon2 from '../../Components/productIcon/productIcon2'
import AppBar from '../../Components/AppBar'
import DefAppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import ShowProduct from '../../Components/ShowProduct/ShowProduct'
import SkeletonArticle from '../../Components/Cart/SkeletonArticle'
import Dialog from '@mui/material/Dialog'
import GreenHouseCard from '../../Components/ProductsCart/GreenHouseCard'
import ShowGreenHouse from '../../Components/ShowProduct/ShowGreenHouse'
import CloseIcon from '@mui/icons-material/Close'
import Toolbar from '@mui/material/Toolbar'
import Fab from '@mui/material/Fab'
import { useTheme } from '@mui/material/styles'
import Zoom from '@mui/material/Zoom'
import AddIcon from '@mui/icons-material/Add'
import GreenHouseEdit from '../GreenHouseEdit'

import './style.scss'
// Import Theme Files
import { ThemeProvider } from '@mui/material/styles'
import Theme from '../../Theme/ThemeGenerator'
import { SignalCellularNullOutlined } from '@material-ui/icons'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function Plantmanagment(props) {
  const theme = useTheme()
  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
  ]
  ///const containerRef = React.useRef(null)
  const initialData = Object.freeze({
    id: '',
    name: '',
    description: '',
    image: '',
    location: '',
    isArchived: false,
    created: '',
    modified: '',
    user: 0,
  })
  const [openDrawer, setOpenDrawer] = React.useState([false])
  const [plantData, setPlantData] = React.useState([])
  const [plantId, setPlantId] = React.useState([])
  const [plantDataLoaded, setPlantDataLoaded] = React.useState(false)
  const [value, setValue] = React.useState(0)
  const [reload, setReload] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [enable, setEnable] = React.useState(false)
  const [newPlant, setNewPlant] = React.useState(true)
  const [plantInfo, setPlantInfo] = React.useState(initialData)
  const [newPlantInfo, setNewPlantInfo] = React.useState(initialData)
  const [errorData, updateErrorData] = useState(initialData)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [imageChange, setImageChange] = React.useState(false)
  const [coins, setCoinsNumber] = useState(0)

  const childRef = useRef()

  function srcToFile(src, fileName, mimeType) {
    return fetch(src)
      .then(function (res) {
        return res.arrayBuffer()
      })
      .then(function (buf) {
        return new File([buf], fileName, { type: mimeType })
      })
  }

  useEffect(() => {
    // create the preview
    if (selectedFile != null) {
      console.log(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  const handleCapture = (event) => {
    setSelectedFile(event.target.files[0])
    setImageChange(true)
  }

  const handleSubmit = () => {
    if (newPlant) {
      handleCreate()
    } else {
      handleUpdate()
    }
    childRef.current.reloadAll()
  }

  const handleUpdate = () => {
    console.log(newPlantInfo)

    updateErrorData({
      ...errorData,
      name: '',
    })
    updateErrorData({
      ...errorData,
      description: '',
    })
    updateErrorData({
      ...errorData,
      location: '',
    })
    updateErrorData({
      ...errorData,
      image: '',
    })
    console.log('----------------')
    console.log(newPlantInfo)
    const formData = new FormData()
    if (newPlantInfo.name != '') {
      formData.append('name', newPlantInfo.name)
    } else {
      alert('Enter the name of plant!')
      return
    }
    formData.append('description', newPlantInfo.description)
    formData.append('location', newPlantInfo.location)
    if (selectedFile !== null) {
      formData.append('image', selectedFile, selectedFile.name)
    } else {
      formData.append('image', '')
    }

    //console.log(formData)
    const requestOptions = {
      method: 'PUT',
      headers: { Authorization: 'JWT ' + localStorage.getItem('access_token') },
      body: formData,
    }
    console.log(requestOptions.body)
    fetch(
      'http://127.0.0.1:8000/api/myPlantsRUD/' + plantInfo.id + '/',
      requestOptions
    )
      .then((response) => {
        if (response.status === 401 || response.status === 400) {
          throw response
        } else {
          alert('Plant Updated!')
          handleReload()
          handleClose()
        }
      })
      .catch((err) => {
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage)
          console.log('e ' + errors.email)

          if (errors.first_name !== undefined) {
            updateErrorData({
              ...errorData,
              name: errors.name,
            })
            return
          }

          if (errors.last_name !== undefined) {
            updateErrorData({
              ...errorData,
              description: errors.description,
            })
            return
          }

          if (errors.user_name !== undefined) {
            updateErrorData({
              ...errorData,
              location: errors.location,
            })
            return
          }

          if (errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              image: errors.image,
            })
            return
          }
        })
      })
  }

  const handleCreate = () => {
    console.log(newPlantInfo)

    updateErrorData({
      ...errorData,
      name: '',
    })
    updateErrorData({
      ...errorData,
      description: '',
    })
    updateErrorData({
      ...errorData,
      location: '',
    })
    updateErrorData({
      ...errorData,
      image: '',
    })
    console.log('----------------')
    console.log(selectedFile)
    const formData = new FormData()
    if (newPlantInfo.name != '') {
      formData.append('name', newPlantInfo.name)
    } else {
      alert('Enter the name of plant!')
      return
    }
    if (selectedFile !== null) {
      formData.append('image', selectedFile, selectedFile.name)
    } else {
      alert('Select Image for the plant!')
      return
    }
    formData.append('description', newPlantInfo.description)
    formData.append('location', newPlantInfo.location)

    //console.log(formData)
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: 'JWT ' + localStorage.getItem('access_token') },
      body: formData,
    }
    console.log(requestOptions.body)
    fetch('http://127.0.0.1:8000/api/myPlants/', requestOptions)
      .then((response) => {
        if (response.status === 401 || response.status === 400) {
          throw response
        } else {
          alert('Plant Added!')
          handleReload()
          handleClose()
        }
      })
      .catch((err) => {
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage)
          console.log('e ' + errors.email)

          if (errors.first_name !== undefined) {
            updateErrorData({
              ...errorData,
              name: errors.name,
            })
            return
          }

          if (errors.last_name !== undefined) {
            updateErrorData({
              ...errorData,
              description: errors.description,
            })
            return
          }

          if (errors.user_name !== undefined) {
            updateErrorData({
              ...errorData,
              location: errors.location,
            })
            return
          }

          if (errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              image: errors.image,
            })
            return
          }
        })
      })
  }

  const handleReset = () => {
    setSelectedFile(null)
    setImageChange(false)
    setPreview(null)
    setPlantInfo(initialData)
    setNewPlantInfo(initialData)
  }

  const handleClickOpen = () => {
    console.log('s111111111')
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    async function ReloadCoin() {
      await fetch('http://127.0.0.1:8000/api/coin/get/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setCoinsNumber(data.coin_value)
          console.log('Coin')
          console.log(data.coin_value)
          if (data.coin_value >= 50) {
            setPlantInfo(initialData)
            setNewPlant(true)
            setOpen(true)
          } else {
            alert('You dont have enough coin!')
            return
          }
          console.log(data)
        })
    }
    ReloadCoin()
  }

  const handleClose = () => {
    handleReset()
    setNewPlant(true)
    setOpen(false)
  }

  const handleClickOpenEdit = (data) => {
    console.log('1')
    setPlantInfo(data)
    setNewPlantInfo(data)
    setNewPlant(false)
    setOpen(true)
  }

  useEffect(() => {
    if (plantInfo !== initialData) {
      if (selectedFile === null) {
        if (!newPlant) {
          srcToFile(
            'http://127.0.0.1:8000' + plantInfo.image,
            'file.jpg',
            'image/jpg'
          ).then((file) => {
            console.log('herwr')
            console.log(file)
            setSelectedFile(file)
          })
        }
      }
    }
  }, [plantInfo])

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  useEffect(() => {
    if (JSON.stringify(plantInfo) == JSON.stringify(newPlantInfo)) {
      setEnable(false)
    } else {
      setEnable(true)
    }
  }, [newPlantInfo])

  const handleChangeInfo = (e) => {
    setNewPlantInfo({
      ...newPlantInfo,
      [e.target.name]: e.target.value.trim(),
    })
    updateErrorData({
      ...errorData,
      [e.target.name]: '',
    })
    console.log(newPlantInfo)
  }

  const handleReload = () => {
    window.location.reload(true)
  }

  useEffect(() => {
    if (plantData.length === plantId.length) {
      setPlantDataLoaded(true)
    } else {
      setPlantDataLoaded(false)
    }
  }, [plantData])

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }

    setPlantDataLoaded(false)
    setTimeout(async () => {
      setPlantData([])
      plantId.map((p) => {
        console.log('plant Id' + p.id)
        fetch(
          'http://127.0.0.1:8000/api/myPlantsRUD/' + p.id + '/',
          requestOptions
        ).then(async (response) => {
          let isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
          let data = isJson ? await response.json() : null
          console.log('1')
          console.log(plantData)

          setPlantData((prestate) => [...prestate, data])
          console.log(data)
        })
      })
    }, 3000)
  }, [plantId])

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    setTimeout(async () => {
      setPlantDataLoaded(false)
      fetch('http://127.0.0.1:8000/api/myPlants/', requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
          const data = isJson ? await response.json() : null
          console.log(data)
          // check for error response
          console.log(response.status)
          if (!response.ok) {
            // get error message from body or default to response status
            const error = response.status
            return Promise.reject(error)
          }

          if (data === null) {
            setPlantDataLoaded(true)
            console.log('sadasd')
          } else {
            setPlantId(data)
          }
          console.log('1111')
          console.log(data.lenght)
        })
        .catch((error) => {
          if (error === 401) {
            alert('You should login first!')
          }
          console.error('There was an error!', error)
          setPlantDataLoaded(true)
        })
    }, 0)
  }, [reload])
  return (
    <div className='FontRight'>
      <ThemeProvider theme={Theme}>
        <AppBar
          SearchOption={true}
          TicketOption={true}
          CartOption={true}
          DrawerOption={false}
          AuthorizationOption={true}
          isopen={openDrawer}
          OpenMenu={handleDrawerOpen}
          CloseMenu={handleDrawerClose}
          ref={childRef}
        />
        <Grid
          container
          item
          xs={24}
          alignItems='center'
          justify='center'
          direction='column'
          sx={{ p: 3.5, pt: 4 }}
        >
          <Grid item sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              {plantData.length != 0 && (
                <Grid
                  container
                  spacing={2}
                  xs={12}
                  sx={{ mt: 2 }}
                  sx={{ width: '100%' }}
                >
                  <Grid item sx={{ width: '100%' }}>
                    <ShowGreenHouse
                      data={plantData}
                      reloadFunc={handleReload}
                      OpenDialog={handleClickOpenEdit}
                    />
                  </Grid>
                </Grid>
              )}
              {plantData.length === 0 && (
                <div>
                  {plantDataLoaded === true && (
                    <Grid container spacing={2} xs={12} sx={{ p: 3 }}>
                      <Alert severity='error' sx={{ width: '100%' }}>
                        There is NO plant right now! Come Back soon ...
                      </Alert>
                    </Grid>
                  )}
                  {plantDataLoaded === false && (
                    <Stack sx={{ m: 2 }}>
                      <SkeletonArticle />
                    </Stack>
                  )}
                </div>
              )}
            </Box>
          </Grid>
          {fabs.map((fab, index) => (
            <Zoom
              key={fab.color}
              in={value === index}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${
                  value === index ? transitionDuration.exit : 0
                }ms`,
              }}
              unmountOnExit
            >
              <Fab
                sx={fab.sx}
                aria-label={fab.label}
                color={fab.color}
                onClick={handleClickOpen}
              >
                {fab.icon}
              </Fab>
            </Zoom>
          ))}
        </Grid>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DefAppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
                sx={{ mr: 1 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                {newPlant ? 'New plant' : 'Edit'}
              </Typography>
              <Button
                autoFocus
                color='inherit'
                onClick={() => {
                  handleSubmit()
                }}
                disabled={!newPlant && !enable}
              >
                {newPlant ? 'Add' : 'Edit'}
              </Button>
            </Toolbar>
          </DefAppBar>
          <GreenHouseEdit
            data={plantInfo}
            change={handleChangeInfo}
            selectedFile={selectedFile}
            handleCapture={handleCapture}
            preview={preview}
            imageChange={imageChange}
            errorData={errorData}
            handleSubmit={handleSubmit}
            newPlant={newPlant}
            enable={enable}
          />
        </Dialog>
      </ThemeProvider>
    </div>
  )
}

export default Plantmanagment
