import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';


import teamMember1 from '../assets/teammember1.jpg';
import teamMember2 from '../assets/teammember2.jpg';
import teamMember3 from '../assets/teammember5.jpg';

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

 
  const teamMembers = [
    { name: 'Shrishika Ramaiah', role: 'Founder & CEO', image: teamMember1 },
    { name: 'Venkata Mahesh', role: 'Head of Product', image: teamMember2 },
    { name: 'Naveen', role: 'Human Resources', image: teamMember3 },
  ];

  return (
    <Box sx={{ m: 0, p: 0, width: '100%' }}>
      {}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
       
          minHeight: { xs: '80vh', md: '100vh' },
          backgroundColor: '#FFD600',
          color: '#000',
        }}
      >
        {/* LEFT: Text Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 3, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              lineHeight: 1.2,
              textTransform: 'uppercase',
            
              fontSize: { xs: '2rem', md: '3.5rem' },
            }}
          >
            Adventure Gear at its Best
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              maxWidth: { xs: '100%', md: 600 },
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            We blend performance and style to deliver premium outdoor gear. 
            Whether you’re conquering rugged trails or enjoying a weekend escape, 
            our collections are designed for the true adventurer.
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
              px: { xs: 2, md: 4 },
              py: { xs: 1, md: 1.5 },
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Explore Gear
          </Button>
        </Box>

        {/* RIGHT: Hero Image */}
        <Box
          sx={{
            flex: 1,
            
            height: { xs: 'auto', md: '100vh' },
            minHeight: { xs: 300, md: '100vh' },
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={teamMember1}
            alt="Adventure in Action"
            sx={{
              width: '100%',
             
              maxHeight: { xs: 500, md: '100vh' },
              height: '100%',
             
              objectFit: { xs: 'contain', md: 'cover' },
              filter: 'grayscale(100%)',
            }}
          />
        </Box>
      </Box>

      {}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#000',
          color: '#FFD600',
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          OUR STORY
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          The Journey Begins
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.7,
            mb: 4,
            fontSize: { xs: '0.9rem', md: '1rem' },
          }}
        >
          Founded by passionate explorers and innovators, our brand was created out of the desire
          to merge cutting-edge design with unbeatable durability. Each piece in our collection
          is a testament to our commitment to quality and our relentless spirit of adventure.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: '#FFD600',
            borderColor: '#FFD600',
            borderRadius: 0,
            px: { xs: 2, md: 4 },
            py: { xs: 1, md: 1.5 },
            '&:hover': {
              backgroundColor: '#FFD600',
              color: '#000',
            },
          }}
        >
          Learn More
        </Button>
      </Box>

      {}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          minHeight: { xs: 'auto', md: '70vh' },
        }}
      >
        {/* LEFT: Grayscale Image */}
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            height: { xs: 'auto', md: '70vh' },
            minHeight: { xs: 300, md: '70vh' },
          }}
        >
          <Box
            component="img"
            src={teamMember2}
            alt="Premium Gear"
            sx={{
              width: '100%',
              // For mobile, use contain to shrink if needed
              objectFit: { xs: 'contain', md: 'cover' },
              maxHeight: { xs: 500, md: '100%' },
              height: '100%',
              filter: 'grayscale(100%)',
            }}
          />
        </Box>

        {/* RIGHT: White Background, Black Text */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            color: '#000',
            p: { xs: 3, md: 6 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Built for Adventure
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              maxWidth: 600,
              fontSize: { xs: '0.9rem', md: '1rem' },
              mx: { xs: 'auto', md: 0 },
            }}
          >
            Our gear is engineered to meet the rigorous demands of the great outdoors.
            Every product we offer is crafted using premium materials and inspired by
            the spirit of discovery. Join us on our mission to redefine adventure.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 0,
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/******************************************************************
       * TEAM SECTION
       ******************************************************************/}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#f5f5f5',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
          }}
        >
          Our Team
        </Typography>

        <Grid container spacing={2}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  boxShadow: 1,
                  overflow: 'hidden',
                  borderRadius: 1,
                  height: '100%', // Let item fill available space
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flex: '0 0 auto' }}>
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: '100%',
                      // Reduce maxHeight on mobile to avoid huge images
                      maxHeight: { xs: 300, md: 320 },
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      mt: 0.5,
                    }}
                  >
                    {member.role}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUs;
