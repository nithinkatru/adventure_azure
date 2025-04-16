import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import bannerImage from '../assests/banner.jpeg';

const HomeCarousel = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '70vh',
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: { xs: '20px', md: '0 5%' },
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          zIndex: 1, 
        }}
      >
        {/* Left Text Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            color: 'white',
            textAlign: { xs: 'center', md: 'left' },
            
            opacity: 0,
            animation: 'fadeInUp 1s forwards ease',
            '@keyframes fadeInUp': {
              to: { opacity: 1, transform: 'translateY(0)' },
              from: { opacity: 0, transform: 'translateY(10px)' },
            },
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Your shopping at
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            The Right Place
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
            sx={{ mt: 2 }}
          >
            GET STARTED
          </Button>
        </Grid>

        {/* Right Card Section */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            mt: { xs: '20px', md: 0 },
            opacity: 0,
            animation: 'fadeInUp 1s 0.3s forwards ease', 
            '@keyframes fadeInUp': {
              to: { opacity: 1, transform: 'translateY(0)' },
              from: { opacity: 0, transform: 'translateY(10px)' },
            },
          }}
        >
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                01 WONDERFUL HIKING COURSE | BLUE MOUNTAIN SKI RESORT, CANADA
              </Typography>
              <Typography variant="body2" gutterBottom>
                1 flight + 3 nights $275
              </Typography>
              <Typography variant="h5" sx={{ color: 'red', fontWeight: 'bold' }}>
                45% OFF
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Button variant="outlined" color="primary">
                  INFO
                </Button>
                <Button variant="contained" color="primary">
                  →
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeCarousel;
