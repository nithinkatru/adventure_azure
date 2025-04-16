export const saveUser  = (user)  =>
  localStorage.setItem('user',  JSON.stringify(user));

export const saveToken = (token) =>
  localStorage.setItem('token', token);


export const removeUser  = () => localStorage.removeItem('user');
export const removeToken = () => localStorage.removeItem('token');


export const getUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    removeUser();              
    return null;
  }
};

export const getToken = () => localStorage.getItem('token');


export const isLoggedIn = () => !!getToken();
