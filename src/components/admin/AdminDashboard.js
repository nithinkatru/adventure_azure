/*****************************************************************
 * src/pages/AdminDashboard.jsx  |  Black + Yellow | Montserrat
 *****************************************************************/
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminDashboardData, logoutUser } from '../api';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as CartIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
} from 'recharts';
import profilePic from '../assets/profile.jpeg';

const palette = {
  primary:   { main: '#000', contrastText: '#FFD600' },
  secondary: { main: '#FFD600', contrastText: '#000' },
};

const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h6: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    body1: { fontSize: 14 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #FFD60040',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: { root: { borderBottom: '1px solid #FFD60040' } },
    },
  },
});

const DRAWER_WIDTH = 240;
const MINI_WIDTH  = 56;

const openedMixin = {
  width: DRAWER_WIDTH,
  transition: 'width 0.25s',
  overflowX: 'hidden',
};
const closedMixin = {
  width: MINI_WIDTH,
  transition: 'width 0.25s',
  overflowX: 'hidden',
};

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  '& .MuiDrawer-paper': {
    ...(open ? openedMixin : closedMixin),
    backgroundColor: palette.primary.main,
    color: palette.secondary.main,
    borderRight: 'none',
  },
}));

const Main = styled('main', { shouldForwardProp: (p) => p !== 'open' })(({ open }) => ({
  flexGrow: 1,
  marginLeft: MINI_WIDTH,
  transition: 'margin 0.25s',
  ...(open && { marginLeft: DRAWER_WIDTH }),
}));

function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    console.log('[AdminDashboard] useEffect triggered: fetching dashboard data...');
    (async () => {
      try {
        const response = await getAdminDashboardData();
        console.log('[AdminDashboard] Received response from getAdminDashboardData:', response);
        const { products = [] } = response;
        setProducts(products);
      } catch (e) {
        console.error('[AdminDashboard] Error fetching dashboard data:', e);
        setError(e.message || 'Failed to load data.');
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    console.log('[AdminDashboard] Logging out...');
    setMenuAnchor(null);
    try {
      await logoutUser();
      console.log('[AdminDashboard] Logout successful, redirecting to login.');
      nav('/login');
    } catch (e) {
      console.error('[AdminDashboard] Logout error:', e);
      setError(e.message || 'Logout failed.');
    }
  };

  if (busy) {
    console.log('[AdminDashboard] Loading state...');
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: palette.secondary.main }} />
      </Box>
    );
  }
  if (error) {
    console.error('[AdminDashboard] Error state:', error);
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);
  const outOfStock = products.filter((p) => (p.stock || 0) === 0).length;
  console.log('[AdminDashboard] Product count:', products.length);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton onClick={() => setOpen(!open)} sx={{ color: 'secondary.main' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'secondary.main' }}>
              Admin Dashboard
            </Typography>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <Avatar src={profilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem onClick={() => setMenuAnchor(null)}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <StyledDrawer variant="permanent" open={open}>
          <Toolbar />
          <Divider sx={{ bgcolor: 'secondary.main' }} />
          <List>
            {[
              { text: 'Dashboard', icon: <DashboardIcon />, to: '/admin/dashboard' },
              { text: 'Products',  icon: <CartIcon />,      to: '/admin/products' },
              { text: 'Users',     icon: <PeopleIcon />,    to: '/admin/users' },
              { text: 'Categories',icon: <CategoryIcon />,  to: '/admin/categories' },
              { text: 'Orders',    icon: <CartIcon />,      to: '/admin/orders' },
            ].map(({ text, icon, to }) => (
              <ListItemButton
                key={text}
                component={Link}
                to={to}
                sx={{
                  color: 'secondary.main',
                  '& .MuiSvgIcon-root': { color: 'inherit' },
                  '&:hover': {
                    bgcolor: 'secondary.main',
                    color: 'primary.contrastText',
                    '& .MuiSvgIcon-root': { color: 'inherit' },
                  },
                }}
              >
                {icon}
                {open && <ListItemText primary={text} sx={{ ml: 1 }} />}
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ bgcolor: 'secondary.main', mt: 'auto' }} />
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: 'secondary.main',
              '& .MuiSvgIcon-root': { color: 'inherit' },
              '&:hover': {
                bgcolor: 'secondary.main',
                color: 'primary.contrastText',
                '& .MuiSvgIcon-root': { color: 'inherit' },
              },
            }}
          >
            <LogoutIcon />
            {open && <ListItemText primary="Logout" sx={{ ml: 1 }} />}
          </ListItemButton>
        </StyledDrawer>

        <Main open={open}>
          <Toolbar /> {/* Offset for AppBar */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Product Table */}
            <Paper sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h6">Product Overview</Typography>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/admin/products"
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'primary.main',
                    borderRadius: 0,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#e6c200', color: 'primary.main' },
                  }}
                >
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: 'primary.main' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'secondary.main' }}>Name</TableCell>
                      <TableCell sx={{ color: 'secondary.main' }}>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p._id}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Bar Chart for Product Stock */}
            <Paper sx={{ mb: 4, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Stock Levels
              </Typography>
              <BarChart width={800} height={400} data={products}>
                <CartesianGrid stroke="#444" />
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <RTooltip />
                <Bar dataKey="stock" fill={palette.secondary.main} />
              </BarChart>
            </Paper>

            {/* Stat cards */}
            <Grid container spacing={3}>
              {[
                { label: 'Total Products', value: products.length },
                { label: 'Total Stock',    value: totalStock },
                { label: 'Out of Stock',   value: outOfStock },
              ].map((c) => (
                <Grid item xs={12} md={4} key={c.label}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6">{c.label}</Typography>
                    <Typography variant="h4" sx={{ color: 'secondary.main' }}>
                      {c.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 4 }} />
            <Typography variant="body2" align="center">
              © adventuregear.com {new Date().getFullYear()}
            </Typography>
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
