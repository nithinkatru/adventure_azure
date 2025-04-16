// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { PaymentElement as StripePaymentElement } from '@stripe/react-stripe-js';
import theme from '../../theme/theme'; 

const CheckoutForm = ({ clientSecret, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Invoice Modal state
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [invoiceEmail, setInvoiceEmail] = useState('');

  // Payment submit handler
  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`, 
        },
      });

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast.success('Payment succeeded!');
        navigate('/success');
      }
    } catch (error) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleInvoiceButtonClick = () => {
    setOpenInvoiceModal(true);
  };

  
  const handleDownloadInvoice = async () => {
    const invoiceElement = document.getElementById('invoice');
    if (!invoiceElement) {
      toast.error('Invoice element not found.');
      return;
    }
    try {
      
      const canvas = await html2canvas(invoiceElement);
      const imgData = canvas.toDataURL('image/png');

     
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      
      console.log('[CheckoutForm] Sending invoice to email:', invoiceEmail);
      await axios.post('/api/send-invoice', {
        invoice: pdf.output('datauristring'),
        email: invoiceEmail,
      });
      toast.success('Invoice emailed successfully!');
      pdf.save(`invoice.pdf`);
      setOpenInvoiceModal(false); 
    } catch (error) {
      console.error('[CheckoutForm] Error in handleDownloadInvoice:', error);
      toast.error(`Invoice error: ${error.message}`);
    }
  };


  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: '900px', mx: 'auto', p: theme.spacing(4) }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Checkout
        </Typography>

        {/* Hidden Invoice Element for PDF Generation */}
        <Box id="invoice" sx={{ display: 'none' }}>
          <Typography variant="h5">Invoice</Typography>
          <Typography variant="body1">Total: ${totalAmount.toFixed(2)}</Typography>
          {cartItems.map((item) => (
            <Box key={item.productId._id}>
              <Typography variant="body2">
                {item.productId.name} x {item.quantity}: ${ (item.productId.price * item.quantity).toFixed(2) }
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Order Summary Card */}
        <Card sx={{ mb: theme.spacing(3), borderRadius: 0, border: `1px solid ${theme.palette.secondary.main}`, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: theme.spacing(2) }} />
            {cartItems.map((item) => (
              <Grid container justifyContent="space-between" key={item.productId._id}>
                <Grid item xs={8}>
                  <Typography variant="body1">{item.productId.name} x {item.quantity}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <Typography variant="body1">${(item.productId.price * item.quantity).toFixed(2)}</Typography>
                </Grid>
              </Grid>
            ))}
            <Divider sx={{ mt: theme.spacing(2), mb: theme.spacing(2) }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>Total:</Typography>
              </Grid>
              <Grid item textAlign="right">
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <form onSubmit={handleSubmitPayment} style={{ marginBottom: theme.spacing(3) }}>
          <StripePaymentElement />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: theme.spacing(3),
              borderRadius: 0,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.contrastText,
              '&:hover': { backgroundColor: '#333' }
            }}
            disabled={isLoading || !stripe || !elements}
          >
            {isLoading ? 'Processing...' : 'Submit Payment'}
          </Button>
        </form>

        {/* Download Invoice Button */}
        <Box sx={{ textAlign: 'center', mt: theme.spacing(2) }}>
          <Button
            variant="outlined"
            onClick={handleInvoiceButtonClick}
            sx={{
              borderRadius: 0,
              px: theme.spacing(3),
              py: theme.spacing(1),
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            Download Invoice
          </Button>
        </Box>

        {/* Invoice Modal */}
        <Dialog open={openInvoiceModal} onClose={() => setOpenInvoiceModal(false)}>
          <DialogTitle>Send Invoice via Email</DialogTitle>
          <DialogContent>
            <Typography>Please enter your email address to receive your invoice:</Typography>
            <TextField
              fullWidth
              label="Email"
              value={invoiceEmail}
              onChange={(e) => setInvoiceEmail(e.target.value)}
              sx={{ mt: theme.spacing(2) }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInvoiceModal(false)}>Cancel</Button>
            <Button onClick={handleDownloadInvoice} variant="contained" color="primary">
              Send & Download
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutForm;
