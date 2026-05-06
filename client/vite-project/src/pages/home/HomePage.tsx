/** 홈 페이지. 습관 조회·리스트/빈 화면 분기, 섹션·바텀시트·스낵바·삭제 담당. */
import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHabits,
  deleteHabit,
  freezeHabit,
  thawHabit,
  toggleDone,
  toggleHeart,
} from '../../api/habit';
import { createDailyLog } from '../../api/dailyLog';
import { showToast } from '../../components/ui/toast/Toast';
import CompletionSnackbar from '../../components/ui/toast/CompletionSnackbar';
import HomeEmpty from '../../components/shared/home/HomeEmpty';
import HomeList from '../../components/shared/home/home-list';
import StatusBottomSheet from '../../components/shared/home/home-list/bottom-sheet/StatusBottomSheet';
import IceDatePickerSheet from '../../components/shared/home/home-list/bottom-sheet/IceDatePickerSheet';
import IceConfirmSheet from '../../components/shared/home/home-list/bottom-sheet/IceConfirmSheet';
import DailyLogBottomSheet from '../../components/shared/home/home-list/bottom-sheet/DailyLogBottomSheet';
import {
  habitsToSections,
  computeProgress,
  formatDateLabel,
  type Section,
  type HabitItem,
} from '../../components/shared/home/home-list/homeList.utils';

type HomeViewState = { view?: 'list' | 'empty' };
type HabitStatus = 'done' | 'heart' | 'freeze' | 'notDone';

