import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

type TopBarProps = {
  title: string;
};

export default function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="pt-[env(safe-area-inset-top)]" />

      <div className="relative flex h-12 items-center justify-center px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-2 inline-flex h-11 w-11 items-center justify-center rounded-full active:bg-zinc-100"
          aria-label="뒤로가기"
        >
          <IoChevronBack className="text-2xl text-zinc-900" />
        </button>

        <h1 className="text-[15px] font-semibold text-zinc-900">{title}</h1>
      </div>
    </header>
  );
}
