// src/components/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Paper,
  Toolbar,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AdminLayout from './AdminLayout';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories.');
        setLoading(false);
      }
    };
    fetchCategories();
  }, [refreshCategories]);

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/categories',
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewCategoryName('');
      setSuccess('Category created successfully!');
      setError(null);
      setRefreshCategories((prev) => !prev);
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Failed to create category.');
      setSuccess(null);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Category deleted successfully!');
      setError(null);
      setRefreshCategories((prev) => !prev);
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category.');
      setSuccess(null);
    }
  };

  return (
    <AdminLayout title="Category Management">
      <Container
        sx={{
          minHeight: '100vh',
          py: 3,
        }}
      >
        {/* Header */}
        <Toolbar
          disableGutters
          sx={{
            mb: 2,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" sx={{ mb: { xs: 1, sm: 0 } }}>
            Category Management
          </Typography>
        </Toolbar>
        <Divider sx={{ mb: 2, borderColor: '#FFD700' }} />

        {/* Create Category Card */}
        <Card
          sx={{
            mb: 4,
            border: '1px solid #FFD700',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Create New Category
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#333333',
                      color: '#FFFFFF',
                      borderRadius: 0,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFD700',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFD700',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFD700',
                    },
                    '& .MuiFormLabel-root': {
                      color: '#AAA',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={handleCreateCategory}
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#000',
                    border: '1px solid #FFD700',
                    borderRadius: 0,
                    '&:hover': {
                      bgcolor: '#FFC400',
                    },
                  }}
                >
                  Create Category
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Category List */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 0,
            border: '1px solid #FFD700',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Category List
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}
            >
              <CircularProgress sx={{ color: '#FFD700' }} />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <List>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <ListItem
                    key={category._id}
                    sx={{
                      borderBottom: '1px solid #FFD700',
                      '&:last-of-type': { borderBottom: 'none' },
                    }}
                  >
                    <ListItemText primary={category.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteCategory(category._id)}
                        sx={{
                          border: '1px solid #FFD700',
                          color: '#FFD700',
                          borderRadius: 0,
                          '&:hover': {
                            bgcolor: '#333333',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No categories found." />
                </ListItem>
              )}
            </List>
          )}
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default AdminCategories;
