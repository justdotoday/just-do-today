type Props = {
  dateLabel: string; //화면에 보여줄 날짜
  inProgressCount: number; //진행중인 습관 개수
  doneCount: number; //완료한 습관 개수
  progressPercent: number; //진행률 퍼센트 (0~100)
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
