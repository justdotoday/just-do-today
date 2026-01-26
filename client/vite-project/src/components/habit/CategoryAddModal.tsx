import React, { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
};

const CategoryAddModal = ({ open, onClose }: Props) => {
  const [value, setValue] = useState('');
  const canSubmit = value.trim().length > 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        type="button"
        aria-label="close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[520px] rounded-t-3xl bg-white px-4 pb-6 pt-5">
        <h2 className="mb-4 text-center text-[18px] font-semibold">
          카테고리 직접 입력
        </h2>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="카테고리를 입력해 주세요"
          className="mb-4 h-12 w-full rounded-full border border-zinc-200 px-4 text-[14px] outline-none focus:border-[#2563EB]"
        />

        <button
          type="button"
          className={[
            'h-14 w-full rounded-full text-[16px] font-medium',
            canSubmit ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500',
          ].join(' ')}
          onClick={onClose}
          disabled={!canSubmit}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default CategoryAddModal;
