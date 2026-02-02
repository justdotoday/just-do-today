import HabitItem from './HabitItem';

type Item = {
  id: string; //  React에서 map 돌릴 때 key로 사용, 나중에는 서버에서 내려주는 habitId가 될 예정
  title: string; //habitItem에 그대로 내려줄 습관 이름
  status?: 'done' | 'rest' | 'snoozed' | 'pending'; // 완료/쉬어가기/미루기/미완료
  isSelected?: boolean; // 이 습관이 선택된 상태인지
};

type Props = {
  icon: string; // 카테고리 아이콘
  title: string; // 카테고리 이름
  items: Item[]; // 이 카테고리에 속한 습관 목록
  onOpenModal?: (id: string) => void;
  onToggleDone?: (id: string) => void;
};

const HabitSection = ({ icon, title, items, onOpenModal, onToggleDone }: Props) => {
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
            status={item.status}
            isSelected={item.isSelected}
            onOpenModal={onOpenModal ? () => onOpenModal(item.id) : undefined}
            onToggleDone={onToggleDone ? () => onToggleDone(item.id) : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default HabitSection;
