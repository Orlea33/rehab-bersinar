// src/services/api.js
import axios from 'axios';

// Buat instance axios dengan base URL backend
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Pastikan backend berjalan di port ini
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor untuk menambahkan user ID ke header jika tersedia
api.interceptors.request.use(
  (config) => {
    const userId = sessionStorage.getItem('rehabUserId');
    if (userId) {
      config.headers['X-User-Id'] = userId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========== ENDPOINT FUNCTIONS ==========

// Registrasi pengguna baru (POST /register)
export const register = (userData) => api.post('/register', userData);

// Ambil semua materi (GET /contents)
export const getContents = () => api.get('/contents');

// Ambil detail materi berdasarkan ID (GET /contents/{id})
export const getContentById = (id) => api.get(`/contents/${id}`);

// Ambil rekomendasi untuk user tertentu (GET /recommendations/{userId})
export const getRecommendations = (userId) => api.get(`/recommendations/${userId}`);

// Tracking interaksi (POST /track)
export const trackOpen = (data) => api.post('/track', { ...data, action: 'open' });
export const trackClose = (data) => api.post('/track', { ...data, action: 'close' });
export const trackComplete = (data) => api.post('/track', { ...data, action: 'complete' });

// Submit post-test (POST /posttest)
export const submitPosttest = (data) => api.post('/posttest', data);

// Untuk inisialisasi materi (opsional, bisa dipanggil manual)
export const initMateri = () => api.post('/init-materi');

export const login = (data) => api.post('/login', data);

export const getUserProgress = (userId) => api.get(`/user/progress/${userId}`);
export const getUserAchievements = (userId) => api.get(`/user/achievements/${userId}`);

export const getUserWeeklyActivity = (userId) => {
  return api.get(`/users/${userId}/weekly-activity`);
};

export const updateUserProfile = (userId, data) => {
  return api.put(`/users/${userId}`, data);
};

export const submitFeedback = (data) => {
  return api.post('/feedback', data);
};

export const getStats = () => {
  return api.get('/stats');
};

export default {
  register,
  getContents,
  getContentById,
  getRecommendations,
  trackOpen,
  trackClose,
  trackComplete,
  submitPosttest,
  initMateri
};