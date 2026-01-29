import HabitItem from './HabitItem';

type Item = {
  id: string; //  React에서 map 돌릴 때 key로 사용, 나중에는 서버에서 내려주는 habitId가 될 예정
  title: string; //habititem에 그대로 내려줄 습관 이름
  isDone?: boolean; // 이 습관이 완료 상태이지
  isSelected?: boolean; // 이 습관이 선택된 상태인지
};

type Props = {
  icon: string; // 카테고리 아이콘
  title: string; // 카테고리 이름
  items: Item[]; // 이 카테고리에 속한 습관 목록
};

const HabitSection = ({ icon, title, items }: Props) => {
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
            isDone={item.isDone}
            isSelected={item.isSelected}
          />
        ))}
      </div>
    </section>
  );
};

export default HabitSection;
