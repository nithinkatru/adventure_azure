import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUser, removeToken } from '../authService';
import { logoutUser } from '../../api';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      removeUser(); 
      removeToken(); 
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;