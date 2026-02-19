import type { MouseEvent } from 'react';
import checkGrey from '../../../assets/buttons/check-grey.png';
import checkPink from '../../../assets/buttons/check-pink.png';
import heart from '../../../assets/buttons/heart.png';
import ice from '../../../assets/buttons/ice.png';
import dotIcon from '../../../assets/buttons/dot.png';

type Props = {
  title: string; //습관 이름
  status?: 'done' | 'heart' | 'freeze' | 'notDone'; // 완료/쉬어가기/미루기/미완료
  isSelected?: boolean; // 현재 유저가 선택중인 습관인지 여부
  onOpenModal?: () => void;
  onToggleDone?: () => void;
  onToggleSelect?: () => void;
};

const HabitItem = ({
  title,
  status = 'notDone',
  isSelected = false,
  onOpenModal,
  onToggleDone,
  onToggleSelect,
}: Props) => {
  const wrapperClass = isSelected
    ? 'rounded-xl bg-blue-50 px-2 py-3'
    : 'rounded-xl px-2 py-3';
  const titleClass =
    status === 'done'
      ? 'text-[16px] font-medium leading-[24px] tracking-[-0.015em] text-zinc-400 line-through'
      : isSelected
      ? 'text-[16px] font-medium leading-[24px] tracking-[-0.015em] text-blue-600'
      : 'text-[16px] font-medium leading-[24px] tracking-[-0.015em] text-zinc-800';

  const statusIconMap = {
    notDone: checkGrey,
    done: checkPink,
    heart,
    freeze: ice,
  } as const;

  const handleToggleDone = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleDone?.();
  };

  const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenModal?.();
  };

  return (
    <div className={wrapperClass} onClick={onToggleSelect}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 체크 아이콘 클릭 → 완료/미완료 토글 */}
          <button type="button" onClick={handleToggleDone} className="p-0">
            <img
              src={statusIconMap[status]}
              alt={
                status === 'done'
                  ? '완료'
                  : status === 'heart'
                  ? '오늘은 쉬어가기'
                  : status === 'freeze'
                  ? '잠시 미루기'
                  : '아직 안함'
              }
              className="h-8 w-8"
            />
          </button>
          <div className={titleClass}>{title}</div>
        </div>
        {/* dot 버튼: 상태 설정 모달 열기 */}
        <button type="button" onClick={handleOpenModal} className="px-2">
          <img src={dotIcon} alt="상태 설정" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
