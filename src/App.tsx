// App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './pages/SignUp';
import KakaoCallback from './pages/auth/KakaoCallBack';

function App() {
  return (
    <>
      <Routes>
        {/* 기본 레이아웃 */}
        <Route
          path="/"
          element={
            <>
              <div className="font-black">
                홈화면 구성 전 회원가입 버튼 테스트용
              </div>
              <Link to="/signup" className="text-blue-400 bg-green-50">
                회원가입
              </Link>
            </>
          }
        />

        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </>
  );
}

export default App;
