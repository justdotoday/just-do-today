/** 습관 상태 바텀시트: 수정/삭제, 잠시 미루기(얼음), 오늘은 쉬어가기(하트). */
import { useState } from 'react';
import { motion } from 'framer-motion';
import DragHandle from '../../../../ui/DragHandle';
import freeze from '../../../../../assets/bottomSheet/freeze.svg';
import heart from '../../../../../assets/bottomSheet/skipheart.svg';

/** 바텀시트 props: 열림 여부, 제목, 습관 id, 콜백들 */
type Props = {
  open: boolean;
  title?: string;
  habitId?: string | null;
  freezeCount?: number;
  heartCount?: number;
  onClose: () => void;
  onSelectStatus: (status: 'freeze' | 'heart') => void;
  onIceClick?: () => void;
  onEdit?: () => void;
  onDelete?: (habitId: string) => void | Promise<void>;
  onHabitsRefetch?: () => void | Promise<void>;
};

// 임시
const freezeCount = 4;
const heartCount = 5;
const isIceDisabled = (freezeCount ?? 0) <= 0;
const isHeartDisabled = (heartCount ?? 0) <= 0;

const StatusBottomSheet = ({
  open,
  title,
  habitId,
  onClose,
  onSelectStatus,
  onIceClick,
  onEdit,
  onDelete,
  onHabitsRefetch,
}: Props) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  /** 삭제 실행 후 refetch·시트 닫기, 실패 시 토스트는 부모 onDelete에서 처리 */
  const handleDeleteConfirm = async () => {
    if (!habitId || !onDelete) return;
    try {
      await onDelete(habitId);
      onHabitsRefetch?.();
      onClose();
    } catch {
      // no-op, onDelete handles toast
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-y-0 left-1/2 z-999 w-full max-w-[414px] -translate-x-1/2">
        {/* 딤드 오버레이 클릭 시 닫기 */}
        <button
          type="button"
          aria-label="close overlay"
          onClick={onClose}
          className="absolute inset-0 bg-black/40"
        />

        {/* 드래그로 내리면 닫힘 */}
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
          {/* 제목 + 수정하기/삭제 버튼 */}
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
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="text-[12px] font-medium text-red-500 underline"
                >
                  삭제
                </button>
              )}
            </div>
          </div>

          {/* 잠시 미루기(얼음) / 오늘은 쉬어가기(하트) 선택 */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {/* 프리즈 */}
            <button
              type="button"
              onClick={!isIceDisabled ? onIceClick : undefined}
              disabled={isIceDisabled}
              className={`relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl py-10
            ${isIceDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
              style={{
                background: isIceDisabled
                  ? 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)'
                  : 'radial-gradient(circle at 50% 40%, rgba(214,235,255,0.8) 0%, rgba(239,246,255,0.6) 100%)',
              }}
            >
              <div
                className={`absolute top-2 right-2 px-2 rounded-full text-sm flex
              ${isIceDisabled ? 'text-gray-400 bg-gray-200' : 'text-[#4B93DC] bg-[#dbe8f5]'}
              `}
              >
                <p>x</p>
                <p className="pl-1">{freezeCount}</p>
              </div>

              <img
                src={freeze}
                alt="잠시 미루기"
                className={`h-12 w-12 object-contain ${
                  isIceDisabled ? 'opacity-40 grayscale' : ''
                }`}
              />

              <p
                className={`text-[16px] font-semibold ${
                  isIceDisabled ? 'text-gray-400' : 'text-[#4B93DC]'
                }`}
              >
                얼음 사용하기
              </p>

              <p
                className={`text-[12px] ${
                  isIceDisabled ? 'text-gray-400' : 'text-[#4B93DC]'
                }`}
              >
                {isIceDisabled ? '지금은 얼음이 부족해요' : '잠시 미루기'}
              </p>
            </button>
            {/* 하트 */}
            <button
              type="button"
              onClick={
                !isHeartDisabled ? () => onSelectStatus('heart') : undefined
              }
              disabled={isHeartDisabled}
              className={`relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl py-10
              ${isHeartDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
              style={{
                background: isHeartDisabled
                  ? 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)'
                  : 'radial-gradient(circle at 50% 40%, rgba(255,228,236,0.8) 0%, rgba(255,245,248,0.6) 100%)',
              }}
            >
              <div
                className={`absolute top-2 right-2 px-2 rounded-full text-sm flex items-center justify-center
                ${isHeartDisabled ? 'text-gray-400 bg-gray-200' : 'text-[#E0728C] bg-[#fae2e7]'}
              `}
              >
                <p>x</p>
                <p className="pl-1">{heartCount ?? 0}</p>
              </div>
              <img
                src={heart}
                alt="오늘은 쉬어가기"
                className={`h-12 w-12 object-contain ${
                  isHeartDisabled ? 'opacity-40 grayscale' : ''
                }`}
              />
              <p
                className={`text-[16px] font-semibold ${
                  isHeartDisabled ? 'text-gray-400' : 'text-[#E0728C]'
                }`}
              >
                하트 사용하기
              </p>

              <p
                className={`text-[12px] ${
                  isHeartDisabled ? 'text-gray-400' : 'text-[#E0728C]'
                }`}
              >
                {isHeartDisabled ? '지금은 하트가 부족해요' : '오늘은 쉬어가기'}
              </p>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 삭제 확인 모달 */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center">
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setIsDeleteConfirmOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-4xl bg-white px-5 py-8 text-center">
            <p className="text-[18px] font-semibold text-zinc-800">
              이 습관을 삭제하시겠어요?
            </p>
            <p className="text-[16px] font-semibold mt-1 text-zinc-500">
              삭제한 습관은 복구할 수 없어요.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="flex-1 rounded-full border border-zinc-300 py-2.5 text-[15px] font-medium text-zinc-700"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 rounded-full bg-[#FFD6D6] py-2.5 text-[15px] font-medium text-[#A80606]"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusBottomSheet;
