// src/components/admin/AdminOrders.jsx
/*****************************************************************
 * AdminOrders.jsx  | Black · Yellow · Montserrat
 *****************************************************************/
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Alert,
  Snackbar,
  TextField,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import {
  CheckCircle,
  Delete,
  Search as SearchIcon,
} from '@mui/icons-material';
import { getAllOrdersForAdmin, updateOrderStatus } from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  // Snackbar states for notification
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch orders on mount
  useEffect(() => {
    console.log('[AdminOrders] Fetching orders...');
    (async () => {
      try {
        const data = await getAllOrdersForAdmin();
        console.log('[AdminOrders] Orders fetched:', data);
        setOrders(data);
      } catch (err) {
        console.error('[AdminOrders] Error fetching orders:', err);
        setError(err?.response?.data?.message || 'Failed to fetch orders.');
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  // Function to update the order status using the select dropdown
  const changeStatus = async (orderId, status) => {
    console.log(`[AdminOrders] Updating order ${orderId} to status ${status}`);
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
      console.log(`[AdminOrders] Order ${orderId} status updated.`);
    } catch (err) {
      console.error('[AdminOrders] Error updating order status:', err);
      setError(err?.response?.data?.message || 'Failed to update order status.');
    }
  };

  // Function to accept an order; here "accept" means updating its status to "processing"
  const handleAcceptOrder = async (orderId) => {
    console.log(`[AdminOrders] Accepting order ${orderId}`);
    try {
      // Here we assume that marking an order as "processing" indicates acceptance.
      await updateOrderStatus(orderId, 'processing');
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: 'processing' } : o
        )
      );
      setSnackbarMessage('Order accepted');
      setSnackbarOpen(true);
      console.log(`[AdminOrders] Order ${orderId} accepted successfully.`);
    } catch (err) {
      console.error(`[AdminOrders] Error accepting order ${orderId}:`, err);
      setSnackbarMessage(err?.response?.data?.message || 'Error accepting order');
      setSnackbarOpen(true);
    }
  };

  // While loading, show a spinner
  if (busy) {
    console.log('[AdminOrders] Loading orders...');
    return (
      <AdminLayout title="Orders">
        <Box sx={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      </AdminLayout>
    );
  }

  // If an error occurred, render an error message
  if (error) {
    console.error('[AdminOrders] Render error:', error);
    return (
      <AdminLayout title="Orders">
        <Box sx={{ p: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </AdminLayout>
    );
  }

  // Filter orders based on search input and paginate
  const filtered = orders.filter((order) =>
    order._id.toLowerCase().includes(search.toLowerCase()) ||
    (order.userId && order.userId.name.toLowerCase().includes(search.toLowerCase()))
  );
  const slice = filtered.slice(page * rows, page * rows + rows);

  return (
    <AdminLayout title="Orders">
      <Box sx={{ px: 3, py: 4 }}>
        <Toolbar disableGutters sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Order Management
          </Typography>
          <TextField
            size="small"
            placeholder="Search orders…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#000' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#999',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFD700',
              },
            }}
          />
        </Toolbar>

        <Paper sx={{ mb: 4 }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {[
                    'Order ID',
                    'User',
                    'Total',
                    'Date',
                    'Items',
                    'Status',
                    'Actions',
                  ].map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.length > 0 ? (
                  slice.map((order) => (
                    <TableRow key={order._id} hover>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.userId ? order.userId.name : '—'}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {order.orderItems
                          .map((item) =>
                            `${item.productId ? item.productId.name : 'Item'} (x${item.quantity})`
                          )
                          .join(', ')}
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={order.status}
                            onChange={(e) => changeStatus(order._id, e.target.value)}
                            sx={{
                              borderRadius: 0,
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                            }}
                          >
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <MenuItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleAcceptOrder(order._id)}
                            sx={{
                              border: '1px solid #FFD700',
                              color: '#FFD700',
                              borderRadius: 0,
                              '&:hover': { bgcolor: '#333' },
                            }}
                          >
                            <CheckCircle />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => console.log('Delete action not implemented')}
                            sx={{
                              border: '1px solid #f44336',
                              color: '#f44336',
                              borderRadius: 0,
                              '&:hover': { bgcolor: '#f4433633' },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filtered.length}
            rowsPerPage={rows}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRows(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: '1px solid #FFD700',
              '& .MuiTablePagination-displayedRows': { color: '#000' },
              '& .MuiTablePagination-selectLabel': { color: '#000' },
              '& .MuiSelect-icon': { color: '#000' },
              '& .MuiInputBase-root': { color: '#000' },
              '& .MuiIconButton-root': { color: '#000' },
            }}
          />
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </AdminLayout>
  );
}


