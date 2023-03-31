import Search from '../../assets/Images/Search/search.jpg'
import ShowPlants from '../ShowProduct/ShowPlants'
import ShowTools from '../ShowProduct/ShowTools'
import SkeletonArticle from '../Cart/SkeletonArticle'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Home } from '@mui/icons-material'
import './SearchResultProduct.scss'
import history from '../../history'
import { Chip } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Pagination from '@mui/material/Pagination'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ProductIcon1 from '../productIcon/productIcon1'
import ProductIcon2 from '../productIcon/productIcon2'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Navbar2 from '../NavbarHome'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FilterListIcon from '@mui/icons-material/FilterList'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import AppBar from '../AppBar'
import Slider from '@mui/material/Slider'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import SortNavBar from './SortNavBar'
import SearchBar from './SearchBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import ShowProduct from '../ShowProduct/ShowProduct'
import Badge from '@mui/material/Badge'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import CloseIcon from '@mui/icons-material/Close'

const drawerWidth = 340

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
)

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'left',
}))

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const marks = [
  {
    value: 0,
    label: '0$',
  },
  // {
  //   value: 5,
  //   label: "5$",
  // },
  // {
  //   value: 10,
  //   label: "10$",
  // },
  // {
  //   value: 15,
  //   label: "15$",
  // },
  // {
  //   value: 20,
  //   label: "20$",
  // },
  // {
  //   value: 25,
  //   label: "25$",
  // },
  // {
  //   value: 30,
  //   label: "30$",
  // },
  {
    value: 35,
    label: '35$',
  },
]

