import * as React from 'react'
import './PlantsCart.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import NatureIcon from '@mui/icons-material/Nature'
import OpacityIcon from '@mui/icons-material/Opacity'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function PlantsCart(props) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }}>
        <Link to={'/ProductPlantsPage/' + props.product.id}>
          <Grid className='productIconImageContainer' sx={{ p: 1 }}>
            <CardMedia
              component='img'
              height='200'
              image={'http://127.0.0.1:8000' + props.product.image}
              alt='picture'
              className='plantIconImage'
            />
          </Grid>
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            className='textClass'
          >
            {props.product.name}
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            $ {props.product.price}
          </Typography>
          <div className='featButton' sx={{ alignSelf: 'flex-end' }}>
            <WbSunnyIcon className='lightButton' />
            <a className='Message'> {props.product.light} </a>
            <OpacityIcon className='waterButton' />
            <a className='Message'> {props.product.water} </a>
            <NatureIcon className='growButton' />
            <a className='Message'> {props.product.growthRate} </a>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
