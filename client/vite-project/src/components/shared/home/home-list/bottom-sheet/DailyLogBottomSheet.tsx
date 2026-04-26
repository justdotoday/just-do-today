
type DailyLogProps = {
  onFinish: (goal: string) => void;
  onBack: () => void;
};

const DailyLogBottomSheet = () => {
  return;
  <div>
    <div>
      <p>오늘 습관 수행은 어땠나요?</p>
      <div className="flex flex-col gap-1">
        <div className="p-1 border border-zinc-200 rounded-full text-zinc-400 text-sm">
          시도한 것에 의미를 둬요 🥲
        </div>
        <div className="p-1 border border-zinc-200 rounded-full text-zinc-400 text-sm">
          계획했던 흐름을 잘 이어갔어요 👍
        </div>
        <div className="p-1 border border-zinc-200 rounded-full text-zinc-400 text-sm">
          아주 뿌듯해요! 완벽하게 해냈어요 🔥
        </div>
      </div>
    </div>
    <div>
      <p>남기고 싶은 내용이 있나요?</p>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="운동하는 습관을 들여서 건강해지고 싶어요!"
        rows={6}
        className="my-6 w-full rounded-3xl border border-zinc-200 bg-white px-4 py-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-none"
        style={{ borderColor: goal.length > 0 ? COLORS.primary : undefined }}
      />
    </div>
  </div>;
};

export default DailyLogBottomSheet;
