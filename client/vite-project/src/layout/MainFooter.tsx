import { NavLink } from 'react-router-dom';
import homeIcon from '../assets/mainFooter/basicIcon/homeIcon.png';
import habitIcon from '../assets/mainFooter/basicIcon/habitIcon.png';
import socialIcon from '../assets/mainFooter/basicIcon/socialIcon.png';
import settingIcon from '../assets/mainFooter/basicIcon/settingIcon.png';
import homeBlue from '../assets/mainFooter/BlueIcon/HomeBlue.png';
import habitBlue from '../assets/mainFooter/BlueIcon/habitBlue.png';
import socialBlue from '../assets/mainFooter/BlueIcon/socialBlue.png';
import settingBlue from '../assets/mainFooter/BlueIcon/settingBlue.png';

const MainFooter = () => {
  const navItems = [
    { to: '/home', label: '홈', iconSrc: homeIcon, activeIconSrc: homeBlue },
    {
      to: '/habit',
      label: '습관',
      iconSrc: habitIcon,
      activeIconSrc: habitBlue,
    },
    {
      to: '/social',
      label: '소셜',
      iconSrc: socialIcon,
      activeIconSrc: socialBlue,
    },
    {
      to: '/my',
      label: '설정',
      iconSrc: settingIcon,
      activeIconSrc: settingBlue,
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
                <img
                  src={isActive ? item.activeIconSrc : item.iconSrc}
                  alt={item.label}
                  className="h-6 w-6"
                />
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
