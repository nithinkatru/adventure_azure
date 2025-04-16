import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../api';
import ProductCard from './ProductCard';
import {
  Box,
  Typography,
  Grid,
  Slider,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import sampleVideoBanner from '../assets/Samplevideo1.mp4';


const Sidebar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onClearFilters,
}) => {
  return (
    <Box
      sx={{
        width: '40px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        '&:hover': { width: '250px' },
      }}
    >
      <Box
        sx={{
          opacity: 0,
          transition: 'opacity 0.3s ease',
          height: '100%',
          p: 2,
          '&:hover': { opacity: 1 },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>

        {/* Categories Filter */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Categories
        </Typography>
        {categories.map((category) => (
          <Box key={category._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.name)}
              onChange={() => onCategoryChange(category.name)}
              style={{ marginRight: '8px' }}
            />
            <Typography variant="body2">{category.name}</Typography>
          </Box>
        ))}
        <Box sx={{ mt: 1 }}>
          <Button
            onClick={onClearFilters}
            variant="outlined"
            size="small"
            sx={{
              borderColor: '#FFD600',
              color: '#FFD600',
              textTransform: 'none',
            }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Price Range Slider */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Price Range (${priceRange[0]} - ${priceRange[1]})
          </Typography>
          <Slider
            value={priceRange}
            onChange={onPriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            sx={{
              color: '#FFD700',
              '& .MuiSlider-thumb': {
                borderRadius: '50%',
                border: '2px solid #000',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); 
        setAllCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

 
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      try {
        const productsData = await getProducts(); 
        let filtered = productsData;

       
        if (selectedCategories.length > 0) {
          filtered = filtered.filter((product) => {
           
            const prodCategory =
              product.categoryId && product.categoryId.name
                ? product.categoryId.name
                : (typeof product.category === 'string' ? product.category : '');
            return selectedCategories.includes(prodCategory);
          });
        }

        
        filtered = filtered.filter(
          (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching or filtering products:', error);
      }
    };

    fetchAndFilterProducts();
  }, [selectedCategories, priceRange]);

 
  const handleCategoryChange = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };


  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

 
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
  };

  return (
    <>
      {/* Main Layout: Sidebar + Products Grid */}
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Sidebar
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onClearFilters={handleClearFilters}
        />

        <Box sx={{ flex: 1, pl: { md: 3 }, pt: { xs: 3, md: 0 } }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            LATEST APPAREL
          </Typography>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <Typography>No products available.</Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={product._id}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Banner Section */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            height: '400px',
            overflow: 'hidden',
          }}
        >
          {/* Video Banner */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <Box
              component="video"
              src={sampleVideoBanner}
              autoPlay
              muted
              loop
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#000',
              }}
            />
          </Box>
          {/* Text Banner */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#000',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              Gear Up For Adventure
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFD700', mb: 2, lineHeight: 1.5 }}>
              Discover our premium range of outdoor gear designed to elevate your journey.
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD700', mb: 2, lineHeight: 1.5 }}>
              Enjoy high performance, durability, and style with our equipment.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                borderRadius: 0,
                textTransform: 'uppercase',
                width: 'fit-content',
                '&:hover': { borderColor: '#fff', backgroundColor: '#333' },
              }}
              component={Link}
              to="/about"
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Products;
