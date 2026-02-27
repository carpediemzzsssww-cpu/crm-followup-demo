import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n';

export type ToastType = 'success' | 'error';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastOptions {
  message: string;
  type?: ToastType;
}

const toasts: ToastItem[] = [];
const listeners = new Set<(items: ToastItem[]) => void>();
const dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

function publishToasts() {
  listeners.forEach((listener) => listener([...toasts]));
}

function removeToast(id: string) {
  const index = toasts.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }

  toasts.splice(index, 1);
  const timer = dismissTimers.get(id);
  if (timer) {
    clearTimeout(timer);
    dismissTimers.delete(id);
  }

  publishToasts();
}

function addToast(options: ToastOptions) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  toasts.push({
    id,
    message: options.message,
    type: options.type ?? 'success'
  });

  publishToasts();
  const timer = setTimeout(() => {
    removeToast(id);
  }, 3000);
  dismissTimers.set(id, timer);
}

export function useToast() {
  return {
    toast: addToast,
    success: (message: string) => addToast({ message, type: 'success' }),
    error: (message: string) => addToast({ message, type: 'error' })
  };
}

export default function Toast() {
  const { t } = useI18n();
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (nextItems: ToastItem[]) => {
      setItems(nextItems);
    };
    listeners.add(listener);
    listener([...toasts]);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[90] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`pointer-events-auto flex items-start justify-between rounded-card border px-4 py-3 shadow-card ${
            item.type === 'success'
              ? 'border-green-200 bg-green-50 text-success'
              : 'border-red-200 bg-red-50 text-danger'
          }`}
        >
          <p className="pr-3 text-sm leading-6">{item.message}</p>
          <button
            type="button"
            onClick={() => removeToast(item.id)}
            className="text-xs font-medium opacity-80 transition hover:opacity-100"
          >
            {t('common.close')}
          </button>
        </div>
      ))}
    </div>
  );
}
