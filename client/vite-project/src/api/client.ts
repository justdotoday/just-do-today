//axios 인스턴스

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // JWT 인증 전까지 임시로 고정 memberId 사용
    'X-MEMBER-ID': '1',
  },
});

// 백엔드에서 JWT 인증을 도입한 뒤 VITE_USE_AUTH=true 로 켜면 Authorization 헤더 추가
const useAuth = import.meta.env.VITE_USE_AUTH === 'true';

api.interceptors.request.use((config) => {
  if (useAuth) {
    const token = localStorage.getItem('AccessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
