// src/components/Products.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api';
import ProductCard from './ProductCard';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import sampleVideoBanner from '../assets/Samplevideo1.mp4';

// Sidebar Component: Collapsible, full-height, adventure-gear filters.
const Sidebar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  brands,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  additionalSections,
  selectedAdditional,
  onAdditionalChange,
}) => {
  return (
    <Box
      sx={{
        width: '40px', // collapsed width
        height: '100vh', // full height
        position: 'sticky',
        top: 0,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          width: '200px', // expanded width on hover
        },
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
          <Box key={category} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
              style={{ marginRight: '8px' }}
            />
            <Typography variant="body2">{category}</Typography>
          </Box>
        ))}
        {/* Brands Filter */}
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Brands
        </Typography>
        {brands.map((brand) => (
          <Box key={brand} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onBrandChange(brand)}
              style={{ marginRight: '8px' }}
            />
            <Typography variant="body2">{brand}</Typography>
          </Box>
        ))}
        {/* Price Range Filter */}
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Price Range ($)
        </Typography>
        <Box sx={{ px: 1 }}>
          <input
            type="range"
            min={0}
            max={500}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            style={{
              width: '100%',
              accentColor: '#FFD700', // Yellow slider accent
            }}
          />
          <Typography variant="caption">Up to ${priceRange[1]}</Typography>
        </Box>
        {/* Additional Sections Filter */}
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          More Options
        </Typography>
        {additionalSections.map((section) => (
          <Box key={section} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <input
              type="checkbox"
              checked={selectedAdditional.includes(section)}
              onChange={() => onAdditionalChange(section)}
              style={{ marginRight: '8px' }}
            />
            <Typography variant="body2">{section}</Typography>
          </Box>
        ))}
        {/* Clear Button */}
        <Box sx={{ mt: 2 }}>
          <button
            onClick={() => {
              onCategoryChange('clear');
              onBrandChange('clear');
              onPriceChange([0, 500]);
              onAdditionalChange('clear');
            }}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#000',
              color: '#FFD600',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </Box>
      </Box>
    </Box>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter data for Adventure Gear:
  const categories = ['Backpacks', 'Tents', 'Sleeping Bags', 'Hiking Boots'];
  const brands = ['The North Face', 'Patagonia', 'Columbia', "Arc'teryx"];
  const additionalSections = ['Newly Added Products', 'High Selling Products', 'More'];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedAdditional, setSelectedAdditional] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by Categories
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    // Filter by Brands
    if (selectedBrands.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }
    // Filter by Price Range
    tempProducts = tempProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    // Additional Sections (Placeholder logic)
    if (selectedAdditional.includes('Newly Added Products')) {
      // e.g., tempProducts = tempProducts.filter((p) => p.isNew);
    }
    if (selectedAdditional.includes('High Selling Products')) {
      // e.g., tempProducts = tempProducts.filter((p) => p.sales > 1000);
    }
    // "More" can be used for any additional logic.

    setFilteredProducts(tempProducts);
  }, [selectedCategories, selectedBrands, priceRange, selectedAdditional, products]);

  const handleCategoryChange = (category) => {
    if (category === 'clear') {
      setSelectedCategories([]);
      return;
    }
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleBrandChange = (brand) => {
    if (brand === 'clear') {
      setSelectedBrands([]);
      return;
    }
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleAdditionalChange = (section) => {
    if (section === 'clear') {
      setSelectedAdditional([]);
      return;
    }
    if (selectedAdditional.includes(section)) {
      setSelectedAdditional(selectedAdditional.filter((s) => s !== section));
    } else {
      setSelectedAdditional([...selectedAdditional, section]);
    }
  };

  return (
    <>
      {/* Main Content Area: Sidebar + Products Grid */}
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          brands={brands}
          selectedBrands={selectedBrands}
          onBrandChange={handleBrandChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          additionalSections={additionalSections}
          selectedAdditional={selectedAdditional}
          onAdditionalChange={handleAdditionalChange}
        />

        <Box sx={{ flex: 1, pl: { md: 3 }, pt: { xs: 3, md: 0 } }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            LATEST APPAREL
          </Typography>
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

      {/* Banner Section: Edge-to-edge, full width */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            height: '400px', // Increased to 400px for square-ish layout
            overflow: 'hidden',
          }}
        >
          {/* LEFT: Video Section */}
          <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', height: '100%' }}>
            <Box
              component="video"
              src={sampleVideoBanner}
              autoPlay
              muted
              loop
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // Zoomed out effect to show more content
                backgroundColor: '#000', // Fallback background color
              }}
            />
          </Box>
          {/* RIGHT: Expanded Description Section with More Content */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#000', // Black background
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#fff', textTransform: 'uppercase' }}>
              Gear Up For Adventure
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFD700', mb: 2, lineHeight: 1.5 }}>
              Discover our premium range of outdoor gear designed to elevate your journey. Whether you're planning a weekend escape or an epic expedition, our carefully curated collection has something for every adventurer.
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD700', mb: 2, lineHeight: 1.5 }}>
              Enjoy high performance, durability, and style with our equipment, backpacks, tents, and hiking boots. Embrace the thrill of exploration and experience the great outdoors like never before.
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD700', mb: 2, lineHeight: 1.5 }}>
              Ready to start your adventure? Learn more about our latest collections and get inspired to explore new horizons.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                borderRadius: 0,
                textTransform: 'uppercase',
                width: 'fit-content',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: '#333',
                },
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
