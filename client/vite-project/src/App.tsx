import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './auth/SocialSignUp';
import MainPage from './pages/MainPage';
import CreateHabit from './pages/habit/CreateHabit';
import Layout from './layout/Layout';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home/HomePage';
function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        햐{/* Layout 적용 구간 */}
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
          <Route path="/home" element={<HomePage />} />
          <Route path="/createHabit" element={<CreateHabit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
