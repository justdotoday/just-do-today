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
  freezeCount?: number;
  heartCount?: number;
  onClose: () => void;
  onSelectStatus: (status: 'freeze' | 'heart') => void;
  onEdit?: () => void;
};

const StatusBottomSheet = ({
  open,
  title,
  onClose,
  onSelectStatus,
  onEdit,
}: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
          <button
            type="button"
            onClick={onEdit}
            className="text-[12px] font-medium text-zinc-400 underline"
          >
            수정하기
          </button>
        </div>

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
