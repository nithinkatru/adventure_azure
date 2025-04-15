// src/components/services/authService.js
//------------------------------------------------------------
// Local‑storage helpers (token + user)
//------------------------------------------------------------

/* ----------  Save  ---------- */
export const saveUser  = (user)  =>
  localStorage.setItem('user',  JSON.stringify(user));

export const saveToken = (token) =>
  localStorage.setItem('token', token);

/* ----------  Remove  ---------- */
export const removeUser  = () => localStorage.removeItem('user');
export const removeToken = () => localStorage.removeItem('token');

/* ----------  Getters  ---------- */
export const getUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    removeUser();               // corrupted JSON -> clean it
    return null;
  }
};

export const getToken = () => localStorage.getItem('token');

/* ----------  Convenience  ---------- */
export const isLoggedIn = () => !!getToken();
