/** 습관 한 개 행: 완료 체크, 제목, 상태(쉬어가기/미루기) 설정용 점 버튼. */
import type { MouseEvent } from 'react';
import checkGrey from '../../../../assets/buttons/check-grey.png';
import heart from '../../../../assets/buttons/heart.png';
import ice from '../../../../assets/buttons/ice.png';
import dotIcon from '../../../../assets/buttons/dot.png';

type Props = {
  title: string;
  color?: string | null;
  status?: 'done' | 'heart' | 'freeze' | 'notDone';
  isSelected?: boolean;
  onOpenModal?: () => void;
  onToggleDone?: () => void;
  onToggleSelect?: () => void;
  onIceThaw?: () => void;
};

const HabitItem = ({
  title,
  color = null,
  status = 'notDone',
  isSelected = false,
  onOpenModal,
  onToggleDone,
  onToggleSelect,
  onIceThaw,
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
    heart,
    freeze: ice,
  } as const;

  const handleToggleDone = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (status === 'freeze') {
      onIceThaw?.();
    } else {
      onToggleDone?.();
    }
  };

  const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenModal?.();
  };

  return (
    <div className={wrapperClass} onClick={onToggleSelect}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleToggleDone} className="p-0">
            {status === 'done' ? (
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  backgroundColor: color?.trim() ?? '#a1a1aa',
                }}
                aria-label="완료"
              >
                ✓
              </span>
            ) : (
              <img
                src={statusIconMap[status]}
                alt={
                  status === 'heart'
                    ? '오늘은 쉬어가기'
                    : status === 'freeze'
                      ? '잠시 미루기'
                      : '아직 안함'
                }
                className="h-8 w-8"
              />
            )}
          </button>
          <div className={titleClass}>{title}</div>
        </div>
        <button type="button" onClick={handleOpenModal} className="px-2">
          <img src={dotIcon} alt="상태 설정" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
