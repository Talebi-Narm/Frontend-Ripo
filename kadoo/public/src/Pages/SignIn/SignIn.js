import React from 'react'
import Background from '../../Images/SignIn/signInBG.png'
import { Grid, TextField, Button, InputAdornment } from '@mui/material'
import { EmailRounded, VpnKey } from '@mui/icons-material'
import { useState , useEffect} from 'react'
import history from '../../history'
import "./SignIn.css"

function SignIn() {
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  })
  const [formData, updateFormData] = useState(initialFormData)
  const [flagData, setFlagData] = useState(false)
  const [errorData, updateErrorData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    updateErrorData([]);
  }, [refresh])

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(refresh)
      setRefresh(false);
    else
      setRefresh(true);
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
        if(response.status == 200)
        {
          setFlagData(true);
          history.push('/');
          window.location.reload(true);
          return response.json();
        } 
        else
        {
          throw response;
        }
      })
      .catch( err => {
        err.text().then( errorMessage => {
          const errors = JSON.parse(errorMessage)
          if(errors.email !== undefined) {
            updateErrorData({
              ...errorData,
              email: errors.email,
            })
            return;
          }
          
          if(errors.password !== undefined) {
            updateErrorData({
              ...errorData,
              password: errors.password,
            })
            return;
          }
        })
      })
      .then((data) => {
        if(flagData == true)
        {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          alert("Welcome !");
        }
        setFlagData(false);
      })
  }
  return (
    <div>
      <Grid container style={{ minHeight: '100vh' }} sx={{pl:{sm:20 , xs:0} , pr:{sm:20 , xs:0}}}>
        <Grid item xs={12} sm={6}>
          <img
            src={Background}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              minWidth: 300,
              height: 20 
            }} />
            <a
              className="ButtonStyle"
              variant='contained'
              href="/HomePage"
              onClick={handleSubmit}
            >
              Sign In
            </a>
            <div style={{ height: 30 }}  className="Buttons" />
            <div className="divSignUp">
              <a 
              href="/signup" 
              className="aSignUp">
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
