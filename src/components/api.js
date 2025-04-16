
import axios from 'axios';
import { getToken, saveToken, saveUser, removeToken, removeUser } from './services/authService';


axios.defaults.baseURL = 'http://localhost:5000';




export const registerUser = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};


export const loginUser = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  const { token, user } = response.data;
  if (token && user) {
    saveToken(token);
    saveUser(user);
  }
  return response.data;
};


export const verifyTOTP = async (payload) => {
  const response = await axios.post('/auth/verify-2fa', payload);
  return response.data;
};


export const logoutUser = () => {
  removeToken();
  removeUser();
  window.location.href = '/login';
};


export const getProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};


export const getProductById = async (productId) => {
  const response = await axios.get(`/products/${productId}`);
  return response.data;
};


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


export const deleteProductById = async (productId) => {
  const token = getToken();
  const response = await axios.delete(`/admin/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error('User not authorized');
  const response = await axios.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const addToCart = async (productId, quantity = 1) => {
  const token = getToken();
  const response = await axios.post(
    '/cart',
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


export const getCart = async () => {
  const token = getToken();
  const response = await axios.get('/cart/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const removeFromCart = async (productId) => {
  const token = getToken();
  const response = await axios.delete(`/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const updateCartItemQuantity = async (productId, quantity) => {
  const token = getToken();
  const response = await axios.put(
    '/cart/quantity',
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


export const getAllOrdersForAdmin = async () => {
  const token = getToken();
  const response = await axios.get('/admin/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const token = getToken();
  const response = await axios.put(
    `/orders/${orderId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};




export const getCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};


export const getProductsByCategory = async (category) => {
  const response = await axios.get(`/products/category/${category}`);
  return response.data;
};


export const rateProduct = async (productId, rating) => {
  const token = getToken();
  const response = await axios.post(
    `/products/${productId}/rate`,
    { rating },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


export const getAdminDashboardData = async () => {
  const token = getToken();
  const response = await axios.get('/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};


export const getAdminUsers = async () => {
  const token = getToken();
  const response = await axios.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Deletion failed' };
  }
};


export const addUser = async (userData) => {
  try {
    const response = await axios.post('/admin/users', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add user' };
  }
};


export const getProductSuggestions = async (query) => {
  const allProducts = await getProducts();
  return allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};
