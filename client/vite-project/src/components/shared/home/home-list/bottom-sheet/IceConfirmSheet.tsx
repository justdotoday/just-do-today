/** 얼음 해제 확인 바텀시트: 미뤘던 습관을 다시 활성화(땡!)할지 확인. */
import { motion } from 'framer-motion';
import DragHandle from '../../../../ui/DragHandle';
import iceThaw from '../../../../../assets/bottomSheet/iceThaw.png';

type Props = {
  open: boolean;
  habitTitle?: string;
  freezeUntil: Date | null;
  onClose: () => void;
  onConfirm: () => void;
};

function formatDateKo(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

const IceConfirmSheet = ({
  open,
  habitTitle,
  freezeUntil,
  onClose,
  onConfirm,
}: Props) => {
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
        className="absolute inset-x-0 bottom-0 w-full rounded-t-3xl bg-white px-5 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />

        {/* 습관 제목(좌) + 날짜(우) */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[17px] font-bold text-zinc-900">
            {habitTitle}
          </span>
          {freezeUntil && (
            <span className="text-[14px] text-zinc-400">
              ~ {formatDateKo(freezeUntil)}까지
            </span>
          )}
        </div>

        {/* 안내 이미지를 그대로 사용 */}
        <div className="my-8 flex justify-center">
          <img
            src={iceThaw}
            alt="이 얼음을 땡! 할까요? 땡하면 성공으로 기록돼요."
            className="w-full max-w-[420px] object-contain"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-blue-500 py-4 text-[16px] font-semibold text-blue-500"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-blue-500 py-4 text-[16px] font-semibold text-white"
          >
            땡! 할래요
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default IceConfirmSheet;
