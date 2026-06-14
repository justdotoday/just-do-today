import { useMemo } from 'react';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const PRIMARY = '#2E68EF';

type LogMap = Record<string, number>; // 'YYYY-MM-DD' → count

type Props = {
  year: number;
  month: number; // 0-indexed
  logs?: LogMap;
};

function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

const todayObj = new Date();

const HabitHeatmap = ({ year, month, logs = {} }: Props) => {
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth =
      todayObj.getFullYear() === year && todayObj.getMonth() === month;
    const todayDate = todayObj.getDate();

    const result: { day: number | null; isToday: boolean; isFuture: boolean }[] = [];

    for (let i = 0; i < firstDay; i++) {
      result.push({ day: null, isToday: false, isFuture: false });
    }
    for (let d = 1; d <= totalDays; d++) {
      result.push({
        day: d,
        isToday: isCurrentMonth && d === todayDate,
        isFuture: isCurrentMonth ? d > todayDate : false,
      });
    }
    return result;
  }, [year, month]);

  return (
    <div className="px-4 mt-4">
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((label, i) => (
          <p
            key={label}
            className={`text-center text-[11px] font-medium ${
              i === 0 ? 'text-red-400' : 'text-zinc-400'
            }`}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell.day) {
            return <div key={i} className="aspect-square" />;
          }

          const mm = String(month + 1).padStart(2, '0');
          const dd = String(cell.day).padStart(2, '0');
          const dateKey = `${year}-${mm}-${dd}`;
          const count = logs[dateKey] ?? 0;

          // 미래 또는 완료 없는 날
          if (cell.isFuture || count === 0) {
            if (cell.isToday) {
              return (
                <div key={i} className="aspect-square flex flex-col items-center justify-center gap-0.5">
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: PRIMARY }} />
                  <span className="text-[11px] font-semibold" style={{ color: PRIMARY }}>
                    {cell.day}
                  </span>
                </div>
              );
            }
            return (
              <div key={i} className="aspect-square flex items-center justify-center">
                <span className="text-[11px] text-zinc-300">{cell.day}</span>
              </div>
            );
          }

          // count별 배경색 (프라이머리 컬러 기준)
          let bg: string;
          let textColor: string;
          if (count >= 3) {
            bg = PRIMARY;
            textColor = '#FFFFFF';
          } else if (count === 2) {
            bg = withAlpha(PRIMARY, 0.6);
            textColor = PRIMARY;
          } else {
            bg = withAlpha(PRIMARY, 0.3);
            textColor = PRIMARY;
          }

          // 오늘이면 점도 표시
          return (
            <div
              key={i}
              className="aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5"
              style={{ backgroundColor: bg }}
            >
              {cell.isToday && (
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: textColor }} />
              )}
              <span className="text-[11px] font-semibold" style={{ color: textColor }}>
                {cell.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitHeatmap;
