type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function HabitNameField({ value, onChange }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-[18px] font-semibold text-zinc-950">
        어떤 습관인가요?
      </h2>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 유산소 30분, 하루 1L 물 마시기..."
        className="h-14 w-full rounded-[20px] border border-zinc-100 bg-zinc-50 px-4 text-[14px] outline-none focus:border-[#2563EB] focus:bg-white transition-all placeholder:text-zinc-400"
      />
    </section>
  );
}
