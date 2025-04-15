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
  Modal
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
      createdAt: '2024-04-01',
    },
  ];
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getMyOrders();
        setOrders(result);
      } catch (err) {
        console.error('Error fetching orders:', err);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleViewReceipt(order)}>
                    View Receipt
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Receipt Modal */}
      <Modal open={showReceipt} onClose={() => setShowReceipt(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {selectedOrder && (
            <>
              <div id="receipt">
                <Typography variant="h6" gutterBottom>
                  Receipt - Order #{selectedOrder._id}
                </Typography>
                <Typography>User: {selectedOrder.userId?.name || 'N/A'}</Typography>
                <Typography>Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</Typography>
                <Typography>Status: {selectedOrder.status}</Typography>
                <Typography>Total: ${selectedOrder.totalPrice}</Typography>

                <Box mt={2}>
                  <Typography variant="subtitle1">Items:</Typography>
                  {selectedOrder.orderItems.map((item, index) => (
                    <Typography key={index}>
                      {item.productId?.name || 'Product'} - Qty: {item.quantity}
                    </Typography>
                  ))}
                </Box>
              </div>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={handleDownloadReceipt}>
                  Download PDF
                </Button>
                <Button variant="outlined" onClick={() => setShowReceipt(false)}>
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
