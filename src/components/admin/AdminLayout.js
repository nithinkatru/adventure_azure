// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  CssBaseline,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Tooltip,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { logoutUser } from '../api';
import profilePic from '../assets/profile.jpeg';
import { adminTheme } from './adminTheme'; // Your custom theme

// Set a reduced drawer width (e.g., 150px)
const drawerWidth = 150;

// Define the main content area to be offset by the drawer's width
const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: drawerWidth,
  padding: theme.spacing(3),
}));

function AdminLayout({ children, title = 'Admin Panel' }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logoutUser();
    navigate('/login');
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', color: 'text.primary' }}>
        <CssBaseline />

        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: 'primary.main',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap sx={{ color: 'secondary.main' }}>
              {title}
            </Typography>
            <Tooltip title="User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" src={profilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'primary.main',
              color: 'secondary.main',
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ color: 'secondary.main' }}>
              Admin Panel
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: 'secondary.main' }} />
          <List>
            <ListItemButton
              component={Link}
              to="/admin/dashboard"
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.contrastText',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                },
              }}
            >
              <DashboardIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/admin/products"
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.contrastText',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                },
              }}
            >
              <ShoppingCartIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/admin/users"
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.contrastText',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                },
              }}
            >
              <PeopleIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/admin/categories"
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.contrastText',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                },
              }}
            >
              <CategoryIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <ListItemText primary="Categories" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/admin/orders"
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.contrastText',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                },
              }}
            >
              <ShoppingCartIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <ListItemText primary="Orders" />
            </ListItemButton>
            <Divider sx={{ my: 1, bgcolor: 'secondary.main' }} />
            <ListItemButton
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'primary.contrastText',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                },
              }}
            >
              <LogoutIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>

        {/* Main Content Area */}
        <Main>
          <Toolbar /> {/* This offset pushes the content below the AppBar */}
          {children}
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLayout;
