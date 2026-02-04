type Props = {
  onClose: () => void;
  onConfirm: (date: Date) => void;
};

const FreezeCalendarSheet = ({ onClose, onConfirm }: Props) => {
  // TODO: 달력 UI 구현 후 onClose, onConfirm 연결
  return (
    <div>
      <p>FreezeCalendarSheet</p>
      <button type="button" onClick={onClose}>
        닫기
      </button>
      <button type="button" onClick={() => onConfirm(new Date())}>
        확인
      </button>
    </div>
  );
};

export default FreezeCalendarSheet;
