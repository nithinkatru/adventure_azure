// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { addToCart } from '../api';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button
} from '@mui/material';

const ProductCard = ({ product }) => {
  const [message, setMessage] = useState('');

  const stockLabel = product.stock > 0 
    ? `${product.stock} in stock` 
    : 'Pre-order';

  const handleAddToCart = async (quantity) => {
    try {
      await addToCart(product._id, quantity);
      setMessage(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to add to cart.');
    }
  };

  return (
    <Card
      elevation={0} // Remove default shadow
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 320,
        position: 'relative',
        boxShadow: 'none', // No box shadow
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
          borderRadius: 0, // Sharp edges
          fontSize: 14,
          zIndex: 10,
        }}
      >
        {stockLabel}
      </Box>

      {/* Product Image wrapped in Link */}
      <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: 'contain',
            objectPosition: 'center',
            backgroundColor: '#fff', // White background
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

      <CardContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
          pb: 1
        }}
      >
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          ${product.price} CAD {product.stock > 0 ? '' : '(Pre-order)'}
        </Typography>

        {/* Button Row */}
        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          <Button
            onClick={() => handleAddToCart(1)}
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

        {message && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
