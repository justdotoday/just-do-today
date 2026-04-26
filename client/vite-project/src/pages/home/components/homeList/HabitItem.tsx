/** 습관 한 개 행: 완료 체크, 제목, 상태(쉬어가기/미루기) 설정용 점 버튼. */
import type { MouseEvent } from 'react';
import heart from '../../../assets/buttons/heart.png';
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
  const wrapperClass =
    status === 'freeze'
      ? 'bg-sky-50 px-3 p-0.5'
      : isSelected
        ? 'bg-blue-50 px-3 p-0.5'
        : 'px-3 p-0.5';
  const titleClass =
    status === 'done'
      ? 'text-[16px] font-medium leading-[24px] tracking-[-0.015em] text-zinc-400 line-through'
      : isSelected
        ? 'text-[16px] font-medium leading-[24px] tracking-[-0.015em] text-blue-600'
        : 'text-[16px] font-medium leading-[24px] tracking-[-0.015em] text-zinc-800';

  const statusIconMap = {
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
          <button
            type="button"
            onClick={handleToggleDone}
            className="flex h-8 w-8 shrink-0 items-center justify-center"
          >
            {status === 'done' || status === 'notDone' ? (
              <span
                className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{
                  backgroundColor:
                    status === 'done' ? (color?.trim() ?? '#a1a1aa') : '#d4d4d8',
                }}
                aria-label={status === 'done' ? '완료' : '아직 안함'}
              >
                ✓
              </span>
            ) : (
              <img
                src={statusIconMap[status]}
                alt={status === 'heart' ? '오늘은 쉬어가기' : '잠시 미루기'}
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
