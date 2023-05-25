import "./style.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Container, Tooltip, Grid, Avatar, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import { Fade } from "react-awesome-reveal";
import Carousel from "react-multi-carousel";

import Amir from "../../assets/Images/Landing/Amirmohammad.jpg";
import apartmentPlants from "../../assets/Images/Landing/apartmentPlants.jpg";
import Background from "../../assets/Images/Landing/Background.png";
import Background3 from "../../assets/Images/Landing/Background3.png";
import Deniz from "../../assets/Images/Landing/Deniz.jpg";
import GardenPlants from "../../assets/Images/Landing/GardenPlants.jpg";
import Hamed from "../../assets/Images/Landing/Hamed.jpg";
import narges from "../../assets/Images/Landing/Narges.jpg";
import Navid from "../../assets/Images/Landing/Navid.jpg";
import YardPlants from "../../assets/Images/Landing/YardPlants.jpg";
// import AppBar from "../../Components/AppBar";

import "react-multi-carousel/lib/styles.css";

export default function LandingPage() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <Grid container className="Landing-appbar">
        <Grid xs={9} />
        <Grid xs={1}>
          <a className="Landing-appbar-item" href="Homepage">
            Home
          </a>
        </Grid>
        <Grid xs={1}>
          <a className="Landing-appbar-item" href="signin">
            Log In
          </a>
        </Grid>
        <Grid xs={1}>
          <a className="Landing-appbar-item" href="signup">
            Sign Up
          </a>
        </Grid>
      </Grid>
      <Box
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        alt="Background"
      >
        <Grid container spacing={2}>
          <Grid xs={4} />
          <Grid xs={8} className="Landing-title">
            <Grid>
              <p className="Landing-title-name text-center">TALEBI</p>
            </Grid>
            <Grid className="Introduction">
              <Typography align="center" color="black" fontSize={20}>
                {" "}
                We often don{`'`}t think to buy plant online. But what if we
                tell you that you can now order the most beautiful plants right
                from home?
              </Typography>
              <a href="Homepage" className="Landing-Button">
                Click here to start
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid
        className="BlackBackground"
        style={{
          backgroundImage: `url(${Background3})`,
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container className="Container" maxWidth="lg">
          <Typography
            variant="h4"
            className="TypographyKadoo"
            sx={{
              marginTop: { sm: "10%", xs: "25%", md: "10%" },
              paddingBottom: { sm: "5%", xs: "15%", md: "5%" },
            }}
          >
            <Typography fontSize={40}>Why Talebi</Typography>
          </Typography>
          <Carousel
            fade
            swipeable
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr // means to render carousel on server-side.
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-padding-40-px"
          >
            <div>
              <Card className="Card">
                <CardMedia
                  className="Media"
                  image={apartmentPlants}
                  alt="Apartment Plants"
                  sx={{
                    maxWidth: { sm: 400, xs: 400, md: 400 },
                    height: { sm: 270, xs: 400, md: 250 },
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    color="#212121"
                    varient="h5"
                    component="h2"
                  >
                    Apartment plants
                  </Typography>
                  <Typography color="#00c853" variant="body2" component="p">
                    Fill your living space with beautiful houseplants to making
                    your apartment feel more welcoming and also for help clean
                    the air.
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
                  sx={{
                    maxWidth: { sm: 400, xs: 400, md: 400 },
                    height: { sm: 270, xs: 400, md: 250 },
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    color="#212121"
                    varient="h5"
                    component="h2"
                  >
                    Garden plants
                  </Typography>
                  <Typography color="#00c853" variant="body2" component="p">
                    Buying Garden Plants online is easy from Talebi, as the
                    leading online garden nursery, our plant selection is first
                    to none.
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
                  sx={{
                    maxWidth: { sm: 400, xs: 400, md: 400 },
                    height: { sm: 270, xs: 400, md: 250 },
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    color="#212121"
                    varient="h5"
                    component="h1"
                  >
                    Yard plants
                  </Typography>
                  <Typography color="#00c853" variant="body2" component="p">
                    With a pinch of effort , you can have the lush, beautiful
                    garden of your dreams. The secret is to choose your plants
                    from Talebi.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Carousel>
        </Container>
      </Grid>
      <Grid
        style={{
          backgroundImage: `url(${Background3})`,
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container className="Container" maxWidth="lg">
          <Grid
            flexDirection="column"
            className="GridContactUs"
            sx={{ marginTop: { sm: 20, xs: 10, md: 10 } }}
          >
            <Typography fontSize={40}>About Us</Typography>
            <Typography
              align="center"
              marginLeft={4}
              marginRight={4}
              sx={{ marginTop: { sm: 20, xs: 5, md: 8 } }}
              color="black"
              width={600}
            >
              We were founded to transform spaces into attractive plantscapes
              that improve the quality of people’s lives. Research shows that
              plants support wellbeing, increase creativity, improve
              productivity, and provide many other benefits. We proudly use
              Biophilic principles in our plantscape designs; Principles that
              are rooted in the intrinsic bond between humans and other living
              organisms.
            </Typography>
          </Grid>
          <Carousel
            autoFocus
            centerMode
            className="Carousel"
            fade
            swipeable
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr // means to render carousel on server-side.
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-padding-40-px"
          >
            <div>
              <Tooltip title="Backend Developer" arrow>
                <Avatar
                  alt="Amirmohammad Sohrabi"
                  src={Amir}
                  sx={{
                    width: { sm: 200, xs: 150 },
                    height: { sm: 200, xs: 150 },
                    marginTop: { sm: 2, xs: 8, md: 4 },
                  }}
                />
              </Tooltip>
              <Typography align="center">Amirmohammad Sohrabi</Typography>
            </div>
            <div>
              <Tooltip title="Backend Developer" arrow>
                <Avatar
                  alt="Hamed FeizAbadi"
                  src={Hamed}
                  sx={{
                    width: { sm: 200, xs: 150 },
                    height: { sm: 200, xs: 150 },
                    marginTop: { sm: 2, xs: 8, md: 4 },
                  }}
                />
              </Tooltip>
              <Typography align="center">Hamed Feizabadi</Typography>
            </div>
            <div>
              <Tooltip title="Frontend Developer" arrow>
                <Avatar
                  alt="Navid Moosavizade"
                  src={Navid}
                  sx={{
                    width: { sm: 200, xs: 150 },
                    height: { sm: 200, xs: 150 },
                    marginTop: { sm: 2, xs: 8, md: 4 },
                  }}
                />
              </Tooltip>
              <Typography align="center">Navid Moosavizade</Typography>
            </div>
            <div>
              <Tooltip title="Frontend Developer" arrow>
                <Avatar
                  alt="Narges Mashayekhi"
                  src={narges}
                  sx={{
                    width: { sm: 200, xs: 150 },
                    height: { sm: 200, xs: 150 },
                    marginTop: { sm: 2, xs: 8, md: 4 },
                  }}
                />
              </Tooltip>
              <Typography align="center">Narges Mashayekhi</Typography>
            </div>
            <div>
              <Tooltip title="Frontend Developer" arrow>
                <Avatar
                  alt="Deniz Ahmadi"
                  src={Deniz}
                  sx={{
                    width: { sm: 200, xs: 150 },
                    height: { sm: 200, xs: 150 },
                    marginTop: { sm: 2, xs: 9, md: 4 },
                  }}
                />
              </Tooltip>
              <Typography align="center">Deniz Ahmadi</Typography>
            </div>
          </Carousel>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ marginTop: { sm: 5, xs: 0, md: 10 } }}
          >
            <Grid item>
              <IconButton>
                <TelegramIcon
                  sx={{ width: { sm: 30, xs: 30 }, height: { sm: 30, xs: 30 } }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <WhatsAppIcon
                  sx={{ width: { sm: 30, xs: 30 }, height: { sm: 30, xs: 30 } }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <TwitterIcon
                  sx={{ width: { sm: 30, xs: 30 }, height: { sm: 30, xs: 30 } }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <EmailIcon
                  sx={{ width: { sm: 30, xs: 30 }, height: { sm: 30, xs: 30 } }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <PhoneIcon
                  sx={{ width: { sm: 30, xs: 30 }, height: { sm: 30, xs: 30 } }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
}
