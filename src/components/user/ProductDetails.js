import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addToCart } from '../api';
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box, TextField, Container, ImageList, ImageListItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '../styles/ProductDetails.css';

const ProductDetails = ({ onCartUpdate }) => { 
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                if (data && data.image) {
                    setMainImage(data.image);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            if (product && product._id) {
                await addToCart(product._id, quantity);
                onCartUpdate();
            } else {
                console.error('Product is missing an ID');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const productName = product.name || 'Product Name Not Available';
    const productCategory = product.categoryId ? product.categoryId.name : 'Category Not Available';
    const productImage = product.image ? `http://localhost:5000/uploads/${product.image}` : '/path/to/placeholderimage.jpg';
    const productDescription = product.description || 'Description not available';
    const productPrice = product.price || 'N/A';

    const images = product.images || [product.image];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                    <Card sx={{ display: 'flex', maxWidth: 1200, boxShadow: 6, borderRadius: '16px', overflow: 'hidden' }}>
                        <Grid container>
                            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ maxHeight: '500px', maxWidth: '100%', overflow: 'hidden', boxShadow: 3, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.02)' } }}>
                                    <CardMedia component="img" image={mainImage ? `http://localhost:5000/uploads/${mainImage}` : productImage} alt={productName} sx={{ height: '100%', objectFit: 'contain', maxWidth: '100%' }} />
                                </Box>
                                {images && images.length > 1 && (
                                    <ImageList sx={{ width: '100%', mt: 2 }} cols={images.length} rowHeight="80">
                                        {images.map((img, index) => (
                                            <ImageListItem key={index} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                                                <img src={`http://localhost:5000/uploads/${img}`} alt={`Thumbnail ${index}`} onClick={() => setMainImage(img)} style={{ height: '100%', objectFit: 'cover' }} />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <CardContent sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Typography variant="h4" gutterBottom>
                                        {productName}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                                        {productDescription}
                                    </Typography>
                                    <Typography variant="h6" color="primary" sx={{ marginBottom: '1rem' }}>
                                        Price: ${productPrice}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '2rem' }}>
                                        Category: {productCategory}
                                    </Typography>
                                    <TextField type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} inputProps={{ min: 1 }} sx={{ marginBottom: '1rem', maxWidth: '100px' }} />
                                    <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ padding: '12px 24px', fontSize: '1rem', borderRadius: '8px', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.02)' } }}>
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </motion.div>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Product Highlights
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="description-content" id="description-header">
                        <Typography variant="h6">
                            Detailed Description
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {productDescription}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
};

export default ProductDetails;