type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

const ConfirmModal = ({ open, onClose, title, description, children }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative mx-6 w-full max-w-[320px] rounded-4xl bg-white px-5 py-6 text-center">
        <p className="text-[16px] font-semibold text-zinc-800">{title}</p>
        {description && (
          <p className="mt-2 text-[14px] text-zinc-500">{description}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default ConfirmModal;
