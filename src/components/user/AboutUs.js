// src/pages/AboutUs.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
// Example placeholder images
import placeholderImg from '../assets/teammember.jpg';

export default function AboutUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', m: 0, p: 0 }}>
      {/* 1) BIG YELLOW SECTION: Left text, right black & white image */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          backgroundColor: '#FFD600', // bright Duke yellow
          color: '#000',
          minHeight: '80vh',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Text */}
        <Box sx={{ flex: 1, p: { xs: 3, md: 6 } }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', mb: 3, lineHeight: 1.2 }}
          >
            WE STRIVE FOR QUALITY,<br />
            AESTHETIC AND MIXING OUR<br />
            SHARED PASSIONS
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
            For skateboarding, design, photography, & cinematography.
            Our skateboards are produced with premium wood and designed in
            collaboration by visual artists from around the world with
            unique backgrounds.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 0,
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Shop Now
          </Button>
        </Box>

        {/* Right Image (black & white) */}
        <Box sx={{ flex: 1 }}>
          <img
            src={placeholderImg}
            alt="Skateboard Lifestyle"
            style={{
              width: '100%',
              height: isMobile ? 'auto' : '80vh',
              objectFit: 'cover',
              filter: 'grayscale(100%)', // black & white
            }}
          />
        </Box>
      </Box>

      {/* 2) OUR STORY SECTION: black background, white text */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          OUR STORY
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Spring 2021 Collection
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7, mb: 4 }}
        >
          Founded by a group of passionate creators, we believe that skateboarding
          is more than a sport—it’s a way of life. Our mission is to empower
          artists, photographers, and skaters alike, bringing together a
          community of dreamers and doers.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: '#fff',
            borderColor: '#fff',
            borderRadius: 0,
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#fff',
              color: '#000',
            },
          }}
        >
          Learn More
        </Button>
      </Box>

      {/* 3) HALF IMAGE, HALF TEXT SECTION */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: '70vh',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Half: big black & white image */}
        <Box sx={{ flex: 1 }}>
          <img
            src={placeholderImg}
            alt="Half Section"
            style={{
              width: '100%',
              height: isMobile ? 'auto' : '70vh',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
            }}
          />
        </Box>

        {/* Right Half: white bg, black text */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            color: '#000',
            p: { xs: 3, md: 6 },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Premium Boards
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
            Our decks are made with premium wood, designed by visual artists
            from around the globe, bridging the gap between functional skate
            art and modern design. We want you to be part of this story,
            whether cruising city streets or conquering the skatepark.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 0,
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Shop Decks
          </Button>
        </Box>
      </Box>

      {/* 4) TEAM SECTION */}
      <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', py: { xs: 6, md: 10 }, px: 2 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Team
        </Typography>
        <Grid container spacing={0}>
          {/* Card 1 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #ccc', m: 0 }}>
              <img
                src={placeholderImg}
                alt="Naveen"
                style={{ width: '100%', height: 280, objectFit: 'cover' }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Naveen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Founder & CEO
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* Card 2 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #ccc', m: 0 }}>
              <img
                src={placeholderImg}
                alt="Venkata Mahesh"
                style={{ width: '100%', height: 280, objectFit: 'cover' }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Venkata Mahesh
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Head of Product
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* Card 3 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #ccc', m: 0 }}>
              <img
                src={placeholderImg}
                alt="Shrishika Ramaiah"
                style={{ width: '100%', height: 280, objectFit: 'cover' }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Shrishika Ramaiah
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Human Resources
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
