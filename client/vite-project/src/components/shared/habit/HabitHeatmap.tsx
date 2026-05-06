import { useMemo } from 'react';

type Props = {
  year: number;
  month: number; // 0-indexed
};

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

// completionRate: 0~1 | null = 미래/데이터없음
function getCellColor(rate: number | null): string {
  if (rate === null) return '#F4F4F5';
  if (rate === 0) return '#F4F4F5';
  if (rate < 0.34) return '#BFDBFE';
  if (rate < 0.67) return '#93C5FD';
  if (rate < 1.0) return '#60A5FA';
  return '#2E68EF';
}

const HabitHeatmap = ({ year, month }: Props) => {
  const today = new Date();

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth =
      today.getFullYear() === year && today.getMonth() === month;

    const result: { day: number | null; rate: number | null }[] = [];

    for (let i = 0; i < firstDay; i++) {
      result.push({ day: null, rate: null });
    }
    for (let d = 1; d <= totalDays; d++) {
      const isFuture = isCurrentMonth && d > today.getDate();
      result.push({ day: d, rate: isFuture ? null : 0 }); // 0 = 데이터 없음 (API 대기)
    }
    return result;
  }, [year, month]);

  return (
    <div className="px-4 mt-4">
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((label, i) => (
          <p
            key={label}
            className={`text-center text-[12px] font-medium ${i === 0 ? 'text-red-400' : 'text-zinc-400'}`}
          >
            {label}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg"
            style={{ backgroundColor: cell.day ? getCellColor(cell.rate) : 'transparent' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitHeatmap;
