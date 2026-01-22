// 컬러 팔레트

type ColorPaletteProps = {
  onClose: () => void;
  onSelect: (color: string) => void;
};

const ColorPalette = ({ onClose, onSelect }: ColorPaletteProps) => {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD'];

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
