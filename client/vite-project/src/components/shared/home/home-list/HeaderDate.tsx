/** 홈 리스트 상단: 오늘 날짜(좌) + 진행중/완료 개수·진행률 바(우). */
type Props = {
  dateLabel: string;
  inProgressCount: number;
  doneCount: number;
  progressPercent: number;
};

const HeaderDate = ({ dateLabel, inProgressCount, doneCount, progressPercent }: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="text-2xl font-semibold leading-none">{dateLabel}</div>

      <div className="flex flex-col items-end">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-zinc-500">
            진행중{' '}
            <span className="ml-1 font-semibold text-zinc-800">{inProgressCount}</span>
          </span>
          <span className="text-blue-600">
            완료 <span className="ml-1 font-semibold">{doneCount}</span>
          </span>
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
