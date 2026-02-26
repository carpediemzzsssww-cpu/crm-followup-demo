import type { ReactNode } from 'react';

type ConfirmVariant = 'primary' | 'danger';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: ConfirmVariant;
  confirmDisabled?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const confirmVariantClass: Record<ConfirmVariant, string> = {
  primary: 'bg-primary text-white hover:bg-blue-700 disabled:bg-blue-400',
  danger: 'bg-danger text-white hover:bg-red-700 disabled:bg-red-400'
};

export default function ConfirmDialog({
  open,
  title,
  message,
  cancelText = '取消',
  confirmText = '确认',
  confirmVariant = 'primary',
  confirmDisabled = false,
  onCancel,
  onConfirm
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <button
        type="button"
        aria-label="关闭弹窗"
        className="absolute inset-0 bg-slate-900/55"
        onClick={onCancel}
      />
      <section className="relative z-[81] w-full max-w-md rounded-card bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <div className="mt-3 text-sm leading-6 text-text-secondary">{message}</div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary">
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={`inline-flex h-9 items-center justify-center rounded-control px-4 text-sm font-medium transition ${confirmVariantClass[confirmVariant]}`}
          >
            {confirmText}
          </button>
        </div>
      </section>
    </div>
  );
}
