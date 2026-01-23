//카테고리 선택 컴포넌트

import React from 'react';

export type CategoryItem = { name: string; icon?: string };

type Props = {
  categories: CategoryItem[];
  selected: string | null;
  onSelect: (name: string) => void;

  onOpenAdd?: () => void; // "직접 추가" 버튼 클릭
  addButtonClassName?: string; // 직접추가 버튼 스타일(원하면)
};

export default function CategoryChips({
  categories,
  selected,
  onSelect,
  onOpenAdd,
  addButtonClassName,
}: Props) {
  const chipBase =
    'inline-flex items-center justify-center gap-2 rounded-full ' +
    'h-10 px-4 ' +
    'text-[13px] font-medium leading-none';

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const active = selected === c.name;

        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onSelect(c.name)}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 transition
              ${
                active
                  ? 'bg-blue-50 border-blue-400'
                  : 'bg-white border-zinc-200'
              }
            `}
          >
            {c.icon && (
              <span className="text-[18px] leading-none">{c.icon}</span>
            )}
            <span
              className={`text-[14px] font-semibold ${
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
            [
              chipBase,
              'bg-white border border-dashed border-zinc-300 text-zinc-700',
            ].join(' ')
          }
        >
          <span className="text-[18px] leading-none font-bold text-zinc-700">
            +
          </span>
          <span className="text-[14px] font-semibold text-zinc-600">
            직접 추가
          </span>
        </button>
      )}
    </div>
  );
}
