import Header from '../Components/Cart/Header'
import Main from '../Components/Cart/Main'
import Basket from '../Components/Cart/Basket'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../Components/Cart/axios'
import 'react-router-dom'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

//import './AddToCart.css'

function AddtoCart() {
  const [cartItems, setCartItems] = useState([])

  const [toolCartItems, setToolCartItems] = useState([])

  useEffect(() => {
    //Login a Sample User

    async function fetchAllProductData() {
      await axiosInstance
        .get(`cart/user-unapproved-plants-cart-count/`)
        .then((res) => {
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
          setCartItems(res.data)
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

    async function fetchUserData() {
      await axiosInstance
        .post(`user/token/`, {
          email: '1@1.com',
          password: 'Tahlil1400',
        })
        .then((res) => {
          localStorage.setItem('access_token', res.data.access)
          localStorage.setItem('refresh_token', res.data.refresh)
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
          //history.push('/')
        })
    }

    fetchUserData().then(() => {
      fetchAllProductData()
      fetchAllToolsData()
    })
  }, [])

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id)
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, count: exist.count + 1 } : x
        )
      )
      axiosInstance
        .post(`cart/update-plant-cart/`, {
          id: product.id,
          count: exist.count + 1,
        })
        .then((res) => {
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token')
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
      axiosInstance.delete(`cart/delete-plant-cart/`, config)
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
      axiosInstance.delete(`cart/delete-tool-cart/`, config)
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
        })
    }
  }

  const Checkout = () => {
    axiosInstance.post(`cart/approve-all-cart/`, {}).then((res) => {
      axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token')
      alert('Implement Checkout!')
    })
  }

  return (
    <div className='App'>
      <Header countCartItems={cartItems.length}></Header>
      <Box sx={{ flexGrow: 1, m: 4 }}>
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                id="basket-part"
                cartItems={cartItems}
                toolCartItems={toolCartItems}
                CheckoutCart={Checkout}
              ></Basket>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div className='row'></div>
    </div>
  )
}

export default AddtoCart
