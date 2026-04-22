//카테고리 선택 컴포넌트
export type CategoryItem = { id?: number; userCategoryId?: number; name: string; icon?: string };

type Props = {
  title?: string;
  categories: CategoryItem[];
  selected: string | null;
  onSelect: (name: string) => void;
  onOpenAdd?: () => void; // "직접 추가" 버튼 클릭
  addButtonClassName?: string; // "직접 추가" 버튼의 추가 클래스 이름
};

const CategorySelector = ({
  title = '습관 카테고리를 선택해 주세요',
  categories,
  selected,
  onSelect,
  onOpenAdd,
  addButtonClassName,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      <h2 className="w-full font-semibold text-zinc-950">{title}</h2>

      {categories.map((c) => {
        const active = selected === c.name;

        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onSelect(c.name)}
            className={`inline-flex h-9 px-3.5 items-center gap-2 rounded-full border transition
              ${
                active
                  ? 'bg-blue-50 border-blue-400'
                  : 'bg-white border-zinc-200'
              }
            `}
          >
            {c.icon && (
              <span className="text-[16px] leading-none">{c.icon}</span>
            )}
            <span
              className={`text-[12px] font-medium ${
                active ? 'text-blue-600' : 'text-zinc-600'
              }`}
            >
              {c.name}
            </span>
          </button>
        );
      })}

      {onOpenAdd && (
        <button
          type="button"
          onClick={onOpenAdd}
          className={
            addButtonClassName ??
            'inline-flex h-9 px-3.5 items-center gap-2 rounded-full border border-dashed border-zinc-300 bg-white transition'
          }
        >
          <span className="pb-0.5 text-[16px] font-bold text-zinc-700">
            +
          </span>
          <span className="text-[12px] font-medium text-zinc-500">
            직접 추가
          </span>
        </button>
      )}
    </div>
  );
};

export default CategorySelector;
