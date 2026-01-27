import { NavLink } from 'react-router-dom';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineDocumentText, HiDocumentText, HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi2';
import { RiSettings4Line, RiSettings4Fill } from 'react-icons/ri'; 

export default function MainFooter() {
  const navItems = [
    { to: '/', label: '홈', icon: GoHome, activeIcon: GoHomeFill },
    { to: '/habit', label: '습관', icon: HiOutlineDocumentText, activeIcon: HiDocumentText },
    { to: '/social', label: '소셜', icon: HiOutlineUserGroup, activeIcon: HiUserGroup },
    { to: '/my', label: '설정', icon: RiSettings4Line, activeIcon: RiSettings4Fill },
  ];

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <nav className="mx-auto grid h-[72px] max-w-[520px] grid-cols-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[12px] transition-colors ${
                isActive ? 'text-[#2563EB] font-medium' : 'text-zinc-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <item.activeIcon className="h-6 w-6" />
                ) : (
                  <item.icon className="h-6 w-6" />
                )}
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}