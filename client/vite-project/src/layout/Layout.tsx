import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';

const HIDE_FOOTER_PATHS = [
  '/createHabit',
  '/auth',
  '/login',
  '/signup',
  '/main',
];

const Layout = () => {
  const { pathname } = useLocation();
  const hideFooter = HIDE_FOOTER_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto min-h-screen w-full max-w-[414px] bg-white">
        <main className={hideFooter ? '' : 'pb-[96px]'}>
          <Outlet />
        </main>

        {!hideFooter && <MainFooter />}
      </div>
    </div>
  );
};

export default Layout;
