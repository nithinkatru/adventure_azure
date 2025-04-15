// DecksApparelSection.jsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import deckImg from '../assets/decks.jpg';
import apparelImg from '../assets/apparel.jpg';

const DecksApparelSection = () => {
  return (
    <Box sx={{ my: 6, px: { xs: 2, md: 8 } }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          p: { xs: 2, md: 4 },
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Grid container spacing={3}>
          {/* LEFT: DECKS */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: { xs: '250px', md: '400px' },
            }}
          >
            <Box
              component="img"
              src={deckImg}
              alt="DECKS"
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
                color: '#000',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                DECKS
              </Typography>
              <Typography
                component={Link}
                to="/products/decks"
                sx={{
                  textDecoration: 'none',
                  color: '#000',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Shop now
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT: APPAREL */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: { xs: '250px', md: '400px' },
            }}
          >
            <Box
              component="img"
              src={apparelImg}
              alt="APPAREL"
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
                color: '#000',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                APPAREL
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
                Shop now
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DecksApparelSection;
