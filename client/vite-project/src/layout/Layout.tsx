import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';

export default function Layout() {
  const { pathname } = useLocation();

  const hideFooter = pathname === '/createHabit';

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      {!hideFooter && <MainFooter />}
    </div>
  );
}
