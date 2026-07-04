import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './auth/SocialSignUp';
import OAuthCallback from './auth/OAuthCallback';
import MainPage from './pages/onboarding/MainPage';
import CreateHabit from './pages/habit/CreateHabit';
import EditHabit from './pages/habit/EditHabit';
import HabitDetailPage from './pages/habit/HabitDetailPage';
import HabitPage from './pages/habit/HabitPage';
import ManageCategory from './pages/habit/ManageCategory';
import Layout from './components/shared/layout/Layout';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home/HomePage';
import SocialPage from './pages/social/SocialPage';
import SettingsPage from './pages/settings/SettingsPage';
import PushTestPage from './pages/test/PushTestPage';
import ManageAccountPage from './pages/settings/ManageAccountPage';

// 토큰 유무에 따라 /home 또는 /signup으로 리다이렉트
const RootRedirect = () => {
  const token = localStorage.getItem('AccessToken');
  return <Navigate to={token ? '/home' : '/signup'} replace />;
};

// 토큰 없으면 /signup으로 보내는 보호 라우트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('AccessToken');
  if (!token) return <Navigate to="/signup" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <>
      {/* 습관생성 페이지에서 습관생성시 임시 토스트 노출 */}
      <Toaster position="bottom-center" containerStyle={{ bottom: 112 }} />

      <Routes>
        {/* OAuth 콜백: Layout 없이 토큰 저장 후 즉시 리다이렉트 */}
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/test/push" element={<PushTestPage />} />

        {/* Layout 적용 구간 */}
        <Route element={<Layout />}>
          {/* 루트: 토큰 유무에 따라 /home 또는 /signup으로 리다이렉트 */}
          <Route path="/" element={<RootRedirect />} />

          <Route path="/signup" element={<Signup />} />

          {/* 인증 필요 라우트 */}
          <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/habit" element={<ProtectedRoute><HabitPage /></ProtectedRoute>} />
          <Route path="/social" element={<ProtectedRoute><SocialPage /></ProtectedRoute>} />
          <Route path="/my" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/myaccount" element={<ProtectedRoute><ManageAccountPage /></ProtectedRoute>} />
          <Route path="/home/list" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/createHabit" element={<ProtectedRoute><CreateHabit /></ProtectedRoute>} />
          <Route path="/editHabit" element={<ProtectedRoute><EditHabit /></ProtectedRoute>} />
          <Route path="/habitDetail" element={<ProtectedRoute><HabitDetailPage /></ProtectedRoute>} />
          <Route path="/manageCategory" element={<ProtectedRoute><ManageCategory /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
}
