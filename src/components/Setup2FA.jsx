
import React, { useState, useEffect } from 'react';
import { enableTwoFactor, verifyTwoFactor } from '../api'; 
import { getUser } from '../services/authService'; 
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

export default function Setup2FA() {
  const [email, setEmail] = useState('');    
  const [qrDataURL, setQrDataURL] = useState('');
  const [totpCode, setTotpCode] = useState(''); 
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
   
    const currentUser = getUser(); 
    if (currentUser && currentUser.email) {
      setEmail(currentUser.email);
    }
  }, []);

  async function handleEnable2FA() {
    setMessage('');
    setQrDataURL('');
    setBusy(true);

    try {
      
      const res = await enableTwoFactor(email);
      
      setQrDataURL(res.qrDataURL);
      setMessage(res.message || 'QR generated. Scan it, then enter code below.');
    } catch (err) {
      setMessage(err.message || 'Error enabling 2FA');
    } finally {
      setBusy(false);
    }
  }

  async function handleVerify2FA() {
    setMessage('');
    if (!totpCode) {
      return setMessage('Please enter the 6-digit code from your Authenticator app.');
    }

    setBusy(true);
    try {
      
      const res = await verifyTwoFactor(email, totpCode);
      
      setMessage(res.message || '2FA verified!');
    } catch (err) {
      setMessage(err.message || 'Verification failed. Check your code and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc' }}>
      <Typography variant="h5" gutterBottom>
        Enable Two-Factor Authentication
      </Typography>

      {message && (
        <Alert
          severity={busy ? 'info' : 'warning'}
          sx={{ mb: 2 }}
        >
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

      {!qrDataURL && (
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleEnable2FA}
          disabled={busy || !email}
          sx={{ mb: 2 }}
        >
          Generate TOTP Secret
        </Button>
      )}

      {qrDataURL && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Scan this QR code with your Authenticator app (Google Auth, Authy, etc.),
            then enter the 6-digit code below.
          </Typography>
          <img 
            src={qrDataURL} 
            alt="2FA QR Code" 
            style={{ maxWidth: '200px', display: 'block', marginBottom: '1rem' }} 
          />

          <TextField
            label="Enter Authenticator Code"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={totpCode}
            onChange={(e) => setTotpCode(e.target.value)}
          />

          <Button 
            variant="contained"
            color="success"
            onClick={handleVerify2FA}
            disabled={busy}
          >
            Verify Code
          </Button>
        </Box>
      )}
    </Box>
  );
}
