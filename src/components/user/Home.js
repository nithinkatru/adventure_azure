/*********************************************************************
 * Home.jsx
 *
 * This file defines a React component for the Home page.
 * It uses Material‑UI components, GlobalStyles, and responsive breakpoints
 * to enforce an edge‑to‑edge layout that adapts to mobile, tablet, and desktop.
 *
 * Author: Your Name
 * Date: YYYY-MM-DD
 *********************************************************************/

import React from 'react';
import {
  GlobalStyles,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import '../styles/Home.css';

import heroImg from '../assets/home.jpg'; 
import equipmentImg from '../assets/productssubcatergory.jpg'; 
import apparelImg from '../assets/apparel.jpg'; 
import featuredImg1 from '../assets/highlightImg.jpg'; 
import featuredImg2 from '../assets/highlightImg1.jpg'; 
import featuredImg3 from '../assets/bikingGear.jpg'; 
import sampleVideo from '../assets/sampleVideo.mp4'; 

import ScrollingMarquee from './Home/ScrollingMarquee';

const fullWidthBoxStyle = {
  width: '100vw',
  margin: 0,
  padding: 0,
  overflowX: 'hidden',
};

const Home = () => {
  return (
    <>
      {/* Remove default browser margins and paddings */}
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />

      {/* Outer container enforces edge‑to‑edge layout */}
      <Box className="home-page" sx={fullWidthBoxStyle}>

        {/* ====================== HERO SECTION ====================== */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '70vh', md: '100vh' },
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
          {/* Dark Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            }}
          />

          {/* Hero Text Container */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              px: 2,
              maxWidth: { xs: '90%', md: '60%' },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#FFD600',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
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
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {/* Redirect to /products for both buttons */}
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
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
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
                to="/products"
                variant="contained"
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  borderRadius: 0,
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
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
        </Box>

        {/* ================== EQUIPMENT & APPAREL SECTION ================== */}
        <Box sx={{ backgroundColor: '#fff', py: { xs: 4, md: 8 }, width: '100%' }}>
          <Grid container spacing={3}>
            {/* EQUIPMENT */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: 'relative',
                height: { xs: '250px', md: '500px' },
                overflow: 'hidden',
              }}
            >
              {/* Entire block is clickable */}
              <Link to="/products" style={{ display: 'block', height: '100%' }}>
                <Box
                  component="img"
                  src={equipmentImg}
                  alt="Equipment"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
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
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#000',
                      fontSize: { xs: '1.2rem', md: '1.8rem' },
                    }}
                  >
                    Equipment
                  </Typography>
                  <Button
                    component={Link}
                    to="/products"
                    sx={{
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: { xs: '0.8rem', md: '1rem' },
                      fontWeight: 'bold',
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Link>
            </Grid>

            {/* APPAREL */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: 'relative',
                height: { xs: '250px', md: '500px' },
                overflow: 'hidden',
              }}
            >
              {/* Entire block is clickable */}
              <Link to="/products" style={{ display: 'block', height: '100%' }}>
                <Box
                  component="img"
                  src={apparelImg}
                  alt="Apparel"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
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
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#000',
                      fontSize: { xs: '1.2rem', md: '1.8rem' },
                    }}
                  >
                    Apparel
                  </Typography>
                  <Button
                    component={Link}
                    to="/products"
                    sx={{
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: { xs: '0.8rem', md: '1rem' },
                      fontWeight: 'bold',
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>

        {/* ====================== SCROLLING MARQUEE ====================== */}
        <Box sx={{ width: '100%' }}>
          <ScrollingMarquee />
        </Box>

        {/* ======================= FEATURED GEAR ======================= */}
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 }, width: '100%' }}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Featured Gear
            </Typography>
            <Button
              component={Link}
              to="/products"
              sx={{
                textDecoration: 'none',
                color: '#000',
                fontSize: { xs: '0.8rem', md: '1rem' },
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              View All
            </Button>
          </Box>

          <Box sx={{ position: 'relative', width: '100%', maxWidth: '1200px', mx: 'auto', mt: 4 }}>
            {/* Left Navigation Arrow (If you're implementing carousel logic later) */}
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
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <ChevronLeft />
            </IconButton>

            <Grid container spacing={0} justifyContent="center">
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
                <Link to="/products">
                  <Box
                    component="img"
                    src={featuredImg1}
                    alt="Gear 1"
                    sx={{
                      width: '100%',
                      maxWidth: '200px',
                      height: 'auto',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  />
                </Link>
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
                <Link to="/products">
                  <Box
                    component="img"
                    src={featuredImg2}
                    alt="Gear 2"
                    sx={{
                      width: '100%',
                      maxWidth: '200px',
                      height: 'auto',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  />
                </Link>
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
                <Link to="/products">
                  <Box
                    component="img"
                    src={featuredImg3}
                    alt="Gear 3"
                    sx={{
                      width: '100%',
                      maxWidth: '200px',
                      height: 'auto',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  />
                </Link>
              </Grid>
            </Grid>

            {/* Right Navigation Arrow (If you're implementing carousel logic later) */}
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
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {/* ================== GEAR UP FOR ADVENTURE SECTION ================== */}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#FFD700',
            mt: 4,
            // Removed minHeight to let the content define the height
            width: '100%',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Text Section */}
          <Box
            sx={{
              flex: 1,
              color: '#000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: { xs: 2, md: 6 },
              pr: { xs: 2, md: 6 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textTransform: 'uppercase',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Gear Up for Adventure
            </Typography>
            <Typography sx={{ mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
              From rugged equipment to versatile apparel, our selection is built for those who crave the wild.
              Explore our top‑quality gear designed to withstand every adventure.
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
                // Reduce horizontal padding and set a maxWidth so the button is smaller
                px: 2,
                py: 1,
                maxWidth: '150px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#333',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                },
                mt: 2,
              }}
            >
              Shop Now
            </Button>
          </Box>

          {/* Video Section */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              // Force the video to fill this side
              height: '100%',
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
