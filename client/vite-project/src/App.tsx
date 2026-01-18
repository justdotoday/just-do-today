import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './pages/SignUp';
import KakaoCallback from './auth/KaKaoCallback';
import MainPage from './pages/MainPage';
import Home from './pages/Home';
import CreateHabit from './pages/habbit/CreateHabit';
import Layout from './layout/Layout';

function App() {
  return (
    <Routes>
      {/* Layout 적용 구간 */}
      <Route element={<Layout />}>
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

                <Link to="/home" className="text-blue-400 bg-green-50">
                  홈
                </Link>
                <Link to="/createHabit" className="text-blue-400 bg-green-50">
                  습관 생성
                </Link>
              </div>
            </>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createHabit" element={<CreateHabit />} />
      </Route>

      {/* Layout 없이 따로 빼고 싶은 라우트가 있으면 여기 */}
      <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
    </Routes>
  );
}

export default App;
