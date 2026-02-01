import { NavLink } from 'react-router-dom';
import { GoHome, GoHomeFill } from 'react-icons/go';
import {
  HiOutlineDocumentText,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUserGroup,
} from 'react-icons/hi2';
import { RiSettings4Line, RiSettings4Fill } from 'react-icons/ri';

const MainFooter = () => {
  const navItems = [
    { to: '/', label: '홈', icon: GoHome, activeIcon: GoHomeFill },
    {
      to: '/habit',
      label: '습관',
      icon: HiOutlineDocumentText,
      activeIcon: HiDocumentText,
    },
    {
      to: '/social',
      label: '소셜',
      icon: HiOutlineUserGroup,
      activeIcon: HiUserGroup,
    },
    {
      to: '/my',
      label: '설정',
      icon: RiSettings4Line,
      activeIcon: RiSettings4Fill,
    },
  ];

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 pb-[calc(16px+env(safe-area-inset-bottom))] sm:pb-6">
      <nav className="mx-auto grid h-[72px] max-w-[360px] grid-cols-4 rounded-full bg-white px-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center justify-center"
          >
            {({ isActive }) => (
              <div
                className={`flex h-[52px] w-full max-w-[80px] flex-col items-center justify-center gap-1 rounded-full transition-all
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-zinc-500'}
              `}
              >
                {isActive ? (
                  <item.activeIcon className="h-6 w-6" />
                ) : (
                  <item.icon className="h-6 w-6" />
                )}
                <span className="text-[12px] font-medium">{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default MainFooter;
