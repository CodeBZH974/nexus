import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from 'services/axios/axiosInstance';
import paths from 'routes/paths';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialize = useCallback(async () => {
    try {
      const tokenString = localStorage.getItem('auth_token');
      if (tokenString) {
        const token = JSON.parse(tokenString);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.access}`;
        // Vous pouvez ajouter un appel à /api/me/ ici pour récupérer les détails de l'utilisateur
        // const response = await axiosInstance.get('/me/');
        // setUser(response.data);
        setUser({ isAuthenticated: true }); // Pour l'instant, on se contente de savoir qu'il est authentifié
      }
    } catch (err) {
      console.error('Initialization error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (username, password) => {
    const response = await axiosInstance.post('/token/', { username, password });
    const { access, refresh } = response;
    localStorage.setItem('auth_token', JSON.stringify({ access, refresh }));
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
    setUser({ isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    delete axiosInstance.defaults.headers.common.Authorization;
    setUser(null);
    window.location.href = paths.defaultJwtLogin;
  }, []);

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;