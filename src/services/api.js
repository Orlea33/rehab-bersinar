// src/services/api.js
import axios from 'axios';

// Buat instance axios dengan base URL backend (ganti nanti)
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL backend FastAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan user ID jika ada (untuk autentikasi sederhana)
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

// ========== MOCK UNTUK DEVELOPMENT (HAPUS SAAT BACKEND SUDAH SIAP) ==========
// Simulasi registrasi dengan random assignment dan simpan di localStorage
export const mockRegister = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Random assignment 50:50
      const group = Math.random() < 0.5 ? 'A' : 'B';
      const newUser = {
        id: Date.now(),
        nama: userData.nama,
        group_type: group,
      };
      // Simpan ke "database" localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ ...userData, id: newUser.id, group_type: group });
      localStorage.setItem('users', JSON.stringify(users));
      resolve({ data: { user: newUser } });
    }, 500);
  });
};

// ========== FUNGSI ASLI UNTUK BACKEND (COMMENT DULU) ==========
// export const register = (userData) => api.post('/register', userData);
// export const submitPretest = (data) => api.post('/pretest', data);
// export const submitPreferences = (data) => api.post('/preferences', data);
// export const getContents = () => api.get('/contents');
// export const getRecommendations = (userId) => api.get(`/recommendations/${userId}`);