/*******************************************************************
 * src/api.js
 *
 * A comprehensive Axios file for a React front-end that uses:
 * - registerUser    => POST /auth/register
 * - verifyTOTP      => POST /auth/verify-2fa  (6-digit TOTP code)
 * - loginUser       => POST /auth/login       (if 2FA enabled, pass token)
 * - logoutUser      => local logout (clears token and user from localStorage)
 * - Plus endpoints for products, cart, orders, categories, etc.
 *******************************************************************/
import axios from 'axios';
import { getToken, saveToken, saveUser, removeToken, removeUser } from './services/authService';

// Set base URL for Axios (adjust as needed)
axios.defaults.baseURL = 'http://localhost:5000';

/* ================================
   AUTHENTICATION ENDPOINTS
================================= */

/**
 * POST /auth/register
 * Expects userData = { name, email, password, role, phoneNumber, etc. }
 * Returns { user, message, otpauthURL, qrDataURL }
 */
export const registerUser = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};

/**
 * POST /auth/login
 * Expects credentials = { email, password, token (optional, if 2FA enabled) }
 * Returns { token, user }.
 */
export const loginUser = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  const { token, user } = response.data;
  if (token && user) {
    saveToken(token);
    saveUser(user);
  }
  return response.data;
};

/**
 * POST /auth/verify-2fa
 * Renamed here to verifyTOTP for front-end consistency.
 * Expects payload = { email, token: '6-digit TOTP code' }
 * Returns { message, twoFactorEnabled }.
 */
export const verifyTOTP = async (payload) => {
  const response = await axios.post('/auth/verify-2fa', payload);
  return response.data;
};

/**
 * Logout: Remove token and user from localStorage and redirect to /login.
 */
export const logoutUser = () => {
  removeToken();
  removeUser();
  window.location.href = '/login';
};

/* ================================
   PRODUCTS ENDPOINTS
================================= */

/**
 * GET /products => Returns array of all products.
 */
export const getProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};

/**
 * GET /products/:id => Fetch a single product by ID.
 */
export const getProductById = async (productId) => {
  const response = await axios.get(`/products/${productId}`);
  return response.data;
};

/**
 * POST /admin/products => Create a new product (requires JWT).
 * Expects formData (e.g., new FormData()).
 */
export const createProduct = async (formData) => {
  const token = getToken();
  const response = await axios.post('/admin/products', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * PUT /admin/products/:id => Update product (requires JWT).
 */
export const updateProductById = async (productId, formData) => {
  const token = getToken();
  const response = await axios.put(`/admin/products/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * DELETE /admin/products/:id => Delete a product (requires JWT).
 */
export const deleteProductById = async (productId) => {
  const token = getToken();
  const response = await axios.delete(`/admin/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* ================================
   USER PROFILE ENDPOINTS
================================= */

/**
 * GET /users/profile => Fetch the profile for the current user.
 */
export const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error('User not authorized');
  const response = await axios.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* ================================
   CART ENDPOINTS
================================= */

/**
 * POST /cart => Add an item to the user's cart.
 */
export const addToCart = async (productId, quantity = 1) => {
  const token = getToken();
  const response = await axios.post('/cart', { productId, quantity }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**
 * GET /cart/me => Retrieve the current user's cart.
 */
export const getCart = async () => {
  const token = getToken();
  const response = await axios.get('/cart/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * DELETE /cart/:productId => Remove an item from the cart.
 */
export const removeFromCart = async (productId) => {
  const token = getToken();
  const response = await axios.delete(`/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * PUT /cart/quantity => Update the quantity of an item in the cart.
 */
export const updateCartItemQuantity = async (productId, quantity) => {
  const token = getToken();
  const response = await axios.put('/cart/quantity', { productId, quantity }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/* ================================
   ORDERS ENDPOINTS
================================= */

/**
 * GET /admin/orders => Fetch orders (admin only).
 */
export const getAllOrdersForAdmin = async () => {
  const token = getToken();
  const response = await axios.get('/admin/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * PUT /orders/:id/status => Update the status of an order.
 */
export const updateOrderStatus = async (orderId, status) => {
  const token = getToken();
  const response = await axios.put(`/orders/${orderId}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* ================================
   CATEGORIES ENDPOINTS
================================= */

/**
 * GET /api/categories => Fetch all categories.
 */
export const getCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};

/**
 * GET /products/category/:category => Fetch products by category.
 */
export const getProductsByCategory = async (category) => {
  const response = await axios.get(`/products/category/${category}`);
  return response.data;
};

/* ================================
   RATING ENDPOINTS
================================= */

/**
 * POST /products/:id/rate => Rate a product.
 */
export const rateProduct = async (productId, rating) => {
  const token = getToken();
  const response = await axios.post(`/products/${productId}/rate`, { rating }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* ================================
   ADMIN DASHBOARD ENDPOINTS
================================= */

/**
 * GET /admin/dashboard => Fetch admin dashboard data.
 */
export const getAdminDashboardData = async () => {
  const token = getToken();
  const response = await axios.get('/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

/**
 * GET /admin/users => Fetch all users (admin only).
 */
export const getAdminUsers = async () => {
  const token = getToken();
  const response = await axios.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * DELETE /admin/:userId => Delete a user (admin only).
 */
export const deleteUser = async (userId) => {
  const token = getToken();
  const response = await axios.delete(`/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* ================================
   SEARCH / SUGGESTIONS
================================= */

/**
 * Fetch all products and filter by name.
 */
export const getProductSuggestions = async (query) => {
  const allProducts = await getProducts();
  return allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};
