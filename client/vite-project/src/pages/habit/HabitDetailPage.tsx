import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronBack, IoChevronForward, IoChevronBack as IoChevronLeft, IoEllipsisVertical } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { colorToHex } from '../../constants/colors';
import { getHabitHeatmap } from '../../api/habit';
import api from '../../api/client';
import type { Habit } from '../../types/habit.type';
import DailyLogViewBottomSheet from '../../components/shared/home/home-list/bottom-sheet/DailyLogViewBottomSheet';

type LocationState = { habit: Habit };

function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const todayObj = new Date();

const HabitDetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };
  const habit = state?.habit;

  const [viewYear, setViewYear] = useState(todayObj.getFullYear());
  const [viewMonth, setViewMonth] = useState(todayObj.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    console.log('[selectedDate]', selectedDate);
  }, [selectedDate]);

  const { data: dailyLogData, isLoading: isLogLoading } = useQuery({
    queryKey: ['dailyLog', habit?.id, selectedDate],
    queryFn: async () => {
      console.log('[queryFn 실행]', habit?.id, selectedDate);
      try {
        const res = await api.get(`/api/daily-logs/today`, {
          params: { userHabitId: Number(habit?.userHabitId ?? habit?.id), logDate: selectedDate },
        });
        console.log('[dailyLog 응답]', res.data);
        return res.data as { mood: string; note: string };
      } catch (e) {
        console.error('[dailyLog 에러]', e);
        throw e;
      }
    },
    enabled: !!selectedDate,
    retry: false,
  });

  const { data: heatmapData } = useQuery({
    queryKey: ['heatmap', viewYear, viewMonth],
    queryFn: () => getHabitHeatmap(viewYear, viewMonth + 1),
  });

  const logMap = useMemo<Record<string, number>>(() => {
    if (!heatmapData?.days) return {};
    return Object.fromEntries(
      heatmapData.days.filter((d) => d.count > 0).map((d) => [d.date, d.count])
    );
  }, [heatmapData]);

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    const isCurrentMonth =
      todayObj.getFullYear() === viewYear && todayObj.getMonth() === viewMonth;
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
  }, [viewYear, viewMonth]);

  const habitHex = colorToHex(habit?.color);

  // 이번 달 실천일
  const thisMonthCount = useMemo(() => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    return Object.entries(logMap)
      .filter(([date]) => date.startsWith(`${viewYear}-${mm}`))
      .length;
  }, [logMap, viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    const isCurrentMonth =
      viewYear === todayObj.getFullYear() && viewMonth === todayObj.getMonth();
    if (isCurrentMonth) return;
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isNextDisabled =
    viewYear === todayObj.getFullYear() && viewMonth === todayObj.getMonth();

  if (!habit) {
    navigate('/habit', { replace: true });
    return null;
  }

  const isDone = habit.todayStatus === 'DONE' || habit.todayStatus === 'HEART';

  // 시작일로부터 오늘까지 경과일
  const elapsedDays = habit.startDate
    ? Math.floor(
        (todayObj.getTime() - new Date(habit.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center -ml-1"
        >
          <IoChevronBack className="text-2xl text-zinc-800" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/editHabit', { state: { habit } })}
          className="w-9 h-9 flex items-center justify-center -mr-1"
        >
          <IoEllipsisVertical className="text-xl text-zinc-800" />
        </button>
      </div>

      {/* 습관 정보 */}
      <div className="px-5 pb-6 border-b border-zinc-100">
        {/* 카테고리 */}
        <p className="text-sm text-zinc-400 mb-1">
          {habit.emoji && <span className="mr-1">{habit.emoji}</span>}
          {habit.category ?? '미분류'}
        </p>

        {/* 습관 이름 */}
        <h1 className="text-[22px] font-bold text-zinc-900 mb-3 leading-snug">
          {habit.name}
        </h1>

        {/* 칩 */}
        <div className="flex gap-2 flex-wrap">
          {elapsedDays != null && (
            <span className="text-xs text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-sm">
              {elapsedDays}일째
            </span>
          )}
          {habit.statusChip && (
            <span className="text-xs text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-sm">
              {habit.statusChip}
            </span>
          )}
        </div>
      </div>

      {/* 캘린더 */}
      <div className="px-5 py-5">
        {/* 월 네비게이션 */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-base font-semibold text-zinc-800">
            {viewYear}년 {viewMonth + 1}월
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100"
            >
              <IoChevronLeft className="text-zinc-500 text-lg" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              disabled={isNextDisabled}
              className="w-8 h-8 flex items-center justify-center rounded-full active:bg-zinc-100 disabled:opacity-30"
            >
              <IoChevronForward className="text-zinc-500 text-lg" />
            </button>
          </div>
        </div>

        {/* 요일 레이블 */}
        <div className="grid grid-cols-7 mb-3">
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

        {/* 날짜 셀 */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((cell, i) => {
            if (!cell.day) {
              return <div key={i} className="aspect-square" />;
            }

            const mm = String(viewMonth + 1).padStart(2, '0');
            const dd = String(cell.day).padStart(2, '0');
            const dateKey = `${viewYear}-${mm}-${dd}`;
            const count = logMap[dateKey] ?? 0;

            if (cell.isFuture || count === 0) {
              if (cell.isToday) {
                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center gap-0.5">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: habitHex }} />
                    <span className="text-[12px] font-semibold" style={{ color: habitHex }}>
                      {cell.day}
                    </span>
                  </div>
                );
              }
              return (
                <div key={i} className="aspect-square flex items-center justify-center">
                  <span className={`text-[12px] ${cell.isFuture ? 'text-zinc-200' : 'text-zinc-400'}`}>
                    {cell.day}
                  </span>
                </div>
              );
            }

            // count별 배경 (습관 고유 색상 기준)
            let bg: string;
            let textColor: string;
            if (count >= 3) {
              bg = habitHex;
              textColor = '#FFFFFF';
            } else if (count === 2) {
              bg = withAlpha(habitHex, 0.6);
              textColor = habitHex;
            } else {
              bg = withAlpha(habitHex, 0.3);
              textColor = habitHex;
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDate(dateKey)}
                className="aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5"
                style={{ backgroundColor: bg }}
              >
                {cell.isToday && (
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: textColor }} />
                )}
                <span className="text-[12px] font-semibold" style={{ color: textColor }}>
                  {cell.day}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 회고 바텀시트 */}
      {selectedDate && (
        <DailyLogViewBottomSheet
          open
          date={selectedDate}
          mood={isLogLoading ? '' : (dailyLogData?.mood ?? '')}
          note={isLogLoading ? '' : (dailyLogData?.note ?? '')}
          habitColor={habitHex}
          onClose={() => setSelectedDate(null)}
          onSave={() => setSelectedDate(null)}
        />
      )}

      {/* 통계 */}
      <div className="px-5 border-t border-zinc-100">
        <div className="flex items-center justify-between py-4 border-b border-zinc-50">
          <span className="text-sm text-zinc-500">이번 달 실천일</span>
          <span className="text-sm font-bold text-zinc-900">{thisMonthCount}일</span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-zinc-500">누적 실천일</span>
          <span className="text-sm font-bold text-zinc-900">—</span>
        </div>
      </div>
    </div>
  );
};

export default HabitDetailPage;
