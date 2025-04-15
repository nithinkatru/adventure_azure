// src/App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './components/styles/App.css';

/* ----------  Pages  ---------- */
import Home from './components/user/Home';
import AboutUs from './components/user/AboutUs';
import Products from './components/user/Products';
import Category from './components/user/Category';
import ProductDetails from './components/user/ProductDetails';
import Orders from './components/user/Orders';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/user/Profile';
import CartContainer from './components/user/cartContainer';
import Checkout from './components/user/Checkout';

/* ----------  Admin  ---------- */
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import AdminUsers from './components/admin/AdminUsers';
import AdminCategories from './components/admin/AdminCategories';

/* ----------  Common  ---------- */
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken } from './components/services/authService';

/* ========================================================= */
/*  Inner component so we can use useLocation()               */
/* ========================================================= */
const AppContent = () => {
  const location = useLocation();

  // Cart badge state
  const [cartCount, setCartCount] = useState(0);
  const handleCartUpdate = (count) => setCartCount(count);

  // Check if current user is admin from stored token
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(decoded.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    }
  }, [location]);

  // Routes to decide when to hide NavBar and Footer
  const adminRoutes = [
    '/admin/dashboard',
    '/admin/products',
    '/admin/orders',
    '/admin/users',
    '/admin/categories',
  ];
  const authRoutes = ['/login', '/register'];
  const isAdminRoute = adminRoutes.some((p) => location.pathname.startsWith(p));
  const isAuthRoute = authRoutes.includes(location.pathname);
  const hideChrome = isAdminRoute || isAuthRoute;

  return (
    <div className="app">
      {!hideChrome && <NavBar cartCount={cartCount} />}
      <Container className="content">
        <Routes>
          {/* -------- Public Routes -------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products onCartUpdate={handleCartUpdate} />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/products/:id" element={<ProductDetails onCartUpdate={handleCartUpdate} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* -------- Protected Routes for Users -------- */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartContainer onCartUpdate={handleCartUpdate} />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* -------- Protected Routes for Admin -------- */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products/*" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
          </Route>

          {/* -------- Fallback -------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      {!hideChrome && <Footer />}
    </div>
  );
};

/* ========================================================= */
/*  Root component                                            */
/* ========================================================= */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
