import * as React from 'react';
import "./style.scss"
import Background from '../../assets/Images/Landing/Background.png'
import Background2 from '../../assets/Images/Landing/Background2.png'
import Background3 from '../../assets/Images/Landing/Background3.png'
import apartmentPlants from '../../assets/Images/Landing/apartmentPlants.jpg';
import GardenPlants from '../../assets/Images/Landing/GardenPlants.jpg';
import YardPlants from '../../assets/Images/Landing/YardPlants.jpg';
import Amir from '../../assets/Images/Landing/Amirmohammad.jpg';
import Hooriye from '../../assets/Images/Landing/Hoorie.jpg';
import Elnaz from '../../assets/Images/Landing/Elnaz.jpg';
import Navid from '../../assets/Images/Landing/Navid.jpg';
import Sara from '../../assets/Images/Landing/Sara.jpg';
import Deniz from '../../assets/Images/Landing/Deniz.jpg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Icon, List, ListItem, Tooltip } from '@mui/material';
import { Fade } from "react-awesome-reveal";
import AppBar from "../../Components/AppBar";
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { grid } from '@mui/system';

export default function LandingPage() {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          SearchOption={false}
          TicketOption={false}
          CartOption={false}
          DrawerOption={false}
          AuthorizationOption={true}
        />
      </Box>
      <Box 
      style={{backgroundImage:`url(${Background})`, 
      backgroundPosition: 'center' ,
      height: '100vh' ,
      backgroundRepeat: 'no-repeat' ,
      backgroundSize: 'cover', 
      position: 'relative' ,
      display: 'flex' ,
      justifyContent: 'center' ,
      flexDirection:"column",
      alignItems: 'center'}}
      alt='Background'
      >
        <Box className="Box1" flexDirection="column">
          <Fade>
            <h6 data-text="kadoo" className="KadooAnimation">kadoo</h6>
            <a href="/Homepage" className="Button">
              <span/>
              <span/>
              <span/>
              <span/>           
              Click here to start
            </a>
          </Fade>
        </Box>
        <Grid className="Introduction" sx={{ display: { xs: 'flex', sm: 'none', md: 'none' } }}>
          <Typography align="center">We often don't think to buy plant online. But what if we tell you that you can now order the most beautiful plants right from home?</Typography>
        </Grid>
      </Box>
      <Grid 
      className='BlackBackground'
      style={{backgroundImage:`url(${Background2})`,
      backgroundPosition: 'center' ,
      minHeight: '100vh' ,
      backgroundRepeat: 'no-repeat' ,
      backgroundSize: 'cover', 
      position: 'relative' ,
      display: 'flex' ,
      justifyContent: 'center' ,
      alignItems: 'center'}}>
      <Container className="Container"  maxWidth="lg" >
        <Typography variant="h4" className="TypographyKadoo" sx={{marginTop: {sm: '10%' , xs: '25%' , md: '10%'} , paddingBottom: {sm: '5%' , xs: '15%' , md: '5%'}}}>
          <h4>Why<span className="Span"> kadoo</span> :</h4>
        </Typography>
        <Carousel 
        fade
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
        >
          <div>
            <Card className="Card" >            
              <CardMedia
              className="Media"
              image={apartmentPlants}
              alt="Apartment Plants"
              sx={{ maxWidth: {sm: 400 , xs: 400 , md: 400} , height: { sm: 270 , xs:400 , md: 250}}}/>
              <CardContent >
                <Typography gutterBottom color="#212121" varient="h5" component="h2">
                  Apartment plants
                </Typography>
                <Typography color="#7FC7AD" variant="body2" component="p">
                  Fill your living space with beautiful houseplants to making your apartment feel more
                  welcoming and also for help clean the air.
                </Typography>
              </CardContent>
            </Card>  
          </div>
          <div>
            <Card className="Card">            
              <CardMedia
              className="Media"
              image={GardenPlants}
              alt="Garden Plants"
              sx={{ maxWidth: {sm: 400 , xs: 400 , md: 400} , height: { sm: 270 , xs:400 , md: 250}}}/>
              <CardContent >
                <Typography gutterBottom color="#212121" varient="h5" component="h2">
                  Garden plants
                </Typography>
                <Typography color="#7FC7AD" variant="body2" component="p">
                  Buying Garden Plants online is easy from Kadoo, as the leading online 
                  garden nursery, our plant selection is first to none.
                </Typography>
              </CardContent>
            </Card> 
          </div>
          <div>
            <Card className="Card">            
              <CardMedia
              className="Media"
              image={YardPlants}
              alt="Yard Plants"
              sx={{ maxWidth: {sm: 400 , xs: 400 , md: 400} , height: { sm: 270 , xs:400 , md: 250}}}/>
              <CardContent >
                <Typography gutterBottom color="#212121" varient="h5" component="h1">
                  Yard plants
                </Typography>
                <Typography color="#7FC7AD" variant="body2" component="p">
                  With a pinch of effort , you can have the lush, beautiful garden of your 
                  dreams. The secret is to choose your plants from Kadoo.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Carousel>
        </Container>
      </Grid>
      <Grid 
      style={{backgroundImage:`url(${Background3})`,
      backgroundPosition: 'center' ,
      minHeight: '100vh' ,
      backgroundRepeat: 'no-repeat' ,
      backgroundSize: 'cover', 
      position: 'relative' ,
      display: 'flex' ,
      justifyContent: 'center' ,
      flexDirection: 'column' ,
      alignItems: 'center'}}>
      <Container className="Container"  maxWidth="lg" >
        <Grid flexDirection= 'column' className="GridContactUs" sx={{ marginTop: {sm: 20 , xs: 10 , md: 10} }}>
          <Typography variant="h4" className="TypographyContactUs" align='center'>
            <h4>Meet The<span className="Span"> Team</span> :</h4>
          </Typography>
          <Typography align='center' marginLeft={4} marginRight={4} sx={{ marginTop: {sm: 20 , xs: 5 , md: 8} }} color="white"> 
            We were founded to transform spaces into attractive plantscapes that improve the quality of people’s lives.
            Research shows that plants support wellbeing, increase creativity, improve productivity, and provide many other benefits. 
            We proudly use Biophilic principles in our plantscape designs; Principles that are rooted in the intrinsic bond between humans and other living organisms.
          </Typography>
        </Grid>
        <Carousel 
        autoFocus={true}
        centerMode={true}
        className='Carousel'
        fade
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
        >
          <div>
            <Tooltip title="Amirmohammad Sohrabi" arrow>
              <Avatar
              alt="Amirmohammad Sohrabi"
              src={Amir}
              sx={{ width: {sm: 200 , xs: 150 }, height: { sm: 200 , xs:150 } ,  marginTop: {sm: 2 , xs: 8 , md: 4}}}
            />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Hoorie Sabzevari" arrow>
              <Avatar
              alt="Hoorie Sabzevari"
              src={Hooriye}
              sx={{ width: {sm: 200 , xs: 150}, height: { sm: 200 , xs:150 } ,  marginTop: {sm: 2 , xs: 8 , md: 4}}}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Elnaz Rezaee" arrow>
              <Avatar
              alt="Elnaz Rezaee"
              src={Elnaz}
              sx={{ width: {sm: 200 , xs: 150}, height: { sm: 200 , xs:150 } , marginTop: {sm: 2 , xs: 8 , md: 4}}}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Navid Moosavizade" arrow>
              <Avatar
              alt="Navid Moosavizade"
              src={Navid}
              sx={{ width: {sm: 200 , xs: 150}, height: { sm: 200 , xs:150 } ,  marginTop: {sm: 2 , xs: 8 , md: 4}}}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Sara Yoonesi" arrow>
              <Avatar
              alt="Sara Yoonesi"
              src={Sara}
              sx={{ width: {sm: 200 , xs: 150}, height: { sm: 200 , xs:150 } ,  marginTop: {sm: 2 , xs: 8 , md: 4}}}
              />
            </Tooltip>           
          </div>
          <div>
            <Tooltip title="Deniz Ahmadi" arrow>
              <Avatar
              alt="Deniz Ahmadi"
              src={Deniz}
              sx={{ width: {sm: 200 , xs: 150}, height: { sm: 200 , xs:150 } ,  marginTop: {sm: 2 , xs: 9 , md: 4}}}
              />
            </Tooltip>
          </div>
        </Carousel>
        <Grid container spacing={3} justifyContent="center" sx={{ marginTop: {sm: 5 , xs: 0 , md: 10} }}>
          <Grid item >
            <IconButton>
              <TelegramIcon  sx={{ width: {sm: 30 , xs: 30}, height: { sm: 30 , xs:30 }}}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <WhatsAppIcon  sx={{ width: {sm: 30 , xs: 30}, height: { sm: 30 , xs:30 }}}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <TwitterIcon  sx={{ width: {sm: 30 , xs: 30}, height: { sm: 30 , xs:30 }}}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <EmailIcon  sx={{ width: {sm: 30 , xs: 30}, height: { sm: 30 , xs:30 }}}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <PhoneIcon  sx={{ width: {sm: 30 , xs: 30}, height: { sm: 30 , xs:30 }}}/>
            </IconButton>  
          </Grid>
        </Grid>
      </Container>
        
      </Grid>
    </div>
  );
}