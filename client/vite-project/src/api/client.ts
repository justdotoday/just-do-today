//axios 인스턴스

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰이 있으면 항상 Authorization 헤더 추가
// TODO: JWT에 memberId 클레임 추가되면 X-MEMBER-ID 하드코딩 제거 필요
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('AccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-MEMBER-ID'] = '1';
  return config;
});

export default api;
