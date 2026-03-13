import toast from 'react-hot-toast';
import checkLogo from '../../../assets/snackbar/check-logo.png';

/* eslint-disable react-refresh/only-export-components -- Toast + showToast 한 파일에서 관리 */

const DEFAULT_DURATION_MS = 1000;

type ToastProps = {
  message: string;
  variant?: 'default' | 'success' | 'error';
  visible?: boolean;
};

const barClass =
  'flex min-h-[64px] min-w-[280px] max-w-[343px] items-center gap-2 rounded-[20px] px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)]';

const Toast = ({
  message,
  variant = 'default',
  visible = true,
}: ToastProps) => {
  const isSuccess = variant === 'success';

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`${barClass} ${
        isSuccess ? 'bg-[#a2a9b0]/85' : 'bg-white'
      } transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {isSuccess ? (
        <img
          src={checkLogo}
          alt=""
          className="h-6 w-6 shrink-0 object-contain"
          aria-hidden
        />
      ) : (
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            variant === 'error'
              ? 'bg-red-50 text-red-600'
              : 'bg-zinc-100 text-zinc-600'
          }`}
        >
          {variant === 'error' ? '×' : 'i'}
        </span>
      )}
      <p
        className={`flex-1 truncate text-[16px] font-medium leading-6 tracking-[-0.02em] ${
          isSuccess ? 'text-zinc-700' : 'text-zinc-800'
        }`}
      >
        {message}
      </p>
    </div>
  );
};

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

export default Toast;
