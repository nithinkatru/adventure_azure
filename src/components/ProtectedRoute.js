import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  const isAuthorized = user && allowedRoles.includes(user.role);

  return isAuthorized? (
    <Outlet />
  ): (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;