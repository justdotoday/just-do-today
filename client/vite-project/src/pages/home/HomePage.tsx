/** 홈 페이지. 습관 조회·리스트/빈 화면 분기, 섹션·바텀시트·스낵바·삭제 담당. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getHabits, deleteHabit } from '../../api/habit';
import { showToast } from '../../components/ui/toast/Toast';
import CompletionSnackbar from '../../components/ui/toast/CompletionSnackbar';
import HomeEmpty from './components/HomeEmpty';
import HomeList from './components/homeList';
import StatusBottomSheet from './components/homeList/StatusBottomSheet';
import {
  habitsToSections,
  computeProgress,
  formatDateLabel,
  type Section,
  type HabitItem,
} from './components/homeList/homeListUtils';
import type { Habit } from '../../types/habitType';

type HomeViewState = { view?: 'list' | 'empty' };
type HabitStatus = 'done' | 'heart' | 'freeze' | 'notDone';

const HomePage = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as HomeViewState;
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);
  const [completionSnackbarVisible, setCompletionSnackbarVisible] = useState(false);

  // API — 오늘 날짜 기준 습관 목록 조회
  const fetchHabits = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const data = await getHabits({ date: today });
      setHabits(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 마운트 시 습관 목록 fetch
  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // habits 변경 시 카테고리별 섹션 동기화
  useEffect(() => {
    setSections(habitsToSections(habits));
  }, [habits]);

  // 섹션 내 특정 id 아이템만 갱신(완료 토글·상태 변경·선택)
  const updateItem = useCallback((id: string, updater: (item: HabitItem) => HabitItem) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        items: sec.items.map((item) => (item.id === id ? updater(item) : item)),
      }))
    );
  }, []);

  // 클릭한 id만 선택, 나머지 선택 해제(바텀시트 열린 행 강조용)
  const selectOnly = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        items: sec.items.map((item) =>
          item.id === id
            ? { ...item, isSelected: !item.isSelected }
            : { ...item, isSelected: false }
        ),
      }))
    );
  }, []);

  const handleToggleDone = useCallback(
    (id: string) => {
      updateItem(id, (item) => {
        if (item.status !== 'done') setCompletionSnackbarVisible(true);
        return { ...item, status: item.status === 'done' ? 'notDone' : 'done' };
      });
    },
    [updateItem]
  );

  const handleOpenModal = useCallback((id: string) => {
    setActiveItemId(id);
    setIsStatusSheetOpen(true);
  }, []);

  const handleSelectStatus = useCallback(
    (status: HabitStatus) => {
      if (!activeItemId) return;
      updateItem(activeItemId, (item) => ({ ...item, status }));
      setIsStatusSheetOpen(false);
    },
    [activeItemId, updateItem]
  );

  // 삭제 API 호출 후 토스트, 실패 시 에러 토스트
  const handleDelete = useCallback(async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      showToast.success('습관이 삭제되었어요');
    } catch {
      showToast.error('삭제에 실패했어요');
      throw new Error('delete failed');
    }
  }, []);

  // 바텀시트에 넘길 현재 선택 습관(제목·id)
  const activeItem = useMemo(
    () => sections.flatMap((s) => s.items).find((i) => i.id === activeItemId) ?? null,
    [activeItemId, sections]
  );

  // 헤더용 진행중/완료 개수·진행률(%)
  const { inProgressCount, doneCount, progressPercent } = useMemo(
    () => computeProgress(sections),
    [sections]
  );

  // 로딩/빈 목록/empty 뷰 분기
  if (loading) return <div>로딩중...</div>;

  if (habits.length === 0) {
    return (
      <div className="px-4">
        <HomeEmpty />
      </div>
    );
  }

  if (state.view === 'empty') {
    return (
      <div className="px-4">
        <HomeEmpty />
      </div>
    );
  }

  // 리스트 + 바텀시트 + 완료 스낵바
  return (
    <>
      <div className="px-4">
        <HomeList
          sections={sections}
          dateLabel={formatDateLabel(new Date())}
          inProgressCount={inProgressCount}
          doneCount={doneCount}
          progressPercent={progressPercent}
          onToggleDone={handleToggleDone}
          onOpenModal={handleOpenModal}
          onToggleSelect={selectOnly}
        />
      </div>

      <StatusBottomSheet
        open={isStatusSheetOpen}
        title={activeItem?.title}
        habitId={activeItemId}
        onClose={() => setIsStatusSheetOpen(false)}
        onSelectStatus={handleSelectStatus}
        onEdit={() => {
          setIsStatusSheetOpen(false);
          showToast.default('수정 기능 준비 중이에요');
        }}
        onDelete={handleDelete}
        onHabitsRefetch={fetchHabits}
      />

      <CompletionSnackbar
        visible={completionSnackbarVisible}
        onDismiss={() => setCompletionSnackbarVisible(false)}
        onRecordClick={() => {}}
      />
    </>
  );
};

export default HomePage;
