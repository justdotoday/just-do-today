/** 홈 습관 리스트 UI. 목록·카테고리 묶음·체크 상태만 표시하고, 클릭은 콜백으로 전달. */
import HeaderDate from '../../../../components/shared/home/home-list/HeaderDate';
import HabitSection from '../../../../components/shared/home/home-list/HabitSection';
import plusButton from '../../../../assets/buttons/plus-button.png';
import type { Section } from '../../../../components/shared/home/home-list/homeList.utils';

const CONTENT_MAX_WIDTH_PX = 414;

export type HomeListProps = {
  sections: Section[];
  dateLabel: string;
  inProgressCount: number;
  doneCount: number;
  progressPercent: number;
  onToggleDone: (id: string) => void;
  onOpenModal: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onIceThaw: (id: string) => void;
  onCreateHabit: () => void;
};

const HomeList = ({
  sections,
  dateLabel,
  inProgressCount,
  doneCount,
  progressPercent,
  onToggleDone,
  onOpenModal,
  onToggleSelect,
  onIceThaw,
  onCreateHabit,
}: HomeListProps) => {
  return (
    <div className="px-4 pt-6 pb-28">
      <HeaderDate
        dateLabel={dateLabel}
        inProgressCount={inProgressCount}
        doneCount={doneCount}
        progressPercent={progressPercent}
      />

      <div className="mt-8 space-y-10">
        {sections.map((s) => (
          <HabitSection
            key={s.title}
            icon={s.icon}
            title={s.title}
            items={s.items}
            onToggleDone={onToggleDone}
            onOpenModal={onOpenModal}
            onToggleSelect={onToggleSelect}
            onIceThaw={onIceThaw}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onCreateHabit}
        className="fixed bottom-24"
        style={{
          right: `max(1.5rem, calc((100vw - ${CONTENT_MAX_WIDTH_PX}px) / 2 + 1.5rem))`,
        }}
      >
        <img src={plusButton} alt="습관 생성" className="h-14 w-14" />
      </button>
    </div>
  );
};

export default HomeList;
