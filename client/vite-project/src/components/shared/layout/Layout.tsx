import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';

const HIDE_FOOTER_PATHS = [
  '/createHabit',
  '/editHabit',
  '/auth',
  '/login',
  '/signup',
  '/main',
];

const Layout = () => {
  const { pathname } = useLocation();
  const hideFooter = HIDE_FOOTER_PATHS.some((path) => pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto min-h-screen w-full max-w-[420px] bg-white">
        <main className={`pt-[env(safe-area-inset-top)] ${hideFooter ? '' : 'pb-[calc(80px+env(safe-area-inset-bottom))]'}`}>
          <Outlet />
        </main>

        {!hideFooter && <MainFooter />}
      </div>
    </div>
  );
};

export default Layout;
