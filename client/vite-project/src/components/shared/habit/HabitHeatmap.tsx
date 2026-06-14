/**
 * 습관별 월간 히트맵
 *
 * - 요일 레이블(일~토) + 7열 그리드
 * - 미래·기록 없는 날: 연회색(#F4F4F5) 단색 셀
 * - mood가 있는 날: attempt/maintain/perfect 상태에 따라 배경색 변환
 * - perfect 셀에만 체크 아이콘 표시
 */
import { useMemo } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import {
  FEELING_TO_STATUS,
  getHeatmapCellColors,
} from '../../../constants/heatmapColors';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const EMPTY_BG = '#F4F4F5';

type LogMap = Record<string, string>; // 'YYYY-MM-DD' → mood 문자열

type Props = {
  year: number;
  month: number;      // 0-indexed
  /** 습관 색상 hex (예: '#FF6B6B') */
  habitHex: string;
  /** 날짜별 mood 맵. 없으면 빈 객체로 넘기면 됨 */
  logs?: LogMap;
};

const todayObj = new Date();

const HabitHeatmap = ({ year, month, habitHex, logs = {} }: Props) => {
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth =
      todayObj.getFullYear() === year && todayObj.getMonth() === month;
    const todayDate = todayObj.getDate();

    const result: { day: number | null; isFuture: boolean }[] = [];

    // 1일 이전 빈 칸
    for (let i = 0; i < firstDay; i++) {
      result.push({ day: null, isFuture: false });
    }
    for (let d = 1; d <= totalDays; d++) {
      const isFuture = isCurrentMonth ? d > todayDate : false;
      result.push({ day: d, isFuture });
    }
    return result;
  }, [year, month]);

  return (
    <div className="px-4 mt-4">
      {/* 요일 레이블 */}
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

      {/* 날짜 셀 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell.day) {
            return <div key={i} className="aspect-square" />;
          }

          if (cell.isFuture) {
            // 미래: 빈 셀
            return <div key={i} className="aspect-square rounded-lg" />;
          }

          // 날짜 키 생성 (YYYY-MM-DD)
          const mm = String(month + 1).padStart(2, '0');
          const dd = String(cell.day).padStart(2, '0');
          const dateKey = `${year}-${mm}-${dd}`;
          const mood = logs[dateKey];
          const status = mood ? FEELING_TO_STATUS[mood] : undefined;

          if (!status) {
            // 기록 없는 과거: 연회색
            return (
              <div
                key={i}
                className="aspect-square rounded-lg"
                style={{ backgroundColor: EMPTY_BG }}
              />
            );
          }

          // 기록 있는 날: 상태별 색상
          const { surface } = getHeatmapCellColors(habitHex, status);
          return (
            <div
              key={i}
              className="aspect-square rounded-lg flex items-center justify-center"
              style={{ backgroundColor: surface }}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitHeatmap;
