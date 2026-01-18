import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

type topBarProps = {
  title: string;
};

export default function TopBar({ title }: topBarProps) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center h-12 px-4 border-b">
      <button
        onClick={() => navigate(-1)}
        className="mr-2"
        aria-label="뒤로가기"
      >
        <IoChevronBack size={20} />
      </button>

      <h1 className="text-base font-semibold">{title}</h1>
    </header>
  );
}
