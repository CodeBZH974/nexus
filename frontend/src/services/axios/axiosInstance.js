import axios from 'axios';
import { apiEndpoints } from 'routes/paths';

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
// --- Helper function to handle token refresh logic ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleRefreshToken = async () => {
  const tokenString = localStorage.getItem('auth_token');
  if (!tokenString) return Promise.reject(new Error('No auth token found'));

  const { refresh } = JSON.parse(tokenString);
  if (!refresh) return Promise.reject(new Error('No refresh token available'));

  try {
    // On utilise directement l'instance axios de base pour éviter une boucle d'intercepteurs.
    // Correction : On construit l'URL de manière robuste pour s'assurer qu'elle est toujours correcte.
    // L'URL de rafraîchissement est relative à la racine de l'API, pas à la BASE_URL qui contient déjà /api/.
    const refreshUrl = new URL(apiEndpoints.refreshToken, BASE_URL.replace('/api/', '/')).href;
    const response = await axios.post(refreshUrl, { refresh });
    const { access } = response.data;
    localStorage.setItem('auth_token', JSON.stringify({ access, refresh }));
    return access;
  } catch (err) {
    console.error('Token refresh failed:', err);
    localStorage.removeItem('auth_token');
    // On déclenche un événement personnalisé pour que l'AuthProvider puisse réagir et déconnecter l'utilisateur.
    window.dispatchEvent(new Event('logout'));
    return Promise.reject(err);
  }
};

// Intercepteur de réponse : gère les réponses et les erreurs, y compris le rafraîchissement du token
axiosInstance.interceptors.response.use(
  (response) => {
    // Simplification : On retourne toujours la totalité des données de la réponse.
    // La logique d'extraction spécifique est laissée à la charge de l'appelant (ex: hook SWR).
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    // Si l'erreur est une 401 et que ce n'est pas une tentative de rafraîchissement du token
    // et qu'on n'a pas déjà essayé de rafraîchir le token pour cette requête
    if (
       error.response?.status === 401 && !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const access = await handleRefreshToken();
        processQueue(null, access);
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    // For all other errors, just re-throw the original Axios error.
    // This preserves the full error context for better debugging and compatibility with libraries like SWR.
    return Promise.reject(error);
  },
);

export default axiosInstance;
