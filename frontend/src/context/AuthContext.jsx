import { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from 'services/axios/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    delete axiosInstance.defaults.headers.common.Authorization;
    setUser(null);
    // Redirection avec useNavigate (nécessite que AuthProvider soit à l'intérieur du BrowserRouter)
    // navigate(paths.defaultJwtLogin);
  }, []);

  const initialize = useCallback(async () => {
    try {
      const tokenString = localStorage.getItem('auth_token');
      if (tokenString) {
        const token = JSON.parse(tokenString);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.access}`;
        // Vous pouvez ajouter un appel à /api/me/ ici pour récupérer les détails de l'utilisateur
        const response = await axiosInstance.get('/me/');
        setUser(response.data);
        //setUser({ isAuthenticated: true }); // Pour l'instant, on se contente de savoir qu'il est authentifié
      }
    } catch (err) {
      console.error('Initialization error:', err);
      setUser(null);
      // TODO: Ajouter une notification d'erreur à l'utilisateur (ex: avec enqueueSnackbar)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();

    // Écouteur pour l'événement de déconnexion forcé (ex: échec du refresh token)
    const handleLogoutEvent = () => {
      // On utilise la fonction de logout qui gère déjà tout
      logout();
    };

    window.addEventListener('logout', handleLogoutEvent);

    return () => window.removeEventListener('logout', handleLogoutEvent);
  }, [initialize, logout]);

  const login = useCallback(async (username, password) => {
    const response = await axiosInstance.post('/token/', { username, password });
    const { access, refresh } = response;
    localStorage.setItem('auth_token', JSON.stringify({ access, refresh }));
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
    // Après le login, on récupère les données de l'utilisateur pour enrichir le contexte.
    const userResponse = await axiosInstance.get('/me/');
    setUser(userResponse.data);
  }, []);

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;