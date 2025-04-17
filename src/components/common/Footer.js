// src/components/common/Footer.jsx
import React from 'react';
import emailjs from 'emailjs-com';
import { Box, Container, Grid, Typography, TextField, Button, IconButton, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';
import { FaCcAmex, FaCcPaypal, FaCcMastercard, FaCcVisa, FaCcApplePay } from 'react-icons/fa';

const languages = ['English', 'French', 'Spanish'];
const currencies = ['USD ($)', 'CAD ($)', 'EUR (€)'];

function Footer() {
  const [language, setLanguage] = React.useState(languages[0]);
  const [currency, setCurrency] = React.useState(currencies[0]);
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleCurrencyChange = (e) => setCurrency(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sending email with:", email);

    // Using your provided IDs
    emailjs
      .sendForm('service_2hd1blm', 'template_2ecwpsj', e.target, 'YtIkzBR-lo3nRT-Xe')
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setSubscribed(true);
          setEmail('');
        },
        (error) => {
          console.error('Email send error:', error.text);
        }
      )
      .catch((error) => {
        console.error('Unexpected error:', error);
      });
  };

  return (
    <Box component="footer" sx={{ backgroundColor: '#fff', color: '#000', mt: 6 }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
        <Grid container spacing={4}>
          {/* ABOUT THE STORE */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>
              ABOUT THE STORE
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, fontFamily: 'Montserrat, sans-serif' }}>
              At Adventure Hub, we offer a curated selection of high‑quality adventure gear and apparel built for explorers and thrill‑seekers.
              Our products combine durability with cutting‑edge design for every expedition.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, fontFamily: 'Montserrat, sans-serif' }}>
              Driven by a passion for exploration, performance, and style – we ensure you’re always ready for the great outdoors.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2, fontFamily: 'Montserrat, sans-serif' }}>
              Adventure Hub
            </Typography>
          </Grid>

          {/* SHOP */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>
              SHOP
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/products" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                All Products
              </Link>
              <Link to="/departments" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                Departments
              </Link>
              <Link to="/sale" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                Sale
              </Link>
              <Link to="/picks" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                Our Picks
              </Link>
              <Link to="/new-arrivals" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                New Arrivals
              </Link>
            </Box>
          </Grid>

          {/* ABOUT */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>
              ABOUT
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/blog" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                Blog
              </Link>
              <Link to="/search" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                Search
              </Link>
              <Link to="/about-us" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                About Us
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                Contact Us
              </Link>
              <Link to="/faqs" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                FAQs
              </Link>
            </Box>
          </Grid>

          {/* NEWSLETTER */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>
              NEWSLETTER
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, fontFamily: 'Montserrat, sans-serif' }}>
              Sign up for exclusive offers, adventure tips, inspiring stories, events, and more.
            </Typography>
            {/* The subscription form */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="address@example.com"
                  size="small"
                  name="user_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ flex: 1 }}
                  required
                />
                <Button type="submit" variant="contained" sx={{ bgcolor: '#000', color: '#fff' }}>
                  Subscribe
                </Button>
                {/* Hidden fields to pass required template parameters */}
                <input type="hidden" name="title" value="Contact Us" />
                <input type="hidden" name="name" value="Adventure Hub" />
                <input type="hidden" name="email" value="replyto@example.com" />
              </Box>
            </form>
            {subscribed && (
              <Typography variant="body2" sx={{ color: 'green', fontFamily: 'Montserrat, sans-serif' }}>
                Thanks for subscribing!
              </Typography>
            )}
            {/* Social icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon sx={{ color: '#000' }} />
              </IconButton>
              <IconButton href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <TwitterIcon sx={{ color: '#000' }} />
              </IconButton>
              <IconButton href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon sx={{ color: '#000' }} />
              </IconButton>
              <IconButton href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon sx={{ color: '#000' }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* BOTTOM BAR */}
      <Box
        sx={{
          borderTop: '1px solid #ccc',
          mt: 4,
          py: 2,
          px: { xs: 2, md: 8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {/* Language & Currency selects */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            select
            variant="standard"
            value={currency}
            onChange={handleCurrencyChange}
            sx={{ minWidth: 80, fontFamily: 'Montserrat, sans-serif' }}
          >
            {currencies.map((item) => (
              <MenuItem key={item} value={item} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="standard"
            value={language}
            onChange={handleLanguageChange}
            sx={{ minWidth: 80, fontFamily: 'Montserrat, sans-serif' }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                {lang}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Payment Icons */}
        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
          <IconButton>
            <FaCcAmex style={{ fontSize: '2rem', color: '#000' }} />
          </IconButton>
          <IconButton>
            <FaCcPaypal style={{ fontSize: '2rem', color: '#000' }} />
          </IconButton>
          <IconButton>
            <FaCcMastercard style={{ fontSize: '2rem', color: '#000' }} />
          </IconButton>
          <IconButton>
            <FaCcVisa style={{ fontSize: '2rem', color: '#000' }} />
          </IconButton>
          <IconButton>
            <FaCcApplePay style={{ fontSize: '2rem', color: '#000' }} />
          </IconButton>
        </Box>

        {/* Footer Text */}
        <Typography variant="body2" sx={{ mt: { xs: 2, md: 0 }, fontFamily: 'Montserrat, sans-serif' }}>
          © 2025 Adventure Hub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
