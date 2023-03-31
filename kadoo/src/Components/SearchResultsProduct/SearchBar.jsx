import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import { Chip } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import Stack from '@mui/material/Stack'
import ProductIcon2 from '../productIcon/productIcon2'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.07),
  },
  marginRight: theme.spacing(0),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
  },
}))

const StyledColorSerchIconButton = styled(IconButton)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.25),
  '&:hover': {
    color: alpha(theme.palette.common.black, 0.75),
  },
}))

function SearchBar(props) {
  const xsScreen = useMediaQuery('(min-width: 900px)')
  const [searchText, setSearchText] = useState('')
  const [searchedText, setSearchedText] = useState('')

  function handleChange(e) {
    setSearchText(e.target.value.trim())
  }

  function handleSeacrh() {
    if (searchText !== '') setSearchedText(searchText)
  }

  return (
    <div>
      <Grid container marginLeft={0} alignItems='left' justifyContent='left'>
        <Grid
          container
          item
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
          <Grid item>
            <Search>
              <Grid wrap='nowrap' container direction='row' alignItems='center'>
                <Grid item>
                  <StyledColorSerchIconButton
                    sx={{ ml: 2, p: 1 }}
                    size='small'
                    onClick={() => {
                      handleSeacrh()
                      props.funcSearchPlantsByName(searchText)
                      props.funcSearchToolsByName(searchText)
                      props.funcSearchProductsByName(searchText)
                    }}
                  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </StyledColorSerchIconButton>
                </Grid>
                <Grid item>
                  <StyledInputBase
                    sx={{ ml: 0 }}
                    placeholder='Search for …'
                    defaultValue={props.default}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Search>
          </Grid>
          {/*<Grid item>
            {searchedText !== '' && (
              <Chip label={searchedText} variant='outlined' />
            )}
          </Grid>*/}
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchBar
