import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './auth/SocialSignUp';
import MainPage from './pages/onboarding/MainPage';
import CreateHabit from './pages/habit/CreateHabit';
import HabitPage from './pages/habit/HabitPage';
import Layout from './layout/Layout';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home/HomePage';
import HomeEmpty from './pages/home/components/HomeEmpty';
import SocialPage from './pages/social/SocialPage';
import SettingsPage from './pages/settings/SettingsPage';

export default function App() {
  return (
    <>
      {/* 습관생성 페이지에서 습관생성시 임시 토스트 노출 */}
      <Toaster position="bottom-center" containerStyle={{ bottom: 112 }} />

      <Routes>
        {/* Layout 적용 구간 */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <div className="font-black">추후 통합</div>
                <div className="flex flex-col">
                  <Link to="/signup">회원가입</Link>
                  <Link to="/main">메인페이지</Link>
                  <Link to="/home">홈(추후 조건부 랜더링 통합)</Link>
                  <Link to="/home/empty">홈 - Empty</Link>
                  <Link to="/home/list">홈 - List</Link>
                  <Link to="/createHabit">습관 생성</Link>
                </div>
              </>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/habit" element={<HabitPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/my" element={<SettingsPage />} />

          {/* ✅ 작업용 라우트 */}
          <Route path="/home/empty" element={<HomeEmpty />} />
          <Route path="/home/list" element={<HomePage />} />

          <Route path="/createHabit" element={<CreateHabit />} />
        </Route>
      </Routes>
    </>
  );
}
