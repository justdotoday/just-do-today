import React from 'react';

type ToggleProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        'relative h-7 w-12 rounded-full transition',
        checked ? 'bg-blue-500' : 'bg-blue-200',
      ].join(' ')}
      aria-pressed={checked}
    >
      <span
        className={[
          'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all',
          checked ? 'left-5' : 'left-0.5',
        ].join(' ')}
      />
    </button>
  );
};

export default Toggle;
