/** 카테고리 한 줄(아이콘+제목) + 해당 카테고리 습관 아이템 목록. */
import HabitItem from './HabitItem';

type Item = {
  id: string;
  title: string;
  color?: string | null;
  status?: 'done' | 'heart' | 'freeze' | 'notDone';
  isSelected?: boolean;
};

type Props = {
  icon: string;
  title: string;
  items: Item[];
  onOpenModal?: (id: string) => void;
  onToggleDone?: (id: string) => void;
  onToggleSelect?: (id: string) => void;
};

const HabitSection = ({
  icon,
  title,
  items,
  onOpenModal,
  onToggleDone,
  onToggleSelect,
}: Props) => {
  return (
    <section>
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
        <span>{icon}</span>
        <span>{title}</span>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <HabitItem
            key={item.id}
            title={item.title}
            color={item.color}
            status={item.status}
            isSelected={item.isSelected}
            onOpenModal={onOpenModal ? () => onOpenModal(item.id) : undefined}
            onToggleDone={
              onToggleDone ? () => onToggleDone(item.id) : undefined
            }
            onToggleSelect={
              onToggleSelect ? () => onToggleSelect(item.id) : undefined
            }
          />
        ))}
      </div>
    </section>
  );
};

export default HabitSection;
