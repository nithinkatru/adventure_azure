// src/components/user/CartContainer.jsx
import React, { useEffect, useState, useCallback } from 'react';
import Cart from './Cart';
import { getCart, removeFromCart, updateCartItemQuantity } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, CircularProgress, Container, Typography } from '@mui/material';

const CartContainer = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  
  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const cart = await getCart();
      if (cart && cart.items) {
        const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        setCartItems(cart.items);
        setCartItemCount(count);
        onCartUpdate(count);
      } else {
        setCartItems([]);
        setCartItemCount(0);
        onCartUpdate(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error(error.message || 'Failed to fetch cart.');
    } finally {
      setLoading(false);
    }
  }, [onCartUpdate]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

 
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCartItems();
      toast.success('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error(error.message || 'Failed to remove item from cart.');
    }
  };


  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress sx={{ color: '#FFD600' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Cart
      cartItems={cartItems}
      cartItemCount={cartItemCount}
      removeFromCart={handleRemoveFromCart}
      fetchCartItems={fetchCartItems}
      updateCartItemQuantity={updateCartItemQuantity}
    />
  );
};

export default CartContainer;
