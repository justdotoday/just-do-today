import { useEffect } from 'react';
import checkLogo from '../../../assets/buttons/check-grey.png';

/**
 * 완료 체크 시 하단에 뜨는 스낵바. "더 자세히 남겨볼까요?" + 기록하기 CTA.
 * 1초 후 자동으로 사라짐.
 */
type CompletionSnackbarProps = {
  visible: boolean; // 스낵바 표시 여부
  onDismiss: () => void; // 스낵바 닫기 핸들러
  onRecordClick?: () => void; // 기록하기 버튼 클릭 핸들러
  autoCloseMs?: number; // 자동 닫히기 시간 (ms)
};

const SNACKBAR_BOTTOM_OFFSET = 112;

const CompletionSnackbar = ({
  visible,
  onDismiss,
  onRecordClick,
  autoCloseMs = 2500,
}: CompletionSnackbarProps) => {
  useEffect(() => {
    if (!visible || autoCloseMs <= 0) return;
    const t = setTimeout(onDismiss, autoCloseMs);
    return () => clearTimeout(t);
  }, [visible, autoCloseMs, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-0 right-0 z-40 flex justify-center"
      style={{ bottom: SNACKBAR_BOTTOM_OFFSET }}
    >
      <div className="flex min-h-[64px] w-[90vw] max-w-[373px] items-center justify-between gap-3 rounded-[20px] bg-[#a2a9b0]/85 px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img
            src={checkLogo}
            alt=""
            className="h-6 w-6 shrink-0 object-contain"
            aria-hidden
          />
          <p className="truncate text-[16px] font-medium leading-6 tracking-[-0.02em] text-zinc-700">
            더 자세히 남겨볼까요?
          </p>
        </div>
        <button
          type="button"
          onClick={onRecordClick}
          className="shrink-0 rounded-full bg-[#858c94] px-4 py-2 text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white"
        >
          기록하기
        </button>
      </div>
    </div>
  );
};

export default CompletionSnackbar;
