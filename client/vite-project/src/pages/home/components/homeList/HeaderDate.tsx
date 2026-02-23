/** 홈 리스트 상단: 오늘 날짜(예: 2월 22일), 진행중/완료 개수, 진행률 바. */
type Props = {
  dateLabel: string;
  inProgressCount: number;
  doneCount: number;
  progressPercent: number;
};

const HeaderDate = ({
  dateLabel,
  inProgressCount,
  doneCount,
  progressPercent,
}: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="leading-none">
        <div className="text-2xl font-semibold">{dateLabel}</div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex items-center gap-4 text-sm">
          <button className="text-zinc-500">
            진행중{' '}
            <span className="ml-1 font-semibold text-zinc-800">
              {inProgressCount}
            </span>
          </button>
          <button className="text-blue-600">
            완료 <span className="ml-1 font-semibold">{doneCount}</span>
          </button>
        </div>

        <div className="mt-3 h-1 w-44 rounded-full bg-zinc-100">
          <div
            className="h-1 rounded-full bg-blue-600"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderDate;
