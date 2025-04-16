// src/components/ProductCard.jsx
import React, { useState, useEffect } from 'react';
import { addToCart } from '../api';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Snackbar,
} from '@mui/material';

const ProductCard = ({ product, onCartUpdate }) => {
  if (!product) {
    console.warn('ProductCard: No product data provided!');
    return null;
  }

  
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  
  useEffect(() => {
    console.log('[ProductCard] Received product:', product);
  }, [product]);

  
  const stock = product?.stock ?? 0;
  const stockLabel = stock > 0 ? `${stock} in stock` : 'Pre-order';

  
  const handleAddToCart = async (quantity) => {
    if (isProcessing) return; 
    setIsProcessing(true);
    try {
      console.log(
        '[ProductCard] Adding product to cart. Product ID:',
        product._id,
        'Quantity:',
        quantity
      );
      await addToCart(product._id, quantity);
      setMessage(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
      setOpenSnackbar(true);
      if (onCartUpdate) onCartUpdate(); 
    } catch (error) {
      console.error('[ProductCard] Error adding product to cart:', error);
      setMessage('Failed to add to cart.');
      setOpenSnackbar(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 320,
          position: 'relative',
          boxShadow: 'none',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        {/* Stock Label */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#fff',
            color: '#000',
            px: 1,
            py: 0.5,
            borderRadius: 0,
            fontSize: 14,
            zIndex: 10,
          }}
        >
          {stockLabel}
        </Box>

        {/* Product Image wrapped in a Link */}
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            sx={{
              height: 200,
              objectFit: 'contain',
              objectPosition: 'center',
              backgroundColor: '#fff',
            }}
            image={
              product.image
                ? `http://localhost:5000/uploads/${product.image}`
                : `http://localhost:5000/uploads/placeholderimage.jpg`
            }
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `http://localhost:5000/uploads/placeholderimage.jpg`;
            }}
          />
        </Link>

        {/* Product Details */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            pb: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            ${product.price} CAD {stock > 0 ? '' : '(Pre-order)'}
          </Typography>

          {/* Button Row for Quick Add-to-Cart Options */}
          <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
            <Button
              onClick={() => handleAddToCart(1)}
              disabled={isProcessing}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 0,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#333' },
              }}
            >
              Buy Now
            </Button>
            <Button
              onClick={() => handleAddToCart(3)}
              disabled={isProcessing}
              sx={{
                backgroundColor: '#FFC107',
                color: '#000',
                borderRadius: 0,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#FFB300' },
              }}
            >
              Add 3
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar to display status messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </>
  );
};

export default ProductCard;
