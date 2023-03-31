import React,{useEffect,useState} from 'react' ;
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProductIcon1 from "../productIcon/productIcon1";
import "./ShowProduct.scss";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));

  function ShowTools(props){
    
      return(
        <div className="showProductsBack">
        <Box className="wrapper" sx={{ width: '100%' }}>
        <div className="showProductSubs">
          Tools
        </div>
        <Grid  container spacing={2}>
        {props.tooldata.map(
            Tool => 
            <Grid  item xs={12} sm={4} md={3}>
            <Item className="showProductsIcons">
              <ProductIcon1 product={Tool}/>
            </Item>
          </Grid>
          )}
        </Grid>
        </Box>
      </div>
      );
  }
  
  export default ShowTools;