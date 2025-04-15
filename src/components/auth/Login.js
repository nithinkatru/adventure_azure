/***********************************************************************
 * src/pages/Login.jsx
 *
 * Phase 1: Show Email & Password. If server says 2FA is required,
 * hide them and show an OTP text field in blue label.
 ***********************************************************************/
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

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [remember, setRemember] = useState(false);

  // UI states
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [needsTOTP, setNeedsTOTP] = useState(false); // decides if we hide email/pw
  const [isSuccess, setIsSuccess] = useState(false); // green or red Alert

  async function handleLogin(e) {
    e.preventDefault();

    // If we haven't entered email/password yet, do a simple check
    if (!needsTOTP && (!email || !password)) {
      setMessage('Please fill in Email & Password.');
      setIsSuccess(false);
      return;
    }

    setBusy(true);
    setMessage('');
    setIsSuccess(false);

    try {
      let credentials;
      if (!needsTOTP) {
        // Attempt #1: user only has email/password
        credentials = { email, password };
      } else {
        // Attempt #2: user must have TOTP code (server told us)
        credentials = { email, password, token: totpCode };
      }

      const data = await loginUser(credentials);

      // If success:
      setMessage('Login success!');
      setIsSuccess(true);

      // Example redirect logic
      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Check server's message
      const errMsg = err?.response?.data?.message || '';
      if (errMsg === 'TOTP code required (2FA enabled)') {
        // The server says we must provide TOTP
        setNeedsTOTP(true);
        // Switch to phase 2: hide email/pw, show TOTP input
        setMessage('Please enter the OTP code!');
        setIsSuccess(false);
      } else {
        // Other login errors
        setMessage(err.message || 'Login failed. Try again.');
        setIsSuccess(false);
      }
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

        {/* If there's a message, show success (green) or error (red) */}
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
              />
              {/* Password Field */}
              <TextField
                label="Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              InputLabelProps={{
                sx: { color: 'blue' }, // label in blue
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
              color: '#FFD600'
            }}
          >
            {busy ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Sign up link */}
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
