import { NavLink } from 'react-router-dom';

export default function MainFooter() {
  const base = 'flex flex-col items-center justify-center gap-1 text-xs';

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <nav className="mx-auto grid h-[72px] max-w-[520px] grid-cols-4">
        <NavLink
          to="/"
          className={(
            { isActive } // 클릭시 조금 진한 색으로 변환
          ) =>
            `${base} ${
              isActive
                ? 'text-zinc-900 font-semibold'
                : 'text-zinc-500 font-medium'
            }`
          }
        >
          <div className="h-7 w-7 rounded-lg border-2 border-dashed border-zinc-400" />
          홈
        </NavLink>

        <NavLink
          to="/habit"
          className={(
            { isActive } // 클릭시 조금 진한 색으로 변환
          ) =>
            `${base} ${
              isActive
                ? 'text-zinc-900 font-semibold'
                : 'text-zinc-500 font-medium'
            }`
          }
        >
          <div className="h-7 w-7 rounded-lg border-2 border-dashed border-zinc-400" />
          습관
        </NavLink>

        <NavLink
          to="/social"
          className={(
            { isActive } // 클릭시 조금 진한 색으로 변환
          ) =>
            `${base} ${
              isActive
                ? 'text-zinc-900 font-semibold'
                : 'text-zinc-500 font-medium'
            }`
          }
        >
          <div className="h-7 w-7 rounded-lg border-2 border-dashed border-zinc-400" />
          소셜
        </NavLink>

        <NavLink
          to="/my"
          className={(
            { isActive } // 클릭시 조금 진한 색으로 변환
          ) =>
            `${base} ${
              isActive
                ? 'text-zinc-900 font-semibold'
                : 'text-zinc-500 font-medium'
            }`
          }
        >
          <div className="h-7 w-7 rounded-lg border-2 border-dashed border-zinc-400" />
          MY
        </NavLink>
      </nav>
    </footer>
  );
}
