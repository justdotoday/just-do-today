import axios from 'axios';
//axios 인스턴스

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('AccessToken'); // 로컬스토리지에서 토큰 꺼내기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰 실어 보내기
  }
  return config;
});
export default api;
