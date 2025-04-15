import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../services/authService';
import { getCart } from '../api'; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = getToken();
       
        const cartData = await getCart();
        setCartItems(cartData.items); 

        const response = await axios.post(
          '/payment/create-payment-intent',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load cart or payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clientSecret) return <div>Failed to load payment details. Please try again.</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} cartItems={cartItems} />
    </Elements>
  );
};

export default Checkout;