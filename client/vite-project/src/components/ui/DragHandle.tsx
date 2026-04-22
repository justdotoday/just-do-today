//모달 핸들드래그 컴포넌트 (드래그핸들 ↔ 제목 간격은 mb-5로 통일)
//시트를 motion.div + drag="y"로 두면 핸들 잡고 내려서 닫기 가능

const DragHandle = () => {
  return (
    <div className="mb-5 flex w-full justify-center pt-0.5 pb-2 cursor-grab active:cursor-grabbing">
      <div className="h-1.5 w-12 rounded-full bg-[#D1D5DB]" aria-hidden />
    </div>
  );
};

export default DragHandle;
