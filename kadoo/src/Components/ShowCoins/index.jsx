import React, { useEffect, useState } from 'react'
import "./style.scss";
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CoinsIcon from '../../Images/Coins/coins.png'

export default function ShowCoins(props) {

    
    return (
        <Grid
        display='flex'
        alignItems='center'
        justifyItems='center'
        >
            <img className='coinPic' src={CoinsIcon} width={30}/>
            <Typography className='coinText'>Coins: {props.coins}</Typography>
        </Grid>
        )}