import { useEffect, useRef, useState } from 'react';
import {
  FOLLOW_UP_METHOD_OPTIONS,
  INTENTION_OPTIONS
} from '../../constants/followupMeta';
import type { FollowUpEvent } from '../../types';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../ui/Toast';

type FormState = {
  follow_up_type: FollowUpEvent['follow_up_type'] | '';
  follow_up_time: string;
  summary: string;
  intention_level: NonNullable<FollowUpEvent['intention_level']> | '';
  next_follow_up_date: string;
  action_items: string;
};

type FieldErrors = Partial<Record<'follow_up_type' | 'follow_up_time' | 'summary', string>>;

export interface NewEventPayload {
  created_by: string;
  follow_up_type: FollowUpEvent['follow_up_type'];
  follow_up_time: string;
  summary: string;
  intention_level?: FollowUpEvent['intention_level'];
  next_follow_up_time?: string;
  action_items?: string;
}

interface NewEventDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: NewEventPayload) => Promise<void> | void;
  onSave?: (payload: NewEventPayload) => Promise<void> | void;
}

function toDateTimeLocalValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function buildDefaultForm(time: string): FormState {
  return {
    follow_up_type: '',
    follow_up_time: time,
    summary: '',
    intention_level: '',
    next_follow_up_date: '',
    action_items: ''
  };
}

