import React, { useEffect, useState, useRef } from 'react'
import AppBar from '../../Components/AppBar'
import ShowProduct from '../../Components/ShowProduct/ShowProduct'
import { styled} from '@mui/material/styles'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Categorieslist from '../../Components/Catergories'
import Pagination from '@mui/material/Pagination'
import ProductTabs from '../../Components/ProductTabs/TabPanel'
import Grid from '@mui/material/Grid'
import ProductWithCategory from '../../Components/ProductsWithCategory'
import Card from '@mui/material/Card'

const drawerWidth = 240

const BgAnimation = styled(Card)`
  ${({ theme }) => `
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.Long,
  })};
  `}
`

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
  justifyContent: 'flex-end',
}))

export default function HomePage() {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [plantsData, setPlantsData] = React.useState([])
  const [toolsData, setToolsData] = React.useState([])
  const [isplant, setIsPlant] = React.useState(0)
  const [categoryText, setCategoryText] = React.useState('')
  const [page, setPage] = useState(1)
  const [allPage, setAllPage] = useState(1)
  const [products, setProducts] = useState([])

  const [bgColor, setBgColor] = React.useState('#ebf7f6')

  const ChangeBg = (p) => {
    if (p === 0) {
      setBgColor('#ebf7f6')
    }
    if (p === 1) {
      setBgColor('#e1fde6')
    }
    if (p === 2) {
      setBgColor('#fcf6d7')
    }
  }

  let myRef = useRef()

  const handlePlantsData = (value) => {
    setPlantsData(value)
    setIsPlant(1)
  }

  const handleCategoryText = (value) => {
    setCategoryText(value)
  }

  const handleDelete = () => {
    fetchPagination()
    setIsPlant(0)
  }

  const handleToolsData = (value) => {
    setToolsData(value)
    setIsPlant(2)
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  useEffect(() => {
    if (isplant === 0) {
      fetchPagination()
    }
    if (isplant === 1) {
      fetchPlantsPagination(categoryText)
    }
    if (isplant === 2) {
      fetchToolsPagination(categoryText)
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'auto',
    })
  }, [page])

  const CloseScroll = () => {
    handleDrawerClose()
    setTimeout(() => {
      window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })
    }, 500)
  }

  const handleChange = (event, value) => {
    setTimeout(() => {
      window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })
    }, 500)
    setPage(value)
  }

  const handleChangePage = (value) => {
    setPage(value)
  }

  const handleChangeAllPage = (value) => {
    setAllPage(value)
  }

  const fetchPagination = () => {
    fetch('http://127.0.0.1:8000/api/allPagination/', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: '12', page: `${page}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data)
        setAllPage(data.pageCount)
      })
  }

  const fetchPlantsPagination = (name) => {
    if (name !== 'All plants') {
      fetch('http://127.0.0.1:8000/api/plantsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: '12', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlantsData(data.data)
          setAllPage(data.pageCount)
        })
    } else {
      fetch('http://127.0.0.1:8000/api/plantsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: '12', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlantsData(data.data)
          setAllPage(data.pageCount)
        })
    }
  }
  const fetchToolsPagination = (name) => {
    if (name !== 'All tools') {
      fetch('http://127.0.0.1:8000/api/toolsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: '12', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToolsData(data.data)
          setAllPage(data.pageCount)
        })
    } else {
      fetch('http://127.0.0.1:8000/api/toolsAdvanceSearch/', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: '12', page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToolsData(data.data)
          setAllPage(data.pageCount)
        })
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
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
          </DrawerHeader>
          <Categorieslist
            bindplants={handlePlantsData}
            bindtools={handleToolsData}
            bindall={handleDelete}
            settext={handleCategoryText}
            setpageall={handleChangeAllPage}
            setgivenpage={handleChangePage}
            ChangeBg={ChangeBg}
            hasClose={true}
            CloseScroll={CloseScroll}
          />
        </Drawer>
        <Main open={openDrawer}>
          <Box>
            <AppBar
              SearchOption={true}
              TicketOption={true}
              CartOption={true}
              AuthorizationOption={true}
              DrawerOption={true}
              isopen={openDrawer}
              OpenMenu={handleDrawerOpen}
              CloseMenu={handleDrawerClose}
            />
          </Box>
          <Slide
            direction='right'
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={900}
          >
            <Box sx={{ pt: { xs: 6, sm: 0 } }}>
              {/* <ContentHeader /> */}
              <ProductTabs />
              <Grid container display={{ xs: 'none', md: 'block' }}>
                <ProductWithCategory />
              </Grid>

              <BgAnimation
                style={{ backgroundColor: bgColor }}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  m: { xs: 3, sm: 5 },
                  pl: { xs: 2, sm: 2, md: 2 },
                  pr: { xs: 2, sm: 2, md: 8 },
                  pt: 2,
                  pb: 2,
                }}
                ref={myRef}
              >
                <Grid
                  display={{ xs: 'flex', md: 'none' }}
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='flex-start'
                >
                  <Grid item>
                    {isplant === 0 && <ShowProduct data={products} />}
                    {isplant === 1 && <ShowProduct data={plantsData} />}
                    {isplant === 2 && <ShowProduct data={toolsData} />}
                    <Grid
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      sx={{ mt: 3, mb: 1 }}
                    >
                      <Grid item>
                        {isplant === 0 && (
                          <Pagination
                            className='pagination_center'
                            count={allPage}
                            page={page}
                            onChange={handleChange}
                          />
                        )}
                        {isplant === 1 && (
                          <Pagination
                            className='pagination_center'
                            count={allPage}
                            page={page}
                            onChange={handleChange}
                          />
                        )}
                        {isplant === 2 && (
                          <Pagination
                            className='pagination_center'
                            count={allPage}
                            page={page}
                            onChange={handleChange}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </BgAnimation>
            </Box>
          </Slide>
        </Main>
      </Box>
    </div>
  )
}
