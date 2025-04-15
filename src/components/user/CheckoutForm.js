import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent, Divider, Grid } from '@mui/material';

const CheckoutForm = ({ clientSecret, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
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

  const totalAmount = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        <h1 color='Red'>Checkout</h1>
      </Typography>
      
      <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          
          {cartItems.map((item) => (
            <Grid container justifyContent="space-between" key={item.productId._id}>
              <Grid item xs={8}>
                <Typography variant="body1">{item.productId.name} x {item.quantity}</Typography>
              </Grid>
              <Grid item xs={4} textAlign="right">
                <Typography variant="body1">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ))}
          
          <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
          
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">Total:</Typography>
            </Grid>
            <Grid item textAlign="right">
              <Typography variant="h6">
                ${totalAmount.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
    
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <PaymentElement />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
          disabled={isLoading || !stripe || !elements}
        >
          {isLoading ? 'Processing...' : 'Submit Payment'}
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
