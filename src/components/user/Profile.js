// src/components/user/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Box,
  Button,
  CircularProgress,
  ThemeProvider
} from '@mui/material';

import { getUserProfile, logoutUser } from '../api';
import { removeUser, getToken } from '../services/authService';


import { blackYellowTheme } from '../../theme/blackYellowTheme'; 


export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        if (!token) {
          setProfileData(null);
        } else {
          const profile = await getUserProfile();
          setProfileData(profile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    
    return (
      <ThemeProvider theme={blackYellowTheme}>
        <Box
          sx={{
            minHeight: '80vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress sx={{ color: 'secondary.main' }} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
   
    <ThemeProvider theme={blackYellowTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
          Profile
        </Typography>

        {profileData ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Avatar */}
            <Avatar
              alt={profileData.name}
              src={
                profileData.profileImage
                  ? `http://localhost:5000/uploads/${profileData.profileImage}`
                  : '/path/to/default/profile/profile.jpg'
              }
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '2px solid',
                borderColor: 'secondary.main', 
              }}
            />
            {/* Name */}
            <Typography variant="h5" sx={{ mb: 1 }}>
              {profileData.name}
            </Typography>
            {/* Email */}
            <Typography variant="body1" sx={{ mb: 2 }}>
              Email: {profileData.email}
            </Typography>
            {/* Logout */}
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: 'primary.main',
                color: 'secondary.main', 
                borderRadius: 0,
                '&:hover': { bgcolor: '#333' },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No user logged in.
            </Typography>
            <Box>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  mr: 2,
                  bgcolor: 'primary.main',
                  color: 'secondary.main',
                  borderRadius: 0,
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'secondary.main',
                  borderRadius: 0,
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
