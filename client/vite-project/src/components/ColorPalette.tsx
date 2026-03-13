// 컬러 팔레트 (Step2·CreateHabit 공통) — 5x4 그리드, 앵커(색상 버튼) 아래 팝오버
type ColorPaletteProps = {
  onClose: () => void;
  onSelect: (color: string) => void;
  /** 선택된 색상(hex). 있으면 해당 칸에 흰색 체크 표시 */
  selectedColor?: string | null;
  /** 팝오버 기준 버튼 위치 (getBoundingClientRect 결과). 항상 앵커 기반으로만 사용 */
  anchorRect: DOMRect;
};

// 팔레트 기본 크기/위치 상수
const PALETTE_WIDTH_PX = 320;
const LEFT_OFFSET_PX = 12;
const TOP_GAP_PX = 8;

const ColorPalette = ({
  onClose,
  onSelect,
  selectedColor,
  anchorRect,
}: ColorPaletteProps) => {
  // 5열 x 4행 = 20색
  const colors = [
    '#FF6B6B', // RED
    '#FF8FA3', // PINK
    '#FFB5A7', // PEACH
    '#FFD93D', // YELLOW
    '#FFF3B0', // LIGHT_YELLOW

    '#E8A87C', // BEIGE
    '#7DD3A8', // MINT
    '#38B2AC', // TEAL
    '#2D6A4F', // DARK_GREEN
    '#8B9DC3', // SKY_BLUE

    '#3B47B3', // BLUE
    '#BFA2E6', // LIGHT_PURPLE
    '#9D4EDD', // PURPLE
    '#C9A0DC', // LAVENDER
    '#C4A484', // LIGHT_BROWN

    '#A67C52', // BROWN
    '#6B4423', // DARK_BROWN
    '#94A3B8', // LIGHT_GRAY
    '#D9D9D9', // GRAY
    '#495057', // DARK_GRAY
  ];

  const paletteStyle = {
    width: PALETTE_WIDTH_PX,
    left: Math.max(LEFT_OFFSET_PX, anchorRect.left - LEFT_OFFSET_PX),
    top: anchorRect.bottom + TOP_GAP_PX,
  };

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="색상 선택"
    >
      {/* 팔레트 영역: 외부 클릭은 닫기, 내부 클릭은 전파 차단 */}
      <div
        className="fixed rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        style={paletteStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 포인터(말풍선 꼬리) */}
        <div
          className="absolute -top-2 h-4 w-4 rotate-45 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.06)]"
          style={{ left: 24 }}
          aria-hidden
        />

        {/* 색상 스와치 그리드 */}
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
                {/* 현재 선택된 색상에만 체크 표시 */}
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
