import { useEffect, useRef, useState } from 'react';
import type { FollowUpEvent } from '../../types';

interface VoidModalProps {
  open: boolean;
  event?: FollowUpEvent | null;
  eventId?: string | null;
  onClose: () => void;
  onVoid?: (eventId: string, reason: string) => Promise<void> | void;
  onConfirm?: (reason: string) => Promise<void> | void;
}

export default function VoidModal({
  open,
  event,
  eventId,
  onClose,
  onVoid,
  onConfirm
}: VoidModalProps) {
  const [reason, setReason] = useState('');
  const [errorText, setErrorText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const resolvedEventId = eventId ?? event?.event_id ?? null;

  useEffect(() => {
    if (!open) {
      setReason('');
      setErrorText('');
      setSubmitting(false);
      submittingRef.current = false;
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleConfirm = async () => {
    if (submittingRef.current) {
      return;
    }

    const trimmedReason = reason.trim();
    if (!trimmedReason) {
      setErrorText('此项为必填');
      return;
    }

    setSubmitting(true);
    submittingRef.current = true;
    try {
      if (onVoid) {
        if (!resolvedEventId) {
          setErrorText('未找到可作废的记录');
          return;
        }
        await Promise.resolve(onVoid(resolvedEventId, trimmedReason));
      } else if (onConfirm) {
        await Promise.resolve(onConfirm(trimmedReason));
      } else {
        setErrorText('未配置作废处理方法');
        return;
      }
      onClose();
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <button
        type="button"
        aria-label="关闭作废弹窗"
        className="absolute inset-0 bg-slate-900/55"
        onClick={onClose}
      />
      <div className="relative z-[71] w-full max-w-md rounded-card bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-text-primary">确认作废</h3>
        <p className="mt-2 text-sm text-text-secondary">请填写作废原因，提交后该记录将标记为已作废。</p>

        <label htmlFor="void_reason" className="mt-5 block text-xs text-text-secondary">
          作废原因 <span className="text-danger">*</span>
        </label>
        <textarea
          id="void_reason"
          value={reason}
          maxLength={200}
          onChange={(eventValue) => {
            setReason(eventValue.target.value);
            if (errorText) {
              setErrorText('');
            }
          }}
          placeholder="请输入作废原因"
          className={`mt-2 w-full resize-none rounded-control border px-3 py-2 text-sm text-text-primary outline-none transition focus:ring-2 ${
            errorText
              ? 'border-danger focus:ring-red-100'
              : 'border-border-color focus:border-primary focus:ring-blue-100'
          }`}
          rows={5}
        />
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-danger">{errorText}</p>
          <p className="text-xs text-text-secondary">{reason.length}/200</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={submitting} className="btn-secondary">
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="inline-flex h-9 items-center gap-2 rounded-control bg-danger px-4 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {submitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
            ) : null}
            确认作废
          </button>
        </div>
      </div>
    </div>
  );
}
