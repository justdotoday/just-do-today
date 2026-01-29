const HomeEmpty = () => {
  return (
    <div className="flex flex-col items-center pt-24">
      <div className="text-center">
        <p className="text-base font-semibold text-zinc-800">
          시작이 반이에요!
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          먼저 습관 하나 등록해볼까요?
        </p>
      </div>

      <button className="mt-10 h-14 w-full max-w-[320px] rounded-full bg-blue-600 text-white">
        습관 등록하기
      </button>
    </div>
  );
};

export default HomeEmpty;
