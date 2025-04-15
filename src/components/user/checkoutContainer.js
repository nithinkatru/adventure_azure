import React, { useState, useEffect } from 'react';
import Checkout from './Checkout';
import { getCart } from '../api';
import { toast } from 'react-toastify';
import { getUser } from '../services/authService';

const CheckoutContainer = () => {
    const [cartItems, setCartItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            setLoading(true);
            try {
                const cart = await getCart();
                setCartItems(cart.items);

                const calculatedTotalPrice = cart.items.reduce(
                    (acc, item) => acc + item.productId.price * item.quantity,
                    0
                );
                setTotalPrice(calculatedTotalPrice);

                const user = getUser();
                if (user) {
                    setUserId(user._id);
                    setUserEmail(user.email);
                } else {
                    throw new Error('User not found.');
                }

                setOrderId('temp-order-id');
            } catch (err) {
                setError(err);
                toast.error(err.message || 'Failed to load checkout data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutData();
    }, []);

    if (loading) {
        return <div>Loading checkout...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!cartItems || cartItems.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <Checkout
            cartItems={cartItems}
            totalPrice={totalPrice}
            orderId={orderId}
            userId={userId}
            userEmail={userEmail}
        />
    );
};

export default CheckoutContainer;