import React, { useEffect, useState } from 'react'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import './style.scss'

export default function WriteTicket() {
  const [open, setOpen] = React.useState(false)
  const [send, setSend] = React.useState(false)
  const [disable, setDisable] = React.useState(false)
  const [text, setText] = React.useState('')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSend(true)
    setDisable(true)
  }

  useEffect(() => {
    if (text != '') {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: text,
        }),
      }
      fetch(
        'http://127.0.0.1:8000/api/ticket/create-support-ticket/',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          window.location.reload(true)
        })
    }
  }, [send])

  return (
    <div>
      <IconButton aria-label='Contact' onClick={handleClickOpen}>
        <ContactMailIcon className='WhiteIcon' />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle>We're Here To Help!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you haven't found what you are looking for, or would like to
            speak to our specialists, please write your message here..
          </DialogContentText>
          <TextField
            fullWidth
            id='standard-textarea'
            label='Message'
            placeholder='Message'
            multiline
            variant='standard'
            value={text}
            onChange={(e) => setText(e.target.value)}
            // disabled={disable}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
