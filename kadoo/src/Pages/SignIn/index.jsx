import React from 'react'
import Background from '../../Images/SignIn/signInBG.png'
import { Grid, TextField, Button, InputAdornment } from '@mui/material'
import { EmailRounded, VpnKey } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import history from '../../history'
import AppBar from '../../Components/AppBar'
import './style.scss'

function SignIn() {
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  })
  const [formData, updateFormData] = useState(initialFormData)
  const [flagData, setFlagData] = useState(false)
  const [errorData, updateErrorData] = useState(initialFormData)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    console.log('access_token Come')
    console.log(localStorage.getItem('access_token'))
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
    }
    fetch('http://127.0.0.1:8000/api/user/userinfo/', requestOptions)
      .then((response) => {
        console.log(localStorage.getItem('access_token'))
        if (response.status != 401) {
          response.json().then((data) => {
            console.log(data.type)
            if (data.type === 'MEMBER') {
              history.push('/HomePage')
              window.location.reload(true)
            } else if (data.type === 'SPECIALIST') {
              history.push('/TicketPage')
              window.location.reload(true)
            } else if (data.type === 'ADMIN') {
              history.push('/AdminPage')
              window.location.reload(true)
            }
          })
        } else {
          throw response
        }
      })
      .catch((err) => {})
  }, [flagData])

  useEffect(() => {
    updateErrorData(initialFormData)
    console.log(errorData)
  }, [refresh])

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
    updateErrorData({
      ...errorData,
      [e.target.name]: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    if (refresh) setRefresh(false)
    else setRefresh(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }
    fetch('http://127.0.0.1:8000/api/user/token/', requestOptions)
      .then((response) => {
        if (response.status == 200) {
          console.log('response')
          response.json().then((data) => {
            console.log(data)
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)
            setFlagData(flagData ? false : true)
          })

          //console.log(data)
        } else {
          throw response
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          alert('Your email or password is incorrect!')
        }
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage)
          console.log('e ' + errors.email)
          if (errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              email: errors.email,
            })
            return
          }

          if (errors.password !== undefined) {
            updateErrorData({
              ...errorData,
              password: errors.password,
            })
            return
          }
        })
      })
  }
  return (
    <div>
      <AppBar
        SearchOption={true}
        TicketOption={false}
        CartOption={false}
        DrawerOption={false}
        AuthorizationOption={false}
      />
      <Grid
        container
        style={{ minHeight: '100vh' }}
        sx={{ pl: { sm: 20, xs: 0 }, pr: { sm: 20, xs: 0 } }}
      >
        <Grid item xs={12} sm={6}>
          <img
            src={Background}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            alt='Background'
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems='center'
          direction='column'
          justify='space-between'
          className='centerElement'
        >
          <div />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <TextField
              variant='standard'
              name='email'
              label='Email'
              margin='normal'
              helperText={errorData.email != '' ? errorData.email : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {' '}
                    <EmailRounded />{' '}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              variant='standard'
              type='password'
              name='password'
              label='Password'
              margin='normal'
              helperText={errorData.password != '' ? errorData.password : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {' '}
                    <VpnKey />{' '}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <div
              style={{
                height: 20 ,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 400,
                minWidth: 300,
              }}
            />
            <a
              className='ButtonStyle'
              variant='contained'
              href='/HomePage'
              onClick={handleSubmit}
            >
              Sign In
            </a>
            <div style={{ height: 30 }} className='Buttons' />
            <div className='divSignUp'>
              <a href='/signup' className='aSignUp'>
                Sign Up
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignIn
