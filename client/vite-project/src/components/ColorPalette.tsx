// 컬러 팔레트

// 타입선언
type ColorPaletteProps = {
  onClose: () => void;
};

const ColorPalette = ({ onClose }: ColorPaletteProps) => {
  // 팔레트에 적용될 색상
  const colors = [
    '#FF6B6B', // Red 1
    '#E63946', // Red 2
    '#B22222', // Red 3
    '#FFF3B0', // Yellow 1
    '#FFD93D', // Yellow 2

    '#F4C430', // Yellow 3
    '#6BCB77', // Green 3
    '#4AAE5F', // Green 4
    '#D6F5E3', // Green 1
    '#4D96FF', // Blue

    '#3B47B3', // Blue (custom)
    '#5D69D4', // Blue (custom)
    '#9D4EDD', // Purple 3
    '#BFA2E6', // Purple 2
    '#E0D6F5', // Purple 1

    '#C9A98D', // Brown 2
    '#A67C52', // Brown 3
    '#E8D3C0', // Brown 1
    '#D9D9D9', // Gray 2
    '#A6A6A6', // Gray 3
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">색상을 선택하세요</h2>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((color) => (
            <button
              key={color}
              className="w-10 h-10 rounded-full border-2"
              style={{ backgroundColor: color }}
              onClick={() => {
                onSelect(color);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
