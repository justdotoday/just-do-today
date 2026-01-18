import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';

export default function Layout() {
  const { pathname } = useLocation();

  // 네 라우트가 "createHabit" 이니까 여기가 핵심
  const hideFooter = pathname === '/createHabit';

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      {!hideFooter && <MainFooter />}
    </div>
  );
}
