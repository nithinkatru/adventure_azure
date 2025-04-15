// src/components/common/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Typography,
  TextField,
  Collapse,
  Snackbar,
  Alert,
  styled
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { alpha } from '@mui/material/styles';


import { FaShoppingCart, FaUser, FaBars, FaSearch } from 'react-icons/fa';


import { getToken, removeUser } from '../services/authService';

import { getProductSuggestions } from '../api';


const useIsHomePage = () => {
  const location = useLocation();
  return location.pathname === '/';
};


const NavBarContainer = styled(AppBar)(({ isHome, scrolled }) => ({
  top: 0,
  left: 0,
  width: '100%',
  boxShadow: 'none',
  zIndex: 9999,
  background:'black',
  transition: 'background-color 0.3s ease, position 0.3s ease',
}));

const NavToolbar = styled(Toolbar)({
  minHeight: '70px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
});


const LogoText = styled(Typography)({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  fontFamily: 'Montserrat, sans-serif',
  textDecoration: 'none',
  textTransform: 'uppercase',
  color: '#fff',
  '&:hover': {
    color: alpha('#fff', 0.8),
  },
});


const NavButton = styled(Button)({
  fontFamily: 'Montserrat, sans-serif',
  color: '#fff',
  fontWeight: 'bold',
  margin: '0 8px',
  textTransform: 'uppercase',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: alpha('#fff', 0.1),
  },
});

export default function NavBar({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = useIsHomePage();


  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(decodedToken.role === 'admin');
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);


  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    removeUser();
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
    handleMenuClose();
  };


  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setSearchQuery('');
    setSuggestions([]);
  };

  const fetchSuggestions = async (query) => {
    try {
      const data = await getProductSuggestions(query);
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setSearchQuery(newInputValue);
    if (newInputValue.trim().length >= 2) {
      fetchSuggestions(newInputValue);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (event, value) => {
    if (value && value._id) {
      navigate(`/products/${value._id}`);
      setShowSearch(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchQuery.trim() === '') {
        setSnackMessage('Please enter a search query.');
        setSnackOpen(true);
      } else if (suggestions.length === 0) {
        setSnackMessage('No suggestions found.');
        setSnackOpen(true);
      }
    }
  };

  return (
    <>
      <NavBarContainer isHome={isHome} scrolled={scrolled}>
        <NavToolbar>
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoText variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
              Adventure Gear
            </LogoText>
          </Box>

          {/* Right: Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <NavButton component={Link} to="/">Home</NavButton>
            <NavButton component={Link} to="/about">About</NavButton>
            <NavButton component={Link} to="/orders">Orders</NavButton>
            <NavButton component={Link} to="/products">Products</NavButton>
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <NavButton component={Link} to="/admin/products">Admin Products</NavButton>
                  <NavButton component={Link} to="/admin/orders">Admin Orders</NavButton>
                  <NavButton component={Link} to="/admin/users">Admin Users</NavButton>
                  <NavButton component={Link} to="/admin/categories">Admin Categories</NavButton>
                  <NavButton onClick={handleLogout}>Logout</NavButton>
                </>
              ) : (
                <>
                  <NavButton component={Link} to="/profile">Profile</NavButton>
                  <NavButton onClick={handleLogout}>Logout</NavButton>
                </>
              )
            ) : (
              <>
                <NavButton component={Link} to="/register">Register</NavButton>
                <NavButton component={Link} to="/login">Login</NavButton>
              </>
            )}
            <IconButton onClick={toggleSearch} sx={{ color: '#fff', ml: 1 }}>
              <FaSearch />
            </IconButton>
            <IconButton component={Link} to="/cart" sx={{ color: '#fff', ml: 1 }}>
              <Badge badgeContent={cartCount} color="error">
                <FaShoppingCart />
              </Badge>
            </IconButton>
            <IconButton component={Link} to="/profile" sx={{ color: '#fff', ml: 1 }}>
              <FaUser />
            </IconButton>
          </Box>

          {/* Right: Mobile Nav */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ color: '#fff' }}
            >
              <FaBars />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/about">About</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/products">Products</MenuItem>
              {isLoggedIn ? (
                isAdmin ? (
                  <>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/admin/products">
                      Admin Products
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/admin/orders">
                      Admin Orders
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/admin/users">
                      Admin Users
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/admin/categories">
                      Admin Categories
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                )
              ) : (
                <>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/register">
                    Register
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                    Login
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </NavToolbar>

        {/* Animated Search Bar */}
        <Collapse in={showSearch} timeout={300}>
          <Box sx={{ width: '100%', backgroundColor: '#fff', px: 2, py: 1 }}>
            <Autocomplete
              freeSolo
              options={suggestions}
              getOptionLabel={(option) => option.name || ''}
              inputValue={searchQuery}
              onInputChange={handleInputChange}
              onChange={handleSuggestionSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search products..."
                  variant="outlined"
                  size="small"
                  onKeyDown={handleKeyDown}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 0,
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }}
                  autoFocus
                />
              )}
            />
          </Box>
        </Collapse>
      </NavBarContainer>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
