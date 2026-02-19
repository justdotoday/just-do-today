//습관페이지 바텀시트 모달 컴포넌트(습관 상태 모달)

import { useState } from 'react';
import { motion } from 'framer-motion';
import DragHandle from '../../../components/DragHandle';
import heartModal from '../../../assets/bottomSheet/heartModal.png';
import iceModal from '../../../assets/bottomSheet/iceModal.png';
import heartNumber from '../../../assets/bottomSheet/heartNumber.png';
import FreezeCalendarSheet from './FreezeCalendarSheet';

type Props = {
  open: boolean;
  title?: string;
  /** 삭제/수정 시 사용할 습관 id */
  habitId?: string | null;
  freezeCount?: number;
  heartCount?: number;
  onClose: () => void;
  onSelectStatus: (status: 'freeze' | 'heart') => void;
  onEdit?: () => void;
  /** 습관 삭제 시 호출. 삭제 성공 후 onHabitsRefetch 호출 권장 */
  onDelete?: (habitId: string) => void | Promise<void>;
  /** 습관 삭제 성공 후 호출 시 목록 갱신 → 0개면 HomeEmpty로 전환 */
  onHabitsRefetch?: () => void | Promise<void>;
};

const StatusBottomSheet = ({
  open,
  title,
  habitId,
  onClose,
  onSelectStatus,
  onEdit,
  onDelete,
  onHabitsRefetch,
}: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!habitId || !onDelete) return;
    try {
      await onDelete(habitId);
      onHabitsRefetch?.();
      onClose();
    } catch {
      // 삭제 실패 시 모달 유지 (에러는 onDelete 쪽에서 toast 등 처리)
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-999 w-full max-w-[414px] -translate-x-1/2">
      <button
        type="button"
        aria-label="close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 w-full rounded-t-3xl bg-white px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] max-h-[90vh] overflow-y-auto"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-zinc-900">
            {title ?? '습관'}
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onEdit}
              className="text-[12px] font-medium text-zinc-400 underline"
            >
              수정하기
            </button>
            {habitId && onDelete && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="text-[12px] font-medium text-red-500 underline"
              >
                삭제
              </button>
            )}
          </div>
        </div>

        {isDeleteConfirmOpen && (
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="mb-3 text-[14px] text-zinc-700">
              이 습관을 삭제할까요?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="flex-1 rounded-lg border border-zinc-300 py-2 text-[14px] font-medium text-zinc-700"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 rounded-lg bg-red-500 py-2 text-[14px] font-medium text-white"
              >
                삭제
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsCalendarOpen(true)}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl text-left"
          >
            <img
              src={iceModal}
              alt="얼음 사용하기 - 잠시 미루기"
              className="h-full w-full object-cover"
            />
          </button>
          <button
            type="button"
            onClick={() => onSelectStatus('heart')}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl text-left"
          >
            <img
              src={heartNumber}
              alt="하트 개수"
              className="absolute top-2 right-2"
            />
            <img
              src={heartModal}
              alt="하트 사용하기 - 오늘은 쉬어가기"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </motion.div>
      {isCalendarOpen && (
        <FreezeCalendarSheet
          onClose={() => setIsCalendarOpen(false)}
          onConfirm={(date: Date) => {
            console.log('선택된 날짜:', date);
            setIsCalendarOpen(false);
            onSelectStatus('freeze');
          }}
        />
      )}
    </div>
  );
};

export default StatusBottomSheet;
