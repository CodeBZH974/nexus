import axios from 'axios';

// Configuration de l'URL de base pour l'environnement de développement et de production
// Le code frontend s'exécute dans le NAVIGATEUR, pas dans le conteneur Docker.
// Il doit donc appeler l'adresse de la machine hôte (localhost) sur le port que Docker expose pour le backend.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Intercepteur de requête : ajoute le token d'authentification aux requêtes
axiosInstance.interceptors.request.use(async (config) => {
  const tokenString = localStorage.getItem('auth_token');
  if (tokenString) {
    try {
      const token = JSON.parse(tokenString);
      config.headers.Authorization = `Bearer ${token.access}`;
    } catch (e) {
      console.error('Failed to parse auth token from localStorage', e);
    }
  }
  return config;
});

// Intercepteur de réponse : gère les réponses et les erreurs, y compris le rafraîchissement du token
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data.data ? response.data.data : response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    // Si l'erreur est une 401 et que ce n'est pas une tentative de rafraîchissement du token
    // et qu'on n'a pas déjà essayé de rafraîchir le token pour cette requête
    if (
      error.response?.status === 401 &&
      !originalRequest.url.endsWith('/token/refresh/') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const tokenString = localStorage.getItem('auth_token');
        if (!tokenString) throw new Error('No auth token found in localStorage');

        const refreshToken = JSON.parse(tokenString).refresh;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // On utilise directement l'instance axios de base pour éviter une boucle d'intercepteurs.
        const response = await axios.post(`${BASE_URL}token/refresh/`, { refresh: refreshToken });

        const { access } = response.data;
        localStorage.setItem('auth_token', JSON.stringify({ access, refresh: refreshToken }));

        // On met à jour l'en-tête de la requête originale et on la relance.
        originalRequest.headers['Authorization'] = `Bearer ${access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('auth_token');
        // La redirection sera gérée par le contexte et les guards, on ne force plus ici.
        // window.location.href = '/auth/default/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data || error.message,
    });
  },
);

export default axiosInstance;
