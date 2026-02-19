import { useMemo } from 'react';

// 컬러 팔레트 (Step2·CreateHabit 공통) — 5x4 그리드, 앵커(색상 버튼) 아래 팝오버
type ColorPaletteProps = {
  onClose: () => void;
  onSelect: (color: string) => void;
  /** 선택된 색상(hex). 있으면 해당 칸에 흰색 체크 표시 */
  selectedColor?: string | null;
  /** 팝오버 기준 버튼 위치 (getBoundingClientRect 결과) */
  anchorRect?: DOMRect | null;
};

const PALETTE_WIDTH_PX = 320;
const VIEWPORT_PADDING_PX = 12;
const GAP_FROM_ANCHOR_PX = 8;

const ColorPalette = ({
  onClose,
  onSelect,
  selectedColor,
  anchorRect,
}: ColorPaletteProps) => {
  // 5열 x 4행 = 20색 (스크린샷 구성)
  const colors = [
    '#FF6B6B',
    '#FF8FA3',
    '#FFB5A7',
    '#FFD93D',
    '#FFF3B0',
    '#E8A87C',
    '#7DD3A8',
    '#38B2AC',
    '#2D6A4F',
    '#8B9DC3',
    '#3B47B3',
    '#BFA2E6',
    '#9D4EDD',
    '#C9A0DC',
    '#C4A484',
    '#A67C52',
    '#6B4423',
    '#94A3B8',
    '#D9D9D9',
    '#495057',
  ];

  const anchoredLayout = useMemo(() => {
    if (!anchorRect) return null;

    const viewportWidth =
      typeof window === 'undefined'
        ? PALETTE_WIDTH_PX + VIEWPORT_PADDING_PX * 2
        : window.innerWidth;

    const left = Math.min(
      Math.max(anchorRect.left - 12, VIEWPORT_PADDING_PX),
      viewportWidth - PALETTE_WIDTH_PX - VIEWPORT_PADDING_PX
    );
    const top = anchorRect.bottom + GAP_FROM_ANCHOR_PX;
    const pointerLeft = Math.min(
      Math.max(anchorRect.left + anchorRect.width / 2 - left - 8, 14),
      PALETTE_WIDTH_PX - 28
    );

    return { left, top, pointerLeft };
  }, [anchorRect]);

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="색상 선택"
    >
      <div
        className="fixed rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        style={
          anchoredLayout
            ? {
                width: PALETTE_WIDTH_PX,
                left: anchoredLayout.left,
                top: anchoredLayout.top,
              }
            : {
                width: PALETTE_WIDTH_PX,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -top-2 h-4 w-4 rotate-45 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.06)]"
          style={{ left: anchoredLayout ? anchoredLayout.pointerLeft : 24 }}
          aria-hidden
        />

        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => {
            const isSelected =
              selectedColor != null &&
              selectedColor.toUpperCase() === color.toUpperCase();

            return (
              <button
                key={color}
                type="button"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onSelect(color);
                  onClose();
                }}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span
                    className="text-base font-bold text-white"
                    style={{
                      textShadow:
                        '0 0 1px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
