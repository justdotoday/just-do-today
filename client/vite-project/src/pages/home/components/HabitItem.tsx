type Props = {
  title: string; //습관 이름
  isDone?: boolean; //습관 완료 여부
  isSelected?: boolean; // 현재 유저가 선택중인 습관인지 여부
};

const HabitItem = ({ title, isDone = false, isSelected = false }: Props) => {
  const wrapperClass = isSelected
    ? 'rounded-xl bg-blue-50 px-2 py-3'
    : 'rounded-xl px-2 py-3';
  const titleClass = isDone
    ? 'text-sm text-zinc-400 line-through'
    : isSelected
    ? 'text-sm font-semibold text-blue-600'
    : 'text-sm text-zinc-800';
  const dotClass = isSelected
    ? 'h-7 w-7 rounded-full bg-blue-100'
    : 'h-7 w-7 rounded-full bg-zinc-100';

  return (
    <div className={wrapperClass}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={dotClass} />
          <div className={titleClass}>{title}</div>
        </div>
        <button
          className={isSelected ? 'px-2 text-blue-300' : 'px-2 text-zinc-300'}
        >
          …
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
