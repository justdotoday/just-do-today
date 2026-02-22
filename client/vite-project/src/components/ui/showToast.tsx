import toast from 'react-hot-toast';
import Toast from './Toast';

const DEFAULT_DURATION_MS = 3000;

/**
 * Figma 스타일 토스트 컴포넌트를 사용하는 헬퍼.
 * 기존 toast.success / toast.error 대신 사용하면 동일 디자인이 적용
 */
export const showToast = {
  success: (message: string, duration = DEFAULT_DURATION_MS) => {
    toast.custom(
      (t) => <Toast message={message} variant="success" visible={t.visible} />,
      { duration }
    );
  },

  error: (message: string, duration = DEFAULT_DURATION_MS) => {
    toast.custom(
      (t) => <Toast message={message} variant="error" visible={t.visible} />,
      { duration }
    );
  },

  default: (message: string, duration = DEFAULT_DURATION_MS) => {
    toast.custom(
      (t) => <Toast message={message} variant="default" visible={t.visible} />,
      { duration }
    );
  },
};
