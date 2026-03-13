import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL backend FastAPI
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

console.log('✅ api.js loaded, baseURL:', api.defaults.baseURL);

export default api;

// Named exports untuk semua fungsi API
export const register = (userData) => api.post('/register', userData);
export const getContents = () => api.get('/contents');
export const getContentById = (id) => api.get(`/contents/${id}`);
export const getRecommendations = () => api.get('/recommendations');
export const trackOpen = (data) => api.post('/track', { ...data, action: 'open' });
export const trackClose = (data) => api.post('/track', { ...data, action: 'close' });
export const trackComplete = (data) => api.post('/track', { ...data, action: 'complete' });
export const submitPosttest = (data) => api.post('/posttest', data);
export const login = (data) => api.post('/login', data);
export const getUserProgress = () => api.get('/user/progress');
export const getUserAchievements = () => api.get('/user/achievements');
export const getUserWeeklyActivity = () => api.get('/user/weekly-activity');
export const updateUserProfile = (data) => api.put('/users/me', data);
export const submitFeedback = (data) => api.post('/feedback', data);
export const getStats = () => api.get('/stats');

// Admin endpoints
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = () => api.get('/admin/users');
export const getAdminFeedbacks = () => api.get('/admin/feedbacks');
export const createMateri = (data) => api.post('/admin/materi', data);
export const updateMateri = (id, data) => api.put(`/admin/materi/${id}`, data);
export const deleteMateri = (id) => api.delete(`/admin/materi/${id}`);