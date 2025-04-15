import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, styled, Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { FaShoppingCart } from 'react-icons/fa'; 

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(45deg,rgb(54, 122, 200) 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    position: 'relative',
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Logo = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
        color: alpha(theme.palette.common.white, 0.8),
    },
}));

const NavButton = styled(Button)({
    color: 'biege',
    fontWeight: 'bold',
    '&:hover': {
        background: alpha('#ffffff', 0.1),
    },
});

const Header = ({ cartCount }) => { 
    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <Logo variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
                    Adventure Gear
                </Logo>

                <Box>
                    <IconButton component={Link} to="/cart" sx={{ color: 'biege' }}>
                        <Badge badgeContent={cartCount} color="error"> {/* Display cart count */}
                            <FaShoppingCart />
                        </Badge>
                    </IconButton>
                    <NavButton component={Link} to="/profile">
                        Profile
                    </NavButton>
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;