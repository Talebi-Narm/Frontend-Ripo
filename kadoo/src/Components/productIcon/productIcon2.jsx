import React,{useEffect,useState} from 'react' ;
import "./style.scss";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NatureIcon from '@mui/icons-material/Nature';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


function ProductIcon2(props){
    return( 
        <Box className="productIconLink" sx={{ width: '100%' }}>
        <Grid container rowSpacing={1}>
          <Grid className="container" item xs={12}>
          <Link to = {'/ProductPlantsPage/'+ props.product.id}>
            <div className="productIconImageContainer"><img className="productIconImage" src={props.product.image}></img></div>
            <div className="overlay">
              <div className="text">{`${props.product.description.substring(0, 200)}...`}</div>
            </div>
          </Link>
          </Grid>
          <Grid item xs={12}>
            <div className="productIconName"><a>{props.product.name}</a></div>
          </Grid>
          <Grid item xs={12}>
            <div className="productIconPrice">$ {props.product.price}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="featButton">
            <WbSunnyIcon className="lightButton"/>
            <a className="Message" > {props.product.light} </a>
            <OpacityIcon className="waterButton"/>
            <a className="Message" > {props.product.water} </a>
            <NatureIcon className="growButton"/>
            <a className="Message" > {props.product.growthRate} </a>
            </div>
          </Grid>
        </Grid>
      </Box>
      
    )
}

export default ProductIcon2;