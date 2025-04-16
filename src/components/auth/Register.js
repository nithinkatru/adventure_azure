import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/system';
import { QRCodeCanvas } from 'qrcode.react';

import { registerUser, loginUser, verifyTOTP } from '../api';
import profileDp from '../assets/profile.jpeg';
import '../styles/Register.css';

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '12px 30px',
  fontSize: '16px',
  letterSpacing: '1px',
  borderRadius: 0,
  backgroundColor: '#000',
  color: '#FFD600',
  '&:hover': {
    backgroundColor: '#333',
    boxShadow: 'none',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#000',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    '& fieldset': {
      borderColor: '#000',
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFD600',
    },
  },
  marginBottom: '20px',
});

export default function Register() {
  const navigate = useNavigate();

  // Basic form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // Form validation state
  const [errors, setErrors] = useState({});

  // UI states
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // TOTP step states
  const [showTOTP, setShowTOTP] = useState(false);
  const [otpauthURL, setOtpauthURL] = useState('');
  const [qrDataURL, setQrDataURL] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Regular Expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Allows an optional plus, digits, spaces and dashes, requires between 10 and 15 characters.
  const phoneRegex = /^\+?[0-9\s\-]{10,15}$/;

  // Handle registration with validation.
  async function handleRegister(e) {
    e.preventDefault();
    setMessage('');
    setErrors({});

    let formErrors = {};
    if (!name.trim()) formErrors.name = 'Name is required.';
    
    if (!email.trim()) {
      formErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    
    if (!password) {
      formErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long.';
    }
    
    if (!phoneNumber.trim()) {
      formErrors.phoneNumber = 'Phone number is required.';
    } else if (!phoneRegex.test(phoneNumber)) {
      formErrors.phoneNumber = 'Please enter a valid phone number (10-15 digits, spaces or dashes allowed).';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        role,
        phoneNumber,
      };

      // registerUser returns { message, user, otpauthURL, qrDataURL }
      const res = await registerUser(userData);
      setMessage(res.message || 'Registered!');
      
      if (res.otpauthURL) {
        setOtpauthURL(res.otpauthURL);
        setShowTOTP(true);
      }
      if (res.qrDataURL) {
        setQrDataURL(res.qrDataURL);
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || '';
      if (errorMsg.toLowerCase().includes('already')) {
        setMessage('Account already created');
      } else {
        setMessage(errorMsg || 'Registration failed. Try again.');
      }
    }
  }

  // Verify TOTP and log in the user.
  async function handleVerifyTOTP() {
    if (!otpCode) {
      return setMessage('Please enter the 6-digit code from Microsoft Authenticator.');
    }
    setMessage('');

    try {
      const verifyRes = await verifyTOTP({ email, token: otpCode });
      setMessage(verifyRes.message || 'TOTP verified successfully.');

      const creds = { email, password, token: otpCode };
      const loginRes = await loginUser(creds);

      if (loginRes.user?.role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
      setMessage(err.message || 'Verification failed. Check your code.');
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          border: '2px solid #000',
          borderRadius: 0,
        }}
      >
        {/* Profile picture */}
        <Box
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #FFD600',
          }}
        >
          <img
            src={profileDp}
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Typography variant="h4" gutterBottom sx={{ color: '#000' }}>
          Register
        </Typography>

        {message && (
          <Alert
            severity="info"
            sx={{ width: '100%', mb: 2 }}
            onClose={() => setMessage('')}
          >
            {message}
          </Alert>
        )}

        {/* Step 1: Registration Form */}
        {!showTOTP && (
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <StyledTextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />

            <StyledTextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />

            <StyledTextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />

            <StyledTextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <StyledButton variant="contained" type="submit" fullWidth>
              Register
            </StyledButton>
          </form>
        )}

        {/* Step 2: TOTP Verification */}
        {showTOTP && (
          <Box sx={{ mt: 2, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Scan this code in Microsoft Authenticator
            </Typography>

            {qrDataURL ? (
              <img
                src={qrDataURL}
                alt="TOTP QR"
                style={{ width: 200, marginBottom: 10 }}
              />
            ) : (
              <QRCodeCanvas
                value={otpauthURL}
                size={200}
                includeMargin
                style={{ marginBottom: 10 }}
              />
            )}

            <Typography variant="body1" sx={{ mb: 2 }}>
              Open Microsoft Authenticator (or any TOTP app), add a new account, and scan the code.
              Then enter the 6-digit code below:
            </Typography>

            <TextField
              label="Authenticator Code"
              fullWidth
              sx={{ mb: 2 }}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />

            <Button variant="contained" fullWidth onClick={handleVerifyTOTP}>
              Verify & Login
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
