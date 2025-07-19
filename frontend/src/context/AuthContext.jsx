import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../services/api'; // ✅ Make sure this path is correct

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/auth/me'); // Checks cookie
        setUser(res.data.user);
      } catch (err) {
        console.warn('Not authenticated');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register new user
  const register = async (name, email, password) => {
    const res = await axios.post('/auth/register', { name, email, password });
    setUser(res.data.user);
  };

  // Login existing user
  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    setUser(res.data.user);
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
