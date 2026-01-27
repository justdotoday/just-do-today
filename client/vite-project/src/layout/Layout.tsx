import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';

const HIDE_FOOTER_PATHS = [
  '/createHabit',
  '/auth', // 소셜 로그인
  '/login',
  '/signup',
];

export default function Layout() {
  const { pathname } = useLocation();

  const hideFooter = HIDE_FOOTER_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      {!hideFooter && <MainFooter />}
    </div>
  );
}