const today = new Date().toISOString().split('T')[0];

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const state = (location.state ?? {}) as HomeViewState;

  const [sections, setSections] = useState<Section[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);
  const [iceStep, setIceStep] = useState<null | 'datePicker' | 'thawConfirm'>(
    null
  );
  const [completionSnackbarVisible, setCompletionSnackbarVisible] =
    useState(false);
  const [isDailyLogOpen, setIsDailyLogOpen] = useState(false);

  // 습관 목록 조회
  const { data: habits, isLoading } = useQuery({
    queryKey: ['habits', today],
    queryFn: () => getHabits({ date: today }),
  });

  const [prevHabits, setPrevHabits] = useState<typeof habits>(undefined);

  // habits 변경 시 카테고리별 섹션 동기화 (렌더 중 setState — effect보다 안전)
  if (prevHabits !== habits) {
    setPrevHabits(habits);
    setSections(habitsToSections(habits ?? []));
  }

  // 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      showToast.success('습관이 삭제되었어요');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: () => showToast.error('삭제에 실패했어요'),
  });

  // 기록 저장 뮤테이션
  const dailyLogMutation = useMutation({
    mutationFn: createDailyLog,
    onSuccess: () => showToast.success('기록이 저장됐어요!'),
    onError: () => showToast.error('기록 저장에 실패했어요'),
  });

  // 섹션 내 특정 id 아이템만 갱신(완료 토글·상태 변경·선택)
  const updateItem = useCallback(
    (id: string, updater: (item: HabitItem) => HabitItem) => {
      setSections((prev) =>
        prev.map((sec) => ({
          ...sec,
          items: sec.items.map((item) =>
            item.id === id ? updater(item) : item
          ),
        }))
      );
    },
    []
  );

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

  // 완료 토글
  const handleToggleDone = useCallback(
    async (id: string) => {
      const item = sections.flatMap((s) => s.items).find((i) => i.id === id);
      const userHabitId = item?.userHabitId;

      if (userHabitId != null) {
        try {
          await toggleDone(userHabitId);
        } catch {
          showToast.error('완료 처리에 실패했어요');
          return;
        }
      }

      const currentItem = sections
        .flatMap((s) => s.items)
        .find((i) => i.id === id);
      if (currentItem?.status !== 'done') {
        setActiveItemId(id);
        setCompletionSnackbarVisible(true);
      }
      updateItem(id, (item) => ({
        ...item,
        status: item.status === 'done' ? 'notDone' : 'done',
      }));
    },
    [sections, updateItem]
  );

  // 점(•••) 버튼 클릭 → 상태 바텀시트 열기
  const handleOpenModal = useCallback((id: string) => {
    setActiveItemId(id);
    setIsStatusSheetOpen(true);
  }, []);

  // 바텀시트에서 하트 선택 → API 호출
  const handleSelectStatus = useCallback(
    async (status: HabitStatus) => {
      if (!activeItemId) return;
      if (status === 'heart') {
        const activeItem = sections.flatMap((s) => s.items).find((i) => i.id === activeItemId);
        const userHabitId = activeItem?.userHabitId;
        if (userHabitId != null) {
          try {
            await toggleHeart(userHabitId);
          } catch (err) {
            const data = (err as { response?: { data?: unknown } })?.response?.data;
            const message = typeof data === 'string' ? data : '하트 사용에 실패했어요';
            showToast.error(message);
            return;
          }
        }
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      }
      updateItem(activeItemId, (item) => ({ ...item, status }));
      setIsStatusSheetOpen(false);
    },
    [activeItemId, sections, updateItem, queryClient]
  );

  // 얼음 버튼 클릭 → 상태 시트 닫고 날짜 선택으로 진입
  const handleIceClick = useCallback(() => {
    setIsStatusSheetOpen(false);
    setIceStep('datePicker');
  }, []);

  // 날짜 선택 완료 → freeze API 호출 예정
  const handleIceDateSelect = useCallback(
    async (date: Date) => {
      if (!activeItemId) return;

      const activeItem = sections
        .flatMap((s) => s.items)
        .find((i) => i.id === activeItemId);
      const userHabitId = activeItem?.userHabitId;

      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const postponeDays = Math.round(
        (date.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (userHabitId != null) {
        try {
          await freezeHabit(userHabitId, postponeDays);
        } catch (err) {
          const data = (err as { response?: { data?: unknown } })?.response
            ?.data;
          const message = typeof data === 'string' ? data : '프리즈 실패했어요';
          showToast.error(message);
          return;
        }
      }

      updateItem(activeItemId, (item) => ({
        ...item,
        status: 'freeze',
        freezeUntil: date,
      }));
      setIceStep(null);
      showToast.success('잠시 미뤘어요 🧊');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    [activeItemId, sections, updateItem, queryClient]
  );

  // 얼음 아이콘 클릭 → thaw 확인 시트 열기
  const handleIceThawClick = useCallback((id: string) => {
    setActiveItemId(id);
    setIceStep('thawConfirm');
  }, []);

  // thaw 확인 → API 호출 후 habits 재조회
  const handleIceThawConfirm = useCallback(async () => {
    if (!activeItemId) return;
    const activeItem = sections
      .flatMap((s) => s.items)
      .find((i) => i.id === activeItemId);
    const userHabitId = activeItem?.userHabitId;
    if (userHabitId != null) {
      try {
        await thawHabit(userHabitId);
      } catch (err) {
        const data = (err as { response?: { data?: unknown } })?.response?.data;
        const message =
          typeof data === 'string' ? data : '프리즈 해제에 실패했어요';
        showToast.error(message);
        return;
      }
    }
    setIceStep(null);
    showToast.success('얼음을 땡! 했어요 🔥');
    queryClient.invalidateQueries({ queryKey: ['habits'] });
  }, [activeItemId, sections, queryClient]);

  // 얼음 플로우 전체 닫기
  const handleIceClose = useCallback(() => setIceStep(null), []);

  // 바텀시트에 넘길 현재 선택 습관
  const activeItem = useMemo(
    () =>
      sections.flatMap((s) => s.items).find((i) => i.id === activeItemId) ??
      null,
    [activeItemId, sections]
  );

  // 헤더용 진행중/완료 개수·진행률(%)
  const { inProgressCount, doneCount, progressPercent } = useMemo(
    () => computeProgress(sections),
    [sections]
  );

  if (isLoading) return <div>로딩중...</div>;

  if (!habits?.length || state.view === 'empty') {
    return (
      <>
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
            {formatDateLabel(new Date())}
          </h1>
        </div>
        <HomeEmpty hideDate />
      </>
    );
  }

  return (
    <>
      <HomeList
          sections={sections}
          dateLabel={formatDateLabel(new Date())}
          inProgressCount={inProgressCount}
          doneCount={doneCount}
          progressPercent={progressPercent}
          onToggleDone={handleToggleDone}
          onOpenModal={handleOpenModal}
          onToggleSelect={selectOnly}
          onIceThaw={handleIceThawClick}
          onCreateHabit={() => navigate('/createHabit')}
        />

      <StatusBottomSheet
        open={isStatusSheetOpen}
        title={activeItem?.title}
        habitId={activeItemId}
        onClose={() => setIsStatusSheetOpen(false)}
        onSelectStatus={handleSelectStatus}
        onIceClick={handleIceClick}
        onEdit={() => {
          const habit = habits?.find((h) => String(h.id) === activeItemId);
          setIsStatusSheetOpen(false);
          navigate('/editHabit', { state: { habit } });
        }}
        onDelete={(habitId) => deleteMutation.mutateAsync(habitId)}
        onHabitsRefetch={() =>
          queryClient.invalidateQueries({ queryKey: ['habits'] })
        }
      />

      <IceDatePickerSheet
        open={iceStep === 'datePicker'}
        habitTitle={activeItem?.title}
        onClose={handleIceClose}
        onSelectDate={handleIceDateSelect}
      />

      <IceConfirmSheet
        open={iceStep === 'thawConfirm'}
        habitTitle={activeItem?.title}
        freezeUntil={activeItem?.freezeUntil ?? null}
        onClose={handleIceClose}
        onConfirm={handleIceThawConfirm}
      />

      <DailyLogBottomSheet
        open={isDailyLogOpen}
        onClose={() => setIsDailyLogOpen(false)}
        onFinish={async ({ mood, note }) => {
          const userHabitId = activeItem?.userHabitId;
          if (userHabitId == null) return;
          const logDate = new Date().toISOString().split('T')[0];
          await dailyLogMutation.mutateAsync({
            userHabitId,
            logDate,
            mood,
            note,
          });
          setIsDailyLogOpen(false);
        }}
      />

      <CompletionSnackbar
        visible={completionSnackbarVisible}
        onDismiss={() => setCompletionSnackbarVisible(false)}
        onRecordClick={() => {
          setCompletionSnackbarVisible(false);
          setIsDailyLogOpen(true);
        }}
      />
    </>
  );
};

export default HomePage;
