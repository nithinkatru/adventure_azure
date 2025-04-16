// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Modal,
  Alert,
  TablePagination,
  Toolbar,
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const getMyOrders = async () => {
 
  return [
    {
      _id: '7456',
      userId: { name: 'John Smith' },
      orderItems: [
        { productId: { name: 'Product 1' }, quantity: 2 },
        { productId: { name: 'Product 2' }, quantity: 1 },
      ],
      totalPrice: 99.99,
      status: 'delivered',
      createdAt: '2024-04-01T00:00:00.000Z',
    },
  ];
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [error, setError] = useState('');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getMyOrders();
        setOrders(result);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewReceipt = (order) => {
    setSelectedOrder(order);
    setShowReceipt(true);
  };

  const handleDownloadReceipt = async () => {
    const receiptElement = document.getElementById('receipt');
    if (!receiptElement) return;

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${selectedOrder._id}.pdf`);
  };

  
  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          m: 0,
          p: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          backgroundColor: '#FFD600', 
        }}
      >
        <CircularProgress sx={{ color: '#000' }} />
      </Box>
    );
  }

  
  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#FFD600',
          color: '#000',
          textAlign: 'center',
          py: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          My Orders
        </Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Orders Table */}
      <Box sx={{ width: '100%', m: 0, p: 0 }}>
        <Paper sx={{ width: '100%', borderRadius: 0, m: 0 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#000' }}>
                <TableRow>
                  <TableCell sx={{ color: '#FFD600', fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell sx={{ color: '#FFD600', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ color: '#FFD600', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: '#FFD600', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#FFD600', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow key={order._id} hover sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
                        <TableCell sx={{ color: '#000' }}>{order._id}</TableCell>
                        <TableCell sx={{ color: '#000' }}>${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell sx={{ color: '#000' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ color: '#000' }}>{order.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewReceipt(order)}
                            sx={{
                              borderRadius: 0,
                              borderColor: '#000',
                              color: '#000',
                              '&:hover': { backgroundColor: '#ccc' },
                            }}
                          >
                            View Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: '#000' }}>
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
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: '1px solid #FFD700',
              '& .MuiTablePagination-displayedRows': { color: '#000' },
              '& .MuiTablePagination-selectLabel': { color: '#000' },
              '& .MuiSelect-icon': { color: '#000' },
            }}
          />
        </Paper>
      </Box>

      {/* Receipt Modal */}
      <Modal open={showReceipt} onClose={() => setShowReceipt(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: 600 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {selectedOrder && (
            <>
              <Box id="receipt">
                <Typography variant="h6" gutterBottom>
                  Receipt - Order #{selectedOrder._id}
                </Typography>
                <Typography>User: {selectedOrder.userId?.name || 'N/A'}</Typography>
                <Typography>
                  Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </Typography>
                <Typography>Status: {selectedOrder.status}</Typography>
                <Typography>Total: ${selectedOrder.totalPrice.toFixed(2)}</Typography>
                <Box mt={2}>
                  <Typography variant="subtitle1">Items:</Typography>
                  {selectedOrder.orderItems.map((item, index) => (
                    <Typography key={index}>
                      {item.productId?.name || 'Item'} – Qty: {item.quantity}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  onClick={handleDownloadReceipt}
                  sx={{
                    borderRadius: 0,
                    bgcolor: '#000',
                    color: '#FFD600',
                    '&:hover': { bgcolor: '#333' },
                  }}
                >
                  Download PDF
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowReceipt(false)}
                  sx={{
                    borderRadius: 0,
                    borderColor: '#000',
                    color: '#000',
                    '&:hover': { bgcolor: '#f0f0f0' },
                  }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Orders;
