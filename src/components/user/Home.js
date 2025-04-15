// src/components/user/Home.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  GlobalStyles,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import '../styles/Home.css';

/* 
  Import your assets – ensure filenames and paths match exactly.
  Replace these with adventure gear–related images and video.
*/
import heroImg from '../assets/home.jpg'; // Hero background image
import equipmentImg from '../assets/productssubcatergory.jpg'; // Equipment image
import apparelImg from '../assets/apparel.jpg'; // Apparel image
import featuredImg1 from '../assets/highlightImg.jpg'; // Featured gear image 1
import featuredImg2 from '../assets/highlightImg1.jpg'; // Featured gear image 2
import featuredImg3 from '../assets/bikingGear.jpg'; // Featured gear image 3
import sampleVideo from '../assets/sampleVideo.mp4'; // Adventure video

/* 
  Import the ScrollingMarquee component.
  (Ensure your ScrollingMarquee.jsx is updated to match your adventure theme.)
*/
import ScrollingMarquee from './Home/ScrollingMarquee';

const Home = () => {
  return (
    <>
      {/* Remove default browser margins and paddings */}
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />

      <Box className="home-page" sx={{ width: '100%', overflow: 'hidden' }}>
        {/* ----------------- HERO SECTION ----------------- */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#FFD700',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: { xs: '2rem', md: '4rem' },
              textAlign: 'center',
              mb: 2,
            }}
          >
            Welcome to Adventure Hub
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 3,
              letterSpacing: 1,
            }}
          >
            Your Ultimate Destination for Adventure Gear
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/products/equipment"
              variant="contained"
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                borderRadius: 0,
                px: 3,
                py: 1.5,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#333',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                },
              }}
            >
              Explore Gear
            </Button>
            <Button
              component={Link}
              to="/products/new-arrivals"
              variant="contained"
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                borderRadius: 0,
                px: 3,
                py: 1.5,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#333',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                },
              }}
            >
              New Arrivals
            </Button>
          </Box>
        </Box>

        {/* ----------------- EQUIPMENT & APPAREL SECTION ----------------- */}
        <Box sx={{ backgroundColor: '#fff', py: 8 }}>
          <Grid container spacing={3} sx={{ px: { xs: 2, md: 8 } }}>
            {/* EQUIPMENT */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: 'relative',
                height: { xs: '300px', md: '500px' },
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={equipmentImg}
                alt="Equipment"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '5%',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', mb: 1, color: '#000' }}
                >
                  Equipment
                </Typography>
                <Typography
                  component={Link}
                  to="/products/equipment"
                  sx={{
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  Shop Now
                </Typography>
              </Box>
            </Grid>

            {/* ADVENTURE APPAREL */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: 'relative',
                height: { xs: '300px', md: '500px' },
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={apparelImg}
                alt="Adventure Apparel"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '5%',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', mb: 1, color: '#000' }}
                >
                  Apparel
                </Typography>
                <Typography
                  component={Link}
                  to="/products/apparel"
                  sx={{
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  Shop Now
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ----------------- CONTINUOUS SCROLLING MARQUEE ----------------- */}
        <ScrollingMarquee />

        {/* ----------------- FEATURED GEAR SECTION ----------------- */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Featured Gear
            </Typography>
            <Typography
              component={Link}
              to="/products/featured"
              sx={{
                textDecoration: 'none',
                color: '#000',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'inline-block',
                mb: 2,
              }}
            >
              View All
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              mx: 'auto',
              mt: 4,
            }}
          >
            {/* Left Arrow */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: '#000',
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <ChevronLeft />
            </IconButton>

            <Grid container spacing={2} justifyContent="center">
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="img"
                  src={featuredImg1}
                  alt="Gear 1"
                  sx={{ maxWidth: '200px', height: 'auto' }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="img"
                  src={featuredImg2}
                  alt="Gear 2"
                  sx={{ maxWidth: '200px', height: 'auto' }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="img"
                  src={featuredImg3}
                  alt="Gear 3"
                  sx={{ maxWidth: '200px', height: 'auto' }}
                />
              </Grid>
            </Grid>

            {/* Right Arrow */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: '#000',
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {/* ----------------- ADVENTURE VIDEO SECTION (YELLOW BACKGROUND) ----------------- */}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#FFD700',
            mt: 4,
            minHeight: '500px',
          }}
        >
          {/* Text Section */}
          <Box
            sx={{
              flex: '1 1 50%',
              color: '#000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: { xs: 2, md: 6 },
              pr: { xs: 2, md: 6 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textTransform: 'uppercase',
              }}
            >
              Gear Up for Adventure
            </Typography>
            <Typography sx={{ mb: 3 }}>
              From rugged equipment to versatile apparel, our selection is built for those who crave the wild.
              Explore our top-quality gear designed to withstand every adventure.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                borderRadius: 0,
                px: 2,
                py: 1,
                width: 'fit-content',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#333',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                },
              }}
            >
              Shop Now
            </Button>
          </Box>
          {/* Video Section */}
          <Box
            sx={{
              flex: '1 1 50%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              component="video"
              src={sampleVideo}
              autoPlay
              muted
              loop
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        
        
      </Box>
    </>
  );
};

export default Home;
