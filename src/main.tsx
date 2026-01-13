import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

console.log('ENV RAW', JSON.stringify(import.meta.env, null, 2));
console.log('KAKAO KEY ONLY', import.meta.env.VITE_KAKAO_REST_API_KEY);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
