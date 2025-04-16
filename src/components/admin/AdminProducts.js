
import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getCategories,
} from '../api';

/* MUI */
import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Divider,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

/* Styled helpers */
const Card = styled(Paper)(() => ({
  padding: 24,
  border: '1px solid #FFD70040',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  borderRadius: 0,
}));

const StickyTableContainer = styled(TableContainer)(() => ({
  maxHeight: 520,
  '& thead th': {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
}));

export default function AdminProducts() {
  // ----- data -----
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ----- UI state -----
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const rows = 6;

  // ----- form state -----
  const empty = {
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: null,
  };
  const [form, setForm] = useState(empty);

  // ----- fetch data -----
  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
      setCategories(await getCategories());
    })();
  }, []);

  // ----- derived list -----
  const filtered = useMemo(
    () =>
      products.filter((p) =>
        [p.name, p.description].join(' ').toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );
  const paginated = filtered.slice((page - 1) * rows, page * rows);

  // ----- CRUD helpers -----
  const resetForm = () => {
    setForm(empty);
    setEditItem(null);
    setOpenForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) fd.append(k, v);
    });

    if (editItem) {
      await updateProductById(editItem._id, fd);
    } else {
      await createProduct(fd);
    }
    setProducts(await getProducts());
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProductById(id);
    setProducts(await getProducts());
  };

  // ----- Render -----
  return (
    <AdminLayout title="Manage Products">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header row */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Products</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#FFD700',
              color: '#000',
              borderRadius: 0,
              '&:hover': { bgcolor: '#e6c200' },
            }}
            onClick={() => {
              setEditItem(null);
              setForm(empty);
              setOpenForm(true);
            }}
          >
            Add Product
          </Button>
        </Grid>

        {/* Search */}
        <Card sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by name or description…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
              },
            }}
          />
        </Card>

        {/* Table */}
        <Card>
          <StickyTableContainer>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    'Name',
                    'Description',
                    'Price',
                    'Stock',
                    'Category',
                    'Image',
                    'Actions',
                  ].map((h) => (
                    <TableCell key={h}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((p) => (
                  <TableRow hover key={p._id}>
                    <TableCell
                      sx={{
                        maxWidth: 140,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {p.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 220,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {p.description}
                    </TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell>
                      {p.stock > 0 ? (
                        <Chip label={p.stock} color="secondary" size="small" />
                      ) : (
                        <Chip label="Out" color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell>{p.categoryId?.name || '—'}</TableCell>
                    <TableCell>
                      {p.image && (
                        <img
                          src={`http://localhost:5000/uploads/${p.image}`}
                          alt={p.name}
                          style={{ maxWidth: 50 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditItem(p);
                            setForm({
                              ...p,
                              categoryId: p.categoryId?._id || p.categoryId,
                              image: null,
                            });
                            setOpenForm(true);
                          }}
                          sx={{
                            borderRadius: 0,
                            border: '1px solid #FFD700',
                            mr: 1,
                            '&:hover': { bgcolor: '#333' },
                          }}
                        >
                          <EditIcon sx={{ color: '#FFD700' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(p._id)}
                          sx={{
                            borderRadius: 0,
                            border: '1px solid #f44336',
                            '&:hover': { bgcolor: '#330000' },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StickyTableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" py={2}>
            <Pagination
              count={Math.ceil(filtered.length / rows)}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="secondary"
            />
          </Box>
        </Card>
      </Container>

      {/* Drawer Form */}
      <Drawer
        anchor="right"
        open={openForm}
        onClose={resetForm}
        PaperProps={{
          sx: { width: 380, bgcolor: 'background.paper', p: 2, borderRadius: 0 },
        }}
      >
        <Toolbar sx={{ bgcolor: '#000', color: '#FFD700' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {editItem ? 'Edit Product' : 'New Product'}
          </Typography>
          <IconButton onClick={resetForm} sx={{ color: '#FFD700' }}>
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            fullWidth
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            required
            inputProps={{ min: 0, step: 0.01 }}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stock"
            type="number"
            fullWidth
            required
            inputProps={{ min: 0 }}
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, borderRadius: 0 }}
          >
            {form.image ? form.image.name : 'Upload Image'}
            <input
              type="file"
              hidden
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
          </Button>

          <Divider sx={{ my: 2 }} />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#FFD700',
              color: '#000',
              borderRadius: 0,
              '&:hover': { bgcolor: '#e6c200' },
            }}
          >
            {editItem ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Drawer>
    </AdminLayout>
  );
}
