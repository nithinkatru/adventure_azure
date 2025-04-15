/*****************************************************************
 * src/pages/Register.jsx
 *
 * - User registers with name, email, password, role, phoneNumber
 * - Server returns TOTP secret in form of otpauthURL & qrDataURL
 * - We show a QR code; the user scans it in Microsoft Authenticator
 * - They enter the 6-digit code => we call verify2FA => if correct,
 *   we log them in.
 *****************************************************************/
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
// We use qrcode.react to build a QR if server doesn't supply base64
import { QRCodeCanvas } from 'qrcode.react'; 

// Import your new TOTP-based endpoints
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

  // UI states
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // TOTP step
  const [showTOTP, setShowTOTP] = useState(false);
  const [otpauthURL, setOtpauthURL] = useState(''); 
  const [qrDataURL, setQrDataURL] = useState('');   
  const [otpCode, setOtpCode] = useState('');

  // 1) Register user => get TOTP
  async function handleRegister(e) {
    e.preventDefault();
    setMessage('');

    try {
      const userData = {
        name,
        email,
        password,
        role,
        phoneNumber,
      };

      // register => server returns { message, user, otpauthURL, qrDataURL }
      const res = await registerUser(userData);
      setMessage(res.message || 'Registered!');

      // If server returns TOTP data => show the TOTP step
      if (res.otpauthURL) {
        setOtpauthURL(res.otpauthURL);
        setShowTOTP(true);
      }
      if (res.qrDataURL) {
        setQrDataURL(res.qrDataURL);
      }

      // If you prefer to do immediate login if TOTP isn't mandatory,
      // you could do that here if no TOTP is returned.
    } catch (err) {
      setMessage(err.message || 'Registration failed. Try again.');
    }
  }

  // 2) Verify TOTP code => if correct, login
  async function handleVerifyTOTP() {
    if (!otpCode) {
      return setMessage('Please enter the 6-digit code from Microsoft Authenticator.');
    }
    setMessage('');

    try {
      // The server route is POST /auth/verify-2fa => so we call verifyTOTP
      // which is now updated to axios.post('/auth/verify-2fa', ...)
      const verifyRes = await verifyTOTP({ email, token: otpCode });
      setMessage(verifyRes.message || 'TOTP verified successfully.');

      // If success, login
      const creds = { email, password, token: otpCode };
      const loginRes = await loginUser(creds);

      // If user is admin => admin dashboard, else home
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

        {/* Step 1: Normal register form */}
        {!showTOTP && (
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <StyledTextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <StyledTextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <StyledTextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <StyledTextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

        {/* Step 2: TOTP step if we have an otpauthURL */}
        {showTOTP && (
          <Box sx={{ mt: 2, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Scan this code in Microsoft Authenticator
            </Typography>

            {/* If server gave us a base64-coded image, we show <img />;
                otherwise, we build a QR from otpauthURL via qrcode.react */}
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
