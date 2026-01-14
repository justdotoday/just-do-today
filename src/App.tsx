// App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './pages/SignUp';
import KakaoCallback from './pages/auth/KakaoCallback';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Routes>
        {/* 기본 레이아웃 */}
        <Route
          path="/"
          element={
            <>
              <div className="font-black">추후 통합</div>
              <div className="flex flex-col">
                <Link to="/signup" className="text-blue-400 bg-green-50">
                  회원가입
                </Link>
                <Link to="/main" className="text-blue-400 bg-green-50">
                  메인페이지
                </Link>
              </div>
            </>
          }
        />

        {/* 라우팅 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </>
  );
}

export default App;
