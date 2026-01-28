export default function CategorySelector({
  title = '습관 카테고리를 선택해 주세요',
  categories,
  selected,
  onSelect,
  onOpenAdd,
  addButtonClassName,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <h2 className="col-span-full text-[18px] font-semibold text-zinc-950 mb-2">
        {title}
      </h2>

      {categories.map((c) => {
        const active = selected === c.name;

        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onSelect(c.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm transition
              ${
                active
                  ? 'bg-blue-100 border border-blue-400 text-blue-600'
                  : 'bg-gray-100 text-gray-700'
              }
            `}
          >
            {c.icon && <span className="text-xl leading-none">{c.icon}</span>}
            <span className="text-sm font-semibold">{c.name}</span>
          </button>
        );
      })}

      {onOpenAdd && (
        <button
          type="button"
          onClick={onOpenAdd}
          className={
            addButtonClassName ??
            'flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-gray-300 text-gray-600 bg-white'
          }
        >
          <span className="text-xl font-bold text-gray-700">+</span>
          <span className="text-sm font-semibold text-gray-600">직접 추가</span>
        </button>
      )}
    </div>
  );
}
