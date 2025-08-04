

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');
export const isLoggedIn = () => !!getToken();

// Extract payload from token
export const getUserEmailFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split('.')[1]; // middle part
    const decoded = JSON.parse(atob(payload));
    return decoded.email || null;
  } catch (err) {
    console.error('Invalid token format', err);
    return null;
  }
};
