import type { ReactNode } from 'react';

interface DrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
}

export default function Drawer({
  open,
  title,
  onClose,
  children,
  widthClassName = 'w-full max-w-xl'
}: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex">
        <section className={`${widthClassName} h-full overflow-y-auto bg-white shadow-2xl`}>
          <header className="sticky top-0 flex items-center justify-between border-b border-border-color bg-white px-6 py-4">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-2 py-1 text-sm text-text-secondary hover:bg-gray-100"
            >
              关闭
            </button>
          </header>
          <div className="px-6 py-5">{children}</div>
        </section>
      </div>
    </div>
  );
}
