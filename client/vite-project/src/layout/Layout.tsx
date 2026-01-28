import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';

const HIDE_FOOTER_PATHS = ['/createHabit', '/auth', '/login', '/signup'];

const Layout = () => {
  const { pathname } = useLocation();

  const hideFooter = HIDE_FOOTER_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen">
      {/* footer가 fixed면 컨텐츠가 안 가리게 padding-bottom 필수 */}
      <main className={hideFooter ? '' : 'pb-[96px]'}>
        <Outlet />
      </main>

      {!hideFooter && <MainFooter />}
    </div>
  );
};

export default Layout;
