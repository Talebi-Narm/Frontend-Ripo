import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function AcceptedTicketCard(props) {
  const[username,setUsername]=React.useState("Username")
  const[email,setEmail]=React.useState("Email")
  const[text,setText]=React.useState(" ")
  const[id,setID]=React.useState("23")
  const[done,setHandle]=React.useState(false)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDone = () => {
    window.location.reload(true)
    setHandle(true);
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json' },
      body: JSON.stringify(),
    }
    fetch('http://127.0.0.1:8000/api/user/userinfo/'+`${id}/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        setUsername(data.user_name)
        setEmail(data.email)
    })
    }, []);
    
    useEffect(() => {
      if(done){
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json' },
      body: JSON.stringify(),
    }
    fetch('http://127.0.0.1:8000/api/ticket/done-ticket-specialist/'+`${props.ticket.id}/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
    })
    }}, [done]);


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          {email}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.ticket.body}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {username.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="accept" onClick={()=>{handleDone()}}>
            <DoneIcon />
          </IconButton>
        }
        title={username}
        subheader={email}
      />
      <Link
      underline="none"
      variant="body2"
      onClick={handleClickOpen}
      >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.ticket.body.substring(
                0,
                20
              )}...
        </Typography>
      </CardContent>
      </Link>
    </Card>
    </div>
  );
}
