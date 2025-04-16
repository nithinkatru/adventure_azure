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
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme'; 
import '../styles/ProductDetails.css';

const ProductDetail = ({ onCartUpdate }) => {
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('[ProductDetail] Fetching product with ID:', id);
        const data = await getProductById(id);
        console.log('[ProductDetail] Fetched product data:', data);
        if (data) {
          setProduct(data);
          if (data.image) {
            setMainImage(data.image);
          }
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('[ProductDetail] Error fetching product:', err);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async (qty) => {
    if (!product || isProcessing) return;
    setIsProcessing(true);
    try {
      console.log('[ProductDetail] Adding product to cart. Product ID:', product._id, 'Quantity:', qty);
      await addToCart(product._id, qty);
      if (onCartUpdate) onCartUpdate();
      console.log('[ProductDetail] Product added to cart successfully.');
    } catch (err) {
      console.error('[ProductDetail] Error adding to cart:', err);
      setError('Failed to add to cart.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRatingChange = async (event, newValue) => {
    setRating(newValue);
    setRatingMessage('');
    try {
      await rateProduct(product._id, newValue);
      setRatingMessage('Rating submitted successfully!');
    } catch (err) {
      console.error('[ProductDetail] Error submitting rating:', err);
      setRatingMessage('Failed to submit rating.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          {error || 'Product not found.'}
        </Typography>
      </Container>
    );
  }

  // Prepare labels and fallback data
  const productName = product.name || "Product Name Not Available";
  const productCategory = product.categoryId ? product.categoryId.name : "Category Not Available";
  const productImage = product.image
    ? `http://localhost:5000/uploads/${product.image}`
    : `http://localhost:5000/uploads/placeholderimage.jpg`;
  const productDescription = product.description || "Description not available";
  const productPrice = product.price || "N/A";
  const stockLabel = product.stock > 0 ? `${product.stock} in stock` : 'Pre-order';
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4, px: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mx: 0 }}>
          {/* Left: Image Section */}
          <Box sx={{ flex: 1, p: 2, backgroundColor: '#fff' }}>
            <CardMedia
              component="img"
              image={mainImage ? `http://localhost:5000/uploads/${mainImage}` : productImage}
              alt={productName}
              sx={{
                width: '100%',
                height: 350, 
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
                  <ImageListItem key={index} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                    <img
                      src={`http://localhost:5000/uploads/${img}`}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setMainImage(img)}
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
              <Typography variant="h4" gutterBottom>
                {productName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                {productDescription}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Price: ${productPrice} CAD
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Category: {productCategory}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {stockLabel}
              </Typography>

              {/* Rating Option */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ mr: 1 }}>Rate this product:</Typography>
                <Rating value={rating} onChange={handleRatingChange} />
              </Box>
              {ratingMessage && (
                <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                  {ratingMessage}
                </Typography>
              )}

              {/* Quantity Input */}
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
                variant="contained"
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: 1,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#333' },
                  px: 3,
                  py: 1,
                }}
                disabled={isProcessing}
              >
                Buy Now
              </Button>
              <Button
                onClick={() => handleAddToCart(3)}
                variant="contained"
                sx={{
                  backgroundColor: '#FFC107',
                  color: '#000',
                  borderRadius: 1,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#FFB300' },
                  px: 3,
                  py: 1,
                }}
                disabled={isProcessing}
              >
                Add 3 to Cart
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Detailed Description Accordion */}
        <Box sx={{ mt: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="description-content" id="description-header">
              <Typography variant="h6">Detailed Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {productDescription}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductDetail;