export default function NewEventDrawer({ open, onClose, onSubmit, onSave }: NewEventDrawerProps) {
  const submitHandler = onSave ?? onSubmit;
  const { success, error } = useToast();

  const initialTimeRef = useRef(toDateTimeLocalValue(new Date()));
  const submitPendingRef = useRef(false);

  const [form, setForm] = useState<FormState>(() => buildDefaultForm(initialTimeRef.current));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const defaultTime = toDateTimeLocalValue(new Date());
    initialTimeRef.current = defaultTime;
    setForm(buildDefaultForm(defaultTime));
    setErrors({});
    setSubmitting(false);
    setCloseConfirmOpen(false);
    submitPendingRef.current = false;
  }, [open]);

  const hasUnsavedContent =
    Boolean(form.follow_up_type) ||
    form.summary.trim().length > 0 ||
    Boolean(form.intention_level) ||
    Boolean(form.next_follow_up_date) ||
    form.action_items.trim().length > 0 ||
    form.follow_up_time !== initialTimeRef.current;

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!form.follow_up_type) {
      next.follow_up_type = '此项为必填';
    }

    if (!form.follow_up_time) {
      next.follow_up_time = '此项为必填';
    }

    if (!form.summary.trim()) {
      next.summary = '此项为必填';
    }

    return next;
  };

  const handleAttemptClose = () => {
    if (submitting) {
      return;
    }

    if (hasUnsavedContent) {
      setCloseConfirmOpen(true);
      return;
    }

    onClose();
  };

  const handleSubmit = async () => {
    if (submitPendingRef.current) {
      return;
    }

    setSubmitting(true);
    submitPendingRef.current = true;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitting(false);
      submitPendingRef.current = false;
      return;
    }

    if (!submitHandler) {
      error('保存失败：未配置提交方法');
      setSubmitting(false);
      submitPendingRef.current = false;
      return;
    }

    const payload: NewEventPayload = {
      created_by: '当前销售',
      follow_up_type: form.follow_up_type as FollowUpEvent['follow_up_type'],
      follow_up_time: new Date(form.follow_up_time).toISOString(),
      summary: form.summary.trim(),
      intention_level: form.intention_level || undefined,
      next_follow_up_time: form.next_follow_up_date
        ? new Date(`${form.next_follow_up_date}T00:00:00`).toISOString()
        : undefined,
      action_items: form.action_items.trim() || undefined
    };

    try {
      await Promise.resolve(submitHandler(payload));
      success('新增跟进记录成功');
      onClose();
    } catch {
      error('提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
      submitPendingRef.current = false;
    }
  };

  const overlayClassName = `fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`;
  const backdropClassName = `absolute inset-0 bg-slate-900/55 transition-opacity duration-200 ${
    open ? 'opacity-100' : 'opacity-0'
  }`;
  const panelClassName = `absolute right-0 top-0 flex h-full w-[480px] max-w-[100vw] flex-col bg-white shadow-2xl transition-transform duration-300 ${
    open ? 'translate-x-0' : 'translate-x-full'
  }`;

  return (
    <>
      <div className={overlayClassName}>
        <button
          type="button"
          aria-label="关闭新增跟进抽屉"
          className={backdropClassName}
          onClick={handleAttemptClose}
        />

        <aside className={panelClassName}>
          <header className="flex items-center justify-between border-b border-border-color px-6 py-4">
            <h2 className="text-base font-semibold text-text-primary">新增跟进记录</h2>
            <button
              type="button"
              onClick={handleAttemptClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-control text-text-secondary transition hover:bg-slate-100 hover:text-text-primary"
              aria-label="关闭"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
            <section>
              <p className="mb-2 text-xs text-text-secondary">
                跟进方式 <span className="text-danger">*</span>
              </p>
              <div className="grid grid-cols-5 gap-2">
                {FOLLOW_UP_METHOD_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, follow_up_type: item.value }));
                      if (errors.follow_up_type) {
                        setErrors((prev) => ({ ...prev, follow_up_type: undefined }));
                      }
                    }}
                    className={`h-9 rounded-control border px-2 text-sm font-medium transition ${
                      form.follow_up_type === item.value
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-border-color text-text-secondary hover:border-blue-200 hover:text-text-primary'
                    } ${errors.follow_up_type ? 'border-danger' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-danger">{errors.follow_up_type}</p>
            </section>

            <section>
              <label htmlFor="follow_up_time" className="mb-2 block text-xs text-text-secondary">
                跟进时间 <span className="text-danger">*</span>
              </label>
              <input
                id="follow_up_time"
                type="datetime-local"
                value={form.follow_up_time}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, follow_up_time: event.target.value }));
                  if (errors.follow_up_time) {
                    setErrors((prev) => ({ ...prev, follow_up_time: undefined }));
                  }
                }}
                className={`input-enterprise w-full ${errors.follow_up_time ? 'border-danger focus:ring-red-100' : ''}`}
              />
              <p className="mt-1 text-xs text-danger">{errors.follow_up_time}</p>
            </section>

            <section>
              <label htmlFor="summary" className="mb-2 block text-xs text-text-secondary">
                沟通摘要 <span className="text-danger">*</span>
              </label>
              <textarea
                id="summary"
                maxLength={2000}
                value={form.summary}
                placeholder="请输入本次沟通摘要"
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, summary: event.target.value }));
                  if (errors.summary) {
                    setErrors((prev) => ({ ...prev, summary: undefined }));
                  }
                }}
                className={`w-full resize-none rounded-control border bg-white px-3 py-2 text-sm text-text-primary outline-none transition focus:ring-2 ${
                  errors.summary
                    ? 'border-danger focus:ring-red-100'
                    : 'border-border-color focus:border-primary focus:ring-blue-100'
                }`}
                rows={6}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-danger">{errors.summary}</p>
                <p className="text-xs text-text-secondary">{form.summary.length}/2000</p>
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs text-text-secondary">客户意向</p>
              <div className="grid grid-cols-2 gap-2">
                {INTENTION_OPTIONS.map((item) => (
                  <label
                    key={item.value}
                    className={`flex h-9 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition ${
                      form.intention_level === item.value
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-border-color text-text-secondary hover:border-blue-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="intention_level"
                      value={item.value}
                      checked={form.intention_level === item.value}
                      onChange={() => setForm((prev) => ({ ...prev, intention_level: item.value }))}
                      className="h-4 w-4 accent-primary"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </section>

            <section>
              <label htmlFor="next_follow_up_date" className="mb-2 block text-xs text-text-secondary">
                下次跟进时间
              </label>
              <input
                id="next_follow_up_date"
                type="date"
                value={form.next_follow_up_date}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, next_follow_up_date: event.target.value }))
                }
                className="input-enterprise w-full"
              />
            </section>

            <section>
              <label htmlFor="action_items" className="mb-2 block text-xs text-text-secondary">
                后续行动项
              </label>
              <input
                id="action_items"
                type="text"
                value={form.action_items}
                onChange={(event) => setForm((prev) => ({ ...prev, action_items: event.target.value }))}
                placeholder="请输入后续行动项"
                className="input-enterprise w-full"
              />
            </section>
          </div>

          <footer className="flex items-center justify-end gap-3 border-t border-border-color px-6 py-4">
            <button type="button" onClick={handleAttemptClose} disabled={submitting} className="btn-secondary">
              取消
            </button>
            <button type="button" onClick={handleSubmit} disabled={submitting} className="btn-primary gap-2">
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
              ) : null}
              {submitting ? '提交中...' : '保存记录'}
            </button>
          </footer>
        </aside>
      </div>

      <ConfirmDialog
        open={closeConfirmOpen}
        title="内容未保存，确认关闭？"
        message="当前填写内容将不会保留。"
        cancelText="继续编辑"
        confirmText="确认关闭"
        onCancel={() => setCloseConfirmOpen(false)}
        onConfirm={() => {
          setCloseConfirmOpen(false);
          onClose();
        }}
      />
    </>
  );
}
