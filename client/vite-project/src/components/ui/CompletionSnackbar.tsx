import { useEffect } from 'react';
import checkLogo from '../../assets/snackbar/check-logo.png';

/**
 * 완료 체크 시 하단에 뜨는 스낵바. "더 자세히 남겨볼까요?" + 기록하기 CTA.
 * 선택 로고(회색 원 + 흰색 체크)를 문구 옆에 표시.
 */
type CompletionSnackbarProps = {
  visible: boolean; // 스낵바 표시 여부
  onDismiss: () => void; // 스낵바 닫기 핸들러
  onRecordClick?: () => void; // 기록하기 버튼 클릭 핸들러
  /** 자동으로 닫히기까지 ms (0이면 자동 닫힘 없음) */
  autoCloseMs?: number; // 자동 닫히기 시간 (ms)
};

// MainFooter 높이(72) + 하단 패딩(~16) + 토스트·푸터 사이 여백(24)
const SNACKBAR_BOTTOM_OFFSET = 112;

const CompletionSnackbar = ({
  visible, // 스낵바 표시 여부
  onDismiss, // 스낵바 닫기 핸들러
  onRecordClick, // 기록하기 버튼 클릭 핸들러
  autoCloseMs = 4000, // 자동 닫히기 시간 (ms)
}: CompletionSnackbarProps) => {
  useEffect(() => {
    if (!visible || autoCloseMs <= 0) return; // 스낵바 표시 여부 확인 및 자동 닫히기 시간 확인
    const t = setTimeout(onDismiss, autoCloseMs); // 자동 닫히기 타이머 설정
    return () => clearTimeout(t);
  }, [visible, autoCloseMs, onDismiss]); // 스낵바 표시 여부 확인 및 자동 닫히기 시간 확인, 스낵바 닫기 핸들러 설정

  if (!visible) return null; // 스낵바 표시 여부 확인

  return (
    <div
      role="status"
      aria-live="polite" // 스낵바 내용 읽어주기 위한 접근성 속성(변경된 내용을 부드럽게 알리는 스크린리더)
      className="fixed left-0 right-0 z-40 mx-auto max-w-[414px] px-4"
      style={{ bottom: SNACKBAR_BOTTOM_OFFSET }}
    >
      <div className="flex min-h-[64px] items-center justify-between gap-3 rounded-[20px] bg-[#a2a9b0]/85 px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
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
          onClick={() => {
            onRecordClick?.();
            onDismiss();
          }}
          className="shrink-0 rounded-full bg-[#858c94] px-4 py-2 text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-white"
        >
          기록하기
        </button>
      </div>
    </div>
  );
};

export default CompletionSnackbar;
