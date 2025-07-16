import axios from 'axios';

// Configuration de l'URL de base pour l'environnement de développement et de production
const BASE_URL = import.meta.env.VITE_API_URL || 'http://backend:8000/api/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Intercepteur de requête : ajoute le token d'authentification aux requêtes
axiosInstance.interceptors.request.use(async (config) => {
  const authToken = localStorage.getItem('auth_token');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
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
    // Si l'erreur est une 401 et que ce n'est pas une tentative de rafraîchissement de token
    // et qu'on n'a pas déjà essayé de rafraîchir le token pour cette requête
    if (error.response?.status === 401 && !originalRequest.url.endsWith('/token/refresh/') && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Tentative de rafraîchissement du token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const refreshResponse = await axiosInstance.post('/token/refresh/', {
            refresh: refreshToken,
          });
          if (refreshResponse.status === 200) {
            // Mettre à jour les tokens dans le localStorage
            localStorage.setItem('auth_token', refreshResponse.data.access);
            localStorage.setItem('refresh_token', refreshResponse.data.refresh);
            // Ajouter le nouveau token à l'en-tête de la requête initiale et la relancer
            axios.defaults.headers.common.Authorization = `Bearer ${refreshResponse.data.access}`;
            return axiosInstance(originalRequest);
          }
        }
        // Si le refresh échoue, on est probablement déconnecté, on lance une erreur
        throw new Error('Refresh token invalid');
      } catch (refreshError) {
        // En cas d'échec du refresh (token invalide, etc.), on déconnecte l'utilisateur
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        // On pourrait aussi rediriger vers la page de connexion ici
        // window.location.href = '/login';
      }
    }
    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data || error.message,
    });
  }
);

export default axiosInstance;
