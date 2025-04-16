// src/components/user/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: { 
      main: '#000', 
      contrastText: '#FFD600' 
    },
    secondary: { 
      main: '#FFD600', 
      contrastText: '#000' 
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const Cart = ({ cartItems, cartItemCount, removeFromCart, fetchCartItems, updateCartItemQuantity }) => {
  const [quantities, setQuantities] = React.useState({});

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateCartItemQuantity(itemId, quantity);
      fetchCartItems();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Your cart is empty.
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        <Typography variant="body1" gutterBottom>
          Item count: {cartItemCount}
        </Typography>
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.productId._id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f9f9f9' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={`http://localhost:5000/uploads/${item.productId.image}`}
                  alt={item.productId.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">
                    {item.productId.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.productId.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Button
                      size="small"
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          Math.max(1, (quantities[item.productId._id] || item.quantity) - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <TextField
                      type="number"
                      value={quantities[item.productId._id] !== undefined ? quantities[item.productId._id] : item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ width: '50px', mx: 1 }}
                    />
                    <Button
                      size="small"
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          (quantities[item.productId._id] || item.quantity) + 1
                        )
                      }
                    >
                      +
                    </Button>
                    <Button
                      size="small"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          quantities[item.productId._id] !== undefined ? quantities[item.productId._id] : item.quantity
                        )
                      }
                      sx={{ ml: 1 }}
                    >
                      Update
                    </Button>
                  </Box>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Total: ${item.productId.price * item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item.productId._id)}
                    sx={{ mt: 2 }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Paper sx={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total Cart Value: ${calculateTotal()}</Typography>
            <Button component={Link} to="/checkout" variant="contained" color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Cart;