function SearchResultProduct(props) {
  const xsScreen = useMediaQuery('(min-width: 900px)')

  let myRef0 = useRef()
  let myRef1 = useRef()
  let myRef2 = useRef()

  const [hasDefault, setHasDefault] = useState(false)
  const [searchPlantDataLoaded, setSearchPlantDataLoaded] = useState(false)
  const [searchToolDataLoaded, setSearchToolDataLoaded] = useState(false)
  const [searchProductDataLoaded, setSearchProductDataLoaded] = useState(false)
  const [searchProductData, setSearchProductData] = useState([])
  const [searchPlantData, setSearchPlantData] = useState([])
  const [searchToolData, setSearchToolData] = useState([])
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [isFilterd, setIsFilterd] = React.useState(true)
  ///////////////////// Advance Search States /////////////////////
  //#########Plants
  //Search
  const [searchTextPlants, setSearchTextPlants] = useState('')
  //Sort
  const [sortKindPlants, setSortKindPlants] = useState('name')
  const [sortOrderPlants, setSortOrderPlants] = useState('ASC')
  //Filter
  const [filterPriceLowerPlants, setFilterPriceLowerPlants] = useState('')
  const [filterPriceHigherPlants, setFilterPriceHigherPlants] = useState('')
  const [filterTempPriceLowerPlants, setFilterTempPriceLowerPlants] =
    useState('')
  const [filterTempPriceHigherPlants, setFilterTempPriceHigherPlants] =
    useState('')
  const [filterEnvironmentPlants, setFilterEnvironmentPlants] = useState('')
  const [filterWaterPlants, setFilterWaterPlants] = useState('none')
  const [filterLightPlants, setFilterLightPlants] = useState('none')
  const [filterGrowthRatePlants, setFilterGrowthRatePlants] = useState('')
  const [filterType, setFilterType] = useState(0)
  //Pagination
  const [paginationCountPlants, setPaginationCountPlants] = useState(6)
  const [paginationPagePlants, setPaginationPagePlants] = useState(1)
  const [resultPaginationPagePlants, setResultPaginationPagePlants] =
    useState(0)

  //#########Products
  //Search
  const [searchTextProducts, setSearchTextProducts] = useState('')
  //Sort
  const [sortKindProducts, setSortKindProducts] = useState('name')
  const [sortOrderProducts, setSortOrderProducts] = useState('ASC')
  //Filter
  const [filterPriceLowerProducts, setFilterPriceLowerProducts] = useState('')
  const [filterPriceHigherProducts, setFilterPriceHigherProducts] = useState('')
  const [filterTempPriceLowerProducts, setFilterTempPriceLowerProducts] =
    useState('')
  const [filterTempPriceHigherProducts, setFilterTempPriceHigherProducts] =
    useState('')
  //Pagination
  const [paginationCountProducts, setPaginationCountProducts] = useState(6)
  const [paginationPageProducts, setPaginationPageProducts] = useState(1)
  const [resultPaginationPageProducts, setResultPaginationPageProducts] =
    useState(0)

  //#########Tools
  //Search
  const [searchTextTools, setSearchTextTools] = useState('')
  //Sort
  const [sortKindTools, setSortKindTools] = useState('name')
  const [sortOrderTools, setSortOrderTools] = useState('ASC')
  //Filter
  const [filterPriceLowerTools, setFilterPriceLowerTools] = useState('')
  const [filterPriceHigherTools, setFilterPriceHigherTools] = useState('')
  const [filterTempPriceLowerTools, setFilterTempPriceLowerTools] = useState('')
  const [filterTempPriceHigherTools, setFilterTempPriceHigherTools] =
    useState('')
  //Pagination
  const [paginationCountTools, setPaginationCountTools] = useState(6)
  const [paginationPageTools, setPaginationPageTools] = useState(1)
  const [resultPaginationPageTools, setResultPaginationPageTools] = useState(0)

  const handleChangePlant = (event, value) => {
    setTimeout(() => {
      window.scrollTo({ behavior: 'smooth', top: myRef1.current.offsetTop })
    }, 3500)
    setPaginationPagePlants(value)
  }
  const handleChangeTool = (event, value) => {
    setTimeout(() => {
      window.scrollTo({ behavior: 'smooth', top: myRef2.current.offsetTop })
    }, 3500)
    setPaginationPageTools(value)
  }
  const handleChangeProduct = (event, value) => {
    setTimeout(() => {
      window.scrollTo({ behavior: 'smooth', top: myRef0.current.offsetTop })
    }, 3500)
    setPaginationPageProducts(value)
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
    console.log(openDrawer)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
    console.log(openDrawer)
  }

  const handelDrawer = () => {
    if (openDrawer === false) {
      handleDrawerOpen()
    } else {
      handleDrawerClose()
    }
  }

  function PlantsAdvanceSearch() {
    const requestOptions = {
      method: 'POST',
      headers: {
        // 'Authorization': 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: searchTextPlants !== '' ? searchTextPlants : null,
        price: {
          lower: filterPriceLowerPlants !== '' ? filterPriceLowerPlants : null,
          higher:
            filterPriceHigherPlants !== '' ? filterPriceHigherPlants : null,
        },
        environment:
          filterEnvironmentPlants !== '' ? filterEnvironmentPlants : null,
        water: filterWaterPlants !== 'none' ? filterWaterPlants : null,
        light: filterLightPlants !== 'none' ? filterLightPlants : null,
        growthRate:
          filterGrowthRatePlants !== '' ? filterGrowthRatePlants : null,
        pagination: {
          count: paginationCountPlants !== '' ? paginationCountPlants : null,
          page: paginationPagePlants !== '' ? paginationPagePlants : null,
        },
        sort: {
          kind: sortKindPlants !== '' ? sortKindPlants : null,
          order: sortOrderPlants !== '' ? sortOrderPlants : null,
        },
      }),
    }

    console.log(requestOptions.body)
    console.log(1)
    setSearchPlantData([])
    setSearchPlantDataLoaded(false)
    console.log(2)
    setTimeout(async () => {
      const res = await fetch(
        'http://127.0.0.1:8000/api/plantsAdvanceSearch/',
        requestOptions
      )
      if (res.status === 500) {
        setSearchProductDataLoaded(true)
      }
      const data = await res.json()
      console.log(3)
      setSearchPlantData(data.data)
      setResultPaginationPagePlants(data.pageCount)
      setSearchPlantDataLoaded(true)
      console.log('plantsData')
      console.log(data)
    }, 3000)
  }
  function ProductsAdvanceSearch() {
    const requestOptions = {
      method: 'POST',
      headers: {
        // 'Authorization': 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: searchTextProducts !== '' ? searchTextProducts : null,
        price: {
          lower:
            filterPriceLowerProducts !== '' ? filterPriceLowerProducts : null,
          higher:
            filterPriceHigherProducts !== '' ? filterPriceHigherProducts : null,
        },
        pagination: {
          count:
            paginationCountProducts !== '' ? paginationCountProducts : null,
          page: paginationPageProducts !== '' ? paginationPageProducts : null,
        },
        sort: {
          kind: sortKindProducts !== '' ? sortKindProducts : null,
          order: sortOrderProducts !== '' ? sortOrderProducts : null,
        },
      }),
    }
    console.log('all body : ' + requestOptions.body)
    setSearchProductData([])
    setSearchProductDataLoaded(false)
    setTimeout(async () => {
      const res = await fetch(
        'http://127.0.0.1:8000/api/allAdvanceSearch/',
        requestOptions
      )
      if (res.status === 500) {
        setSearchProductDataLoaded(true)
      }
      const data = await res.json()
      setSearchProductData(data.data)
      console.log('product page: ' + data.pageCount)
      setResultPaginationPageProducts(data.pageCount)
      setSearchProductDataLoaded(true)
      console.log(data)
    }, 3000)
  }
  function ToolsAdvanceSearch() {
    const requestOptions = {
      method: 'POST',
      headers: {
        // 'Authorization': 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: searchTextTools !== '' ? searchTextTools : null,
        price: {
          lower: filterPriceLowerTools !== '' ? filterPriceLowerTools : null,
          higher: filterPriceHigherTools !== '' ? filterPriceHigherTools : null,
        },
        pagination: {
          count: paginationCountTools !== '' ? paginationCountTools : null,
          page: paginationPageTools !== '' ? paginationPageTools : null,
        },
        sort: {
          kind: sortKindTools !== '' ? sortKindTools : null,
          order: sortOrderTools !== '' ? sortOrderTools : null,
        },
      }),
    }
    console.log(requestOptions.body)
    setSearchToolData([])
    setSearchToolDataLoaded(false)
    setTimeout(async () => {
      const res = await fetch(
        'http://127.0.0.1:8000/api/toolsAdvanceSearch/',
        requestOptions
      )
      if (res.status === 500) {
        setSearchProductDataLoaded(true)
      }
      const data = await res.json()
      setSearchToolData(data.data)
      setResultPaginationPageTools(data.pageCount)
      setSearchToolDataLoaded(true)
      console.log(data)
    }, 3000)
  }

  function handleSearchClick() {
    if (searchTextPlants == '' || searchTextPlants == ' ') {
      updateSearch()
    }
    handleSearch(searchTextPlants)
  }

  const updateSearch = () => {
    async function fetchProductData() {
      await fetch('http://127.0.0.1:8000/api/plantsList/')
        .then((response) => response.json())
        .then((data) => {
          setSearchPlantData(data)
          console.log(data)
        })
    }
    async function fetchToolData() {
      await fetch('http://127.0.0.1:8000/api/toolsList/')
        .then((response) => response.json())
        .then((data) => {
          setSearchToolData(data)
          console.log(data)
        })
    }
    fetchProductData()
    fetchToolData()
  }
  const handleSearch = (name) => {
    console.log('0')
    function fetchSearchProductData() {
      fetch('http://127.0.0.1:8000/api/plantsByName/' + name + '/')
        .then((response) => response.json())
        .then((data) => {
          setSearchPlantData(data)
          console.log(data)
        })
    }
    function fetchSearchToolData() {
      fetch('http://127.0.0.1:8000/api/toolsByName/' + name + '/')
        .then((response) => response.json())
        .then((data) => {
          setSearchToolData(data)
          console.log(data)
        })
    }
    fetchSearchProductData()
    fetchSearchToolData()
  }
  const Reset = () => {
    setFilterType(0)
    setFilterWaterPlants('none')
    setFilterLightPlants('none')
    setFilterPriceHigherPlants(35)
    setFilterPriceLowerPlants(0)
    setFilterPriceHigherTools(35)
    setFilterPriceLowerTools(0)
    setFilterPriceHigherProducts(35)
    setFilterPriceLowerProducts(0)

    setFilterTempPriceHigherPlants(35)
    setFilterTempPriceLowerPlants(0)
    setFilterTempPriceHigherTools(35)
    setFilterTempPriceLowerTools(0)
    setFilterTempPriceHigherProducts(35)
    setFilterTempPriceLowerProducts(0)
  }
  ////////////////////// Sort Functions //////////////////////
  const FuncSortKindPlants = (name) => {
    setSortKindPlants(name)
  }
  const FuncSortOrderPlants = (name) => {
    setSortOrderPlants(name)
  }
  const FuncSortKindTools = (name) => {
    setSortKindTools(name)
  }
  const FuncSortOrderTools = (name) => {
    setSortOrderTools(name)
  }
  const FuncSortKindProducts = (name) => {
    setSortKindProducts(name)
  }
  const FuncSortOrderProducts = (name) => {
    setSortOrderProducts(name)
  }
  ////////////////////// Search Functions //////////////////////
  // 1) Serach Plants By Name
  const handleSearchPlantsByName = (name) => {
    setSearchTextPlants(name)
  }
  // 2) Serach Tools By Name
  const handleSearchToolsByName = (name) => {
    setSearchTextTools(name)
  }
  const handleSearchProductsByName = (name) => {
    setSearchTextProducts(name)
  }
  ////////////////////// Filter Functions //////////////////////
  // 1) Filter By Price Plants
  const handleFilterPricePlants = (lower, higher) => {
    setFilterPriceLowerPlants(lower)
    setFilterPriceHigherPlants(higher)
  }
  const handleFilterTempPricePlants = (lower, higher) => {
    setFilterTempPriceLowerPlants(lower)
    setFilterTempPriceHigherPlants(higher)
  }
  const handleFilterPriceProducts = (lower, higher) => {
    setFilterPriceLowerProducts(lower)
    setFilterPriceHigherProducts(higher)
  }
  const handleFilterTempPriceProducts = (lower, higher) => {
    setFilterTempPriceLowerProducts(lower)
    setFilterTempPriceHigherProducts(higher)
  }
  // 2) Filter By Water Plants
  const handleFilterWater = (value) => {
    console.log('sara eshghe mne')
    setFilterWaterPlants(value)
  }
  // 3) Filter By Light Plants
  const handleFilterLight = (value) => {
    setFilterLightPlants(value)
  }
  // 4) Filter By Growthrate Plants
  const handleFilterGrowthrate = (value) => {
    setFilterGrowthRatePlants(value)
  }
  // 5) Filter By Growthrate Plants
  const handleFilterEnvironment = (value) => {
    setFilterEnvironmentPlants(value)
  }
  // 6) Filter By Price Tools
  const handleFilterPriceTools = (lower, higher) => {
    setFilterPriceLowerTools(lower)
    setFilterPriceHigherTools(higher)
  }
  const handleFilterTempPriceTools = (lower, higher) => {
    setFilterTempPriceLowerTools(lower)
    setFilterTempPriceHigherTools(higher)
  }
  // 7) Filter By Type of data
  const handleChangeTypeData = (event) => {
    if (event.target.value === 'plant') {
      setFilterType(1)
    } else if (event.target.value === 'tool') {
      setFilterType(2)
    } else if (event.target.value === 'all') {
      setFilterType(0)
      setFilterLightPlants('none')
      setFilterWaterPlants('none')
    }
  }
  // 8) Filter handel change water
  const handleChangeWater = (event) => {
    handleFilterWater(event.target.value)
  }
  // 9) Filter handel change light
  const handleChangeLight = (event) => {
    handleFilterLight(event.target.value)
  }
  // 10) Filter handel change price
  const handleChangePrice = () => {
    handleFilterPricePlants(
      filterTempPriceLowerPlants,
      filterTempPriceHigherPlants
    )
    handleFilterPriceTools(
      filterTempPriceLowerTools,
      filterTempPriceHigherTools
    )
    handleFilterPriceProducts(
      filterTempPriceLowerProducts,
      filterTempPriceHigherProducts
    )
  }
  const tempHandleChangePrice = (event) => {
    handleFilterTempPricePlants(event.target.value[0], event.target.value[1])
    handleFilterTempPriceTools(event.target.value[0], event.target.value[1])
    handleFilterTempPriceProducts(event.target.value[0], event.target.value[1])
  }
  ////////////////////// Pagination Functions //////////////////////
  // 1) Pagination Plants
  const handlePaginationPlants = (count, page) => {
    setPaginationCountPlants(count)
    setPaginationPagePlants(page)
  }
  // 2) Pagination Tools
  const handlePaginationTools = (count, page) => {
    setPaginationCountTools(count)
    setPaginationPageTools(page)
  }
  const handlePaginationProducts = (count, page) => {
    setPaginationCountProducts(count)
    setPaginationPageProducts(page)
  }

  useEffect(() => {
    setSearchPlantDataLoaded(false)
    if (sortKindPlants !== '' && sortOrderPlants !== '' && hasDefault) {
      PlantsAdvanceSearch()
    }
    if (sortKindTools !== '' && sortOrderTools !== '' && hasDefault) {
      ToolsAdvanceSearch()
    }
    if (sortKindProducts !== '' && sortOrderProducts !== '' && hasDefault) {
      ToolsAdvanceSearch()
    }
    if (
      (filterGrowthRatePlants !== '' ||
        filterLightPlants !== '' ||
        filterEnvironmentPlants !== '' ||
        filterWaterPlants !== '' ||
        filterPriceHigherPlants !== '' ||
        filterPriceLowerPlants !== '') &&
      hasDefault
    ) {
      PlantsAdvanceSearch()
    }
    if (
      filterPriceHigherTools !== '' &&
      filterPriceLowerTools !== '' &&
      hasDefault
    ) {
      ToolsAdvanceSearch()
    }
    if (searchTextPlants !== '' && hasDefault) {
      PlantsAdvanceSearch()
    }
    if (searchTextTools !== '' && hasDefault) {
      ToolsAdvanceSearch()
    }
    if (
      paginationCountPlants !== '' &&
      paginationPagePlants !== '' &&
      hasDefault
    ) {
      PlantsAdvanceSearch()
    }
    if (
      paginationCountTools !== '' &&
      paginationPageTools !== '' &&
      hasDefault
    ) {
      ToolsAdvanceSearch()
    }
    if (
      filterPriceHigherProducts !== '' &&
      filterPriceLowerProducts !== '' &&
      hasDefault
    ) {
      ProductsAdvanceSearch()
    }
    if (searchTextProducts !== '') {
      ProductsAdvanceSearch()
    }
    if (
      paginationCountProducts !== '' &&
      paginationPageProducts !== '' &&
      hasDefault
    ) {
      ProductsAdvanceSearch()
    }
    if (
      filterGrowthRatePlants === '' &&
      filterLightPlants === 'none' &&
      filterEnvironmentPlants === '' &&
      filterWaterPlants === 'none' &&
      (filterPriceHigherPlants === '' || filterPriceHigherPlants === 35) &&
      (filterPriceLowerPlants === '' || filterPriceLowerPlants === 0) &&
      (filterPriceHigherTools === '' || filterPriceHigherTools === 35) &&
      (filterPriceLowerTools === '' || filterPriceLowerTools === 0) &&
      (filterPriceHigherProducts === '' || filterPriceHigherProducts === 35) &&
      (filterPriceLowerProducts === '' || filterPriceLowerProducts === 0) &&
      filterType === 0
    ) {
      setIsFilterd(true)
    } else {
      setIsFilterd(false)
    }
  }, [
    sortKindPlants,
    sortOrderPlants,
    sortKindTools,
    sortOrderTools,
    sortKindProducts,
    sortOrderProducts,
    filterGrowthRatePlants,
    filterLightPlants,
    filterEnvironmentPlants,
    filterPriceHigherPlants,
    filterPriceHigherTools,
    filterPriceLowerPlants,
    filterPriceLowerTools,
    filterPriceHigherProducts,
    filterPriceLowerProducts,
    filterWaterPlants,
    searchTextPlants,
    searchTextTools,
    searchTextProducts,
    paginationCountPlants,
    paginationCountTools,
    paginationPagePlants,
    paginationPageTools,
    paginationCountProducts,
    paginationPageProducts,
    filterType,
  ])

  useEffect(() => {
    if (hasDefault) {
      console.log('VOROOOOOOOOOOD')
      if (filterType === 0) {
        ProductsAdvanceSearch()
      }
      if (filterType === 1) {
        PlantsAdvanceSearch()
      }
      if (filterType === 2) {
        ToolsAdvanceSearch()
      }
    }
  }, [paginationPagePlants, paginationPageTools, paginationPageProducts])

  useEffect(() => {
    console.log('HASSSSSSSS ' + hasDefault)
  }, [hasDefault])

  useEffect(() => {
    if (
      searchTextPlants != '' &&
      searchTextProducts != '' &&
      searchTextTools != ''
    ) {
      setHasDefault(true)
    }
  }, [searchTextPlants, searchTextProducts, searchTextTools])

  useEffect(() => {
    if (props.match.params.text != undefined) {
      setSearchTextProducts(props.match.params.text)
      setSearchTextPlants(props.match.params.text)
      setSearchTextTools(props.match.params.text)
    } else {
      setSearchTextProducts(null)
      setSearchTextPlants(null)
      setSearchTextTools(null)
    }
  }, [])

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            height: '100%',
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={openDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              Filters
            </Typography>
          </DrawerHeader>
          <Grid className='scrollHide' item style={{ padding: 2 }}>
            {/* ////////////////////////// Slidbar For Filter ////////////////////////// */}
            {/* /////// Filter /////// */}
            {/* <Button onClick={() => handleFilterEnvironment(VALUEFROMUSER)}></Button> */}

            <FormControl component='fieldset' sx={{ mb: 1, ml: 1 }}>
              <FormLabel component='sort'>Categories</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='controlled-radio-buttons-group'
                value={searchPlantData}
                onChange={handleChangeTypeData}
              >
                <FormControlLabel
                  checked={filterType === 0}
                  value={'all'}
                  control={<Radio />}
                  label='All'
                />
                <FormControlLabel
                  checked={filterType === 1}
                  value={'plant'}
                  control={<Radio />}
                  label='Plants'
                />
                <FormControlLabel
                  checked={filterType === 2}
                  value={'tool'}
                  control={<Radio />}
                  label='Tools'
                />
              </RadioGroup>
            </FormControl>
            {filterType === 1 && (
              <Box>
                <FormControl fullWidth sx={{ mt: 1, ml: 1 }}>
                  <InputLabel id='demo-simple-select-label'>Water</InputLabel>
                  <Select
                    sx={{ height: '40%', width: '95%' }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={filterWaterPlants}
                    label='Water'
                    onChange={handleChangeWater}
                  >
                    <MenuItem value={'none'}>None</MenuItem>
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'much'}>Much</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 1, mb: 1, ml: 1 }}>
                  <InputLabel id='demo-simple-select-label'>Light</InputLabel>
                  <Select
                    sx={{ height: '40%', width: '95%' }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={filterLightPlants}
                    label='Light'
                    onChange={handleChangeLight}
                  >
                    <MenuItem value={'none'}>None</MenuItem>
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'much'}>Much</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box sx={{ mt: 1, ml: 2, mr: 2, width: 290 }}>
              <Typography
                id='input-slider'
                gutterBottom
                sx={{ ml: -1, mr: -1 }}
              >
                Range of Price
              </Typography>
              <Slider
                justifyContent='center'
                alignItems='center'
                defaultValue={0}
                step={1}
                aria-label='Always visible'
                valueLabelDisplay='on'
                getAriaLabel={() => 'Temperature range'}
                value={[
                  filterTempPriceLowerPlants,
                  filterTempPriceHigherPlants === ''
                    ? 35
                    : filterTempPriceHigherPlants,
                ]}
                onChange={tempHandleChangePrice}
                marks={marks}
                min={0}
                max={35}
                sx={{ mt: 4, ml: 1 }}
              />
            </Box>
            <Grid container justifyContent='flex-end'>
              <Grid item xs={4} sx={{ pr: 1 }}>
                <Button
                  onClick={handleChangePrice}
                  variant='outlined'
                  sx={{ width: '100%' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
        {/* <br />
      <Grid container style={{ minHeight: '100vh' }} xs={24}>
        <Grid item xs={6} sm={3} style={{ padding: 10 }}>
        <Grid
          item
          xs={20} 
          sm={10}
          display='flex'
          marginLeft={0}
          direction='column'
        >
          <Grid>
          <TextField
            onChange={(e) => handleChange(e)}
            size='small'
            id='outlined-search'
            name='SearchField'
            label='Search..'
            type='search'>
          </TextField>
          
          <IconButton onClick={() => {handleSearchPlantsByName(searchText) ;handleSearchToolsByName(searchText) }}>
            <SearchIcon className='Searchicon' fontSize='large' />
          </IconButton>
          </Grid>
          
          <Chip
            width="10px"
            label={'You searched for ' + searchTextPlants}
            variant='outlined'
          />
        </Grid>
        </Grid>
        <Grid
          container
          item
          xs={18}
          sm={9}
          alignItems='flex-start'
          justify='space-between'
          style={{ padding: 10 }}
        >
        <Grid
          item
          xs={4}
          sm={2}
          alignItems='flex-end'
          justifyContent='flex-end'
          className='searchBox'
        >
          <IconButton href='/' onClick={() => history.push('/')}>
            <Home fontSize='large' />
            Home
          </IconButton>
        </Grid>
      </div> */}
        <Main open={openDrawer}>
          <Box>
            <AppBar
              SearchOption={false}
              TicketOption={true}
              CartOption={true}
              AuthorizationOption={true}
              DrawerOption={true}
              isopen={openDrawer}
              OpenMenu={handleDrawerOpen}
              CloseMenu={handleDrawerClose}
            />
            <Grid
              container
              style={{ minHeight: '100vh' }}
              sx={{ mt: { xs: 8, sm: 0 } }}
              xs={24}
            >
              <Grid
                container
                item
                xs={24}
                alignItems='center'
                justify='center'
                direction='column'
                style={{ padding: 10 }}
              >
                <Grid
                  item
                  sx={{ width: '100%' }}
                  style={{ minHeight: '100vh' }}
                >
                  <Box sx={{ width: '100%' }}>
                    {/* ////////////////////////// NavBar Sort ////////////////////////// */}
                    <Grid
                      container
                      alignItems={xsScreen ? 'center' : 'left'}
                      direction={xsScreen ? 'row' : 'column'}
                      sx={{ pr: 2, pl: 2 }}
                    >
                      <Grid item>
                        {!xsScreen && (
                          <SearchBar
                            sx={{ pt: 5, pb: 5 }}
                            funcSearchPlantsByName={handleSearchPlantsByName}
                            funcSearchToolsByName={handleSearchToolsByName}
                          />
                        )}
                      </Grid>
                      <Grid
                        item
                        container
                        direction='row'
                        alignItems='center'
                        sx={{ flex: 1 }}
                      >
                        <Grid item container sx={{ flex: 1 }}>
                          <SortNavBar
                            sx={{ flex: 1 }}
                            handleSortKindPlants={FuncSortKindPlants}
                            handleSortOrderPlants={FuncSortOrderPlants}
                            handleSortKindTools={FuncSortKindTools}
                            handleSortOrderTools={FuncSortOrderTools}
                            handleSortKindProducts={FuncSortKindProducts}
                            handleSortOrderProducts={FuncSortOrderProducts}
                          />
                        </Grid>

                        {!isFilterd && (
                          <Grid>
                            <IconButton
                              color='secondary'
                              aria-label='add an alarm'
                              onClick={Reset}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        )}
                        <Button
                          variant='text'
                          startIcon={
                            <Badge
                              color='secondary'
                              variant='dot'
                              invisible={isFilterd}
                            >
                              <FilterListIcon />
                            </Badge>
                          }
                          onClick={handelDrawer}
                        >
                          Filters
                        </Button>
                      </Grid>
                      <Grid item>
                        {xsScreen && (
                          <SearchBar
                            funcSearchPlantsByName={handleSearchPlantsByName}
                            funcSearchToolsByName={handleSearchToolsByName}
                            default={searchTextProducts}
                            funcSearchProductsByName={
                              handleSearchProductsByName
                            }
                          />
                        )}
                      </Grid>
                    </Grid>

                    {/* ////////////////////////// Samples ////////////////////////// */}
                    {/* /////// Sort /////// */}
                    {/* <Button onClick={() => handleToolsSortBy_Name_ASC()}></Button> */}
                    <Box sx={{ width: '100%' }} ref={myRef0}>
                      {searchProductData.length != 0 && filterType === 0 && (
                        <Grid sx={{ display: 'flex', ml: 2 }}>
                          {/*<div className='showProductSubs'>Products</div>
                          <Divider variant='middle' />*/}
                          <Grid container item spacing={2} sx={{ p: 2 }}>
                            <ShowProduct data={searchProductData} />
                          </Grid>
                        </Grid>
                      )}
                      {searchProductData.length === 0 && filterType === 0 && (
                        <div>
                          {searchProductDataLoaded === true && (
                            <Alert severity='info'>
                              There is NO Product right now! Come Back soon ...
                            </Alert>
                          )}
                          {searchProductDataLoaded === false && (
                            <Grid sx={{ width: '100%',p: 0  }}>
                              <SkeletonArticle />
                            </Grid>
                          )}
                        </div>
                      )}
                    </Box>
                    <Box sx={{ width: '100%' }} ref={myRef1}>
                      {searchPlantData.length != 0 && filterType === 1 && (
                        <Grid sx={{ display: 'flex', ml: 2 }}>
                          {/*<div className='showProductSubs'>Plants</div>
                          <Divider variant='middle' />*/}
                          <Grid container spacing={2} sx={{ p: 2 }}>
                            <ShowProduct data={searchPlantData} />
                          </Grid>
                        </Grid>
                      )}
                      {searchPlantData.length === 0 && filterType === 1 && (
                        <div>
                          {searchPlantDataLoaded === true && (
                            <Alert severity='info'>
                              There is NO plant right now! Come Back soon ...
                            </Alert>
                          )}
                          {searchPlantDataLoaded === false && (
                            <Grid sx={{ width: '100%', p: 2 }}>
                              <SkeletonArticle />
                            </Grid>
                          )}
                        </div>
                      )}
                    </Box>
                    <Box sx={{ width: '100%' }} ref={myRef2}>
                      {searchToolData.length != 0 && filterType === 2 && (
                        <Grid sx={{ display: 'flex', ml: 2 }}>
                          {/*<div className='showProductSubs'>Tools</div>
                          <Divider variant='middle' />*/}
                          <Grid container spacing={2} sx={{ p: 2 }}>
                            <ShowProduct data={searchToolData} />
                          </Grid>
                        </Grid>
                      )}
                      {searchToolData.length === 0 && filterType === 2 && (
                        <div>
                          {searchToolDataLoaded === true && (
                            <Alert severity='info'>
                              There is NO Tool right now! Come Back soon ...
                            </Alert>
                          )}
                          {searchToolDataLoaded === false && (
                            <Grid sx={{ width: '100%', p: 2  }} >
                              <SkeletonArticle />
                            </Grid>
                          )}
                        </div>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  {filterType === 0 && (
                    <Pagination
                      className='pagination_center'
                      count={resultPaginationPageProducts}
                      page={paginationPageProducts}
                      onChange={handleChangeProduct}
                    />
                  )}
                  {filterType === 1 && (
                    <Pagination
                      className='pagination_center'
                      count={resultPaginationPagePlants}
                      page={paginationPagePlants}
                      onChange={handleChangePlant}
                    />
                  )}
                  {filterType === 2 && (
                    <Pagination
                      className='pagination_center'
                      count={resultPaginationPageTools}
                      page={paginationPageTools}
                      onChange={handleChangeTool}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Main>

        {/* ////////////////////////// Samples ////////////////////////// */}
        {/* /////// Pagination /////// */}
        {/* <Button onClick={() => handlePaginationPlants(Count, Page)}></Button> */}
      </Box>
    </div>
  )
}

export default SearchResultProduct
