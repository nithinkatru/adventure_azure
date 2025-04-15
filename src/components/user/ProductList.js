// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addToCart, rateProduct } from '../api';
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ImageList,
  ImageListItem,
  Rating
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductDetail = () => {
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
        if (data && data.image) {
          setMainImage(data.image);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (qty) => {
    if (!product) return;
    try {
      await addToCart(product._id, qty);
      setCartCount((prev) => prev + qty);
    } catch (err) {
      console.error(err);
      setError('Failed to add to cart.');
    }
  };

  const handleRatingChange = async (event, newValue) => {
    setRating(newValue);
    setRatingMessage('');
    try {
      await rateProduct(product._id, newValue);
      setRatingMessage('Rating submitted successfully!');
    } catch (err) {
      console.error(err);
      setRatingMessage('Failed to submit rating.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  const stockLabel = product.stock > 0 ? `${product.stock} in stock` : 'Pre-order';
  const imageSrc = product.image
    ? `http://localhost:5000/uploads/${product.image}`
    : `http://localhost:5000/uploads/placeholderimage.jpg`;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            maxWidth: 1200,
            width: '100%',
            boxShadow: 'none',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Left: Image Section */}
          <Box sx={{ flex: 1, p: 2, backgroundColor: '#fff' }}>
            <CardMedia
              component="img"
              image={mainImage ? `http://localhost:5000/uploads/${mainImage}` : imageSrc}
              alt={product.name}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'contain',
                backgroundColor: '#fff',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `http://localhost:5000/uploads/placeholderimage.jpg`;
              }}
            />
            {images && images.length > 1 && (
              <ImageList sx={{ width: '100%', mt: 2 }} cols={Math.min(images.length, 4)} rowHeight={80}>
                {images.map((img, index) => (
                  <ImageListItem
                    key={index}
                    onClick={() => setMainImage(img)}
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${img}`}
                      alt={`Thumbnail ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>

          {/* Right: Details Section */}
          <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Price: ${product.price} CAD
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Category: {product.categoryId ? product.categoryId.name : 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {stockLabel}
              </Typography>

              {/* Rating Option */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ mr: 1 }}>Rate this product:</Typography>
                <Rating
                  value={rating}
                  onChange={handleRatingChange}
                />
              </Box>
              {ratingMessage && (
                <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                  {ratingMessage}
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 100, mr: 2 }}
                />
              </Box>
            </CardContent>

            {/* Button Row */}
            <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
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
                Add 3 to Cart
              </Button>
            </Box>

            {cartCount > 0 && (
              <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                Added {cartCount} to cart so far.
              </Typography>
            )}
          </Box>
        </Card>
      </Box>

      {/* Accordion for Detailed Description */}
      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="description-content" id="description-header">
            <Typography variant="h6">Detailed Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {product.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default ProductDetail;
