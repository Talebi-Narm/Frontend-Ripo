import React from 'react'
import './style.scss'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

function ProductIcon1(props) {
  return (
    <Box className='productIconLink' sx={{ width: '100%' }}>
      <Grid container rowSpacing={1}>
        <Grid className='container' item xs={12}>
          <Link to={'/ProductToolsPage/' + props.product.id}>
            <div className='productIconImageContainer'>
              <img className='productIconImage' src={props.product.image}></img>
            </div>
            <div className='overlay'>
              <div className='text'>{`${props.product.description.substring(
                0,
                200
              )}...`}</div>
            </div>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <div className='productIconName'>
            <a>{props.product.name}</a>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className='productIconPrice'>${props.product.price}</div>
        </Grid>
        <Grid item xs={12}>
          <div className='productIconPrice'></div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductIcon1
