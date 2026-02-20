import { useRef, useState } from 'react';
import ColorPalette from '../ColorPalette';

type Props = {
  value: string;
  onChange: (v: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
};

const HabitNameField = ({
  value,
  onChange,
  selectedColor,
  onColorChange,
}: Props) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [paletteAnchorRect, setPaletteAnchorRect] = useState<DOMRect | null>(
    null
  );
  const colorButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenColorPalette = () => {
    setPaletteAnchorRect(colorButtonRef.current?.getBoundingClientRect() ?? null);
    setIsColorPaletteOpen(true);
  };

  const handleColorSelect = (color: string) => {
    onColorChange(color);
    setIsColorPaletteOpen(false);
  };

  return (
    <section className="space-y-4">
      {isColorPaletteOpen && paletteAnchorRect && (
        <ColorPalette
          onClose={() => setIsColorPaletteOpen(false)}
          onSelect={handleColorSelect}
          selectedColor={selectedColor}
          anchorRect={paletteAnchorRect}
        />
      )}

      <h2 className="text-[18px] font-semibold text-zinc-950">
        어떤 습관인가요?
      </h2>

      <div className="relative">
        <button
          ref={colorButtonRef}
          type="button"
          onClick={handleOpenColorPalette}
          className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 shrink-0 rounded-full"
          style={{ backgroundColor: selectedColor }}
          aria-label="습관 색상 선택"
          title="색상 변경"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="예: 유산소 30분, 하루 1L 물 마시기..."
          className="h-14 w-full rounded-[20px] border border-zinc-100 bg-zinc-50 py-3 pl-12 pr-4 text-[14px] outline-none transition-all placeholder:text-zinc-400 focus:bg-white"
          style={{
            borderColor: value.length > 0 ? selectedColor : undefined,
          }}
        />
      </div>
    </section>
  );
};

export default HabitNameField;
