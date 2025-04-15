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
} from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import { getAllOrdersForAdmin, updateOrderStatus } from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllOrdersForAdmin();
        setOrders(data);
      } catch (e) {
        setError('Failed to fetch orders.');
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch {
      setError('Failed to update order status.');
    }
  };

  if (busy) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#FFD700' }} />
      </Box>
    );
  }

  return (
    <AdminLayout title="Orders">
      <Box sx={{ px: 3, py: 4 }}>
        {/* Page title */}
        <Toolbar disableGutters sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Order Management
          </Typography>
        </Toolbar>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Orders table */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ width: '100%', maxWidth: 1100 }}>
            <TableContainer sx={{ maxHeight: 540 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {['Order ID','User','Total','Date','Items','Status','Actions'].map((h) => (
                      <TableCell key={h}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow hover key={o._id}>
                      <TableCell
                        sx={{
                          maxWidth: 120,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {o._id}
                      </TableCell>
                      <TableCell>{o.userId?.name || '—'}</TableCell>
                      <TableCell>${o.totalPrice}</TableCell>
                      <TableCell>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 220,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {o.orderItems
                          .map((it) => `${it.productId?.name || 'Item'}(x${it.quantity})`)
                          .join(', ')}
                      </TableCell>

                      {/* Status dropdown */}
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={o.status}
                            onChange={(e) => changeStatus(o._id, e.target.value)}
                            sx={{
                              borderRadius: 0,
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FFD700',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FFD700',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FFD700',
                              },
                            }}
                          >
                            {['pending','processing','shipped','delivered','cancelled'].map(s => (
                              <MenuItem key={s} value={s}>
                                {s[0].toUpperCase() + s.slice(1)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>

                      {/* Action icons */}
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          sx={{
                            border: '1px solid #f44336',
                            color: '#f44336',
                            borderRadius: 0,
                            mr: 1,
                            '&:hover': { bgcolor: '#f4433630' },
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            border: '1px solid #FFD700',
                            color: '#FFD700',
                            borderRadius: 0,
                            '&:hover': { bgcolor: '#333' },
                          }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </AdminLayout>
  );
}
