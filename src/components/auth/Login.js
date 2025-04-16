import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import '../styles/Login.css';
import { loginUser } from '../api';

export default function Login() {
  const navigate = useNavigate();

  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [remember, setRemember] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [needsTOTP, setNeedsTOTP] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleLogin(e) {
    e.preventDefault();

    // Reset errors
    setErrors({});
    let valid = true;
    let validationErrors = {};

    if (!needsTOTP) {
      if (!email) {
        validationErrors.email = 'Email is required.';
        valid = false;
      } else if (!emailRegex.test(email)) {
        validationErrors.email = 'Enter a valid email address.';
        valid = false;
      }
      if (!password) {
        validationErrors.password = 'Password is required.';
        valid = false;
      }
    } else {
      if (!totpCode) {
        validationErrors.totpCode = 'OTP code is required.';
        valid = false;
      }
      // Enforce exactly 6 digits for the OTP code
      else if (!/^\d{6}$/.test(totpCode)) {
        validationErrors.totpCode = 'Enter a valid 6-digit OTP code.';
        valid = false;
      }
    }

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setBusy(true);
    setMessage('');
    setIsSuccess(false);

    try {
      let credentials;
      if (!needsTOTP) {
        credentials = { email, password };
      } else {
        credentials = { email, password, token: totpCode };
      }

      const data = await loginUser(credentials);

      setMessage('Login success!');
      setIsSuccess(true);

      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Get the exact error from response if available.
      const errMsg = err.response && err.response.data && err.response.data.message 
        ? err.response.data.message 
        : err.message || 'Login failed. Try again.';
      if (errMsg === 'TOTP code required (2FA enabled)') {
        setNeedsTOTP(true);
        setMessage('Please enter the OTP code!');
      } else {
        setMessage(errMsg);
      }
      setIsSuccess(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          border: '2px solid #000',
          borderRadius: 0,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>

        {message && (
          <Alert severity={isSuccess ? 'success' : 'error'} sx={{ mb: 2 }}>
            {busy ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={18} sx={{ mr: 1 }} />
                {message}
              </Box>
            ) : (
              message
            )}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          {!needsTOTP && (
            <>
              {/* Email Field */}
              <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              {/* Password Field */}
              <TextField
                label="Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label="Remember me"
                sx={{ mb: 2 }}
              />
            </>
          )}

          {needsTOTP && (
            <TextField
              label="Enter OTP Code"
              fullWidth
              sx={{ mb: 2 }}
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              error={!!errors.totpCode}
              helperText={errors.totpCode}
              InputLabelProps={{
                sx: { color: 'blue' },
              }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={busy}
            fullWidth
            sx={{
              borderRadius: 0,
              bgcolor: '#000',
              color: '#FFD600',
            }}
          >
            {busy ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account?{' '}
          <Button
            variant="text"
            onClick={() => navigate('/register')}
            sx={{ p: 0, textTransform: 'none' }}
          >
            Sign up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}
