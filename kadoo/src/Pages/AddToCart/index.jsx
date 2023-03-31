import Header from '../../Components/Cart/Header'
import Main from '../../Components/Cart/Main'
import Basket from '../../Components/Cart/Basket'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Components/Cart/axios'
import AppBar from '../../Components/AppBar/AppBar'
import 'react-router-dom'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

//import './AddToCart.css'

function AddtoCart() {
  const [cartItems, setCartItems] = useState([])
  const [numberOfItems, setNumberOfItems] = useState(null)
  const [toolCartItems, setToolCartItems] = useState([])
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'JWT ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    },
  }
  async function FetchCountCart() {
    await fetch(
      'http://127.0.0.1:8000/api/cart/user-count-cart/',
      requestOptions
    )
      .then((response) => {
        if (response.status != 401) {
          response.json().then((data) => {
            setNumberOfItems(data)
            console.log(data)
          })
        } else {
          throw response
        }
      })
      .catch((res) => {
        if (res.status === 401) setNumberOfItems(0)
      })
  }

  useEffect(() => {
    FetchCountCart()
  }, [])

  useEffect(() => {
    console.log('Item : ' + numberOfItems)
    if (numberOfItems !== null && numberOfItems !== 0) {
      async function fetchAllProductData() {
        await axiosInstance
          .get(`cart/user-unapproved-plants-cart-count/`)
          .then((res) => {
            axiosInstance.defaults.headers['Authorization'] =
              'JWT ' + localStorage.getItem('access_token')
            setCartItems(res.data)
            console.log(cartItems)
          })
      }
      async function fetchAllToolsData() {
        await axiosInstance
          .get(`cart/user-unapproved-tools-cart-count/`)
          .then((res) => {
            axiosInstance.defaults.headers['Authorization'] =
              'JWT ' + localStorage.getItem('access_token')
            setToolCartItems(res.data)
          })
      }

      fetchAllProductData()
      fetchAllToolsData()
    }
  }, [numberOfItems])

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count + 1 } : x
        )
      )
      console.log(cartItems)
      axiosInstance
        .post(`cart/update-plant-cart/`, {
          id: product.id,
          count: exist.count + 1,
        })
        .then((res) => {
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
          //history.push('/')
          console.log(res)
          console.log(res.data)
        })
    }
  }

  const onAddTool = (product) => {
    const exist = toolCartItems.find((x) => x.id === product.id)
    if (exist) {
      setToolCartItems(
        toolCartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count + 1 } : x
        )
      )
      axiosInstance
        .post(`cart/update-tool-cart/`, {
          id: product.id,
          count: exist.count + 1,
        })
        .then((res) => {
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
          //history.push('/')
          console.log(res)
          console.log(res.data)
        })
    }
  }

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist.count === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id))
      let config = {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('access_token'),
        },
        data: {
          //! Take note of the `data` keyword. This is the request body.
          id: product.id,
        },
      }
      axiosInstance.delete(`cart/delete-plant-cart/`, config).then(() => {
        FetchCountCart()
      })
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count - 1 } : x
        )
      )
      axiosInstance
        .post(`cart/update-plant-cart/`, {
          id: product.id,
          count: exist.count - 1,
        })
        .then((res) => {
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
          //history.push('/')
          console.log(res)
          console.log(res.data)
        })
    }
  }

  const onRemoveTool = (product) => {
    const exist = toolCartItems.find((x) => x.id === product.id)
    if (exist.count === 1) {
      setToolCartItems(toolCartItems.filter((x) => x.id !== product.id))
      let config = {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('access_token'),
        },
        data: {
          //! Take note of the `data` keyword. This is the request body.
          id: product.id,
        },
      }
      axiosInstance.delete(`cart/delete-tool-cart/`, config).then(() => {
        FetchCountCart()
      })
    } else {
      setToolCartItems(
        toolCartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count - 1 } : x
        )
      )
      axiosInstance
        .post(`cart/update-tool-cart/`, {
          id: product.id,
          count: exist.count - 1,
        })
        .then((res) => {
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
          //history.push('/')
          console.log(res)
          console.log(res.data)
        })
    }
  }

  const Checkout = () => {
    axiosInstance.post(`cart/approve-all-cart/`, {}).then((res) => {
      axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token')
      //history.push('/')
      console.log(res)
      console.log(res.data)
      alert('Implement Checkout!')
    })
  }

  return (
    <div className='App'>
      {numberOfItems !== 0 && numberOfItems !== null && (
        <Grid>
          <AppBar
            SearchOption={true}
            TicketOption={false}
            CartOption={false}
            AuthorizationOption={true}
            DrawerOption={false}
          />
          <Box sx={{ flexGrow: 1, m: 4 }}>
            <Grid
              container
              spacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mt: { xs: 8, sm: 0 } }}
            >
              <Grid item xs={12} md={8}>
                <Item>
                  <Main
                    plants={cartItems}
                    tools={toolCartItems}
                    onAddPlant={onAdd}
                    onAddTool={onAddTool}
                    onRemovePlant={onRemove}
                    onRemoveTool={onRemoveTool}
                  ></Main>
                </Item>
              </Grid>
              <Grid item xs={12} md={4}>
                <Item>
                  <Basket
                    id='basket-part'
                    cartItems={cartItems}
                    toolCartItems={toolCartItems}
                    CheckoutCart={Checkout}
                  ></Basket>
                </Item>
              </Grid>
            </Grid>
          </Box>
          <div className='row'></div>
        </Grid>
      )}
      {numberOfItems === 0 && (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          direction='row'
        >
          <AppBar
            SearchOption={true}
            TicketOption={false}
            CartOption={false}
            AuthorizationOption={true}
            DrawerOption={false}
          />
          <Grid
            container
            item
            justifyContent='center'
            alignItems='center'
            height='400px'
            sx={{ pt: 5, pr: 10, pl: 10 }}
          >
            <img
              src='empty.png'
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              alt='Background'
            />
          </Grid>
          <Grid
            container
            item
            justifyContent='center'
            alignItems='center'
            direction='row'
            sx={{ mt: 3 }}
          >
            <Grid item justifyContent='center' alignItems='center'>
              <Typography variant='h5' sx={{ flex: 1 }}>
                Cart is empty right now!
              </Typography>
            </Grid>
            <Grid
              container
              item
              justifyContent='center'
              alignItems='center'
              sx={{ mt: 1 }}
            >
              <Link to={'/search/'}>
                <Button variant='contained' sx={{ mt: 1.5 }}>
                  Let's shop
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default AddtoCart
